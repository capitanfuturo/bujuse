'use strict';

angular.module('warehouse.item', ['ngRoute']);

angular.module('warehouse.item').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/item', {
      templateUrl: 'app/item/item.html',
      controller: 'ItemCtrl'
    });
  }
]);

angular.module('warehouse.item').controller('ItemCtrl', ['$scope', function($scope) {
  //angular functions
  //private functions
  //init controller
}]);
