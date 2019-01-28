// const config = require("./config.json");
// const mysql = require("mysql");

// module.exports = {
//   pool: mysql.createPool({
// host: config.dbhost || "localhost",
// user: config.dbusername || "root",
// password: config.dbpassword || "123456",
// database: config.dbname || "doggy",
// insecureAuth: true
//   })
// };

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'doggy',
  insecureAuth: true
})
connection.connect(function(err){
  if(err) throw err
  console.log("connected to mysql.")
})
module.exports = connection