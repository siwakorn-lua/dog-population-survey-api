const config = require("./config");
const mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: config.dbhost || 'localhost',
//   user: config.dbuser || 'root',
//   password: config.dbpassword || '123456',
//   database: config.dbname || 'doggy',
//   insecureAuth: true
// })
// connection.connect(function(err){
//   if(err) throw err
//   console.log("connected to mysql.")
// })
// module.exports = connection

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbhost || 'localhost',
  user: config.dbuser || 'root',
  password: config.dbpassword || '123456',
  database: config.dbname || 'doggy',
})

module.exports = pool