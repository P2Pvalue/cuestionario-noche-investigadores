'use strict';

// Declare app level module which depends on views, and components
angular.module('nocheInv', [
  'ngRoute',
  'ui.bootstrap',
  'pascalprecht.translate',
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
}]).
config(function ($translateProvider) {
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.json'
    })
    .useSanitizeValueStrategy('escaped')
    .registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
     })
    .fallbackLanguage('en')
    .determinePreferredLanguage();
}).
service('sharedProperties', function() {
  var results = {},
      questions = {};

  return {
    getQuestions: function() {
      return questions;
    },

    setQuestions: function(value) {
      questions = value;
      return questions;
    },

    getResults: function() {
      return results;
    },

    setResults: function(value) {
      results = value;
      return results;
    }
  };
});
