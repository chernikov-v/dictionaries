angularApp.factory('listTemplateFactory', function () {


  var template = function(data,schema){
    var dl = $(document.createElement('dl'));

    for (var i = 0; i < data.length; i++){

      if(typeof data[i].template != 'undefined'){
        dl.append('<dt>'+ data[i].title +'</dt><dd>'+ data[i].template +'</dd>');
      }else{
        if(schema[data[i].field].type == 'date'){
          var date;
          if(typeof data[i].format != 'undefined'){
            date = "#=kendo.toString(new Date("+ data[i].field +"),\"" + data[i].format.substr(4,data[i].format.substr(4).length - 1) + "\")#";
          }else{
            date = "#:" + data[i].field + "#";
          }
          dl.append('<dt>'+ data[i].title +'</dt><dd>'+ date +'</dd>');
        }else{
          dl.append('<dt>'+ data[i].title +'</dt><dd>#:' + data[i].field + '#</dd>');
        }
      }
    }
    return '<div class="list-view k-widget">\
                <div class="edit-buttons">\
              <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>\
              <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>\
              </div>' + dl.html() + '</div>';
  };

  var editTemplate = function(data, schema){
    var dl = $(document.createElement('dl'));
    var dd = $(document.createElement('dd'));

    for (var i = 0; i < data.length; i++){
      dl.append('<dt>' + data[i].title + '</dt>');

      var cell = "";
      var validator = {
        required: typeof data[i].validation != 'undefined'?data[i].validation.required:"",
        min: typeof data[i].validation != 'undefined'?data[i].validation.min:0,
        message: typeof data[i].validation != 'undefined'?"required":"",
        format: typeof data[i].format != 'undefined'? data[i].format.substr(4,data[i].format.substr(4).length - 1):"yyyy-MM-dd"
      };

      switch(schema[data[i].field].type){
        case 'string':
          cell = '<input type="text" class="k-textbox k-dirty-cell" data-bind="value:' + data[i].field +'" name="' + data[i].field +'" required="'+ validator.required +'" validationMessage="'+ validator.message+'"/>\
                          <span data-for="' + data[i].field +'" class="k-invalid-msg"></span>';
          break;
        case 'number':
          cell = '<input type="text" data-bind="value:' + data[i].field +'" data-role="numerictextbox" data-type="number" name="' + data[i].field +'" required="'+ validator.required +'" min="'+ validator.min +'"  validationMessage="'+ validator.message+'"/>\
                <span data-for="' + data[i].field +'" class="k-invalid-msg"></span>';
          break;
        case 'date':
          cell = '<input  data-culture="en-US" name="' + data[i].field +'" class="datePicker" data-role="datepicker" data-bind="value: ' + data[i].field +'" data-format="'+ validator.format +'" required="'+ validator.required +'" validationMessage="'+ validator.message+'"/>';
          break;
        case 'boolean':
          cell = '<input type="checkbox" name="data[i].field" data-bind="checked:data[i].field" required="'+ validator.required +'"> validationMessage="'+ validator.message+'"';
          break;
        default:
      }
      dl.append('<dd>'+ cell +'</dd>');
    }

    return '<div class="list-view k-widget">\
          <div class="edit-buttons">\
        <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>\
        <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>\
        </div>\
        <dl>' + dl.html() + '</dl>\
        </div>';

  };

  return {
    template: template,
    editTemplate: editTemplate
  }



});