// routes/clients.js (MODIFICADO)
const express = require('express');
const router = express.Router();
const db = require('../db/database');

const MAX_CLIENTS = 3;

router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM clients').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  try {
    const countRow = db.prepare('SELECT COUNT(*) as count FROM clients').get();
    if (countRow.count >= MAX_CLIENTS) {
      return res.status(403).json({ error: `Versão demo permite no máximo ${MAX_CLIENTS} clientes.` });
    }

    const stmt = db.prepare('INSERT INTO clients (name, email) VALUES (?, ?)');
    const info = stmt.run(name, email);
    res.json({ id: info.lastInsertRowid, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const stmt = db.prepare('UPDATE clients SET name = ?, email = ? WHERE id = ?');
    const info = stmt.run(name, email, id);
    res.json({ updated: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare('DELETE FROM clients WHERE id = ?');
    const info = stmt.run(id);
    res.json({ deleted: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;