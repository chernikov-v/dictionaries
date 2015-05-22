'use strict';


angularApp.directive('usersGridControls', function ($http, $route, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      //$http.get(Api.urls.gridConfig).success(function (response) {
      //$http.get("https://gist.githubusercontent.com/chernikov-v/d6edbf938e23218d75c4/raw/c924f9be276bd9c7fd6493fc57b139dfdea36a5f/api_form_data.json'").success(function (response) {
      $http.get("http://mvc.gloria-jeans-portal.com/api/templates/templatecontrols/b259b51b-fcda-4cdd-8542-552d8af8ba97").success(function (response) {

        //$scope.columns = response.columns;
        $scope.columns = [
          { "title": "FIELD NAME", "field": "properties.fieldName" },
          { "title": "FIELD LABLE", "field": "properties.fieldLabel" },
          { "title": "DATA TYPE", "field": "controlType.value" },
          { "title": "CONTROL TYPE", "field": "properties.dataType.value" }
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
