const mysql = require("mysql");
require('dotenv').config();


var connection = mysql.createConnection({
  host: process.env.DBHost,
  user: process.env.DBUser,
  password: process.env.DBpassword,
  database: process.env.DBName,
  port: process.env.DBPort
  



});


module.exports = connection;