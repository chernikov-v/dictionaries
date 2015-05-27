'use strict';

angularApp.directive('formDirectiveDictionary', function (Api, $http, $location, $timeout, $routeParams) {
  return {
    restrict: 'E',
    scope: {
      form:'='
    },
    link: function ($scope, $element, $attrs, $controller) {
      //$http.get(Api.urls.dictionaryEdit($routeParams.id)).success(function(data){
      //
      //  $scope.form = data;
      //  console.log('~~~~~~~~~~~~~~~~', $scope.form);

        //$http.get(Api.urls.getById('Claendar'/*data.controlType.value*/)).success(function(config){



              var el = document.createElement('input');
               //$el

              $element.append(el);
              //el.kendoDatePicker();

        //});
      //});





    }
  };
});
