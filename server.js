
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

// ============ Routes ============

app.get('/library/books', function(req, res)
{
    databaseConnection.query("SELECT * FROM BOOKS;", function(err, result, fields)
    {
        if (err)
            throw err;
        console.log("/library/books get all books query executed: " + result);
    });
});

app.post('/library/books', function(req, res)
{
    let createBookQuery = "INSERT INTO BOOKS VALUES (" + req.params.UDK_cypher + ", " +
                                                         req.params.BBK_cypher + ", " +
                                                         req.params.Book_name + ", " +
                                                         req.params.C_Category_name  + ");";

    databaseConnection.query(createBookQuery, function(err, result, fields)
    {
        if (err)
            throw err;
        console.log("/library/books POST add a book query executed: " + result);
    });
});

app.delete('/library/books/:UDK_cypher', function(req, res)
{
    let dropBookQuery = "";

    databaseConnection.query(dropBookQuery, function(err, result, fields)
    {
        if (err)
            throw err;
        console.log("/library/books/:UDK_cypher DELETE remove a book query executed: " + result);
    });
});

// ============ Application ============
app.get('*', function(req, res)
{
    res.sendfile('./public/index.html'); // Angular does everything else
});

// ========== Configure some modules ==========
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());

// ========== Launch server ==========
app.listen(PORT);
console.log('App listening on port ' + PORT);