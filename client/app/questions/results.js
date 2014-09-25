'use strict';

angular.module('nocheInv.results', ['ngRoute'])

.controller('ResultsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.achievements = 
    [ 
      "home", "edit", "car", "code-fork", "globe", "gears", "exchange", "money", "newspaper-o", "lemon-o"
    ];

  $scope.finish = function() {
    $location.path('/finish');
  };
}]);
             
