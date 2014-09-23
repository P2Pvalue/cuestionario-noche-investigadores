'use strict';

angular.module('nocheInv.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questions', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $http.get('questions/questions.json').success(function(data) {
    $scope.categories = data;
  });

  $scope.selectExample = function(example) {
    example.selected = ! example.selected;
  };

  $scope.isSelected = function(item) {
    var selected;

    if (item.questions !== undefined) {
      // category
      selected = false;

      angular.forEach(item.questions, function(question) {
        selected = selected || $scope.isSelected(question);
      });

    } else if (item.examples !== undefined) {
      // question
      selected = item.others !== undefined && item.others !== "";

      angular.forEach(item.examples, function(example) {
        selected = selected || $scope.isSelected(example);
      });

    } else {
      // example
      selected = item.selected;
    }

    return selected;
  };

  $scope.showResults = function() {
    $location.path('/results');
  };
}]);
