const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 메뉴 데이터 추가
router.post('/', async (req, res) => {
  const { app_id, title, description, position, category, keyword, ui_type, active_status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO menu (app_id, title, description, position, category, keyword, ui_type, active_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [app_id, title, description, position, category, keyword, ui_type, active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 메뉴 데이터 조회
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM menu');
  res.json(result.rows);
});

// READ: 메뉴 데이터 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM menu WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// READ: 특정 앱의 메뉴 데이터 조회
router.get('/app/:app_id', async (req, res) => {
  const { app_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM menu WHERE app_id = $1 ORDER BY position',
      [app_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: 메뉴 데이터 업데이트
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, position, category, keyword, ui_type, active_status } = req.body;
  // 업데이트 로직 구현
});

// DELETE: 메뉴 데이터 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // 삭제 로직 구현
});



// 기타 CRUD 라우트는 위와 동일한 패턴으로 작성
module.exports = router;
