'use strict';

angular.module('nocheInv.results', ['ngRoute'])

.controller('ResultsCtrl', ['$scope', '$http', '$location', 'sharedProperties', function($scope, $http, $location, sharedProperties) {
  $scope.achievements = [];

  var findIcon = function(key) {
    var icon,
        questions = sharedProperties.getQuestions();

    angular.forEach(questions, function(question) {
      if (question.id === key)
        icon = question.icon;
    });

    return icon;
  };

  angular.forEach(sharedProperties.getResults(), function(value, key) {
    if (key !== "_id") {
      $scope.achievements.push(findIcon(key));
    }
  });

  $scope.send = function() {
    var data = sharedProperties.getResults();
    data.email = $scope.email;

    $http.post('/finish', data)
    .success(function() {
      $scope.finish();
    })
    .error(function(data) {
      alert(data);
    });
  };

  $scope.finish = function() {
    $location.path('/finish');
  };
}]);
             
