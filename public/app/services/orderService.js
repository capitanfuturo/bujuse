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
    get: function (showDelivered) {
      if(showDelivered){
        return $http.get(BASE_PATH + '/?showDelivered=true', HEADERS);
      }else {
        return $http.get(BASE_PATH + '/?showDelivered=false', HEADERS);
      }
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

    edit: function (orderData) {
      return $http.put(BASE_PATH, orderData, HEADERS);
    }
  }

}]);
