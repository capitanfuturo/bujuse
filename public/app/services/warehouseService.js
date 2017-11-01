'use strict';

angular.module('WarehouseService', []);

angular.module('WarehouseService').factory('WarehouseService', ['$http', function ($http) {

  var BASE_PATH = '/api/warehouse';

  return {
    get: function () {
      return $http.get(BASE_PATH);
    },

    getById: function (id) {
      return $http.get(BASE_PATH + '/' + id);
    },

    create: function (warehouseData) {
      return $http.post(BASE_PATH, warehouseData);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id);
    },

    update: function (warehouseData) {
      return $http.put(BASE_PATH, warehouseData);
    }
  }

}]);
