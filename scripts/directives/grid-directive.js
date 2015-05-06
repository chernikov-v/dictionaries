'use strict';


angularApp.directive('usersGrid', function($http, $location){

    return {
      restrict: 'E',
      scope: {
         onEdit: '='
      },
      link: function ($scope, $element, $attrs, $controller){


          if(typeof val == 'undefined' || val == true){

            //$http.get('server_columns.json').success(function(response){
              $http.get('http://mvc.gloria-jeans-portal.com/api/forms?schema&columns').success(function(response){

              //console.log('columns cshema - ', response);
              $scope.columns = response;
              $scope.columns.push(editColumn);

              $scope.gridOptions = {
                dataSource: {
                  transport: {
                    read: 'http://mvc.gloria-jeans-portal.com/api/forms?data'
                    //read: "users_grid.json"

                  },
                  pageSize: 5
                },
                height: 500,
                pageable: true,
                columns: $scope.columns,
                reorderable: true,
                columnReorder: function (e) {
                  console.log(e);
                }
              };

              $element.html("<div id='myGrid'></div>");
              $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions);

            });
          }

      var editColumn = { command: [ {
        name: "Edit User",
        click: function(e) {
          e.preventDefault();
          var data = this.dataItem($(e.target).closest("tr"));
          console.log("User Id: ", data.id);
          $scope.onEdit(data.id);
        }

      }]};


    }
  }
});
