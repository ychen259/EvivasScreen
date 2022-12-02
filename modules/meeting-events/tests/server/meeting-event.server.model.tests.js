'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  MeetingEvent = mongoose.model('MeetingEvent');

/**
 * Globals
 */
var user,
  meetingEvent;

/**
 * Unit tests
 */
describe('Meeting event Model Unit Tests:', function() {
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
      meetingEvent = new MeetingEvent({
        name: 'Meeting event Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return meetingEvent.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      meetingEvent.name = '';

      return meetingEvent.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    MeetingEvent.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
