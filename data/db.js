const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'federsa65',
    database: 'db_movie'
});

connection.connect((err) => {
    if (err) { console.log(err); }
    else {
        console.log('Connected to my SQL');
    }
})

module.exports = connection