'use strict';

angularApp.directive('formDirectiveDictionary', function (Api, $rootScope, $location, $timeout, $routeParams, $route) {
  return {
    controller: function($scope){
      $scope.submit = function(){

        console.log('route params - ', $routeParams);

        if($routeParams.id){
          Api.editDictionary($scope.form, $routeParams.id).success(backToGrid);
        }else if($routeParams.add){
          Api.sendDictionary($scope.form).success(backToGrid);
        }
       function backToGrid(response){
         console.log('asdasd');
         $location.path('/dictionary-grid').search({});
         $route.reload();
       }
      };

      $scope.cancel = function(){
        if(confirm('Confirm cancellation!')){
          $location.path('/dictionary-grid').search({});
        }
      };

      $scope.controlType = function(){
        $timeout(function(){
          $('#controlType').change(function(e){
            var controlType = $("#controlType :selected").text().trim();
            Api.addDictionary($scope.form, controlType);
          });
        });
      };

    },
    templateUrl: './views/directive-templates/form/form.html',
    restrict: 'E',
    scope: {
      form:'='
    }
  };
});
