'use strict';

async function main() {
    const mysql = require('mysql2');

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });

    const promisePool = pool.promise();

    pool.on('error', function(err){
        console.log(err);
    })

    const [rows, fields] = await promisePool.query("select 1");

    console.log(rows, fields);
}
main();