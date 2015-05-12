'use strict';


angularApp.directive('usersGrid', function ($http, $location, $timeout, Api) {

  return {
    restrict: 'E',
    scope: {
      onEdit: '='
    },
    link: function ($scope, $element, $attrs, $controller) {


      //$http.get('server_columns.json').success(function (response) {
      //$scope.columns = response.shcema;
      //$scope.schema = response.schema;
      //console.log(response);


      $http.get('http://mvc.gloria-jeans-portal.com/api/forms/columns').success(function (columns) {
        $http.get('http://mvc.gloria-jeans-portal.com/api/forms/schema').success(function (schema) {
          console.log(columns, angular.toJson(schema));

          $scope.columns = columns.columns;
          $scope.schema = schema.schema;
          /*$scope.schema = angular.fromJson({
            "schema": {
              "model": {
                "fields": {
                  "_id": {"type": "string"},
                  "formId": {"type": "string"},
                  "firstName": {"type": "string"},
                  "lastName": {"type": "string"},
                  "gender": {"type": "boolean"},
                  "emailAddress": {"type": "string"},
                  "password": {"type": "string"},
                  "birthDate": {"type": "date"},
                  "yourBrowser": {"type": "number"},
                  "additionalComments": {"type": "string"}
                }
              }
            }
          });*/


          //$http.get('v.json').success(function(response){
          //$http.get('http://mvc.gloria-jeans-portal.com/api/forms?schema&columns').success(function (response) {
          //$http.get(Api.urls.gridSchema).success(function (response) {


          $scope.columns[1].filterable = {
            ui: gridFilters.lastNameFilter
          };


          /*===================remove template field======================*/
          /*for (var i = 0; i < $scope.columns.length; i++) {
           if (typeof $scope.columns[i].template != 'undefined') {
           delete $scope.columns[i].template
           }
           }*/

          //console.log('columns cshema - ', $scope.columns);

          /*add edit column*/
          $scope.columns.push(editColumn);


          $scope.gridOptions = {

            dataSource: new kendo.data.DataSource({
              offlineStorage: "offline-kendo",
              //batch: true,
              transport: gridTransport,

              requestStart: function (e) {
                if (e.type != "read") {
                  console.log(kendo.format("Request start ({0})", e.type));
                }
              },
              requestEnd: function (e) {
                if (e.type != "read") {
                  console.log(kendo.format("Request end ({0})", e.type));
                }
              },
              schema: $scope.schema,
              pageSize: 7 //elements per/page
            }),

            height: 400,
            //detailInit: detailInit,
            /*===============================================================================================================*/
            filterable: {
              extra: false,//disable 2-nd filter input
              operators: {
                string: {
                  startswith: "Starts with",
                  eq: "Is equal to",
                  neq: "Is not equal to"
                }
              }
            },
            /*===============================================================================================================*/
            sortable: true,
            /*==========================================+====================================================================*/
            allowCopy: true,  //or true to allow user copy to clipboard !// uses with selectable option
            selectable: "multiple row", //"row" "cell" "multiple row" "multiple cell"
            /*===============================================================================================================*/
            //altRowTemplate: gridTmpCustomize.altRowTemplate($scope.columns), //customize row template
            /*===============================================================================================================*/
            //autoBind: true,
            /*===============================================================================================================*/
            pageable: true, //default paging function
            /*===============================================================================================================*/
            //groupable: true, //default group panel
            /*===============================================================================================================*/
            //scrollable: { virtual : true }, //allows automatic go next page
            /*===============================================================================================================*/
            columnResizeHandleWidth: 5, //width in px of resize handler
            /*===============================================================================================================*/
            /*edit line with popup menu*/
            //editable: "popup", //best to use with row button
            //editable: "inline", //best to use with row button
            /*===============================================================================================================*/
            navigatable: true,
            editable: true,
            resizable: true,
            columns: $scope.columns,
            /*column reorder and event*/
            reorderable: true,
            columnReorder: gridEvents.columnReorder,

            change: gridEvents.change,
            save: gridEvents.save,
            remove: gridEvents.remove,
            cancel: gridEvents.cancel,
            edit: gridEvents.edit,
            autoSync: true,
            toolbar: ["create", "save", "cancel", "excel"/*, "pdf"*/]
          };

          ($scope.createGrid = function () {
            var grid = $("#myGrid");

            if (grid.data("kendoGrid")) {
              grid.data("kendoGrid").destroy();
              grid.empty();
            } else {
              $element.html("<div id='myGrid'></div>");
            }
            $scope.grid = $('#myGrid').kendoGrid($scope.gridOptions);
            console.log($scope.grid);
            generateOnline();
          })();
        });
      });

      /*===============================================================================================================*/
      /*===============================================================================================================*/

      var gridFilters = {
        lastNameFilter: function (element, asd, zxc) {
          console.log('element', element);
          element.kendoDropDownList({
            dataSource: ["custom", "list", "Doe", "Guy", "Кирпич"],
            optionLabel: "--Select Value--"
          });
        }
      };

      var gridEvents = {
        columnReorder: function (e) {
          //console.log('columnReorder - ', e);
        },
        edit: function (e) {
          //console.log('edit - ', e);
          /*e.container.parent().keypress(function (event) {
           console.log('kepressed!!!!');
           if (event.which == 13) {
           event.preventDefault();
           } else {
           e.container.focus();
           }
           });*/
          var cell = $(e.container);
          //setTimeout(function(){
          cell.find("input").focus();
          //});
          editRowDuplicatePatch(e);
        },
        cancel: function (e) {
          /*   e.preventDefault();
           console.log('cancel - ', e);
           this.refresh();*/
        },
        remove: function (e) {
          e.preventDefault();

             console.log('remove - ', e);
     /*      console.log('MODELS - ', this.dataSource.data());

           this.dataSource.sync();*/
        },
        change: function (e) {
          console.log('change - ', e);
        },
        save: function (e) {
          //this.dataSource.add(e.model);
          //this.closeCell();
          /*this.saveChanges();
           this.refresh();
           this.dataSource.sync();*/

          console.log("saving changes - ", this);
        }
      };
      var gridTransport = {
        create: function (options) {
          $.ajax({
            method: 'POST',
            //url: Api.urls.post,
            url: 'http://mvc.gloria-jeans-portal.com/api/forms/editadd',
            data: {
              data: kendo.stringify(options.data)
            },
            success: function (result) {
              options.success(result);
            }
          })
        },
        read: function (options) {
          $timeout(function () {
            $.ajax({
              url: Api.urls.gridList,
              data: {
                models: kendo.stringify(options.data)
              },
              success: function (result) {
                console.log(result);
                options.success(result);
              }
            })
          }, 2000);
        },
        update: function (options) {
          console.log(options.data._id);
          /* var url = options.data._id == ""?
           'http://mvc.gloria-jeans-portal.com/api/forms/editadd':
           'http://mvc.gloria-jeans-portal.com/api/forms/edit';*/
          $.ajax({
            method: 'POST',
            //url: Api.urls.post,
            url: 'http://mvc.gloria-jeans-portal.com/api/forms/editadd',
            data: {
              data: kendo.stringify(options.data)
            },
            success: function (result) {
              options.success(result);
            }
          });
        },
        destroy: function (options) {
          console.log('options - ', options);
          $.ajax({
            url: 'http://mvc.gloria-jeans-portal.com/api/forms/delete/' + options.data._id
          });
        }
      };
      var gridTmpCustomize = {

        altRowTemplate: function (columns) {
          var tmp = $('<tr data-uid="#= uid #"></tr>');
          var dataTmpl = '';

          for (var i = 0; i < columns.length; i++) {

            if (typeof columns[i].template != 'undefined') {
              dataTmpl = columns[i].template;
            } else if (typeof columns[i].field != 'undefined') {
              dataTmpl = '#=' + columns[i].field + '#';
            } else if (typeof columns[i].command != 'undefined') {
              //continue;
              continue;
            } else {
              dataTmpl = ' -- ';
            }

            tmp.append('<td colspan="1" style="background-color: green">' + dataTmpl + '</td>')

          }

          return tmp.html();

        }

      };
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
              console.log("User Id: ", data.id);
              $scope.onEdit(data.id);
            }
          },
          //{name: "edit"},
          {name: "destroy"}
        ]
      };

      var editRowDuplicatePatch = function (e) {
        var cells = e.container.children();
        var cell;
        var cell_elements;

        for (var counter = 0; counter < cells.length - 1; counter++) {
          cell = $(cells[counter]);
          cell_elements = $(cells[counter]).children();
          if (cell_elements.length > 1) {
            console.log(cell_elements.first().siblings().remove());
          }
        }

      };


      /*===============================================================================================================*/
      /*LOCALIZATION*/
      /*===============================================================================================================*/

      $("#language").kendoDropDownList({
        change: function () {
          kendo.ui.progress($("#myGrid"), true);
          $.getScript("locals/kendo.messages." + this.value() + ".js", function () {
            kendo.ui.progress($("#myGrid"), false);
            $scope.createGrid();
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
      /*===============================================================================================================*/
      /*OFFLINE MODE*/
      /*===============================================================================================================*/
      var generateOnline = function () {
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
          }
        });
      }
      /*===============================================================================================================*/


    }
  }
});
