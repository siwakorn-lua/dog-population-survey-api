const config = require('./config');
const mysql = require('mysql');

module.exports = { pool : mysql.createPool({
    host     : config.dbhost,
    user     : config.dbusername,
    password : config.dbpassword,
    database : config.dbname
  })};