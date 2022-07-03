var mysql = require("mysql");
require("dotenv").config();

const HOST = process.env.SQL_HOST;
const USER = process.env.SQL_USER;
const PASS = process.env.SQL_PASS;
const DB = process.env.SQL_DB;
const PORT = process.env.SQL_PORT;

var conn = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASS,
  database: DB,
  port: PORT,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is running");
});

module.exports = conn;
