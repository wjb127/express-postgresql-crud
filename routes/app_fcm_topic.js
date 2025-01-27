const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: FCM 토픽 데이터 추가
router.post('/', async (req, res) => {
  const {
    app_id,
    title,
    fcm_topic,
    type,
    translation_title_json,
    position
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO app_fcm_topic (
        app_id, title, fcm_topic, type, translation_title_json, position
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [app_id, title, fcm_topic, type, 
       JSON.stringify(translation_title_json), position]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 FCM 토픽 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM app_fcm_topic');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: ID로 특정 FCM 토픽 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM app_fcm_topic WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// READ: 특정 앱의 FCM 토픽 데이터 조회
router.get('/app/:app_id', async (req, res) => {
  const { app_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM app_fcm_topic WHERE app_id = $1 ORDER BY position',
      [app_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: FCM 토픽 데이터 업데이트
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    app_id,
    title,
    fcm_topic,
    type,
    translation_title_json,
    position
  } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE app_fcm_topic 
       SET app_id = $1, title = $2, fcm_topic = $3,
           type = $4, translation_title_json = $5, position = $6
       WHERE id = $7 RETURNING *`,
      [app_id, title, fcm_topic, type,
       JSON.stringify(translation_title_json), position, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 FCM 토픽을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: FCM 토픽 데이터 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM app_fcm_topic WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '해당 FCM 토픽을 찾을 수 없습니다.' });
    }

    res.json({ message: 'FCM 토픽이 성공적으로 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
