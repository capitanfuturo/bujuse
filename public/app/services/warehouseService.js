'use strict';

angular.module('WarehouseService', ['AuthenticationService']);

angular.module('WarehouseService').factory('WarehouseService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/warehouse';
  var HEADERS = {
    headers: {
      Authorization: 'Bearer ' + AuthenticationService.getToken()
    }
  };

  return {
    get: function () {
      return $http.get(BASE_PATH, HEADERS);
    },

    getById: function (id) {
      return $http.get(BASE_PATH + '/' + id, HEADERS);
    },

    create: function (warehouseData) {
      return $http.post(BASE_PATH, warehouseData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id, HEADERS);
    },

    update: function (warehouseData) {
      return $http.put(BASE_PATH, warehouseData, HEADERS);
    }
  }

}]);
