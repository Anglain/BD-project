// ============ Routes ============

module.exports = function(app)
{
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
        let createBookQuery = `INSERT INTO BOOKS VALUES (${req.params.UDK_cypher},\
                                                         ${req.params.BBK_cypher},\
                                                         ${req.params.Book_name},\
                                                         ${req.params.C_Category_name});`;

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
        res.sendFile('./public/index.html');
    });
};