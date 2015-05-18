'use strict';


angularApp.directive('list', function ($http, $location, $timeout, Api) {

  return {
    restrict: 'EA',
    //scope: {
    //  onEdit: '='
    //},
    link: function ($scope, $element, $attrs, $controller) {

      $http.get('static-data/list.json').success(function (response) {

        $scope.datasource = new kendo.data.DataSource({
          data: response,
          /*transport: {
            read: "static-data/list.json"
          },*/
          pageSize: 4,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: {editable: false, nullable: true},
                ProductName: {type: "string"},
                UnitPrice: {type: "number"},
                Discontinued: {type: "boolean"},
                UnitsInStock: {type: "number"}
              }
            }
          }
        });

        $scope.pager = $element.find('#pager').kendoPager({
          dataSource: $scope.datasource
        }).data("kendoPager");

        $scope.listView = $element.find('#listView').kendoListView({
          dataSource: $scope.datasource,
          template: kendo.template($("#template").html()),
          editTemplate: kendo.template($("#editTemplate").html())
        }).data("kendoListView");

        $(".k-add-button").click(function (e) {
          $scope.listView.add();
          e.preventDefault();
        });

        $('#find').click(function(e){
          var filterVal = $('#filter').val();
          console.log(filterVal.length);
          if(filterVal){
            console.log($scope.listView);
            $scope.listView.dataSource.filter( { field: "ProductName", operator: "contains", value: filterVal});
          }
          e.preventDefault();
        });

        $('#clearFind').click(function(e){
          var filterVal = $('#filter').val("");
            $scope.listView.dataSource.filter({});
          e.preventDefault();
        });

      });
    }
  }
});
