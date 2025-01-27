const express = require('express');
// 중복된 cors 설정 제거하고 한 줄로 정리
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const appRoutes = require('./routes/app');
const menuRoutes = require('./routes/menu');
const toolbarRoutes = require('./routes/app_toolbar');
const styleRoutes = require('./routes/app_style');
const fcmTopicRoutes = require('./routes/app_fcm_topic');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: '*', // 모든 도메인에서의 요청 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'] // 허용할 헤더
}));
app.use(bodyParser.json());

// Routes
app.use('/api/app', appRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/toolbar', toolbarRoutes);
app.use('/api/style', styleRoutes);
app.use('/api/fcm_topic', fcmTopicRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
