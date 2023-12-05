const mysql = require("mysql");
const fs = require("fs");
const express = require("express");
const app = express();
// const router = express.Router()
const path = require("path");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "schoolData",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//adding admins

// con.query(
//   "INSERT INTO admin (name, password, school_id) VALUES ?",
//   [
//     [
//       ["shoshana", "123", 1],
//       ["shoham", "456", 2],
//     ],
//   ],
//   function (err, result) {
//     if (err) throw err;
//     console.log("admin inserted");
//   }
// );

// add school data to tables

function checkIfAdmin(userId) {
  con.query(`SELECT `);
}
app.use(express.json());

app.post(`/createSchool`, (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const schoolName = req.body.schoolName;
  const schoolCode = Math.floor(Math.random() * 98776543);
  // check if admin
  con.query(
    `select name, password from admin where name="${name}" and password ="${password}"`,
    function (err, result) {
      console.log(result);
      if (err) throw err;
      if (result.length !== 0) {
        console.log("you are admin");
        con.query(
          `insert into school (name ,school_code) values("${schoolName}","${schoolCode}")`
        ),
          function (err, result) {
            if (err) throw err;
            console.log("school created");
            res.send(result);
          };
      } else {
        res.send("you are not admin");
      }
      res.send("end");
    }
  );
});

app.post(`/addTeacher`, (req, res) => {
  console.log(req.body);
  const teacherName = req.body.teacherName;
  const password = req.body.password;
  const email = req.body.email;

  con.query(
    `INSERT INTO teacher (name, password, email) VALUES ("${teacherName}", "${password}", "${email}")`,
    function (err, result) {
      if (err) throw err;
      console.log("teacher was added");
      res.send(result);
    }
  );
});

app.post(`/addStudent`, (req, res) => {
  const studentName = req.body.studentName;
  const password = req.body.password;
  const classroomId = req.body.classroomId;

  con.query(
    `INSERT INTO student (name, password, classroom_id) VALUES ("${studentName}", "${password}", "${classroomId}")`,
    function (err, result) {
      if (err) throw err;
      console.log("student was added");
      res.send(result);
    }
  );
});

app.post(`/addClassroom`, (req, res) => {
  const grade = req.body.grade;
  const index = req.body.index;
  const teacherId = req.body.teacherId;

  con.query(
    `INSERT INTO classroom (grade, grade_index, teacher_id) VALUES ("${grade}", "${index}", "${teacherId}")`,
    function (err, result) {
      if (err) throw err;
      console.log("classroom was created");
      res.send(result);
    }
  );
});

app.listen(8080, () => {
  console.log(`listening on port 8080`);
});
