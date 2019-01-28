const config = require("./config.json");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: config.dbhost || 'localhost',
  user: config.dbuser || 'root',
  password: config.dbpassword || '123456',
  database: config.dbname || 'doggy',
  insecureAuth: true
})
connection.connect(function(err){
  if(err) throw err
  console.log("connected to mysql.")
})
module.exports = connection