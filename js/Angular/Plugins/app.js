'use strict';

angular.module('Sort', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularFileUpload'
])

.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/Pages/urerslist.html',
        controller: 'Companyctrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
