const angular = require('angular');

let libraryDB = angular.module('libraryDB',[]);

function mainController($scope, $http)
{
    $scope.formData = {};

    $http.get('/library/books')
        .success(function(data)
        {
            $scope.books = data;
            console.log(data);
        })
        .error(function(data)
        {
            console.log('Error: ' + data);
        });

    $scope.createBook = function ()
    {
        $http.post('/library/books', $scope.formData)
            .success(function(data)
            {
                $scope.formData = {};
                $scope.books = data;
                console.log(data);
            })
            .error(function(data)
            {
                console.log('Error: ' + data);
            });
    }

    $scope.deleteBook = function(id)
    {
        $http.delete('/library/books/' + id)
            .success(function(data)
            {
                $scope.books = data;
                console.log(data);
            })
            .error(function(data)
            {
                console.log('Error: ' + data);
            });
    }
}