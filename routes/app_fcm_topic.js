const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: FCM 토픽 데이터 추가
router.post('/', async (req, res) => {
  const { app_id, title, fcm_topic, type, translation_title_json, position } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO app_fcm_topic (app_id, title, fcm_topic, type, translation_title_json, position) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [app_id, title, fcm_topic, type, translation_title_json, position]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: 모든 FCM 토픽 데이터 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM app_fcm_topic`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
