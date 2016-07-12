
App.controller('LoginController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', function($scope,$http,$rootScope,$state,$cookieStore) {
    'use strict';
    if($cookieStore.get('accessToken')){
        $state.go('app.dashboard');
    }
    $scope.buttonText = "Login";
    $scope.buttonDisable = false;

    $scope.login = function () {
        $scope.buttonText = "Logging In...";
        $scope.buttonDisable = true;
        if($scope.user.email && $scope.user.password){
            var data = {
                email       :   $scope.user.email,
                password    :   $scope.user.password
            };
            $http({
                method: 'POST',
                url: $rootScope.app.server_url + '/api/admin/login',
                data: data
            }).then(function successCallback(response) {
                $scope.authMsg = false;
                //alert(response.data.data.access_token);
                $cookieStore.put('accessToken',response.data.data.access_token);
                //alert($cookieStore.get('accessToken'));
                $state.go('app.dashboard');
            }, function errorCallback(response) {
                $scope.buttonDisable = false;
                $scope.buttonText = "Login";
                if(response.data){
                    $scope.authMsg = response.data.message;
                }
                else{
                    $scope.authMsg = "Unable to connect! Please try again later.";
                }
                console.log("error",response.data);

            });
        }
        else{
            return false;
        }
    };
    $scope.buttonClick = function(){
        if($scope.loginForm.$valid){
            $scope.login();
        }
        else{
            $scope.authMsg = false;
        }
    }
}]);