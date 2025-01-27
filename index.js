const express = require('express');
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
