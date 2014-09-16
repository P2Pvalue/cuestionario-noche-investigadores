'use strict';

describe('nocheInv.version module', function() {
  beforeEach(module('nocheInv.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
