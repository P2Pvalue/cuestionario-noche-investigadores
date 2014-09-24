'use strict';

angular.module('nocheInv.results', ['ngRoute'])

.controller('ResultsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.achievements = [ "home", "edit", "car", "code-fork" ];

  $scope.finish = function() {
    $location.path('/finish');
  };
}]);
             
