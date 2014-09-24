'use strict';

angular.module('nocheInv.finish', ['ngRoute'])

.controller('FinishCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
  $scope.finish = function() {
    $timeout(function() {
      $location.path('/');
    }, 10000);
  };
}]);
             
