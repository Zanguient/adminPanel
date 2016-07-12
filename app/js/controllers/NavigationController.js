'use strict';
App.controller('NavigationController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', function($scope,$http,$rootScope,$state,$cookieStore) {
    $scope.logout = function(){
        $cookieStore.remove('accessToken');
        $state.go('page.login');
    }
}]);