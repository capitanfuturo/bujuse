'use strict';

angular.module('EnumService', []);

angular.module('EnumService').factory('GenderService', function() {

  return {
    get: function() {
      return ['M', 'F', 'U', 'BM', 'BF', 'BU'];
    }
  }

});

angular.module('EnumService').factory('CategoryService', function() {

  return {
    get: function() {
      return ['CSP', 'TOP', 'VES', 'PAN', 'TUT', 'GON', 'GIL', 'FEL', 'TRI', 'CAP', 'BAG', 'SCI'];
    }
  }

});

angular.module('EnumService').factory('GenderService', function() {

  return {
    get: function(gender) {
      if (gender == 'BM' || gender == 'BF' || gender == 'BU') {
        return ['1', '3', '5', '7', '9', '11'];
      } else {
        return ['S', 'M', 'L', 'U'];
      }
    }
  }

});
