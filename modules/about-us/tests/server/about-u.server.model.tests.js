'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  AboutU = mongoose.model('AboutU');

/**
 * Globals
 */
var user,
  aboutU;

/**
 * Unit tests
 */
describe('About u Model Unit Tests:', function() {
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
      aboutU = new AboutU({
        name: 'About u Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return aboutU.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      aboutU.name = '';

      return aboutU.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    AboutU.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
