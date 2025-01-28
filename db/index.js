const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'my_user',
  password: process.env.POSTGRES_PASSWORD ,
  host: process.env.POSTGRES_HOST || 'db',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'my_database'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
