import mysql from 'mysql2/promise'

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database:'posdb'
});


export default mysqlPool;