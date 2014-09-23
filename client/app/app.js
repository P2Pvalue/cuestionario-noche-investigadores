'use strict';

// Declare app level module which depends on views, and components
angular.module('nocheInv', [
  'ngRoute',
  'ui.bootstrap',
  'nocheInv.questions',
  'nocheInv.results',
  'nocheInv.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/results', {
      templateUrl: 'questions/results.html',
      controller:  'ResultsCtrl'
    }).
    otherwise({
      redirectTo: '/questions'
    });
}]);
