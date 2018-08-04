'use strict';

angular.module('SeasonService', ['AuthenticationService']);

angular.module('SeasonService').factory('SeasonService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/season';
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

    create: function (seasonData) {
      return $http.post(BASE_PATH, seasonData, HEADERS);
    },

    delete: function (id) {
      return $http.delete(BASE_PATH + '/' + id, HEADERS);
    },

    update: function (seasonData) {
      return $http.put(BASE_PATH, seasonData, HEADERS);
    }
  }

}]);
