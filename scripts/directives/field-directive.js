'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }
        return -1;
    };

angularApp.directive('fieldDirective', function($http, $compile) {

    var getTemplateUrl = function(field) {
        var type = field.field_type;
        var templateUrl = './views/directive-templates/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
            'dropdown',
            'hidden',
            'password',
            'radio'
        ];

        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }
    };

    var linker = function(scope, element) {
        element.hide();
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
      if(scope.field.field_type == 'date'){
        scope.field.field_value = new Date(scope.field.field_value);
      }
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
            element.show();

            scope.field.field_name == 'controlType'?scope.onFieldRender():'';
        });
    };
    return {
        template: '<div>{{field}}</div>',
        restrict: 'E',
        scope: {
            field: '=',
            onFieldRender: '='
        },
        link: linker
    };
});