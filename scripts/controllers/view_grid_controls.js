'use strict';

var ViewCtrl = angularApp.controller('ViewGridCtrlsCtrl', function ($location,$route,  $scope, FormService, $routeParams, Api, $timeout) {

  $scope.goTo = function(_id){

    $location.path('/user').search({id: _id});
    $route.reload();
  };
});
