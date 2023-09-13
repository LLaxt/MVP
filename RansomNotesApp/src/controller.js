const pool = require('../db/db');

const FIRSTQUERY = async (req, res) => {
  res.send('Game data!');
};
/*
Queries needed:
CREATE ROOM CODE
*/

module.exports = {
  FIRSTQUERY,
};