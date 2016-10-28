'use strict';

var app = angular.module('myApp', []);

app.controller('personController', ['$scope', 'personFactory', function ($scope, personFactory) {
        var self = this;
        self.names = [
            {name: 'John, Doe'},
            {name: 'Anders, Matthesen'},
            {name: 'Mick, Øgendahl'},
            {name: 'Rune, Klan'}
        ];

        self.titleCase = function (input) {
            return personFactory.titleCase(input);
        };
        self.camelCase = function (input) {
            return personFactory.camelCase(input);
        };
        self.dashCase = function (input) {
            return personFactory.dashCase(input);
        };
    }]);



app.filter('nameFilter', function ($filter) {
    return function (input) {
        var nameStr = input.split(',').reverse().join(', ');
        return nameStr;
    };
});

app.directive('personDirective', function () {
    return {
        restrict: 'AE',
        templateUrl: 'login-form.html',
        controller: 'personController'
    };
});

app.factory('personFactory', function () {
    var factory = {};

    factory.titleCase = function (input) {
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    factory.camelCase = function (input) {
        return input
                .replace(/\s(.)/g, function ($1) {
                    return $1.toUpperCase();
                })
                .replace(/\s/g, '')
                .replace(/^(.)/, function ($1) {
                    return $1.toLowerCase();
                });
    };

    factory.dashCase = function (input) {
        return input.toLowerCase().replace(/ /g, "-");
    };

    return factory;
});

