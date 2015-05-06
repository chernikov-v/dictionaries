angularApp.factory('Api', function ($resource, $http, $q) {

  //var apiUrl = 'http://54.93.177.90/BeProductMVC/api/Forms';
  var apiUrl = 'http://mvc.gloria-jeans-portal.com/api/forms';
  //var apiUrl = 'http://84.43.208.93/BeProductMVC/api/Forms';
  //var apiUrl = 'http://localhost:3000/db';


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
      if(typeof response.data_id == 'undefined'){
        alert('No data received! Incorrect ID!')
      }else{
        for(var i in response){
          _data[i] = response[i];
        }
      }
    }, function (error) {
    });
  };

  var jqPost = function(_data, id) {
    return $.post(
      apiUrl,
      { data: angular.toJson(_data) }

    )
  };


  return {
    get: get,
    //send: send
    send: jqPost
  }


});