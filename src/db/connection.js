const mysql = require('mysql2');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'knjizara',
};

const connection = mysql.createConnection(config);

module.exports = {
    connection,
};
