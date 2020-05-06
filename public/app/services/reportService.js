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
    },
    getFiveYearsSales: function () {
      return $http.get(BASE_PATH + '/five-years-sales', HEADERS);
    },
    getTarget: function(seasonId) {
      return $http.get(BASE_PATH + '/target/' + seasonId, HEADERS);
    },
    getCustomersTotalSales: function () {
      return $http.get(BASE_PATH + '/customers-total-sales', HEADERS);
    },
    getCustomerSales: function (customerId) {
      return $http.get(BASE_PATH + '/customer-sales/' + customerId, HEADERS);
    },
    getYearlySales: function (year) {
      return $http.get(BASE_PATH + '/yearly-sales/' + year, HEADERS);
    },
    getNotSentOrders: function (year) {
      return $http.get(BASE_PATH + '/not-sent-orders/', HEADERS);
    },
  }

}]);
