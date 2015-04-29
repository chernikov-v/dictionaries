'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap','ngResource', 'mgcrea.ngStrap', 'ngRoute', 'DWand.nw-fileDialog'])
//var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', '$strap.directives','ngRoute'])

.config(function ($routeProvider, $datepickerProvider, $httpProvider,$sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      'http://dev.local/**',
      'http://54.93.177.90/**'
    ]);




/*

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
*/

    $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
  /*  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
     *//* var key, result = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
      }
      return result.join("&");*//*
      return angular.toJson(data);
    });*/



    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1

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


