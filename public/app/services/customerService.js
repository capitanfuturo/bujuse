'use strict';

angular.module('CustomerService', ['AuthenticationService']);

angular.module('CustomerService').factory('CustomerService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/customer';
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

    create: function (customerData) {
      return $http.post(BASE_PATH, customerData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id, HEADERS);
    },

    update: function (customerData) {
      return $http.put(BASE_PATH, customerData, HEADERS);
    }
  }

}]);
