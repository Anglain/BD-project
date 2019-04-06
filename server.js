let express = require('express');
let app = express();
let mysql = require('mysql');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

const PORT = 8080;

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'vosUser',
    password : 'vosMysql!1',
    database : 'booksVOS'
});

connection.connect();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());

app.listen(PORT);
console.log('App listening on port ' + PORT);