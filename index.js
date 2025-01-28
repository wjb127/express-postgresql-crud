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
  origin: '*',  // 모든 출처 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // 추가
}));
app.use(bodyParser.json());

// Routes
app.use('/api/app', appRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/toolbar', toolbarRoutes);
app.use('/api/style', styleRoutes);
app.use('/api/fcm_topic', fcmTopicRoutes);

// Start server - '0.0.0.0'으로 변경하여 모든 네트워크 인터페이스에서 접근 가능하도록 설정
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
