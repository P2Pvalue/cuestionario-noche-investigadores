'use strict';

describe('nocheInv.questions module', function() {
  var scope, ctrl, $httpBackend;

  beforeEach(module('nocheInv.questions'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('questions/questions.json').
      respond([{text: 'Perform tests'}]);

    scope = $rootScope.$new();
    ctrl = $controller('questionsCtrl', {$scope: scope});
  }));


  it('should create questions model with 1 question fetched from xhr', function() {
    expect(scope.questions).toBeUndefined();
    $httpBackend.flush();

    expect(scope.questions).toEqual([{text: 'Perform tests'}]);
  });
});
