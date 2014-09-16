'use strict';

// Declare app level module which depends on views, and components
angular.module('nocheInv', [
  'ngRoute',
  'ui.bootstrap',
  'nocheInv.questions',
  'nocheInv.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/questions'});
}]);
