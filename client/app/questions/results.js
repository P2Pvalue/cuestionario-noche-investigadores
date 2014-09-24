'use strict';

angular.module('nocheInv.results', ['ngRoute'])

.controller('ResultsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.achievements = [ "home", "edit" ];
}]);
             
