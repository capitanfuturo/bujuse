'use strict';

angular.module('OperationService', []);

angular.module('OperationService').factory('OperationService', ['$http', function ($http) {

  var BASE_PATH = '/api/operation';

  return {
    get: function () {
      return $http.get(BASE_PATH);
    },

    getById: function (id) {
      return $http.get(BASE_PATH + '/' + id);
    },

    create: function (operationData) {
      return $http.post(BASE_PATH, operationData);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH +'/' + id);
    },

    update: function (operationData) {
      return $http.put(BASE_PATH, operationData);
    }
  }

}]);
