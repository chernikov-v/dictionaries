
angularApp.directive('hierarchyGrid', function ($http) {

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
                Name: {type: "string"},
                Author: {type: "string"},
                Qty: {type: "number"},
                Date: {type: "date"}
              }
            }
          },
          pageSize: 8
        });

        function detailInit(e) {
          console.log(e);

          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              data: $scope.dataArray,
              schema: {
                model: {
                  fields: {
                    Name: {type: "string"},
                    Author: {type: "string"},
                    Qty: {type: "number"},
                    Date: {type: "date"}
                  }
                }
              },
              filter: { field: "Qty", operator: "eq", value: e.data.Qty },
              pageSize: 8
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              {field: 'Name', title: 'Name', filterable: true},
              'Author',
              {field: 'Qty', filterable: true},
              {field: 'Date', title: 'Date', format: "{0:MM/dd/yyyy}"},
              {title: "Destroy", command: "destroy"}
            ]
          });
        }

        $scope.gridOptions = {

          dataSource: $scope.data,
          editable: "incell",
          height: 300,
          detailInit: detailInit,
          pageable: true,
          columns: [
            {field: 'Name', title: 'Name', filterable: true},
            'Author',
            {field: 'Qty', filterable: true},
            {field: 'Date', title: 'Date', format: "{0:MM/dd/yyyy}"},
            {title: "Destroy", command: "destroy"}
          ]
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
