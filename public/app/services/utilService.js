'use strict';

angular.module('UtilService', []);

angular.module('UtilService').factory('TargetService', function() {
  return {
      getTargetPrice: function(price) {
        return price / 2;
      }
    }
});
