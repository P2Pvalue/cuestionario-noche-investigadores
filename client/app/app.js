'use strict';

// Declare app level module which depends on views, and components
angular.module('nocheInv', [
  'ngRoute',
  'ui.bootstrap',
  'nocheInv.questions',
  'nocheInv.results',
  'nocheInv.finish',
  'nocheInv.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/results', {
      templateUrl: 'questions/results.html',
      controller:  'ResultsCtrl'
    }).
    when('/finish', {
      templateUrl: 'questions/finish.html',
      controller:  'FinishCtrl'
    }).
    otherwise({
      redirectTo: '/questions'
    });
}]);
