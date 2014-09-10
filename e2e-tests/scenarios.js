'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('nocheInv', function() {

  browser.get('index.html');

  it('should automatically redirect to /questions when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/questions");
  });


  describe('questions', function() {

    beforeEach(function() {
      browser.get('index.html#/questions');
    });


    it('should render questions when user navigates to /questions', function() {
      expect(element.all(by.css('[ng-view] li')).first().getText()).
        toMatch(/Alojarte/);
    });

  });

});
