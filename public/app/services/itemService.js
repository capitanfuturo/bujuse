'use strict';

angular.module('ItemService', []);

angular.module('ItemService').factory('ItemService', ['$http', function($http) {

  return {
    get: function() {
      return $http.get('/api/item');
    },

    create: function(itemData) {
      return $http.post('/api/item', itemData);
    },

    delete: function(id) {
      return $http.delete('/api/item/' + id);
    }
  }

}]);
