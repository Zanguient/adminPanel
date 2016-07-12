App.controller('OrdersController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','editCategory','commonFunctions','$stateParams', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,editCategory,commonFunctions,$stateParams) {
    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getAllOrders',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')}
    }).then(function successCallback(response) {
        console.log(response.data.data);
        $scope.orders = response.data.data;
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


    $scope.getOrderDetails = function(order_id){
        $state.go('app.order_details', { 'id':order_id});
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