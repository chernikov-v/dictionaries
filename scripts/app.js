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
        .when('/grid-scroll', {
        templateUrl: 'views/grid-scroll.html',
        controller: 'ViewGridCtrl'
        })
        .when('/list', {
          templateUrl: 'views/list.html'
        })
      .when('/hierarchy', {
          template: '<hierarchy-grid></hierarchy-grid>'
        })
        .when('/aggregates', {
          template: '<aggregates-grid></aggregates-grid>'
        })
        .when('/frozen', {
          template: '<frozen-grid></frozen-grid>'
        })
        .when('/image', {
          template: '<image-grid></image-grid>'
        })
        .when('/signalr', {
          template: '<signalr-grid></signalr-grid>'
        })
        .when('/multicolumn', {
          template: '<multicolumn-grid></multicolumn-grid>'
        })
        .when('/batchediting', {
          template: '<batchediting-grid></batchediting-grid>'
        })
        .when('/detailtemlate', {
          template: '<detailtemlate-grid></detailtemlate-grid>'
        })
        .when('/toolbartemplate', {
          template: '<toolbartemplate-grid></toolbartemplate-grid>'
        })
        .otherwise({
            redirectTo: '/grid'
        });

}).run(['$rootScope',  function() {}]);


