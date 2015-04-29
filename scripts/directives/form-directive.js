'use strict';

angularApp.directive('formDirective', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            };

            $scope.cancel = function(){
                alert('Form canceled..');
            };
        },
        templateUrl: './views/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  }).directive('formDirectiveUser', function (Api) {
  return {
    controller: function($scope, $resource,$http, $q){
      $scope.submit = function(){
        //alert('Form submitted..');
        console.log('form - ', angular.fromJson(angular.toJson($scope.form)));
        $scope.form.submitted = true;
        /*********************************************************************/
        Api.send($scope.form);
      };

      $scope.cancel = function(){
        alert('Form canceled..');
      };
    },
    templateUrl: './views/directive-templates/form/form.html',
    restrict: 'E',
    scope: {
      form:'='
    }
  };
});
