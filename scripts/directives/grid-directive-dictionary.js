'use strict';


angularApp.directive('gridDictionary', function ($http, $route, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      //$http.get("http://mvc.gloria-jeans-portal.com/api/templates/templatecontrols/b259b51b-fcda-4cdd-8542-552d8af8ba97").success(function (response) {
      //$http.get(Api.urls.datadictionary).success(function (response) {


      $scope.columns = [
        //{ title: "X", template: "<input type='checkbox' class='checkbox' />", hidden: true, width: 30},
        { field: "controlName", title: "Control Name" },
        { field: "controlType", title: "Control Type" }
      ];
        //$scope.data = response;

        $scope.gridOptions = {
          dataSource: new kendo.data.DataSource({
            transport: {
              read: Api.urls.datadictionary
            }
            //data: $scope.data,
            //pageSize: 5
          }),
          selectable: "row",
          columns: $scope.columns,
          toolbar: [
            { name: "add_record", text: "Add New Record" },
            //{ name: "delete_records", text: "Delete Records" }
          ],
          change: function (e) {
            var data = this.dataItem(this.select());

            $location.path('/dictionary-form').search({id: data.id});
            $route.reload();

          }
        };
        createGrid();

      //});

      function createGrid() {
        var grid = $("#myGrid");
        if (grid.data("kendoGrid")) {
          grid.data("kendoGrid").destroy();
          grid.empty();
        } else {
          $element.html("<div id='myGrid'></div>");
        }
        $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions).data("kendoGrid");
        addRecord();
        deleteRecords();
      }

      function addRecord() {
        $(".k-grid-add_record").click(function (e) {
          e.preventDefault();

          $location.path('/dictionary-form').search({ add: true });
          $route.reload();
        });
      }

      function deleteRecords() {
        $(".k-grid-delete_records").click(function (e) {
          e.preventDefault();
          console.log(e.target);
          var button = e.target;
          $(e.target).replaceWith('<a class="k-button k-button-icontext k-grid-delete_selected" href="#"><span class="k-icon k-delete"></span>Delete Selected</a>' +
          '<a class="k-button k-button-icontext k-grid-cancel_delete" href="#"><span class="k-icon k-cancel"></span>Delete Selected</a>');
          //console.log($scope.grid.getOptions());
          $scope.grid.setOptions({ selectable: false });
          $scope.grid.showColumn(0);
          $scope.grid.table.on('click', '.checkbox', selectRow);
          //setOptions();
          //hideColumn();
          //showColumn();
          //$scope.grid.selectable = false;
        });

        var checkedIds = {};

        function selectRow() {
          var checked = this.checked;
          var row = $(this).closest("tr");
          var dataItem = $scope.grid.dataItem(row);

          checkedIds[dataItem.id] = checked;
          if (checked) {
            //-select the row
            row.addClass("k-state-selected");
          } else {
            //-remove selection
            row.removeClass("k-state-selected");
          }
        }

        //on dataBound event restore previous selected rows:
        function onDataBound(e) {
          var view = this.dataSource.view();
          for(var i = 0; i < view.length;i++){
            if(checkedIds[view[i].id]){
              this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                .addClass("k-state-selected")
                .find(".checkbox")
                .attr("checked","checked");
            }
          }
        }

      }
    }
  }
});
