angularApp.factory('Api', function ($resource, $http, $q) {

  //var apiUrl = 'http://54.93.177.90/BeProductMVC/api/Forms';
  var apiUrl = 'http://mvc.gloria-jeans-portal.com/api/forms';
  //var apiUrl = 'http://84.43.208.93/BeProductMVC/api/Forms';
  //var apiUrl = 'http://localhost:3000/db';

  var a = {
    "form_fields": [
      {
        "field_options": [],
        "field_id": 1,
        "field_title": "First Name",
        "field_type": "textfield",
        "field_value": "John",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [],
        "field_id": 2,
        "field_title": "Last Name",
        "field_type": "textfield",
        "field_value": "Doe",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [
          {
            "option_id": 1,
            "option_title": "Male",
            "option_value": 1
          },
          {
            "option_id": 2,
            "option_title": "Female",
            "option_value": 2
          }
        ],
        "field_id": 3,
        "field_title": "Gender",
        "field_type": "radio",
        "field_value": "2",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [],
        "field_id": 4,
        "field_title": "Email Address",
        "field_type": "email",
        "field_value": "test@example.com",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [],
        "field_id": 5,
        "field_title": "Password",
        "field_type": "password",
        "field_value": "",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [],
        "field_id": 6,
        "field_title": "Birth Date",
        "field_type": "date",
        "field_value": "01.21.1980",
        "field_required": true,
        "field_disabled": false
      },
      {
        "field_options": [
          {
            "option_id": 1,
            "option_title": "-- Please Select --",
            "option_value": 1
          },
          {
            "option_id": 2,
            "option_title": "Internet Explorer",
            "option_value": 2
          },
          {
            "option_id": 3,
            "option_title": "Google Chrome",
            "option_value": 3
          },
          {
            "option_id": 4,
            "option_title": "Mozilla Firefox",
            "option_value": 4
          }
        ],
        "field_id": 7,
        "field_title": "Your browser",
        "field_type": "dropdown",
        "field_value": "2",
        "field_required": false,
        "field_disabled": false
      },
      {
        "field_options": [],
        "field_id": 8,
        "field_title": "Additional Comments",
        "field_type": "textarea",
        "field_value": "Some comments",
        "field_required": false,
        "field_disabled": false
      }
    ],
    "form_id": "9812d039-11c1-58f2-bccb-4deeca940dc4",
    "form_name": "My Test Form"
  };



 var get = function(_data, id) {

    var url;

    if (typeof id != 'undefined' && id != null && id != '') {
      url = apiUrl + '/' + id;
    } else {
      url = apiUrl
    }

    var api = $resource(url, {}, {
      get: {
        method: 'GET'
      }
    });

    api.get(function (response) {
      console.log('data - ', response);
      _data.form_fields = response.form_fields;
      _data.data_id = response.data_id;
      _data.form_id = response.form_id;
      _data.form_name = response.form_name;

      console.log('_data - ', _data);
    }, function (error) {
      console.log('error - ', error);
    });
  };


  var origXHR = function(data, id){
    console.log('document.domain - ', document.domain);
    document.domain = 'http://54.93.177.90/';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.onreadystatechange = function(event){
      console.log('XHR EVENT - ', event);
      document.domain = 'dev.local'
    };
    xhr.responseType = 'text';
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.send(angular.toJson(data));

  };

  var angularResource = function(_data, id) {

    var api = $resource(apiUrl, {}, {
      save: {
        method: 'POST',
        /*interceptor: {
          request: function (request) {
            console.log('request - ', request);
            return request
          },
          requestError: function (requestError) {
            console.log('requestError - ', requestError);
            return requestError
          },
          response: function (response) {
            console.log('response - ', response);
            return response
          },
          responseError: function (responseError) {
            console.log('responseError - ', responseError);
            return $q.reject(responseError)
          }
        },*/
        headers: {
          'Content-Type': 'application/json'
          //'Content-Type': undefined
        }
      }
    });

    api.save(angular.toJson(_data));
  };

  var httpSend = function(){

    $http({
      method: 'POST',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': undefined
      }


    })
  };



  var jqAjax = function(_data, id) {
    $.ajax({
      type: "POST",
      url: apiUrl,
      data: _data,
      success: function (success) {

      },
      dataType: 'json'
    });
  };

  var jqPost = function(_data, id) {
    $.post(
      apiUrl,
      { data: angular.toJson(_data) },
      function (success) {
      }/*,
      'json'*/
    );
  };


  var send = function (data, id) {

    //data = a;
    jqPost(data,id);
    //jqAjax(data,id);
    //angularResource(data,id);
    //origXHR(data, id);
  };


  return {
    get: get,
    send: function (data, id) {
      send(data,id);
    }
  }


});