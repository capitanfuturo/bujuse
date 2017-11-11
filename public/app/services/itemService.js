'use strict';

angular.module('ItemService', ['AuthenticationService']);

angular.module('ItemService').factory('ItemService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/item';
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

    create: function (itemData) {
      return $http.post(BASE_PATH, itemData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id, HEADERS);
    },

    update: function (itemData) {
      return $http.put(BASE_PATH, itemData, HEADERS);
    }
  }

}]);
