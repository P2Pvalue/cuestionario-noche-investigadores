'use strict';

angular.module('nocheInv.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questions', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('questions/questions.json').success(function(data) {
    $scope.questions = data;
  });
}]);
