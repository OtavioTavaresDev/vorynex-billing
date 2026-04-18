const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

// Função para criar a janela
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  });

  // Aguardar um pouco para o servidor iniciar
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 1000);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Função para iniciar o servidor Express
function startServer() {
  const express = require('express');
  const bcrypt = require('bcryptjs');
  const helmet = require('helmet');
  const cors = require('cors');
  
  const appExpress = express();
  const PORT = 3000;
  
  appExpress.use(helmet({ contentSecurityPolicy: false }));
  appExpress.use(cors());
  appExpress.use(express.json());
  
  // Caminho para arquivos estáticos
  const publicPath = app.isPackaged 
    ? path.join(process.resourcesPath, 'app.asar', 'public')
    : path.join(__dirname, 'public');
  
  appExpress.use(express.static(publicPath));
  
  // Configurar banco de dados no diretório do usuário
  const userDataPath = app.getPath('userData');
  const dbDir = path.join(userDataPath, 'db');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbFile = path.join(dbDir, 'billing.db');
  
  const Database = require('better-sqlite3');
  const db = new Database(dbFile);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  
  // Criar tabelas
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'employee'))
    );
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    );
  `);
  
  // Dados demo iniciais
  const clientCount = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
  if (clientCount === 0) {
    const insertClient = db.prepare('INSERT INTO clients (name, email) VALUES (?, ?)');
    insertClient.run('Cliente Exemplo', 'exemplo@vorynex.com');
  }
  
  // Rotas da API
  appExpress.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    
    try {
      const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
      
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });
      
      res.json({ id: user.id, username: user.username, role: user.role });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  appExpress.get('/api/first-access', (req, res) => {
    const row = db.prepare('SELECT COUNT(*) as count FROM users').get();
    res.json({ firstAccess: row.count === 0 });
  });
  
  appExpress.post('/api/setup', (req, res) => {
    const { username, password } = req.body;
    const row = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (row.count > 0) return res.status(403).json({ error: 'Setup já realizado' });
    
    const hashed = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashed, 'admin');
    res.json({ success: true });
  });
  
  appExpress.get('/api/clients', (req, res) => {
    const rows = db.prepare('SELECT * FROM clients').all();
    res.json(rows);
  });
  
  appExpress.post('/api/clients', (req, res) => {
    const { name, email } = req.body;
    const count = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
    if (count >= 3) return res.status(403).json({ error: 'Limite demo: 3 clientes' });
    
    try {
      const info = db.prepare('INSERT INTO clients (name, email) VALUES (?, ?)').run(name, email);
      res.json({ id: info.lastInsertRowid, name, email });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  appExpress.put('/api/clients/:id', (req, res) => {
    const { name, email } = req.body;
    const info = db.prepare('UPDATE clients SET name = ?, email = ? WHERE id = ?').run(name, email, req.params.id);
    res.json({ updated: info.changes });
  });
  
  appExpress.delete('/api/clients/:id', (req, res) => {
    const info = db.prepare('DELETE FROM clients WHERE id = ?').run(req.params.id);
    res.json({ deleted: info.changes });
  });
  
  appExpress.get('/api/transactions', (req, res) => {
    const rows = db.prepare(`
      SELECT t.id, t.amount, t.date, c.name as client_name
      FROM transactions t JOIN clients c ON t.client_id = c.id
    `).all();
    res.json(rows);
  });
  
  appExpress.post('/api/transactions', (req, res) => {
    const { client_id, amount, date } = req.body;
    const count = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
    if (count >= 3) return res.status(403).json({ error: 'Limite demo: 3 transações' });
    
    const info = db.prepare('INSERT INTO transactions (client_id, amount, date) VALUES (?, ?, ?)').run(client_id, amount, date);
    res.json({ id: info.lastInsertRowid, client_id, amount, date });
  });
  
  appExpress.delete('/api/transactions/:id', (req, res) => {
    const info = db.prepare('DELETE FROM transactions WHERE id = ?').run(req.params.id);
    res.json({ deleted: info.changes });
  });
  
  appExpress.get('/api/limits', (req, res) => {
    const clients = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
    const trans = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
    res.json({ clients, transactions: trans, maxClients: 3, maxTransactions: 3 });
  });
  
  appExpress.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
  
  appExpress.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Inicialização principal
app.whenReady().then(() => {
  startServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
