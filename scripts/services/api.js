angularApp.factory('Api', function ($resource, $http, $q) {

/*
*
*
*
 GET http://mvc.gloria-jeans-portal.com/api/forms/get получить форму с новым юзером
 GET http://mvc.gloria-jeans-portal.com/api/forms/get/a93bd039-4328-42ce-7456-8b8f8d26fcf8 получить юзера по ID
 POST http://mvc.gloria-jeans-portal.com/api/forms/upsert добавляем нового или изменяем текущего формат отправляемых данных тот же
 GET http://mvc.gloria-jeans-portal.com/api/forms/list получаем список данных для gridview
 GET http://mvc.gloria-jeans-portal.com/api/forms/schema получаем схему для gridview
 GET http://mvc.gloria-jeans-portal.com/api/forms/editadd добавляем или изменяем элемент
 GET http://mvc.gloria-jeans-portal.com/api/forms/delete/a140d039-e4ac-d1cb-3726-bc91e04df936
*
*
*
*
* */



  var mainUrl = 'http://mvc.gloria-jeans-portal.com/api/forms/';

var apiURLs = {
    get : mainUrl + "get",
    getById: function(id){
      var url;
      if (typeof id != 'undefined' && id != null && id != '') {
        url =  mainUrl + 'get/' + id;
      } else {
        url =  mainUrl + 'get'
      }
      return url;
    },
    post: mainUrl + "upsert",
    gridList: mainUrl + 'list',
    gridSchema: mainUrl + 'schema',
    editadd: mainUrl+ "editadd",
    deleteItem: function(id){
    return mainUrl + 'delete/' + id;
  }

};
  //var apiUrl = 'http://54.93.177.90/BeProductMVC/api/Forms';

  //var apiUrl = 'http://84.43.208.93/BeProductMVC/api/Forms';
  //var apiUrl = 'http://localhost:3000/db';








 var get = function(_data, id) {



    var api = $resource(apiURLs.getById(id), {}, {
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
      apiURLs.post,
      { data: angular.toJson(_data) }

    )
  };


  return {
    get: get,
    //send: send
    send: jqPost,
    urls: apiURLs
  }


});