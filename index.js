<<<<<<< HEAD
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
=======
const mysql = require('mysql');
const router = express.Router()
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "schoolData"
});

//adding admins

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// con.query("INSERT INTO admin (name, password, school_id) VALUES ?", [[['shoshana', '123', 1], ['shoham', '456', 2]]], function (err, result) {
//     if (err) throw err;
//     console.log("admin inserted");
// })

router.listen(8080, () => {
    console.log(`listening on port 8080`);
})
>>>>>>> f6d48644f93fe9d99b7ae6be798fc4f81ff08fc5
