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


  var mainUrl = 'http://mvc.gloria-jeans-portal.com/api/';

  //var formUrl = mainUrl + "forms/";
  var formUrl = mainUrl + "User/";
  var gridUrl = mainUrl + "User/";


  var apiURLs = {
    get: formUrl + "get",
    getById: function (id) {
      var url;
      if (typeof id != 'undefined' && id != null && id != '') {
        url = formUrl + 'get/' + id;
      } else {
        url = formUrl + 'get'
      }
      return url;
    },
    post: formUrl + "upsert",
    gridConfig: gridUrl + 'grid',
    gridList: gridUrl + 'list',
    gridSchema: gridUrl + 'schema',
    editadd: gridUrl + "editadd",
    deleteItem: function (id) {
      return gridUrl + 'delete/' + id;
    },
    listviewschema: mainUrl + "user/listviewschema",
    listview: mainUrl + "/user/listview"

  };
  //var apiUrl = 'http://54.93.177.90/BeProductMVC/api/Forms';

  //var apiUrl = 'http://84.43.208.93/BeProductMVC/api/Forms';
  //var apiUrl = 'http://localhost:3000/db';


  var get = function (_data, id) {


    var api = $resource(apiURLs.getById(id), {}, {
      get: {
        method: 'GET'
      }
    });

    api.get(function (response) {
      console.log('data - ', response);
      if (typeof response.data_id == 'undefined') {
        alert('No data received! Incorrect ID!')
      } else {
        for (var i in response) {
          _data[i] = response[i];
        }
      }
    }, function (error) {
    });
  };

  var getControl = function (_data, id) {


    //var api = $resource('http://mvc.gloria-jeans-portal.com/api/template/view/' + id, {}, {
    var api = $resource('https://gist.githubusercontent.com/chernikov-v/d6edbf938e23218d75c4/raw/c924f9be276bd9c7fd6493fc57b139dfdea36a5f/api_form_data.json', {}, {
      get: {
        method: 'GET',
        isArray: true
      }

    });

    api.get(function (response) {

      var obj = {};


      for( var i = 0; i < response.length; i++){
        if(response[i].id == id){
          obj = response[i];
        }
      }
      var properties = obj.properties;

      $http.get("https://gist.githubusercontent.com/chernikov-v/d6edbf938e23218d75c4/raw/cc627db3dfc4d3f7a246ab7a6e2350601699952c/api-form.json")
        .success(function (res) {

          var form = res[obj.id];
          var fields = form.form_fields;

          console.log(fields);
          console.log(properties);

          for(var i = 0; i < fields.length; i++){

            var field = properties[fields[i].field_name];
            console.log(field);

            if(field != null && typeof field.value != 'undefined'){

              for(var j = 0;j < field.options.length; j++){

                fields[i].field_options[j] = {
                  option_id : j,
                  option_title : field.options[j],
                  option_value : j
                };
                if(field.value == fields[i].field_options[j].option_title){
                  fields[i].field_value = fields[i].field_options[j].option_id;
                };
              }
            }else{
              fields[i].field_value = field;
            }
            //console.log(form[i].field_value)
          }
          console.log('~~~~~~', form);
          for (var i in form) {
            _data[i] = form[i];
          }


        });
    });
  };


  var jqPost = function (_data, id) {
    return $.post(
      apiURLs.post,
      {data: angular.toJson(_data)}
    )
  };


  return {
    get: get,
    getControl: getControl,
    //send: send
    send: jqPost,
    urls: apiURLs
  }


});