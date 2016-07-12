'use strict';
App.controller('CustomersController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia) {

    if(!$cookieStore.get('accessToken')){
        $state.go('page.login');
    }
    $rootScope.access_token = $cookieStore.get('accessToken');


    //setting class of left navigation
    //console.log($state.current.name);

    // Getting Constants value for dashboard tabs
  //  console.log("  $rootScope.app.server_url + '/api/admin/createHospital ",$rootScope.app.server_url + '/api/admin/createHospital');

    $scope.submit = function(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": $rootScope.app.server_url + '/api/admin/createHospital',
            "method": 'POST',
            "headers": {
                "authorization": 'bearer '+$cookieStore.get('accessToken')
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": {"name" : "mytestHospital"}
        };

        $.ajax(settings).done(function (response) {
            console.log(":::::::::;",response)
        });
    };
}]);


function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}