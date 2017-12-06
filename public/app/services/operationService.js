'use strict';

angular.module('OperationService', ['AuthenticationService']);

angular.module('OperationService').factory('OperationService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/operation';
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

    getByDays: function (days) {
      return $http.get(BASE_PATH + '/days/' + days, HEADERS);
    },

    create: function (operationData) {
      return $http.post(BASE_PATH, operationData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH +'/' + id, HEADERS);
    },

    update: function (operationData) {
      return $http.put(BASE_PATH, operationData, HEADERS);
    }
  }

}]);
