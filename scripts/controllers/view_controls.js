'use strict';

var ViewCtrl = angularApp.controller('ViewControlsCtrl', function ($rootScope, $scope, FormService, $routeParams, Api, $timeout) {

console.log($routeParams);
  $scope.form = {};
  $rootScope.hideForm = true;
/*
  FormService.form($routeParams.id).then(function (form) {
    $scope.form = form;
  });
*/

  if(typeof $routeParams.id != 'undefined'){
    Api.getControl($scope.form, $routeParams.id);
    //$rootScope.hideForm = false;
  }

  /*$scope.creatUser = function () {
    Api.get($scope.form);
    $rootScope.hideForm = false;
  };

  $scope.editUser = function () {
    var id = prompt('Enter Existing User ID: ');
    Api.get($scope.form, id);
    $rootScope.hideForm = false;
  };
  $scope.editUserFromGrid = function(_id){

    Api.get($scope.form, _id);
    $rootScope.hideForm = false;
  };*/
});
