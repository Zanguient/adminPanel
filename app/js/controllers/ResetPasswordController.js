App.controller('ResetPasswordController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','editCategory','$location', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,editCategory,location) {
    console.log(location.$$search.user);
    if(!location.$$search.user || !location.$$search.code){
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('html')))
                .clickOutsideToClose(true)
                .title('Alert !!')
                .textContent('Sorry! This link has been expired.')
                .ok('Got it!')
        );
    }

    $scope.resetPassword = function(){
        console.log($scope.password);
        console.log($scope.confirmPassword);
        console.log(location.$$search.user);
        console.log(location.$$search.code);
        if($scope.confirmPassword != $scope.password){
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('html')))
                    .clickOutsideToClose(true)
                    .title('Alert !!')
                    .textContent('Password and confirm password do not match.')
                    .ok('Got it!')
            );
        }
        else{
            var dataToSend = {
                OTP: location.$$search.code,
                id: location.$$search.user,
                password : $scope.password
            };
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/api/customer/resetPassword',
                data: dataToSend
                //headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
            }).then(function successCallback(response) {
                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('html')))
                        .clickOutsideToClose(true)
                        .title('Note !!')
                        .textContent('Password has been successfully updated.')
                        .ok('Got it!')
                );
                console.log(response)
            }, function errorCallback(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('html')))
                        .clickOutsideToClose(true)
                        .title('Note !!')
                        .textContent('Sorry! This link has been expired.')
                        .ok('Got it!')
                );
            });
        }
    }
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