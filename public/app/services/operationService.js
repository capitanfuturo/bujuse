'use strict';

angular.module('OperationService', []);

angular.module('OperationService').factory('OperationService', ['$http', function($http) {

  return {
    get: function() {
      return $http.get('/api/operation');
    },

    create: function(operationData) {
      return $http.post('/api/operation', operationData);
    },

    delete: function(id) {
      return $http.delete('/api/operation/' + id);
    }
  }

}]);
