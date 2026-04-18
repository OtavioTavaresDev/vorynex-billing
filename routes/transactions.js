// routes/transactions.js (MODIFICADO)
const express = require('express');
const router = express.Router();
const db = require('../db/database');

const MAX_TRANSACTIONS = 3;

router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT transactions.id, transactions.amount, transactions.date, clients.name as client_name
      FROM transactions
      JOIN clients ON transactions.client_id = clients.id
    `).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  const { client_id, amount, date } = req.body;
  if (!client_id || !amount || !date) {
    return res.status(400).json({ error: 'client_id, amount e date são obrigatórios' });
  }

  try {
    const countRow = db.prepare('SELECT COUNT(*) as count FROM transactions').get();
    if (countRow.count >= MAX_TRANSACTIONS) {
      return res.status(403).json({ error: `Versão demo permite no máximo ${MAX_TRANSACTIONS} transações.` });
    }

    const stmt = db.prepare('INSERT INTO transactions (client_id, amount, date) VALUES (?, ?, ?)');
    const info = stmt.run(client_id, amount, date);
    res.json({ id: info.lastInsertRowid, client_id, amount, date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  const { client_id, amount, date } = req.body;
  const { id } = req.params;

  try {
    const stmt = db.prepare('UPDATE transactions SET client_id = ?, amount = ?, date = ? WHERE id = ?');
    const info = stmt.run(client_id, amount, date, id);
    res.json({ updated: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    const info = stmt.run(id);
    res.json({ deleted: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;