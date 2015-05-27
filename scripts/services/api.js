angularApp.factory('Api', function ($resource, $http, $q, underscore) {

  var _ = underscore;


  function fieldType(type) {

    var innerType = "";

    /* 'email',
     'password',
     'radio'
     'hidden'*/

    switch (type) {
      case 'Calendar':
        innerType = 'date';
        break;
      case 'Currency':
        innerType = 'textfield';
        break;
      case 'DropDownList':
        innerType = 'dropdown';
        break;
      case 'Memo':
        innerType = 'textarea';
        break;
      case 'Numeric':
        innerType = 'textfield';
        break;
      case 'Text':
        innerType = 'textfield';
        break;
      case 'CheckBox':
        innerType = 'checkbox';
        break;
      default:
        console.error('Unknown field type');
    }

    return innerType;
  }

  function createForm(config) {

    var form = {
      form_id: config.id,
      form_name: config.formId,
      submitted: false,
      form_fields: []
    };

    var fields = [];

    for (var i = 0; i < config.form.length; i++) {
      var configField = _.where(config.fields, {fieldId: config.form[i]})[0];
      fields.push({
        "field_id": configField.fieldId,
        "field_name": configField.fieldName,
        "field_title": configField.fieldLabel,
        "field_type": fieldType(configField.controlType),
        "field_value": configField.defaultValue ? 1 : '',
        "field_required": configField.validation ? true : false,
        "field_disabled": false,
        "field_options": []
        /*
         "tooltip": "[Data dictionary Control type]"
         dataType: 'String'
         maxLength: 200,
         validation: null || 'Required',
         */
      })
    }
    form.form_fields = fields;
    return form;

  }

  function cloneData(objTo, objectFrom) {
    for (var i in objectFrom) {
      objTo[i] = objectFrom[i];
    }
  }

  function fulfillForm(outerForm, data) {
    $http.get('http://mvc.gloria-jeans-portal.com/api/forms/get/' + data.controlType.value)
      .success(function (res) {

        var form = createForm(res);
        //var properties = data.properties;
        var fields = form.form_fields;

        for (var i = 0; i < fields.length; i++) {
          var name = fields[i].field_name.split('.');
          var field = name.length == 1 ? data[name[0]] : data[name[0]][name[1]];
          //console.log(name,field);
          if (field != null && typeof field.value != 'undefined') {

            for (var j = 0; j < field.options.length; j++) {

              fields[i].field_options[j] = {
                option_id: j,
                option_title: field.options[j],
                option_value: j
              };
              if (field.value == fields[i].field_options[j].option_title) {
                //fields[i].field_value = fields[i].field_options[j].option_title;
                fields[i].field_value = fields[i].field_options[j].option_id;
              }
            }
          } else {
            fields[i].field_value = field;
          }
        }
        form.form_id = data.id;
        form.control_name = data.controlName;
        form.control_type = data.controlType;
        cloneData(outerForm, form);

      });
  }

  function formToObject(form, id) {

    var fields = form.form_fields;
    var controlName = _.where(fields, {field_name: 'controlName'})[0].field_value;
    var controlTypeField = _.where(fields, {field_name: 'controlType'})[0];
    var controlType = controlTypeField.field_options.length ? _.where(controlTypeField.field_options, {option_id: +controlTypeField.field_value})[0].option_title : controlTypeField.field_value
    var data = {
      id: id || form.form_id,
      controlName: controlName,
      controlType: controlType,
      properties: {}
    };

    var properties = {};

    for (var i = 0; i < fields.length; i++) {
      var name = fields[i].field_name.split('.');
      if (name.length == 1) {
        properties[name[0]] = fields[i].field_options.length ? _.where(fields[i].field_options, {option_id: +fields[i].field_value})[0].option_title : fields[i].field_value;
      } else {
        properties[name[1]] = fields[i].field_options.length ? _.where(fields[i].field_options, {option_id: +fields[i].field_value})[0].option_title : fields[i].field_value;
      }
    }
    data.properties = properties;

    return data;
  }

  /*===========================================================================================================================================*/
  /*===========================================================================================================================================*/

  var mainUrl = 'http://mvc.gloria-jeans-portal.com/api/';

  var formUrl = mainUrl + "forms/";
  //var formUrl = mainUrl + "User/";
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
    listview: mainUrl + "/user/listview",
    datadictionary: mainUrl + 'datadictionary',
    dictionaryAdd: mainUrl + 'datadictionary/add',
    dictionaryEdit: function (id) {
      return mainUrl + 'datadictionary/edit/' + id;
    },
    systemcontrolsproperties: function (controlType) {
      return mainUrl + 'systemcontrolsproperties/get/' + controlType;
    },
    templateView: function (id) {
      return mainUrl + 'template/view/' + id
    },
    dataDictionaryGrid: formUrl + 'get/DataDictionaryGrid',
    datadictionaryDelete: function (id) {
      return mainUrl + 'datadictionary/delete/' + id;
    },
    systemcontrolsproperties: mainUrl + 'systemcontrolsproperties/'

  };
  /*===========================================================================================================================================*/

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
    var api = $resource(apiURLs.templateView(id), {}, {
      get: {
        isArray: true
      }
    }).get(function (response) {
      var obj = response;
      for (var i = 0; i < response.length; i++) {
        if (response[i].id == id) {
          obj = response[i];
        }
      }
      obj.controlType = obj.controlType.value;
      fulfillForm(_data, obj);
    });
  };
  var getDictionary = function (_data, id) {
    var api = $resource(apiURLs.dictionaryEdit(id)).get(function (response) {
      fulfillForm(_data, response);
    });

  };
  var addDictionary = function (_data, controlType) {

    var api = $resource(apiURLs.systemcontrolsproperties(controlType ? controlType : 'Calendar')).get(function (response) {
      fulfillForm(_data, response);
    });
  };
  var sendForm = function (_data, id) {

    return $.post(
      apiURLs.post,
      {data: angular.toJson(_data)}
    )
  };
  var sendControl = function (_data, id) {
    return $.post(
      apiURLs.post,
      {data: angular.toJson(_data)}
    )
  };
  var sendDictionary = function (_data) {
    var form = formToObject(_data);
    return $.post(
      apiURLs.dictionaryAdd,
      {data: angular.toJson(form)}
    )
  };
  var editDictionary = function (_data, id) {
    var form = formToObject(_data, id);
    return $.post(
      apiURLs.dictionaryEdit(id),
      {data: angular.toJson(form)}
    )
  };


  return {
    get: get,
    getControl: getControl,
    getDictionary: getDictionary,
    addDictionary: addDictionary,
    editDictionary: editDictionary,
    sendForm: sendForm,
    sendControl: sendControl,
    sendDictionary: sendDictionary,
    urls: apiURLs
  }


});