'use strict';

angular.module('nocheInv.results', ['ngRoute'])

.controller('ResultsCtrl', ['$scope', '$http', '$location', 'sharedProperties', function($scope, $http, $location, sharedProperties) {
  $scope.achievements = Object.keys(sharedProperties.getResults());

  $scope.finish = function() {
    $location.path('/finish');
  };
}]);
             
