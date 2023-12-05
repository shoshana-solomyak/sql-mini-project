var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "schoolData",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE schoolData", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

function createTable() {}
