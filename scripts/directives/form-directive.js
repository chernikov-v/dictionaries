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
  }).directive('formDirectiveUser', function () {
  return {
    controller: function($scope, $http){
      $scope.submit = function(){
        alert('Form submitted..');
        console.log('form - ', $scope.form);
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
});
