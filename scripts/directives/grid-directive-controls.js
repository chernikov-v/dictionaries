'use strict';


angularApp.directive('usersGridControls', function ($http, $route, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      //$http.get(Api.urls.gridConfig).success(function (response) {
      //$http.get("https://gist.githubusercontent.com/chernikov-v/d6edbf938e23218d75c4/raw/43ad6e337befddb73aae9bc3c57b23636839a1b0/Controls-data.json").success(function (response) {
      $http.get("http://mvc.gloria-jeans-portal.com/api/template/view/b259b51b-fcda-4cdd-8542-552d8af8ba97").success(function (response) {

        //$scope.columns = response.columns;
        $scope.columns = [
          { "title": "FIELD NAME", "field": "properties.fieldName" },
          { "title": "FIELD LABLE", "field": "properties.fieldLabel" },
          { "title": "DATA TYPE", "field": "controlType" },
          { "title": "CONTROL TYPE", "field": "properties.dataType", "values": [
            { "text": "VALUE 0",  "value": 0 },
            { "text": "VALUE 1",  "value": 1 },
            { "text": "VALUE 2",  "value": 2 },
            { "text": "VALUE 3",  "value": 3 }
          ]
          }
        ];
        $scope.data = response;

        $scope.gridOptions = {
          dataSource: new kendo.data.DataSource({
            data: $scope.data,
            pageSize: 5
          }),
          selectable: "row",
          columns: $scope.columns,
          change: function(e){
            var data = this.dataItem(this.select());

            $location.path('/controls-form').search({id: data.id});
            $route.reload();

          }
        };
        createGrid();
      });

      var createGrid = function () {
        var grid = $("#myGrid");
        if (grid.data("kendoGrid")) {
          grid.data("kendoGrid").destroy();
          grid.empty();
        } else {
          $element.html("<div id='myGrid'></div>");
        }
        $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions).data("kendoGrid");
      };

    }
  }
});
