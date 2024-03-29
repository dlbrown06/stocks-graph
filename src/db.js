const fs = require("fs");
const { Pool } = require("pg");

// pools will use environment variables
// for connection information
const pool = new Pool();

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
