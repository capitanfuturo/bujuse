'use strict';

angular.module('warehouse.season', [
    'ngRoute',
    'pascalprecht.translate',
    'smart-table',
    'SeasonService'
]);

angular.module('warehouse.season').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/season', {
            templateUrl: 'app/season/season.html',
            controller: 'SeasonCtrl'
        });
    }
]);

angular.module('warehouse.season')
    .controller('SeasonCtrl', [
        '$scope',
        'SeasonService',
        '$location',
        function($scope, SeasonService, $location) {

            //angular functions
            $scope.add = function() {
                $location.path('/add-season');
            };

            $scope.edit = function(row) {
              var seasonId = row._id;
              $location.path('/edit-season/' + seasonId);
            };

            $scope.remove = function(row) {
                var id = row._id;
                SeasonService.delete(id).then(function successCallback(response) {
                    var index = $scope.rowCollection.indexOf(row);
                    if (index !== -1) {
                        $scope.rowCollection.splice(index, 1);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            //private functions
            var retrieveSeasons = function() {
                SeasonService.get().then(function successCallback(response) {
                    $scope.rowCollection = response.data
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            //init controller
            $scope.rowCollection = [];
            retrieveSeasons();
        }
    ]);
