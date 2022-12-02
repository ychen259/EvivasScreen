'use strict';

describe('Dinings E2E Tests:', function () {
  describe('Test Dinings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/dinings');
      expect(element.all(by.repeater('dining in dinings')).count()).toEqual(0);
    });
  });
});
