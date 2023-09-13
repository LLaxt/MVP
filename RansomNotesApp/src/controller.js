const pool = require('../db/db');

const FIRSTQUERY = async (req, res) => {
  res.send('Game data!');
}

module.exports = {
  FIRSTQUERY,
};