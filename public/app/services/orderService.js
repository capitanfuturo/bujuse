'use strict';

angular.module('OrderService', ['AuthenticationService']);

angular.module('OrderService').factory('OrderService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/order';
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

    create: function (orderData) {
      return $http.post(BASE_PATH, orderData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id, HEADERS);
    },

    changeState: function (id, state) {
      return $http.put(BASE_PATH + '/' + id + '/state', state, HEADERS);
    }
  }

}]);
