'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "dev",
    password: "Object==0;",
    database: 'chat'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
