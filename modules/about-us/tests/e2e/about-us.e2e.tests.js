'use strict';

describe('About us E2E Tests:', function () {
  describe('Test About us page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/about-us');
      expect(element.all(by.repeater('about-u in about-us')).count()).toEqual(0);
    });
  });
});
