'use strict';


angularApp.directive('gridTemplate', function ($http, $route, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      $http.get("http://mvc.gloria-jeans-portal.com/api/templates/templatecontrols/b259b51b-fcda-4cdd-8542-552d8af8ba97").success(function (response) {

        $scope.columns = [
          {"title": "FIELD NAME", "field": "properties.fieldName"},
          {"title": "FIELD LABLE", "field": "properties.fieldLabel"},
          {"title": "DATA TYPE", "field": "controlType.value"},
          {"title": "CONTROL TYPE", "field": "properties.dataType.value"}
        ];
        $scope.data = response;

        $scope.gridOptions = {
          dataSource: new kendo.data.DataSource({
            data: $scope.data,
            pageSize: 5
          }),
          selectable: "row",
          columns: $scope.columns,
          change: function (e) {
            var data = this.dataItem(this.select());

            $location.path('/template-form').search({id: data.id});
            $route.reload();

          }
        };
        createGrid();
      });

      function createGrid() {
        var grid = $("#myGrid");
        if (grid.data("kendoGrid")) {
          grid.data("kendoGrid").destroy();
          grid.empty();
        } else {
          $element.html("<div id='myGrid'></div>");
        }
        $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions).data("kendoGrid");
      }
    }
  }
});
