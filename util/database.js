const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDEFAULTDATABASE,
    password: process.env.MYSQLPASSWORD,
    waitForConnections: true,
});

module.exports = pool.promise();
