var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'static/partials/main.html',
        controller: 'mainController'
    })
    .when('/new', {
            templateUrl: 'static/partials/newUser.html',
            controller: 'newUserController'
        })
    .when('/dashboard', {
        templateUrl: 'static/partials/dashboard.html',
        controller: 'dashboardController'
    })
})
