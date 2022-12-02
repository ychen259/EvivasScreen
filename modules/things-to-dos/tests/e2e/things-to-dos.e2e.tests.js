'use strict';

describe('Things to dos E2E Tests:', function () {
  describe('Test Things to dos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/things-to-dos');
      expect(element.all(by.repeater('things-to-do in things-to-dos')).count()).toEqual(0);
    });
  });
});
