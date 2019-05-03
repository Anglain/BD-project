
// =========== Constants ===========
const express = require('express');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = 8080;

// ========== Connection to the database ==========
let databaseConnection = mysql.createConnection({
    host : 'localhost',
    user : 'libDBuser',
    password : 'libDBpassword&7',
    database : 'libraryDB'
});

databaseConnection.connect();

// ========== Configure some modules ==========
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());

require('./app/routes')(app, databaseConnection);

// ========== Launch server ==========
app.listen(PORT);
console.log('App listening on port ' + PORT);