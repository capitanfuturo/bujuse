'use strict';

angular.module('warehouse.addCustomer', [
    'ngRoute',
    'pascalprecht.translate',
    'CustomerService'
]);

angular.module('warehouse.addCustomer').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/add-customer', {
            templateUrl: 'app/customer/add-customer.html',
            controller: 'AddCustomerCtrl'
        });
    }
]);

angular.module('warehouse.addCustomer')
    .controller('AddCustomerCtrl', [
        '$scope',
        'CustomerService',
        '$location',
        function($scope, CustomerService, $location) {

            //angular functions
            $scope.createCustomer = function() {
                console.log($scope.customer);

                CustomerService.create($scope.customer).then(function successCallback(response) {
                    console.log('return to customer');
                    $location.path('/customer');
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.hasChanged = function() {
                $scope.addDisabled = !$scope.customer.name;
            };

            //private functions
            $scope.cancel = function(){
              $location.path('/customer');
            };

            //init controller
            $scope.customer = {};
            $scope.addDisabled = true;
        }
    ]);
