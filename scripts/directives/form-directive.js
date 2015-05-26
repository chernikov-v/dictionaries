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

        Api.sendForm($scope.form).then(function(success){
          $rootScope.hideForm = true;
          console.log("success", $rootScope.hideForm);

        });
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
}).directive('formDirectiveTemplate', function (Api, $rootScope, $location) {
  return {
    controller: function($scope){
      $scope.submit = function(){

        Api.sendControl($scope.form).then(function(success){
          $rootScope.hideForm = true;
          console.log("success", $rootScope.hideForm);

        });
        $location.path('/controls-grid').search({});
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
}).directive('formDirectiveDictionary', function (Api, $rootScope, $location, $timeout, $routeParams) {
  return {
    controller: function($scope){
      $scope.submit = function(){

        console.log('route params - ', $routeParams);

        if($routeParams.id){
          Api.editDictionary($scope.form, $routeParams.id);
        }else if($routeParams.add){
          Api.sendDictionary($scope.form);
        }
        $location.path('/dictionary-grid').search({});
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
