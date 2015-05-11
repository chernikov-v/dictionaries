'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['kendo.directives','ui.bootstrap','ngResource', 'mgcrea.ngStrap', 'ngRoute', 'DWand.nw-fileDialog'])
//var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', '$strap.directives','ngRoute'])

.config(function ($routeProvider, $datepickerProvider) {

    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1
    });


    $routeProvider
        .when('/main', {
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
        .when('/grid', {
        templateUrl: 'views/grid.html',
        controller: 'ViewGridCtrl'
        })
        .when('/hierarchy', {
          template: '<hierarchy-grid></hierarchy-grid>'
        })
      .when('/aggregates', {
        template: '<aggregates-grid></aggregates-grid>'
      })
        .otherwise({
            redirectTo: '/grid'
        });

}).run(['$rootScope',  function() {}]);


