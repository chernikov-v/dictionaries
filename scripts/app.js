'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', 'mgcrea.ngStrap', 'ngRoute', 'DWand.nw-fileDialog'])
//var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', '$strap.directives','ngRoute'])

.config(function ($routeProvider, $datepickerProvider) {

    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1,

    });


    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/forms/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateCtrl'
        })
        .when('/forms/:id/view', {
            templateUrl: 'views/view.html',
            controller: 'ViewCtrl'
        })
        .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'ViewUserCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

}).run(['$rootScope',  function() {}]);


