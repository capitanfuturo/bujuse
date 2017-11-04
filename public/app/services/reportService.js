'use strict';

angular.module('ReportService', []);

angular.module('ReportService').factory('ReportService', ['$http', function ($http) {

  return {
    getStock: function () {
      return $http.get('/api/report/stock');
    }
  }

}]);
