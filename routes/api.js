const express = require('express');
const router = express.Router();
const db = require('../models/db');

// List all records
router.get('/records', (req, res) => {
  db.query('SELECT * FROM records', (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

// Add a new record
router.post('/records', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO records (name, description) VALUES (?, ?)', [name, description], (err) => {
    if (err) {
      console.error('Error adding record:', err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  });
});

// Delete a record
router.delete('/records/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM records WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
});

// Update a record
router.put('/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query('UPDATE records SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) {
      console.error('Error updating record:', err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
});

module.exports = router;
