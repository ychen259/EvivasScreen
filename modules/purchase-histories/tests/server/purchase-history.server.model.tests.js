'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PurchaseHistory = mongoose.model('PurchaseHistory');

/**
 * Globals
 */
var user,
  purchaseHistory;

/**
 * Unit tests
 */
describe('Purchase history Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      purchaseHistory = new PurchaseHistory({
        name: 'Purchase history Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return purchaseHistory.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      purchaseHistory.name = '';

      return purchaseHistory.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    PurchaseHistory.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
