const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 스타일 데이터 추가
router.post('/', async (req, res) => {
  const { app_style_menu, toolbar_color, indicator_color, button_color, button_text_color, active_status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO app_style (app_style_menu, toolbar_color, indicator_color, button_color, button_text_color, active_status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [app_style_menu, toolbar_color, indicator_color, button_color, button_text_color, active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 스타일 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM app_style`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
