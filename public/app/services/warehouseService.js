'use strict';

angular.module('WarehouseService', []);

angular.module('WarehouseService').factory('WarehouseService', ['$http', function($http) {

  return {
    get: function() {
      return $http.get('/api/warehouse');
    },

    create: function(warehouseData) {
      return $http.post('/api/warehouse', warehouseData);
    },

    delete: function(id) {
      return $http.delete('/api/warehouse/' + id);
    }
  }

}]);
