const config = require("./config");
const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname,
})

module.exports = pool