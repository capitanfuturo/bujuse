'use strict';

angular.module('ItemService', []);

angular.module('ItemService').factory('ItemService', ['$http', function($http) {

    var BASE_PATH = '/api/item';

    return {
        get: function() {
            return $http.get(BASE_PATH);
        },

        getById: function(id) {
            return $http.get(BASE_PATH + '/' + id);
        },

        create: function(itemData) {
            return $http.post(BASE_PATH, itemData);
        },

        delete: function(id) {
            return $http.delete(BASE_PATH + '/' + id);
        },

        update: function(itemData) {
            return $http.put(BASE_PATH, itemData);
        }
    }

}]);
