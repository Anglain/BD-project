// ============ Routes ============

module.exports = function(app, databaseConnection)
{
    /*
    * ==============================
    * |       Help functions       |
    * ==============================
    * */

    function getRandomidentifier()
    {
        return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
    }

    /*
    * ==============================
    * |        Route names         |
    * ==============================
    * */

    let bookRoute = '/library/books';
    let categoryRoute = '/library/categories';
    let librarianRoute = '/library/librarians';
    let departmentRoute = '/library/deps';
    let readerRoute = '/library/readers';
    let bookInstanceRoute = '/library/book_instances';
    let authorRoute = '/library/authors';
    let logbookRoute = '/library/logbook';

    /*
    * =======================================================
    * |                    AUTHOR                           |
    * =======================================================
    * */

    app.get(authorRoute, function (req, res)
    {
        let getAuthorsQuery = `SELECT * FROM AUTHOR;`;

        databaseConnection.query(getAuthorsQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${authorRoute} SELECT all authors query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.post(authorRoute, function (req, res)
    {
        let authorCodes = [];
        databaseConnection.query(`SELECT A_code FROM AUTHOR;`, function (err, result)
        {
            if (!err) authorCodes = result;
        });

        console.log(authorCodes);

        let a_code = 0;
        let unique = false;
        while (!unique)
        {
            a_code = getRandomidentifier();
            unique = !authorCodes.some(item => item.A_code == a_code);
            console.log("Author code " + a_code + " is unique: " + unique);
        }

        let addAuthorQuery = `INSERT INTO AUTHOR VALUES ('${a_code}',\
                                                         '${req.body.a_name}',\
                                                         '${req.body.a_birth_date}',\
                                                         '${req.body.a_nickname}');`;

        databaseConnection.query(addAuthorQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${authorRoute} INSERT one author query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.put(authorRoute, function (req, res)
    {
        let updateAuthorQuery = `UPDATE AUTHOR SET A_name='${req.body.a_name}', A_birth_date='${req.body.a_birth_date}', Auth_nickname='${req.body.a_nickname}' WHERE A_code='${req.body.a_code}';`;

        databaseConnection.query(updateAuthorQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${authorRoute} UPDATE an author query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.delete(authorRoute, function (req, res)
    {
        let deleteAuthorQuery = `DELETE FROM AUTHOR WHERE A_code='${req.body.a_code}';`;

        databaseConnection.query(deleteAuthorQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${authorRoute} DELETE an author query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    /*
    * =======================================================
    * |                     BOOKS                           |
    * =======================================================
    * */


    app.get(bookRoute, function(req, res)
    {
        let getBooksQuery = `SELECT * FROM BOOK;`;

        databaseConnection.query(getBooksQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookRoute} SELECT all books query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.post(bookRoute, function(req, res)
    {
        let createBookQuery = `INSERT INTO BOOK VALUES (${req.params.UDK_cypher},\
                                                         ${req.params.BBK_cypher},\
                                                         ${req.params.Book_name},\
                                                         ${req.params.C_Category_name});`;

        databaseConnection.query(createBookQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookRoute} INSERT a book query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.delete(bookRoute, function(req, res)
    {
        let dropBookQuery = `DELETE FROM BOOK WHERE UDK_cypher=${req.params.UDK_cypher};`;

        databaseConnection.query(dropBookQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookRoute} DELETE book query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    /*
    * ================================================
    * |               BOOK_INSTANCES                 |
    * ================================================
    * */
    app.get(bookInstanceRoute, function (req, res)
    {
        let getBookInstancesQuery = `SELECT * FROM BOOK_INSTANCE`;

        databaseConnection.query(getBookInstancesQuery, function (err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookInstanceRoute} SELECT book instances query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    app.post(bookInstanceRoute, function (req, res)
    {
        let createBookInstance = `INSERT INTO BOOK_INSTANCE VALUES ('${req.body.Inv_num}','${req.body.Publ_year}', '${req.body.Language}' , null, null, 'true', \
                                                                    '${req.body.B_UDK_cypher}', '${req.body.D_Dep_name}', '${req.body.D_place}');`;

        databaseConnection.query(createBookInstance, function (err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookInstanceRoute} INSERT book instance query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    app.delete(bookInstanceRoute, function (req, res)
    {
        let deleteBookInstance = `DELETE FROM BOOK_INSTANCE WHERE Inv_num='${req.body.Inv_num}';`;

        databaseConnection.query(deleteBookInstance, function (err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${bookInstanceRoute} DELETE book instance query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    /*
    * =======================================================
    * |                   CATEGORIES                        |
    * =======================================================
    * */
    app.get(categoryRoute, function(req, res)
    {
        let getCategoriesQuery = `SELECT * FROM CATEGORY;`;

        databaseConnection.query(getCategoriesQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${categoryRoute} SELECT all categories query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.post(categoryRoute, function(req, res)
    {
        let createCategoryQuery = `INSERT INTO CATEGORY(Category_name) VALUES ('${req.body.categoryName}');`;

        databaseConnection.query(createCategoryQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${categoryRoute} INSERT new category query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.put(categoryRoute, function(req, res)
    {
        let updCategoryQuery = `UPDATE CATEGORY SET Category_name = '${req.body.newName}' WHERE Category_name = '${req.body.oldName}'`;

        databaseConnection.query(updCategoryQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${categoryRoute} UPDATE category query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.delete(categoryRoute, function(req, res)
    {
        let deleteCategoryQuery = `DELETE FROM CATEGORY WHERE Category_name='${req.body.categoryName}';`;

        databaseConnection.query(deleteCategoryQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            console.log(`${categoryRoute} DELETE a category query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    /*
    * ===================================================
    * |                   LIBRARIANS                    |
    * ===================================================
    * */
    app.get(librarianRoute, function (req, res)
    {
        let getLibrariansQuery = `SELECT * FROM LIBRARIAN;`;

        let librarianTabNums = {};
        databaseConnection.query(`SELECT Tab_num FROM LIBRARIAN;`, function(err, result)
        {
            if (!err) librarianTabNums = result;
        });

        let librarians = {}, librarianPhones = {}, librarianEmails = {};
        databaseConnection.query(getLibrariansQuery, function(err, result, fields)
        {
            if (err)
            {
                console.log("Error: " + JSON.stringify(err));
            }

            librarians = result;

            console.log(`${librarianRoute} SELECT all librarians query executed: ${JSON.stringify(librarians)}`);
        });


        databaseConnection.query(`SELECT * FROM LIBRARIAN_PHONE;`, function(err, result)
        {
            librarianPhones = result;
        });
        databaseConnection.query(`SELECT * FROM LIBRARIAN_EMAIL;`, function(err, result)
        {
            librarianEmails = result;

            res.status(200).send(`All clear!\nResult: ${JSON.stringify(librarians)}\nLibrarian tab nums: ${JSON.stringify(librarianTabNums)}\nLibrarian phones: ${JSON.stringify(librarianPhones)}\nLibrarian emails: ${JSON.stringify(librarianEmails)}`);
        });
    });

    app.post(librarianRoute, function (req, res)
    {
        let librarianTabNums = [];
        databaseConnection.query(`SELECT Tab_num FROM LIBRARIAN;`, function(err, result)
        {
            if (!err) librarianTabNums = result;
        });

        console.log(librarianTabNums);

        let tab_num = 0;
        let unique = false;
        while (!unique)
        {
            tab_num = getRandomidentifier();
            unique = !librarianTabNums.some(item => item.Tab_num == tab_num);
            console.log("Tab num " + tab_num + " is unique: " + unique);
        }

        let createLibrarianQuery = `INSERT INTO LIBRARIAN VALUES ('${tab_num}',\
                                                                  '${req.body.librarian.surname}',\
                                                                  '${req.body.librarian.name}',\
                                                                  '${req.body.librarian.middleName}');`;

        databaseConnection.query(createLibrarianQuery, function(err, result, fields)
        {
            if (err) console.log(JSON.stringify(err));

            console.log(`${librarianRoute} INSERT a librarian query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });

        for (let i = 0; i < req.body.librarian.phoneNumbers.length; ++i)
        {
            databaseConnection.query(`INSERT INTO LIBRARIAN_PHONE VALUES ('${req.body.librarian.phoneNumbers[i]}', '${tab_num}');`, function (err, result)
            {
                if (err) console.log("Error: " + JSON.stringify(err));
            });
        }

        for (let i = 0; i < req.body.librarian.emails.length; ++i)
        {
            databaseConnection.query(`INSERT INTO LIBRARIAN_EMAIL VALUES ('${req.body.librarian.emails[i]}', '${tab_num}');`, function (err, result)
            {
                if (err) console.log("Error: " + JSON.stringify(err));
            });
        }
    });

    app.put(librarianRoute, function (req, res)
    {
        let newLibr = req.body.librarian;

        let updateLibrarianQuery = `UPDATE LIBRARIAN SET L_Surname='${newLibr.surname}', L_Name='${newLibr.name}', L_Middle_name='${newLibr.middleName}' WHERE Tab_num='${newLibr.tab_num}';`;

        databaseConnection.query(updateLibrarianQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${librarianRoute} UPDATE a librarian query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    app.delete(librarianRoute, function (req, res)
    {
        let deleteLibrarianQuery = `DELETE FROM LIBRARIAN WHERE Tab_num='${req.body.tab_num}'`;

        databaseConnection.query(deleteLibrarianQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${librarianRoute} DELETE a librarian query executed: ${JSON.stringify(result)}`);

            res.status(200).send(result);
        });
    });

    /*
    * ===================================================
    * |                   DEPARTMENTS                   |
    * ===================================================
    * */
    app.get(departmentRoute, function (req, res)
    {
        let selectDepartmentsQuery = `SELECT * FROM DEPARTMENT;`;

        databaseConnection.query(selectDepartmentsQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${departmentRoute} SELECT all departments query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    app.post(departmentRoute, function (req, res)
    {
        let addNewDepartmentQuery = `INSERT INTO DEPARTMENT VALUES ('${req.body.depName}', '${req.body.tab_num}');`;

        databaseConnection.query(addNewDepartmentQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${departmentRoute} INSERT new department query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    app.put(departmentRoute, function(req, res)
    {
        let updateDepartmentQuery = `UPDATE DEPARTMENT SET Dep_name='${req.body.newDepName}',L_Tab_num='${req.body.tab_num}' WHERE Dep_name='${req.body.oldDepName}';`;

        databaseConnection.query(updateDepartmentQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${departmentRoute} UPDATE a department query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    app.delete(departmentRoute, function(req,res)
    {
        let deleteDepartmentQuery = `DELETE FROM DEPARTMENT WHERE Dep_name='${req.body.depName}';`;

        databaseConnection.query(deleteDepartmentQuery, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`${departmentRoute} DELETE a department query executed: ${JSON.stringify(result)}`);
            res.status(200).send(result);
        });
    });

    /*
    * ===================================================
    * |                      QUERIES                    |
    * ===================================================
    * */
    app.get('library/query1', function (req, res)
    {
        let query1 = `SELECT BOOK.UDK_cypher, BOOK.BBK_cypher, BOOK.Book_name, BOOK.C_Category_name \
                      FROM BOOK INNER JOIN BOOK_INSTANCE ON BOOK_INSTANCE.B_UDK_cypher = BOOK.UDK_cypher \
                      WHERE BOOK_INSTANCE.Is_available = 'true' \
                      GROUP BY BOOK.UDK_cypher, BOOK.BBK_cypher, BOOK.Book_name, BOOK.C_Category_name`;

        databaseConnection.query(query1, function (err, result, fields)
        {
            if (err) console.log("Error: " + JSON.stringify(err));

            console.log(`/library/query1 executed query #1: ${JSON.stringify(result)}`);
            res.send(200).send(result);
        });
    });

    // ============ Application ============

    /*app.get('*', function(req, res)
    {
        res.sendFile(__directory + '/public/index.html');
    });*/
};