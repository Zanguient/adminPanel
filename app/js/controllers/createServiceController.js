App.controller('createServiceController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','editCategory','getAPIs', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,editCategory,getAPIs) {
    /*$scope.subcategoryCount = 1;
    $scope.subcategoryPropertiesCount = 1;*/


    $scope.demo = {
        showTooltip : false,
        tipDirection : ''
    };
    $scope.$watch('demo.tipDirection',function(val) {
        if (val && val.length ) {
            $scope.demo.showTooltip = true;
        }
    });
    $scope.error = false;



    $scope.categoryProperties = [];
    $scope.categoryResponses = {};
    console.log("gdshsdjhdgdfhs",$scope.$parent);
    console.log(editCategory);

    $scope.category = {
        name            : "",
        subcategories   : []
    };


    $scope.checkIfString = function (data) {
        if(typeof data === 'string'){
            return true;
        }
        else{
            return false;
        }
    };


    $scope.category.subcategories = [{
        name:"",
        properties:[],
        photo:{}
    }];
    $scope.submitButtonText = "Submit";
    $scope.submitButtonDisabled = false;
/*

    $scope.addCategoryProperties = function(){
        $scope.category.properties.push({
            name            : "",
            responses       : []
        });
    };
*/
    $scope.addSubCategory = function(){
        $scope.category.subcategories.push({
            name            :"",
            properties      :[],
            photo           :{}
        });
    };
    $scope.type = "Create";
    if(editCategory.serviceToEdit.name) {
        $scope.category = angular.copy(editCategory.serviceToEdit);
        $scope.type = "Edit";
        delete $scope.category.__v;
    }

    /*$scope.addCatPropReponses = function(index){
        if($scope.category.properties[index].responses && $scope.category.properties[index].responses.indexOf($scope.category.properties[index].response) > -1){
            alert("You can't enter same response again.");
            return false;
        }
        else if(!$scope.category.properties[index].response){
            alert("Please enter a valid response.");
            return false;
        }
        if($scope.category.properties[index].responses){
            $scope.category.properties[index].responses.push($scope.category.properties[index].response);
        }
        else{
            $scope.category.properties[index].responses = [];
            $scope.category.properties[index].responses.push($scope.category.properties[index].response);
        }
    };*/

    /*$scope.removeCatResponse = function(parent,index){
        $scope.category.properties[parent].responses.splice(index,1);
    };
*/
    $scope.addSubCategoryProperties = function(index){
        $scope.category.subcategories[index].properties.push({
            name            : "",
            responses       : []
        });
    };

    $scope.removeSubCatResponse = function(grandparent,parent,index){
        $scope.category.subcategories[grandparent].properties[parent].responses.splice(index,1);
    };

    $scope.addSubCatPropReponses = function(parent,index){
        if(!$scope.category.subcategories[parent].properties[index].response){
            alert("Please enter a valid response.");
            return false;
        }
        $scope.category.subcategories[parent].properties[index].responses.push($scope.category.subcategories[parent].properties[index].response);
    };

    $scope.removeSubCatProperty = function(parent,index){
        $scope.category.subcategories[parent].properties.splice(index,1);
    };

    $scope.removeSubCategory = function(index){
        $scope.category.subcategories.splice(index,1);
    };

    /*$scope.removeCatProperty = function(index){
        console.log($scope.category.properties);
        $scope.category.properties.splice(index,1);
    };*/

    //Submit Form to add a new service
    $scope.submit = function(type){
            console.log($scope.category);
            //if(type == "Create"){
            for(var key in $scope.category.properties){
                if($scope.category.properties[key] && $scope.category.properties[key].response)
                    delete $scope.category.properties[key].response;
            }
            for(var key in $scope.category.subcategories){
                if(document.getElementById('subcategories.photo'+key).files[0]){
                    $scope.category.subcategories[key].photo = document.getElementById('subcategories.photo'+key).files[0];
                }
                else if($scope.category.subcategories[key].photo){
                    delete $scope.category.subcategories[key].photo;
                }
                else{
                    $scope.error = true;
                    return false;
                }
                /*if(document.getElementById('subcategories.photo'+key).files[0]){
                    $scope.category.subcategories[key].photo = document.getElementById('subcategories.photo'+key).files[0];
                }
                else{

                }*/
                for(var innerkey in $scope.category.subcategories[key].properties){
                    if($scope.category.subcategories[key] && $scope.category.subcategories[key].properties[innerkey] && $scope.category.subcategories[key].properties[innerkey].response)
                        delete $scope.category.subcategories[key].properties[innerkey].response;
                }
            }
            var url = "";
            var method = "POST";
            if($scope.category._id){
                url = $rootScope.app.server_url + '/api/admin/editService';
                var method = "PUT"
            }
            else{
                url = $rootScope.app.server_url + '/api/admin/addService';
            }
            var form = new FormData();
            if($scope.category._id){
                form.append("_id", $scope.category._id);
            }
            form.append("name", $scope.category.name);
            for(var key1 in $scope.category.subcategories){

                if($scope.category.subcategories[key1]._id){
                    form.append("subcategories["+key1+"][_id]", $scope.category.subcategories[key1]._id);
                }
                form.append("subcategories["+key1+"][subcategory_label]", $scope.category.subcategories[key1].subcategory_label);
                form.append("subcategories["+key1+"][name]", $scope.category.subcategories[key1].name);
                if($scope.category.subcategories[key1].photo){
                    form.append("subcategories["+key1+"][photo]", $scope.category.subcategories[key1].photo);
                }
                for(var key2 in $scope.category.subcategories[key1].properties){
                    if($scope.category.subcategories[key1].properties[key2]._id){
                        form.append("subcategories["+key1+"][properties]["+key2+"][_id]", $scope.category.subcategories[key1].properties[key2]._id);
                    }
                    form.append("subcategories["+key1+"][properties]["+key2+"][name]", $scope.category.subcategories[key1].properties[key2].name);
                    form.append("subcategories["+key1+"][properties]["+key2+"][property_label]", $scope.category.subcategories[key1].properties[key2].property_label);
                    for(var key3 in $scope.category.subcategories[key1].properties[key2].responses){
                        form.append("subcategories["+key1+"][properties]["+key2+"][responses]["+key3+"]", $scope.category.subcategories[key1].properties[key2].responses[key3]);
                    }
                }
            }
            console.log("form",form);
            $scope.submitButtonText = "Please wait...";
            $scope.submitButtonDisabled = true;
            console.log($rootScope.pageBusy);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": method,
                "headers": {
                    "authorization": 'bearer '+$cookieStore.get('accessToken')
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            };

            $.ajax(settings).done(function (response) {
                var wordToUse = "added";
                if(type == "Edit"){
                    wordToUse = "edited";
                }
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('html')))
                        .clickOutsideToClose(true)
                        .title('Success !!')
                        .textContent('Category has been '+wordToUse+' successfully.')
                        .ok('Got it!')
                );

                $scope.submitButtonText = "Submit";
                $scope.submitButtonDisabled = false;
                $http({
                    method: 'GET',
                    url: $rootScope.app.server_url + '/api/admin/getServices',
                    headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
                }).then(function successCallback(response) {
                    if(response.data.data.length > 0){
                        $rootScope.$broadcast('getServices', { services: response.data.data });
                        //$scope.servicesAvailable = true;
                        //getAPIs.allServices = response.data.data;
                    }
                }, function errorCallback(response) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('html')))
                            .clickOutsideToClose(true)
                            .title('Alert !!')
                            .textContent('Unable to Process! Please try again later.')
                            .ok('Got it!')
                    );
                });
            });
        /*}
        else{

        }*/
    }
}]);