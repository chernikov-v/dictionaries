'use strict';

var ViewCtrl = angularApp.controller('ViewUserCtrl', function ($scope, FormService, $routeParams, $http, $q, $resource) {
    $scope.form = {};
	// read form with given id
	FormService.form($routeParams.id).then(function(form) {
		$scope.form = form;
	});

  $scope.creatUser = function(){

    //var api = $resource('http://localhost:3000/db',{}, {
    var api = $resource('http://54.93.177.90/BeProductMVC/api/Forms',{}, {
    //var api = $resource('http://84.43.208.93/BeProductMVC/api/Forms',{}, {
      get: {
        method: 'GET'/*,
        /*headers: {
          'Content-Type': 'application/json'
        }*/
      }
    });
    api.get(function(data){
      console.log('data', data);
      $scope.form = data;
    },function(error){
      console.log('error', error);
    });
  };

  $scope.editUser = function(){
    var id = prompt('Enter Existing User ID: ');
    console.log('ID - ', id);
    if(id != null || id != ''){
      //var api = $resource('http://84.43.208.93/BeProductMVC/api/Forms/' + id,{}, {
      var api = $resource('http://54.93.177.90/BeProductMVC/api/Forms' + id,{}, {
        get: {
          method: 'GET'
        }
      });

      api.get(function(data){
        console.log('data - ', data);
        $scope.form = data;
      },function(error){
        console.log('error - ', error);
      });
    }

  };

  $scope.sendForm = function(){
    alert('send');
  }

});
