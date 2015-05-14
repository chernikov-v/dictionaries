'use strict';


angularApp.directive('list', function ($http, $location, $timeout, Api) {

  return {
    restrict: 'EA',
    //scope: {
    //  onEdit: '='
    //},
    link: function ($scope, $element, $attrs, $controller) {


      $scope.datasource = new kendo.data.DataSource({
        transport: {
          read: "static-data/list.json"
        },
        pageSize: 4
      });

      $scope.pager = $element.find('#pager').kendoPager({
        dataSource: $scope.datasource,
        pageSize: 4,
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductID: { editable: false, nullable: true },
              ProductName: "ProductName",
              UnitPrice: { type: "number" },
              Discontinued: { type: "boolean" },
              UnitsInStock: { type: "number" }
            }
          }
        }
      }).data("kendoPager");

      $scope.listView = $element.find('#listView').kendoListView({
        dataSource: $scope.datasource,
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html())
      }).data("kendoListView");

      $(".k-add-button").click(function(e) {
        $scope.listView.add();
        e.preventDefault();
      });

    }
  }
});
