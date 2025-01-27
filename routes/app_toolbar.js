const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 툴바 데이터 추가
router.post('/', async (req, res) => {
  const { toolbar_items, active_status } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO app_toolbar (toolbar_items, active_status) 
       VALUES ($1, $2) RETURNING *`,
      [JSON.stringify(toolbar_items), active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 툴바 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM app_toolbar');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 특정 앱의 툴바 데이터 조회
router.get('/app/:app_id', async (req, res) => {
  const { app_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM app_toolbar WHERE app_id = $1',
      [app_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: ID로 특정 툴바 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM app_toolbar WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 툴바를 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: 툴바 데이터 업데이트
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { toolbar_items, active_status } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE app_toolbar 
       SET toolbar_items = $1, active_status = $2
       WHERE id = $3 RETURNING *`,
      [JSON.stringify(toolbar_items), active_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 툴바를 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: 툴바 데이터 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM app_toolbar WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 툴바를 찾을 수 없습니다.' });
    }

    res.json({ message: '툴바가 성공적으로 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 특정 앱의 툴바 항목 조회
router.get('/app/:id', async (req, res) => {
  const { app_id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM app_toolbar WHERE id = $1 ORDER BY position',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
