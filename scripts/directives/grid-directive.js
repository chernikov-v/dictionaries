'use strict';


angularApp.directive('usersGrid', function ($http, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

      $http.get(Api.urls.gridConfig).success(function (response) {
        //console.log(response);
        $scope.columns = response.columns;
        $scope.fieldsSchema = response.schema;
        $scope.columns.push(editColumn);

        $scope.gridOptions = {
          dataSource: new kendo.data.DataSource({
            offlineStorage: "offline-kendo",
            transport: gridTransport,
            schema: {
              data: "data",
              total: "total",
              model: {
                //id: "_id",
                fields : $scope.fieldsSchema
              }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          }),
          height: 400,
          scrollable: true,
          filterable: {
            extra: true,
            mode: "menu",
            operators: {
              string: {
                contains: "Contains"
              },
              date: {
                gte: "gte",
                lte: "lte"
              },
              mode: "menu"
            }
          },
          sortable: {
            mode: "multiple",
            allowUnsort: true
          },
          allowCopy: true,
          selectable: "multiple row",
          autoBind: true,
          pageable: {
            pageSize: 10,
            buttonCount: 3,
            pageSizes: [10, 20, 50],
            refresh: true,
            info: true
          },
          columnResizeHandleWidth: 5,
          navigatable: true,
          editable: {
            confirmation: false
          },
          resizable: true,
          columns: $scope.columns,
          reorderable: true,
          columnReorder: gridEvents.columnReorder,
          edit: gridEvents.edit,
          autoSync: true,
          toolbar: ["create", "save", "cancel", "destroy", "excel"]
        };

        createGrid();
        createOnlineSwitcher();
        //subscribeBrowserOnline();
        customDeleteToolbar();
        createLanguageSwither();
      });


      /*===============================================================================================================*/
      /*GRID EVENTS*/
      /*===============================================================================================================*/
      var gridEvents = {
        columnReorder: function (e) {
        },
        edit: function (e) {
          var cell = $(e.container);
          cell.find("input").focus();
        }
      };

      /*===============================================================================================================*/
      /*GRID TRANSPORT*/
      /*===============================================================================================================*/
      var create_update = function (options) {
        $.ajax({
          method: 'POST',
          url: Api.urls.editadd,
          data: {
            data: kendo.stringify(options.data)
          },
          success: function (result) {
            options.data.id = result.id;
            options.success(options.data);
          }
        });
      };

      var gridTransport = {
        create: create_update,
        read: /*Api.urls.gridList,*/
          function (options) {
            $.ajax({
              method: "POST",
              url: Api.urls.gridList,
              data: {
                data: kendo.stringify(options.data)
              },
              success: function (result) {
                result.data.id = result.data._id;
                options.success(result);
              }
            });
          },
        update: create_update,
        destroy: function (options) {
          $.ajax({
            url: Api.urls.deleteItem(options.data._id),
            success: function (result) {
              options.success(result);
            }
          });
        }
      };
      /*===============================================================================================================*/
      /*ADDITIONAL COLUMN OBJ*/
      /*===============================================================================================================*/
      var editColumn = {
        title: "Actions",
        command: [
          {
            name: "edit_user",
            text: "Form Edit",
            width: '100',
            click: function (e) {
              e.preventDefault();
              var data = this.dataItem($(e.target).closest("tr"));
              $scope.onEdit(data.id);
            }
          }
        ]
      };
      /*===============================================================================================================*/
      /*CREATE GRID FUNC*/
      /*===============================================================================================================*/
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
      /*===============================================================================================================*/
      /*CUSTOM TOOLBAR DELETE BUTTON*/
      /*===============================================================================================================*/
      var customDeleteToolbar = function () {
        $(".k-grid-delete").click(function (e) {
          e.preventDefault();
          var rows = $scope.grid.select();
          if (rows.length == 0) {
            alert("Select some rows for deleting!");
          } else {
            if (confirm(rows.length + " record(s) will be deleted! Confirm this action")) {
              for (var i = 0; i < rows.length; i++) {
                $scope.grid.removeRow(rows[i]);
              }
              $scope.grid.saveChanges();
            }
          }
        });
      };
      /*===============================================================================================================*/
      /*LOCALIZATION*/
      /*===============================================================================================================*/
      var createLanguageSwither = function () {
        $("#language").kendoDropDownList({
          change: function () {
            kendo.ui.progress($("#myGrid"), true);
            $.getScript("locals/kendo.messages." + this.value() + ".js", function () {
              kendo.ui.progress($("#myGrid"), false);
              createGrid();
            });
          },
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            {text: "en-US"},
            {text: "ru-RU"},
            {text: "bg-BG"},
            {text: "zh-CN"}
          ]
        });
        $("#language").data("kendoDropDownList").trigger("change");
      };
      /*===============================================================================================================*/
      /*OFFLINE MODE*/
      /*===============================================================================================================*/
      var subscribeBrowserOnline = function () {
        $scope.grid.dataSource.online(navigator.onLine);
        $(window).on("offline", function () {
          $scope.grid.dataSource.online(false);
        });
        $(window).on("online", function () {
          $scope.grid.dataSource.online(true);
        });
      };
      /*===============================================================================================================*/
      /*OFFLINE MODE*/
      /*===============================================================================================================*/
      var createOnlineSwitcher = function () {
        $scope.grid.dataSource.sync();
        var online = localStorage["kendo-grid-online"] == "true" || localStorage["kendo-grid-online"] === undefined;
        if (!online) {
          $("#online").removeAttr("checked");
          $scope.grid.dataSource.online(false);
        }
        $("#online").kendoMobileSwitch({
          value: online,
          change: function () {
            online = this.value();
            localStorage["kendo-grid-online"] = online;
            $scope.grid.dataSource.online(online);
            if(online){
              $scope.grid.dataSource.fetch();
            }
          }
        });
      };
    }
  }
});
