'use strict';

var ViewCtrl = angularApp.controller('ViewUserCtrl', function ($scope, FormService, $routeParams, Api, $timeout) {
  $scope.form = {};
  // read form with given id
  FormService.form($routeParams.id).then(function (form) {
    $scope.form = form;
  });

  $scope.creatUser = function () {
    Api.get($scope.form);
    console.log('$scope.form - ', $scope.form);
    $timeout(function () {
      console.log('$scope.form - ', $scope.form);
    }, 5000);
    console.log('$scope.form - ', $scope.form);
    $scope.form.submitted = false;
  };

  $scope.editUser = function () {
    var id = prompt('Enter Existing User ID: ');
    console.log('ID - ', id);
    Api.get($scope.form, id);
    $scope.form.submitted = false;

  };

  $scope.sendForm = function () {
    alert('send');
  };

  $scope.gridOptions = {
    height: 300
  };
  $scope.userDataSource = new kendo.data.DataSource({
    transport: {
      read: function (options) {
            $.ajax({
              url: "users_grid.json",
              data: {
                models: kendo.stringify(options.data)
              },
              success: function (result) {
                var arr = [];
                arr = result.data;
                arr['schema']  = result.schema;
                arr['columns'] = result.columns;
                options.success(arr);
              },
              error: function (result) {
                options.error(result);
              }
            })
      }
    },
    schema: {
      parse: function(response){
        console.log('~~~~~~~~~~~', response);
        $scope.usersColumns = response.columns;
        return response;
      }
    }/*,
    schema: {
      "user_id": {
        "type": "id"
      },
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "birth_date": {
        "type": "string"
      },
      "user_browser": {
        "type": "string"
      },
      "add_comments": {
        "type": "string"
      }
    }*/,
    pageSize: 8
  });

  //$scope.gridOptions.dataSource = $scope.data;
  $scope.userDataSource.fetch(function(){
    console.log(this);
  });

});









/* editable: "incell",
 edit: function(e) {
 console.log(e);
 },
 save: function (e) {
 console.log('save - ', e);
 },
 cancel: function (e) {
 console.log('cancel - ', e);
 },
 canceledit: function (e) {
 console.log('canceledit - ', e);
 },
 remove: function (e) {
 console.log('cancel - ', e);
 },
 change: function (e) {
 console.log('change - ', e);
 },
 edit: function (e) {
 console.log('edit - ', e);
 },
 saveChanges: function (e) {
 console.log('saveChanges - ', e);
 },
 dataBinding: function (e) {
 console.log('dataBinding - ', e);
 },
 update: function (e) {
 console.log('update - ', e);
 },
 filterable: true,
 sortable: true,
 pageable: true,
 selectable: "row",
 toolbar: ["create", "save", "cancel"],*/