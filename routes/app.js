const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: 앱 데이터 추가
router.post('/', async (req, res) => {
  const { name, package_name, ads_status, app_style_id, app_toolbar_id, active_status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO app (name, package_name, ads_status, app_style_id, app_toolbar_id, active_status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, package_name, ads_status, app_style_id, app_toolbar_id, active_status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 앱 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM app');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 앱 데이터 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM app WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// UPDATE: 앱 데이터 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, package_name, ads_status, app_style_id, app_toolbar_id, active_status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE app SET 
         name = $1, 
         package_name = $2, 
         ads_status = $3, 
         app_style_id = $4, 
         app_toolbar_id = $5, 
         active_status = $6 
       WHERE id = $7 RETURNING *`,
      [name, package_name, ads_status, app_style_id, app_toolbar_id, active_status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: 앱 데이터 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM app WHERE id = $1', [id]);
    res.json({ message: 'App deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
