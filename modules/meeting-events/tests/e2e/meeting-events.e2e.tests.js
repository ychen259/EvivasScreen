'use strict';

describe('Meeting events E2E Tests:', function () {
  describe('Test Meeting events page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/meeting-events');
      expect(element.all(by.repeater('meeting-event in meeting-events')).count()).toEqual(0);
    });
  });
});
