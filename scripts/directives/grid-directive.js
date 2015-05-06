'use strict';


angularApp.directive('usersGrid', function ($http, $location, $timeout) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      //$http.get('server_columns.json').success(function(response){
      //$http.get('v.json').success(function(response){
      $http.get('http://mvc.gloria-jeans-portal.com/api/forms?schema&columns').success(function (response) {
        console.log('columns cshema - ', response);
        $scope.columns = response.shcema;
        $scope.columns.push(editColumn);

        $scope.gridOptions = {
          dataSource: {
            transport: {
              //read: 'http://mvc.gloria-jeans-portal.com/api/forms?data'
              //read: "users_grid.json"
              read: function (options) {
                $timeout(function () {
                  $.ajax({ url: "http://mvc.gloria-jeans-portal.com/api/forms?data",
                    data: {
                      models: kendo.stringify(options.data)
                    },
                    success: function (result) {
                      options.success(result);
                    }
                  })
                }, 2000);
              }

            },
            pageSize: 5
          },
          height: 500,
          pageable: true,
          resizable: true,
          columns: $scope.columns,
          reorderable: true,
          columnReorder: function (e) {
            console.log(e);
          }
        };

        $element.html("<div id='myGrid'></div>");
        $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions);

      });

      var editColumn = {
        command: [{
          name: "Edit User",
          click: function (e) {
            e.preventDefault();
            var data = this.dataItem($(e.target).closest("tr"));
            console.log("User Id: ", data.id);
            $scope.onEdit(data.id);
          }
        }]
      };


    }
  }
});
