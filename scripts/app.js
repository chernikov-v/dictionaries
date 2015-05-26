'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['kendo.directives','ui.bootstrap','ngResource', 'mgcrea.ngStrap', 'ngRoute', 'DWand.nw-fileDialog','ngUnderscore'])

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

      /*template*/
      .when('/template-grid', {
        templateUrl: 'views/template-grid.html',
        controller: 'ViewGridTemplateCtrl'
      })
      .when('/template-form', {
        template: '<form-directive-template form="form"></form-directive-template>',
        controller: 'ViewTemplateCtrl'
      })

      /*dictionary*/
      .when('/dictionary-grid', {
        templateUrl: 'views/dictionary-grid.html',
        controller: 'ViewGridTemplateCtrl'
      })
      .when('/dictionary-form', {
        template: '<form-directive-dictionary form="form"></form-directive-dictionary>',
        controller: function($rootScope, $routeParams,$scope, Api){
          $scope.form = {};
          $rootScope.hideForm = true;

          if($routeParams.id){
            console.log($routeParams);
            Api.getDictionary($scope.form, $routeParams.id);

          }else if($routeParams.add){
            console.log($routeParams);
            Api.addDictionary($scope.form);

          }
        }
        //controller: 'ViewTemplateCtrl'
        //controller: 'ViewDictionaryCtrl'
      })

      /*test grids*/
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


