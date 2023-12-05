const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path')

const tables = ['school.json', 'student.json', 'teacher.json', 'admin.json', 'classroom.json'];

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "schoolData"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // createTable('teacher.json')
    for (let table of tables) {
        createTable(table);
    };
});

function createTable (tableObj) {
    let tableToCreate;
    fs.readFile(path.resolve(`./entities/${tableObj}`), 'utf8', async (err, data) => {
        console.log()
        if(err) {
            console.log("error:" + err);
        }
        console.log("data:" + data);
        tableToCreate = await JSON.parse(data);
        let columns = '';
        
        for (let column in tableToCreate) {
        if(column == 'id') {
            columns += `${column} ${tableToCreate[column]} PRIMARY KEY AUTO_INCREMENT, `
        } else if(Object.keys(tableToCreate)[Object.keys(tableToCreate).length - 1] == column) {
            columns += `${column} ${tableToCreate[column]}`
        }
        else {
            columns += `${column} ${tableToCreate[column]}, `
        }
    }
    
    console.log('COLUMNS:'+columns)

    const tableName = tableObj.split('.')[0];
    
    con.query(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
        if (err) throw err;
    })
    con.query(`CREATE TABLE ${tableName} (${columns})`, function (err) {
        if (err) throw err;
        console.log("Table created");
    });
})
}




app.listen(8080, () => {
    console.log('server running on 8080');
});
