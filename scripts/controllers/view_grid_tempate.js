'use strict';

var ViewCtrl = angularApp.controller('ViewGridTemplateCtrl', function ($location,$route,  $scope) {

  $scope.goTo = function(_id){

    $location.path('/user').search({id: _id});
    $route.reload();

  };
});
