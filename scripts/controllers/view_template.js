'use strict';

var ViewCtrl = angularApp.controller('ViewTemplateCtrl', function ($rootScope, $scope, FormService, $routeParams, Api, $timeout) {

console.log($routeParams);
  $scope.form = {};
  $rootScope.hideForm = true;

  if(typeof $routeParams.id != 'undefined'){
    Api.getControl($scope.form, $routeParams.id);
  }
});
