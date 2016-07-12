'use strict';
App.controller('DashboardSidebarController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia) {
    $scope.defaultDashboard = $scope.defaultServices = $scope.defaultCustomers = $scope.defaultServiceProviders = false;

    $scope.$on("$stateChangeSuccess", function updatePage() {
        $scope.changeClass($state.current.name);
    });
    $scope.changeClass = function(state){
        switch(state) {
            case 'app.dashboard':
                $scope.defaultDashboard = true;
                $scope.defaultServices = $scope.defaultCustomers = $scope.defaultServiceProviders = $scope.defaultOrders = false;
                break;
            case 'app.customers':
                $scope.defaultCustomers = true;
                $scope.defaultDashboard = $scope.defaultServices = $scope.defaultServiceProviders = $scope.defaultOrders = false;

                break;
            case 'app.services':
                $scope.defaultServices = true;
                $scope.defaultDashboard = $scope.defaultCustomers = $scope.defaultServiceProviders = $scope.defaultOrders = false;

                break;
            case 'app.serviceproviders':
                $scope.defaultServiceProviders = true;
                $scope.defaultDashboard = $scope.defaultServices = $scope.defaultCustomers = $scope.defaultOrders = false;

                break;
            case 'app.orders':
                $scope.defaultOrders = true;
                $scope.defaultDashboard = $scope.defaultServices = $scope.defaultCustomers = $scope.defaultServiceProviders = false;

                break;
            default:
                console.log();
                break;
        }
    }
    $scope.changeClass($state.current.name);
}]);
