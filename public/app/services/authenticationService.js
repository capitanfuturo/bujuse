'use strict';

angular.module('AuthenticationService', []);

angular.module('AuthenticationService').service('AuthenticationService', ['$http', '$window', '$location', function ($http, $window,$location) {

  var TOKEN_NAME = 'bujuse-token';

  var saveToken = function (token) {
    $window.localStorage.setItem(TOKEN_NAME, token);
  };

  var getToken = function () {
    return $window.localStorage.getItem(TOKEN_NAME);
  };

  var isLoggedIn = function () {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function () {
    if (isLoggedIn()) {
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    }
  };

  var login = function (user) {
    return $http.post('/api/login', user).then(function successCallback(response) {
      saveToken(response.data.token);
      $location.path('/operation');
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  var logout = function () {
    $window.localStorage.removeItem(TOKEN_NAME);
  };

  return {
    saveToken: saveToken,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    currentUser: currentUser,
    // register = function(user) {
    //   return $http.post('/api/register', user).success(function(data){
    //     saveToken(data.token);
    //   });
    // },
    login: login,
    logout: logout
  };

}]);
