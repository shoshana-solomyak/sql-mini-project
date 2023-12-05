const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path')

const tables = ['school.json', 'teacher.json', 'classroom.json', 'admin.json', 'student.json'];

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "schoolData"
});

con.connect(async function(err) {
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
        // console.log("data:" + data);
        tableToCreate = await JSON.parse(data);
        let columns = '';
        
        for (let column in tableToCreate) {
        if(Object.keys(tableToCreate)[Object.keys(tableToCreate).length - 1] == column) {
            columns += `${column} ${tableToCreate[column]}`
        }
        else {
            columns += `${column} ${tableToCreate[column]}, `
        }
    }
    
    console.log('COLUMNS:', columns)

    const tableName = tableObj.split('.')[0];
    
    con.query(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
        if (err) throw err;
    })       

    // await executeQuery(`CREATE TABLE ${tableName} (${columns})`)

    con.query(`CREATE TABLE ${tableName} (${columns})`, function (err) {
        if (err) throw err;
        console.log("Table created", tableName);
    });


})
}

// function executeQuery(sql, values=[]){
//     return new Promise((resolve, reject)=>{
//         con.query(sql,values, function (err, result) {
//             if (err) throw err;
//             else {
//                 resolve(result);
//                 console.log("Table created");
//             }
//         });
//     })

// }




app.listen(8080, () => {
    console.log('server running on 8080');
});
