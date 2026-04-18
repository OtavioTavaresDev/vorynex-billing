const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'billing.db');
const db = new Database(dbPath, { verbose: console.log });

// Configurações de performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;
