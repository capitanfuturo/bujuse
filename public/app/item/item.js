'use strict';

angular.module('warehouse.item', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ItemService'
]);

angular.module('warehouse.item').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/item', {
      templateUrl: 'app/item/item.html',
      controller: 'ItemCtrl'
    });
  }
]);

angular.module('warehouse.item')
  .controller('ItemCtrl', [
    '$scope',
    'ItemService',
    '$location',
    function($scope, ItemService, $location) {
      //angular functions

      //private functions
      var retrieveItem = function() {
        ItemService.get().then(function successCallback(response) {
          console.log(response.data);
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };


      //init controller
      console.log('init ItemCtrl');
      $scope.rowCollection = [];
      retrieveItem();
    }
  ]);
