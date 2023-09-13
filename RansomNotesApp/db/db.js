const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  db: process.env.DB,
  password: process.env.PASSWORD,
});

