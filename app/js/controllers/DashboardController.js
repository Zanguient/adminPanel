'use strict';
App.controller('DashboardController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','$timeout','$interval', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,$timeout,$interval) {

    if(!$cookieStore.get('accessToken')){
        $state.go('page.login');
    }
    $rootScope.access_token = $cookieStore.get('accessToken');


    //setting class of left navigation
    //console.log($state.current.name);

    // Getting Constants value for dashboard tabs
    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getCounts',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
    }).then(function successCallback(response) {
        $scope.counts = response.data.data;
        console.log($scope.counts);
        $scope.chartOrderData = [{
            "label": "Orders",
            "color": "#1f92fe",
            "data": $scope.counts.graphCounts
        }]
    }, function errorCallback(response) {
        console.log(response);
        if(response.status == 401){
            $cookieStore.remove('accessToken');
            $state.go('page.login');
        }
        else{
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('html')))
                    .clickOutsideToClose(true)
                    .title('Alert !!')
                    .textContent('Unable to Process! Please try again later.')
                    .ok('Got it!')
            );
        }
    });

    /*var vm = this;
    vm.orders = [];
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1).notVisible(),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];*/
    /*$resource('data.json').query().$promise.then(function(persons) {
        vm.persons = persons;
    });
*/
    $interval(function(){
        $http({
            method: 'GET',
            url: $rootScope.app.server_url + '/api/admin/getOrders',
            headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
        }).then(function successCallback(response) {
            $scope.orders = response.data.data;
            console.log($scope.orders);
        }, function errorCallback(response) {
            console.log(response);
            if(response.status == 401){
                $cookieStore.remove('accessToken');
                $state.go('page.login');
            }
            else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('html')))
                        .clickOutsideToClose(true)
                        .title('Alert !!')
                        .textContent('Unable to Process! Please try again later.')
                        .ok('Got it!')
                );
            }
        });
        $http({
            method: 'GET',
            url: $rootScope.app.server_url + '/api/admin/getCounts',
            headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
        }).then(function successCallback(response) {
            $scope.counts = response.data.data;
            console.log($scope.counts);
            $scope.chartOrderData = [{
                "label": "Orders",
                "color": "#1f92fe",
                "data": $scope.counts.graphCounts
            }]
        }, function errorCallback(response) {
            console.log(response);
            if(response.status == 401){
                $cookieStore.remove('accessToken');
                $state.go('page.login');
            }
            else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('html')))
                        .clickOutsideToClose(true)
                        .title('Alert !!')
                        .textContent('Unable to Process! Please try again later.')
                        .ok('Got it!')
                );
            }
        });
    },30000);

    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getOrders',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
    }).then(function successCallback(response) {
        $scope.orders = response.data.data;
        console.log($scope.orders);
    }, function errorCallback(response) {
        console.log(response);
        if(response.status == 401){
            $cookieStore.remove('accessToken');
            $state.go('page.login');
        }
        else{
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('html')))
                    .clickOutsideToClose(true)
                    .title('Alert !!')
                    .textContent('Unable to Process! Please try again later.')
                    .ok('Got it!')
            );
        }
    });

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

    /*var dtInstance;
    $timeout(function () {
        $scope.loading = false;
        if (!$.fn.dataTable) return;
        dtInstance           = $('#datatable').dataTable({
            'paging'    : true,  // Table pagination
            'ordering'  : true,  // Column ordering
            'info'      : true,  // Bottom left status text
            oLanguage   : {
                sSearch     : 'Search all columns:',
                sLengthMenu : '_MENU_ records per page',
                info        : 'Showing page _PAGE_ of _PAGES_',
                zeroRecords : 'Nothing found - sorry',
                infoEmpty   : 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            },
            "pageLength": 50
        });

    },1000);*/


    $scope.getOrderDetails = function(order_id){
        $state.go('app.order_details', { 'id':order_id});
    }
}]);