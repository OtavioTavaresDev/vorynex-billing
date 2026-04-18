// server.js (MODIFICADO)
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa banco (agora síncrono)
require('./db/init')();
const db = require('./db/database');

// Rotas da API
const clientsRouter = require('./routes/clients');
const transactionsRouter = require('./routes/transactions');

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/first-access', (req, res) => {
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM users').get();
    res.json({ firstAccess: row.count === 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/setup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (row.count > 0) {
      return res.status(403).json({ error: 'Setup já realizado' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
      .run(username, hashedPassword, 'admin');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/limits', (req, res) => {
  try {
    const clientsCount = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
    const transCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
    res.json({
      clients: clientsCount,
      transactions: transCount,
      maxClients: 3,
      maxTransactions: 3
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/clients', clientsRouter);
app.use('/api/transactions', transactionsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});