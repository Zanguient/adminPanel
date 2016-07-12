App.factory("editCategory",function(){
    return {
        serviceToEdit : {}
    }
});
App.factory("commonFunctions",function(){
    return {
        objectToFormData : function(obj, form, namespace) {

            var fd = form || new FormData();
            var formKey;
            for(var property in obj) {
                if(obj.hasOwnProperty(property)) {
                    if(namespace) {
                        formKey = namespace + '[' + property + ']';
                    } else {
                        formKey = property;
                    }
                    // if the property is an object, but not a File,
                    // use recursivity.
                    if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                        commonFunctions.objectToFormData(obj[property], fd, property);
                    } else {
                        // if it's a string or a File object
                        fd.append(formKey, obj[property]);
                    }
                }
            }
            return fd;
        }
    }
});

App.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

App.factory("getAPIs",function(){
    return {
        allServices : []
    }
});

App.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});