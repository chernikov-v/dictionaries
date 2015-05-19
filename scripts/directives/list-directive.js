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
        $scope.datasource = new kendo.data.DataSource({
          transport: {
            read: function(options){
              console.log(options);
              $.ajax({
                url: Api.urls.listview,
                data: {
                  models: kendo.stringify(options.data)
                },success: function(result) {
                  options.success(result.data);
                }
              })
            },
            create: function(options) {
              console.log('create');
              $.ajax({
                method: "POST",
                url: "http://demos.telerik.com/kendo-ui/service/products/create",
                dataType: "json",
                data: {
                  models: kendo.stringify(options.data)
                },
                success: function(result) {
                  options.success(result);
                }
              });
            },
            update: function(options) {
              console.log('update');
              $.ajax({
                method: "POST",
                url: "http://demos.telerik.com/kendo-ui/service/products/create",
                data: {
                  models: kendo.stringify(options.data)
                },
                success: function(result) {
                  options.success(result);
                }
              });
            },
            destroy: function(options) {
              console.log('destroy');
              $.ajax({
                url: "http://demos.telerik.com/kendo-ui/service/products/create/id",
                data: {
                  models: kendo.stringify(options.data.models)
                },
                success: function(result) {
                  options.success(result);
                }
              });
            }
          },
          schema: {
            model: {
              id: "id",
              fields:  $scope.schema
            }
          },
          pageSize: 4
        });

        /*===========================================================================================*/
        /*PAGER*/
        /*===========================================================================================*/
        $scope.pager = $element.find('#pager').kendoPager({
          dataSource: $scope.datasource
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
