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

  $scope.selectExample = function(example) {
    example.selected = ! example.selected;
  };

  $scope.isSelected = function(item) {
    if (item.examples !== undefined) {
      // question
      var selected = false;

      angular.forEach(item.examples, function(example) {
        selected = selected || example.selected;
      });

      return selected;
    } else {
      // example
      return item.selected;
    }
  };
}]);
