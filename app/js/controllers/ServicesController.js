'use strict';
App.controller('ServicesController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','editCategory','getAPIs', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,editCategory,getAPIs) {

    $scope.servicesAvailable = false;
    $scope.serviceToEdit = {};

    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getServices',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
    }).then(function successCallback(response) {
        if(response.data.data.length > 0){
            $scope.servicesAvailable = true;
            $scope.services = response.data.data;
            getAPIs.allServices = response.data.data;
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

    $scope.$on('getServices', function (event, args) {
        $scope.services = args.services;
        console.log($scope.services);
    });


    $scope.openCreateCategoryModal = function() {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/partials/create-category.html',
                parent: 'html',
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
        editCategory.serviceToEdit = {};
    };

    $scope.openEditCategoryModal = function(index){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/partials/create-category.html',
                parent: 'html',
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
        editCategory.serviceToEdit = $scope.services[index];
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