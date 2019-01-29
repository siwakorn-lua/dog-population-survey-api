const config = require("./config");
const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbhost || 'localhost',
  user: config.dbuser || 'root',
  password: config.dbpassword || '123456',
  database: config.dbname || 'doggy',
})

module.exports = pool