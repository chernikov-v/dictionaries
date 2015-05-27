'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['kendo.directives','ui.bootstrap','ngResource', 'mgcrea.ngStrap', 'ngRoute', 'DWand.nw-fileDialog','ngUnderscore'])

.config(function ($routeProvider, $datepickerProvider) {

    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1
    });

    $routeProvider

      /*dictionary*/
      .when('/dictionary-grid', {
        templateUrl: 'views/dictionary-grid.html',
        controller: function($scope, $location, $route){
          $scope.goTo = function(_id){
            $location.path('/user').search({id: _id});
            $route.reload();
          };
        }
      })
      .when('/dictionary-form', {
        template: '<form-directive-dictionary></form-directive-dictionary>',
        controller: function($rootScope, $routeParams,$scope, $http, Api){
          //$scope.form = {};


          /*$rootScope.hideForm = true;

          if($routeParams.id){
            console.log($routeParams);
            Api.getDictionary($scope.form, $routeParams.id);

          }else if($routeParams.add){
            console.log($routeParams);
            Api.addDictionary($scope.form);

          }*/
        }

      })

      /*test grids*/

        .otherwise({
            redirectTo: '/dictionary-grid'
        });

}).run(['$rootScope',  function() {}]);


