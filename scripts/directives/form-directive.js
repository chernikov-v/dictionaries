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
  }).directive('formDirectiveUser', function (Api, $rootScope, $location) {
  return {
    controller: function($scope){
      $scope.submit = function(){

        console.log(Api.send($scope.form).then(function(success){
          $rootScope.hideForm = true;
          console.log("success", $rootScope.hideForm);

        }));
        $location.path('/grid').search({});
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
