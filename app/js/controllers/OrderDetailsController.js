App.controller('OrderDetailsController', ['$scope', '$http' ,'$rootScope','$state','$cookieStore', '$mdDialog', '$mdMedia','editCategory','commonFunctions','$stateParams', function($scope,$http,$rootScope,$state,$cookieStore, $mdDialog, $mdMedia,editCategory,commonFunctions,$stateParams) {
    console.log($stateParams.id);
    $scope.orderStatus;
    $http({
        method: 'GET',
        url: $rootScope.app.server_url + '/api/admin/getOrders',
        headers: {'authorization': 'bearer '+$cookieStore.get('accessToken')},
        params: {'orderId' : $stateParams.id}
    }).then(function successCallback(response) {
        $scope.orderDetails = response.data.data[0];

        if($scope.orderDetails.started == false){
            $scope.orderStatus = 'Pending'
        }
        else if($scope.orderDetails.started == true && $scope.orderDetails.completed == false){
            $scope.orderStatus = 'In Progress'
        }
        else{
            $scope.orderStatus = 'Completed'
        }
        console.log($scope.orderDetails);
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
}]);