'use strict';

describe('Purchase histories E2E Tests:', function () {
  describe('Test Purchase histories page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/purchase-histories');
      expect(element.all(by.repeater('purchase-history in purchase-histories')).count()).toEqual(0);
    });
  });
});
