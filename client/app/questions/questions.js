'use strict';

angular.module('nocheInv.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questions', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ['$scope', '$http', '$location', 'sharedProperties', '$translate', function($scope, $http, $location, sharedProperties, $translate) {
  $http.get('questions/questions.' + $translate.use() + '.json' + '?nocache=' + (new Date()).getTime()).success(function(data) {
    sharedProperties.setQuestions(data);
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
    var results = getResults();

    $http.post('/results', results)
    .success(function(data) {
      sharedProperties.setResults(data);

      $location.path('/results');
    })
    .error(function(data) {
      alert(data);
    });
  };

  var getResults = function() {
    var results = {};

    angular.forEach($scope.categories, function(category) {
      if ($scope.isSelected(category)) {
        results[category.id] = results[category.id] || {};

        angular.forEach(category.questions, function(question) {
          if ($scope.isSelected(question)) {
            results[category.id][question.id] = results[category.id][question.id] || {};

            angular.forEach(question.examples, function(example) {
              if ($scope.isSelected(example)) {
                results[category.id][question.id][example.id] = true;
              }
            });

            if (question.others !== undefined && question.others !== "") {
              results[category.id][question.id].others = question.others;
            }
          }
        });
      }
    });

    return results;
  };
}]);
