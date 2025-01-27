const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 스타일 데이터 추가
router.post('/', async (req, res) => {
  const {
    app_style_menu,
    toolbar_color,
    indicator_color,
    button_color,
    button_text_color,
    active_status
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO app_style (
        app_style_menu, toolbar_color, indicator_color,
        button_color, button_text_color, active_status
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [app_style_menu, toolbar_color, indicator_color,
       button_color, button_text_color, active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 스타일 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM app_style');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 특정 앱의 스타일 데이터 조회
router.get('/app/:app_id', async (req, res) => {
  const { app_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM app_style WHERE app_id = $1',
      [app_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: 스타일 데이터 업데이트
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    app_style_menu,
    toolbar_color,
    indicator_color,
    button_color,
    button_text_color,
    active_status
  } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE app_style 
       SET app_style_menu = $1, toolbar_color = $2, indicator_color = $3,
           button_color = $4, button_text_color = $5, active_status = $6
       WHERE id = $7 RETURNING *`,
      [app_style_menu, toolbar_color, indicator_color,
       button_color, button_text_color, active_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 스타일을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: 스타일 데이터 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM app_style WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 스타일을 찾을 수 없습니다.' });
    }

    res.json({ message: '스타일이 성공적으로 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
