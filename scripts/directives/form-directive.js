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
    controller: function($scope, $resource,$http, $q){
      $scope.submit = function(){
        alert('Form submitted..');
        console.log('form - ', angular.fromJson(angular.toJson($scope.form)));
        //$scope.form.submitted = true;
        /*********************************************************************/
      /* var api = $resource('http://54.93.177.90/BeProductMVC/api/Forms' ,{}, {
          save: {
            method: 'POST',
            //data: angular.fromJson(angular.toJson($scope.form))
            //data: $scope.form,
            //params: $scope.form,
            interceptor:{
              request:function(request){ console.log('request - ', request); return request },
              requestError:function(requestError){ console.log('requestError - ', requestError); return requestError },
              response:function(response){ console.log('response - ', response); return response },
              responseError:function(responseError){
                if(responseError.status == 0){
                  responseError.status = 204;
                  responseError.statusText = "OK";
                  return responseError;
                }
                console.log('responseError - ', responseError); return $q.reject(responseError)
              }
            },
            headers: {
              'Content-Type': 'application/json'
              //'Content-Type': undefined
            }
          }
        });*/

        /*api.post(function(data){
          console.log('data - ', data);
        },function(error){
          console.log('error - ', error);
        });
*/
        /*********************************************************************/

        /*********************************************************************/

        /*var api = $resource('http://54.93.177.90/BeProductMVC/api/Forms');*/
        //api.save(angular.toJson($scope.form));

       /* $.ajax({
          type: "POST",
          url: 'http://54.93.177.90/BeProductMVC/api/Forms',
          data: JSON.stringify([$scope.form]),
          success: function(success){},
          dataType: 'json'
        });

*/
        /*********************************************************************/
       /* $.post(
          'http://54.93.177.90/BeProductMVC/api/Forms',
          angular.fromJson(angular.toJson($scope.form)) ,
          function(success){},
          'json'
        );*/


        //var a = {"form_fields":[{"field_options":[],"field_id":1,"field_title":"First Name","field_type":"textfield","field_value":"John","field_required":true,"field_disabled":false},{"field_options":[],"field_id":2,"field_title":"Last Name","field_type":"textfield","field_value":"Doe","field_required":true,"field_disabled":false},{"field_options":[{"option_id":1,"option_title":"Male","option_value":1},{"option_id":2,"option_title":"Female","option_value":2}],"field_id":3,"field_title":"Gender","field_type":"radio","field_value":"2","field_required":true,"field_disabled":false},{"field_options":[],"field_id":4,"field_title":"Email Address","field_type":"email","field_value":"test@example.com","field_required":true,"field_disabled":false},{"field_options":[],"field_id":5,"field_title":"Password","field_type":"password","field_value":"","field_required":true,"field_disabled":false},{"field_options":[],"field_id":6,"field_title":"Birth Date","field_type":"date","field_value":"01.21.1980","field_required":true,"field_disabled":false},{"field_options":[{"option_id":1,"option_title":"-- Please Select --","option_value":1},{"option_id":2,"option_title":"Internet Explorer","option_value":2},{"option_id":3,"option_title":"Google Chrome","option_value":3},{"option_id":4,"option_title":"Mozilla Firefox","option_value":4}],"field_id":7,"field_title":"Your browser","field_type":"dropdown","field_value":"2","field_required":false,"field_disabled":false},{"field_options":[],"field_id":8,"field_title":"Additional Comments","field_type":"textarea","field_value":"Some comments","field_required":false,"field_disabled":false}],"form_id":"9812d039-11c1-58f2-bccb-4deeca940dc4","form_name":"My Test Form"};


        $http(
          {
            method: 'POST',
            //url: 'http://localhost:3000/db',
            url: 'http://54.93.177.90/BeProductMVC/api/Forms',
            //url: 'http://84.43.208.93/BeProductMVC/api/Forms',
            //data: $scope.form,
            data: $scope.form,
            headers: {
              'Content-Type': 'application/json',
              //'Content-Type': undefined,
              //'Accept': '*/*'
              //'Content-Type': 'application/x-www-form-urlencoded'
            },
           /* transformRequest: function(obj,headers) {
              console.log(headers()['']);
              *//*var str = [];
              for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");*//*
              //return JSON.stringify(obj.toJSON())
            }*/
          }
        ).success(function(data){
          console.log('data - ', data);
        }).error(function(error){
          console.log('error - ', error);
        });
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
