'use strict';

var ViewCtrl = angularApp.controller('ViewUserCtrl', function ($scope, FormService, $routeParams, $http) {
    $scope.form = {};
	// read form with given id
	FormService.form($routeParams.id).then(function(form) {
		$scope.form = form;
	});

  $scope.creatUser = function(){
    $http.get('v.json').success(function(data){
    //$http.get('users_form.json').success(function(data){
      console.log(data);
      $scope.form = data;
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.editUser = function(){
   /* var id = prompt('Enter Existing User ID: ');
    console.log('ID - ', id);
    if(id == null || id == ''){

    }*/
  };


});
