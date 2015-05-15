'use strict';


angularApp.directive('usersGridScroll', function ($http, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {

    /* "filterable": {
        "multi": true,
          "dataSource": {
          "transport": {
            "read": "http://mvc.gloria-jeans-portal.com/api/User/list"
          },
          "schema":{
            "data":"data"
          }
        }
      }*/


      $http.get(Api.urls.gridConfig).success(function (response) {
        //$http.get("static-data/server_columns").success(function (response) {

        //console.log(response);
        $scope.columns = response.columns;
        $scope.fieldsSchema = response.schema;
        $scope.columns.push(editColumn);

          $scope.gridOptions = {
            dataSource: new kendo.data.DataSource({
              offlineStorage: "offline-kendo",
              transport: gridTransport,
              schema: {
                //data: "data",
                total: "total",
                model: {
                  id: "id",
                  fields : $scope.fieldsSchema
                }
              },
              pageSize: 10,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            }),
            height: 400,
            scrollable: {
              virtual: true
            },
            filterable: {
              extra: true,
              mode: "row",
              operators: {
                string: {
                  startswith: "Starts with",
                  eq: "Is equal to",
                  neq: "Is not equal to",
                  contains: "Contains",
                  doesnotcantain: "Does not contain",
                  endswith: "Ends With",
                  customOperator: "Custom Operator"
                }
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
              pageSize: 7,
              previousNext: false,
              numeric: false,
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
      var filterParser = function (obj) {
        var tmp = [];
        if(typeof obj.filters == 'undefined'){
          tmp.push(obj)
        }else{
          for(var j = 0; j < obj.filters.length; j++){
            tmp = tmp.concat(filterParser(obj.filters[j]));
          }
        }
        return tmp;
      };
      var gridTransport = {
        create: create_update,
        read: function (options) {
          var data = options.data;

          if(typeof data.filter != 'undefined'){
            console.log('result ', filterParser(data.filter));
            data.filter = filterParser(options.data.filter);
          }

          $.ajax({
            method: "POST",
            url: Api.urls.gridList,
            data: {
              data: kendo.stringify(data)
            },
            success: function (result) {
              /* for(var i = 0; i<result.data.length;i++){
               result.data[i]._id = result.data[i].id;
               }*/
              result.data.total = result.total;
              options.success(result.data);
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
        }/*,
        parameterMap: function (data, type) {
          if (type == "read") {
            return {
              take: data.take,
              skip: data.skip
            }
          }
      }*/
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
      var subscribeBrowserOnline = function(){
        $scope.grid.dataSource.online(navigator.onLine);
        $(window).on("offline", function() {
          $scope.grid.dataSource.online(false);
          console.log("navigator online - ", navigator.onLine);
          //alert("OFFLINE");
        });
        $(window).on("online", function() {
          $scope.grid.dataSource.online(true);
          //alert("ONLINE");
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
          $scope.gridOptions.dataSource.online(false);
        }
        $("#online").kendoMobileSwitch({
          value: online,
          change: function () {
            online = this.value();
            localStorage["kendo-grid-online"] = online;
            $scope.gridOptions.dataSource.online(online);
            if(online){
              $scope.grid.dataSource.fetch();
            }
          }
        });
      };

    }
  }
});
