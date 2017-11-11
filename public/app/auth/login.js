'use strict';

angular.module('warehouse.login', [
  'ngRoute',
  'pascalprecht.translate',
  'AuthenticationService'
]);

angular.module('warehouse.login').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'LoginCtrl'
    });
  }
]);

angular.module('warehouse.login')
  .controller('LoginCtrl', [
    '$scope',
    '$location',
    'AuthenticationService',
    function ($scope, $location, AuthenticationService) {

      //angular functions
      $scope.onSubmit = function(){
        AuthenticationService.login($scope.credentials);
        $location.path('/operation');
      }

      //private functions

      //init controller
      $scope.credentials = {
        email: "",
        password: ""
      };
    }
  ]);
