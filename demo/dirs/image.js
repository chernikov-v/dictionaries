angularApp.directive('imageGrid', function ($http) {

  return {
    restrict: 'E',
    link: function ($scope, $element, $attrs, $controller) {

      $http.get('demo/data.json').success(function (response) {
        console.log(response);
        $scope.dataArray = response;

        $scope.data = new kendo.data.DataSource({
          data: $scope.dataArray,
          schema: {
            model: {
              fields: {
                ava: {type: "string"},
                Name: {type: "string"},
                Author: {type: "string"},
                Qty: {type: "number"},
                Date: {type: "date"}
              }
            }
          },
          pageSize: 8
        });


        $scope.gridOptions = {

          dataSource: $scope.data,
          editable: "incell",
          sortable: true,
          columnMenu: true,
          height: 500,
          pageable: true,
          columns: [
            {title: 'Image', field: "ava", template: '<div class="photo"><img src="#:ava#"></div>'},
            {field: 'Name', title: 'Name', filterable: true},
            'Author',
            {field: 'Qty', filterable: true},
            {field: 'Date', title: 'Date', format: "{0:MM/dd/yyyy}"},
            {title: "Destroy", lockable: false, command: "destroy"}
          ],
          toolbar: ["create", "save"]
        };


        ($scope.createGrid = function () {
          var grid = $("#demoGrid");

          if (grid.data("kendoGrid")) {
            grid.data("kendoGrid").destroy();
            grid.empty();
          } else {
            $element.html("<div id='demoGrid'></div>");
          }
          $scope.grid = $('#demoGrid').kendoGrid($scope.gridOptions);
          console.log($scope.grid);
        })();
      });
    }
  }
});

