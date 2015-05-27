'use strict';


angularApp.directive('gridDictionary', function ($http, $route, $location, $timeout, Api, underscore) {
  var _ = underscore;
  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      function firstToLowerCase(str) {
        return str.substr(0, 1).toLowerCase() + str.substr(1);
      }

      $http.get(Api.urls.dataDictionaryGrid).success(function (response) {

        $scope.schema = {};
        $scope.columns = [
          //{ title: "X", template: "<input type='checkbox' class='checkbox' />", hidden: true, width: 30}
          {
            title: "Delete",
            hidden: true,
            width: 120,
            command: [
              {
                name: "destroy"
              }
            ]
          }
        ];

        for (var i = 0; i < response.grid.length; i++) {
          var field = _.where(response.fields, {fieldId: response.grid[i]})[0];
          var fieldName = firstToLowerCase(field.fieldName);
          var fieldType = firstToLowerCase(field.dataType);
          $scope.columns.push({
            title: field.fieldLabel,
            field: fieldName
          });
          $scope.schema[fieldName] =
          {
            type : fieldType
          }
        }

        var filterParser = function (obj) {
          var tmp = [];
          if (typeof obj.filters == 'undefined') {
            tmp.push(obj)
          } else {
            for (var j = 0; j < obj.filters.length; j++) {
              tmp = tmp.concat(filterParser(obj.filters[j]));
            }
          }
          return tmp;
        };


        $scope.gridOptions = {
          dataSource: new kendo.data.DataSource({
            transport: {
              read: function (options) {
                var data = options.data;

                if (typeof data.filter != 'undefined') {
                  console.log('result ', filterParser(data.filter));
                  data.filter = filterParser(options.data.filter);
                }
                $.ajax({
                  method: "POST",
                  url: Api.urls.datadictionary,
                  data: {
                    data: kendo.stringify(data)
                  },
                  success: function (result) {
                    result.data.total = result.total;
                    options.success(result.data);
                  }
                });
              },
              update: Api.urls.datadictionary,
              create: Api.urls.datadictionary,
              destroy: function (options) {
                console.log(options);
                $.ajax({
                  method: "GET",
                  url: Api.urls.datadictionaryDelete(options.data.id),
                  success: function (result) {
                    options.success(result);
                  }
                });
              }
            },
            schema: {
              total: 'total',
              model: {
                id: 'id',
                fields: $scope.schema
              }
            },
            autoSync: true,
            sync: function(e){
              this.refresh();
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 5
          }),
          editable: {
            destroy: true,
            update: false
          },
          remove: function (e) {
            //e.preventDefault();
            //console.log(this,e);
            //$timeout(this.saveChanges(),5000);
          },
          autoBind: true,
          selectable: "row",
          filterable: {
            extra: false,
            operators: {
              string: {
                contains: "Contains"
              }
            }
          },
          sortable: {
            mode: "multiple",
            allowUnsort: true
          },
          pageable: {
            pageSize: 10,
            buttonCount: 3,
            //pageSizes: [10, 20, 50],
            refresh: true,
            //info: true
          },
          columns: $scope.columns,
          toolbar: [
            {name: "add_record", text: "Add New Record"},
            {name: "delete_records", text: "Delete Column Show"}
          ],
          change: function (e) {
            var data = this.dataItem(this.select());

            $location.path('/dictionary-form').search({id: data.id});
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
        addRecord();
        deleteRecords();
      }

      function addRecord() {
        $(".k-grid-add_record").click(function (e) {
          e.preventDefault();

          $location.path('/dictionary-form').search({add: true});
          $route.reload();
        });
      }

      function deleteRecords() {
        $(".k-grid-delete_records").click(function (e) {
          e.preventDefault();
          var elem = $(this);
          if ($scope.grid.columns[0].hidden) {
            elem.addClass('active').text('Delete Column Hide');
            $scope.grid.showColumn(0)
          } else {
            elem.removeClass('active').text('Delete Column Show');
            $scope.grid.hideColumn(0);
          }
          //$scope.grid.setOptions({ selectable: false });
          //$scope.grid.table.on('click', '.checkbox', selectRow);
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
          for (var i = 0; i < view.length; i++) {
            if (checkedIds[view[i].id]) {
              this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                .addClass("k-state-selected")
                .find(".checkbox")
                .attr("checked", "checked");
            }
          }
        }

      }
    }
  }
});
