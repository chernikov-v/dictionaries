'use strict';


angularApp.directive('list', function ($http, Api, listTemplateFactory) {

  return {
    restrict: 'EA',
    link: function ($scope, $element, $attrs, $controller) {

      //$http.get('static-data/list.json').success(function (response) {
      $http.get(Api.urls.listviewschema).success(function (response) {

        $scope.schema = response.schema;
        $scope.columns = response.columns;

        /*===========================================================================================*/
        /*DATA SOURCE*/
        /*===========================================================================================*/
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

        $scope.datasource = new kendo.data.DataSource({
          transport: {
            read: function(options){
              console.log(options);

              var data = options.data;

              if (typeof data.filter != 'undefined') {
                console.log('result ', filterParser(data.filter));
                data.filter = filterParser(options.data.filter);
              }

              $.ajax({
                method:"POST",
                //url: Api.urls.listview,
                url: Api.urls.gridList,
                data: {
                  data: kendo.stringify(data)
                },success: function(result) {
                  result.data.total = result.total;
                  options.success(result.data);
                }
              })
            },
            create: function(options) {
              console.log('create');
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
            },
            update: function(options) {
              console.log('update');
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
            },
            destroy: function(options) {
              console.log('destroy');
              $.ajax({
                url: Api.urls.deleteItem(options.data._id),
                success: function (result) {
                  options.success(result);
                }
              });
            }
          },
          schema: {
            total: "total",
            model: {
              id: "id",
              fields:  $scope.schema
            }
          },
          pageSize: 4,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        });

        /*===========================================================================================*/
        /*PAGER*/
        /*===========================================================================================*/
        $scope.pager = $element.find('#pager').kendoPager({
          dataSource: $scope.datasource,
          pageSize: 4,
          previousNext: true,
          numeric: true
        }).data("kendoPager");

        /*===========================================================================================*/
        /*LIST*/
        /*===========================================================================================*/

        $scope.listView = $element.find('#listView').kendoListView({
          dataSource: $scope.datasource,
          template: listTemplateFactory.template($scope.columns, $scope.schema),
          editTemplate: listTemplateFactory.editTemplate($scope.columns, $scope.schema)
        }).data("kendoListView");

        /*===========================================================================================*/
        /*Additional interface elements*/
        /*===========================================================================================*/
        var filter = $('#filter').append('<table></table>');
        var table = filter.find("table");
        for(var i = 0; i < $scope.columns.length; i++){
          if(typeof $scope.columns[i].filterable != 'undefined'){
            var filterId = "filter" + $scope.columns[i].field;
            table.append('<tr><td style="width: 200px"><lable>Filter by '+ $scope.columns[i].title +'</lable></td><td><input id="'+ filterId +'"/></td></tr>');
          }
        }

        /*Find button*/
        $('#find').click(function(e){
          var filterParams = [];
          for(var i = 0; i < $scope.columns.length; i++){
            if(typeof $scope.columns[i].filterable != 'undefined') {
              var filterVal = $("#filter" + $scope.columns[i].field).val();
              if (filterVal) {
                filterParams.push({ field: $scope.columns[i].field, operator: "contains", value: filterVal})
              }
            }
          }
          console.log(filterParams);
          $scope.listView.dataSource.filter( filterParams );
          e.preventDefault();
        });

        /*clear find button*/
        $('#clearFind').click(function(e){
          for(var i = 0; i < $scope.columns.length; i++) {
            if (typeof $scope.columns[i].filterable != 'undefined') {
              $("#filter" + $scope.columns[i].field).val("");
            }
          }
          $scope.listView.dataSource.filter({});
          e.preventDefault();
        });

          /*add button*/
        $(".k-add-button").click(function (e) {
          $scope.listView.add();
          e.preventDefault();
        });

      });
    }
  }
});
