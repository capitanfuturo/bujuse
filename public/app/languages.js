'use strict';

angular.module('app').config(function($translateProvider) {
  //translation
  $translateProvider.translations('it', {});
  $translateProvider.translations('en', {});

  //options
  $translateProvider.preferredLanguage('it');
  //$translateProvider.useSanitizeValueStrategy('escape');
});
