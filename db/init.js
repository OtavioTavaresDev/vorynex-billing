// db/init.js (MODIFICADO)
const db = require('./database');

function initializeDatabase() {
  // Criar tabelas se não existirem
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

  // Verificar se existem clientes
  const clientCount = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
  if (clientCount === 0) {
    const insertClient = db.prepare('INSERT INTO clients (name, email) VALUES (?, ?)');
    const insertTransaction = db.prepare('INSERT INTO transactions (client_id, amount, date) VALUES (?, ?, ?)');

    const clients = [
      { name: 'Empresa ABC', email: 'contato@abc.com' },
      { name: 'Tech Solutions', email: 'admin@techsolutions.com' },
      { name: 'Consultoria XYZ', email: 'financeiro@xyz.com' },
      { name: 'Startup Inovadora', email: 'contato@startup.com' },
      { name: 'Corporação Global', email: 'global@corp.com' }
    ];

    const insertMany = db.transaction((clientsArray) => {
      for (const client of clientsArray) {
        insertClient.run(client.name, client.email);
      }
    });
    insertMany(clients);

    const transactions = [
      { client_id: 1, amount: 1250.50, date: '2025-01-15' },
      { client_id: 1, amount: 780.00, date: '2025-01-20' },
      { client_id: 2, amount: 3200.00, date: '2025-01-10' },
      { client_id: 3, amount: 450.75, date: '2025-01-18' },
      { client_id: 3, amount: 2100.00, date: '2025-01-22' },
      { client_id: 4, amount: 5000.00, date: '2025-02-01' },
      { client_id: 5, amount: 1750.25, date: '2025-02-05' }
    ];

    const insertManyTrans = db.transaction((transArray) => {
      for (const trans of transArray) {
        insertTransaction.run(trans.client_id, trans.amount, trans.date);
      }
    });
    insertManyTrans(transactions);
  }

  console.log('Banco de dados inicializado com sucesso.');
  return db;
}

module.exports = initializeDatabase;