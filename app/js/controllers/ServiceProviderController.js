'use strict';
App.controller('ServiceProviderController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia) {

    if(!$cookieStore.get('accessToken')){
        $state.go('page.login');
    }
    $rootScope.access_token = $cookieStore.get('accessToken');


    //setting class of left navigation
    //console.log($state.current.name);

    // Getting Constants value for dashboard tabs
    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getAllServiceProviders',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
    }).then(function successCallback(response) {
        console.log(response.data.data);
        $scope.serviceProviders = response.data.data.driversArray;
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
    $scope.blockCustomer = function(index,id,value){
        var data = {
            service_provider_id : id,
            block : value
        };
        $http({
            method: 'PUT',
            url: $rootScope.app.server_url + '/api/admin/blockServiceProvider',
            headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')},
            data : data
        }).then(function successCallback(response) {
            var wordToUse = "Blocked";
            if(!value){
                wordToUse = "Unblocked";
            }
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('html')))
                    .clickOutsideToClose(true)
                    .title('Alert !!')
                    .textContent('Successfully '+wordToUse)
                    .ok('Got it!')
            );
            $scope.serviceProviders[index].isBlocked = value;
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
    };
    $scope.verifyCustomer = function(index, id, verify){
        console.log(id,verify);
        var data = {
            service_provider_id : id,
            verify : verify
        };
        $http({
            method: 'PUT',
            url: $rootScope.app.server_url + '/api/admin/verifyServiceProvider',
            headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')},
            data : data
        }).then(function successCallback(response) {
            var wordToUse = "Verified";
            if(!verify){
                wordToUse = "Unverified";
            }
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('html')))
                    .clickOutsideToClose(true)
                    .title('Alert !!')
                    .textContent('Successfully '+wordToUse)
                    .ok('Got it!')
            );
            $scope.serviceProviders[index].adminVerified = verify;
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
    };
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $('#datatable').dataTable({
            'destroy'   : true,
            'paging'    : true,  // Table pagination
            'ordering'  : false,  // Column ordering*/
            'info'      : true,  // Bottom left status text
            oLanguage   : {
                sSearch     : 'Search all columns:',
                sLengthMenu : '_MENU_ records per page',
                info        : 'Showing page _PAGE_ of _PAGES_',
                zeroRecords : 'Nothing found - sorry',
                infoEmpty   : 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            },
            "pageLength": 10
        });
    });
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