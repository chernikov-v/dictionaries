'use strict';

var ViewCtrl = angularApp.controller('ViewUserCtrl', function ($scope, FormService, $routeParams, Api, $timeout) {
    $scope.form = {};
	// read form with given id
	FormService.form($routeParams.id).then(function(form) {
		$scope.form = form;
	});

  $scope.creatUser = function(){
    Api.get($scope.form);
    console.log('$scope.form - ', $scope.form);
    $timeout(function(){
      console.log('$scope.form - ', $scope.form);
    }, 5000);
    console.log('$scope.form - ', $scope.form);
  };

  $scope.editUser = function(){
    var id = prompt('Enter Existing User ID: ');
    console.log('ID - ', id);
    Api.get($scope.form,id);

  };

  $scope.sendForm = function(){
    alert('send');
  }

});
