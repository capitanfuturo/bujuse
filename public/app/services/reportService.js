'use strict';

angular.module('ReportService', ['AuthenticationService']);

angular.module('ReportService').factory('ReportService', ['$http', 'AuthenticationService', function ($http, AuthenticationService) {

  var BASE_PATH = '/api/report';
  var HEADERS = {
    headers: {
      Authorization: 'Bearer ' + AuthenticationService.getToken()
    }
  };

  return {
    getStock: function () {
      return $http.get(BASE_PATH + '/stock', HEADERS);
    },
    getMonthlySales: function () {
      return $http.get(BASE_PATH + '/monthly-sales', HEADERS);
    },
    getQuarterlySales: function () {
      return $http.get(BASE_PATH + '/quarterly-sales', HEADERS);
    }
  }

}]);
