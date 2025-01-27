const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 툴바 데이터 추가
router.post('/', async (req, res) => {
  const { toolbar_items, active_status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO app_toolbar (toolbar_items, active_status) VALUES ($1, $2) RETURNING *`,
      [toolbar_items, active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 툴바 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM app_toolbar`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
