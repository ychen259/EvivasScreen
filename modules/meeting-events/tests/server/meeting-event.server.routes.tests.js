'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  MeetingEvent = mongoose.model('MeetingEvent'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  meetingEvent;

/**
 * Meeting event routes tests
 */
describe('Meeting event CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Meeting event
    user.save(function () {
      meetingEvent = {
        name: 'Meeting event name'
      };

      done();
    });
  });

  it('should be able to save a Meeting event if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Meeting event
        agent.post('/api/meetingEvents')
          .send(meetingEvent)
          .expect(200)
          .end(function (meetingEventSaveErr, meetingEventSaveRes) {
            // Handle Meeting event save error
            if (meetingEventSaveErr) {
              return done(meetingEventSaveErr);
            }

            // Get a list of Meeting events
            agent.get('/api/meetingEvents')
              .end(function (meetingEventsGetErr, meetingEventsGetRes) {
                // Handle Meeting events save error
                if (meetingEventsGetErr) {
                  return done(meetingEventsGetErr);
                }

                // Get Meeting events list
                var meetingEvents = meetingEventsGetRes.body;

                // Set assertions
                (meetingEvents[0].user._id).should.equal(userId);
                (meetingEvents[0].name).should.match('Meeting event name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Meeting event if not logged in', function (done) {
    agent.post('/api/meetingEvents')
      .send(meetingEvent)
      .expect(403)
      .end(function (meetingEventSaveErr, meetingEventSaveRes) {
        // Call the assertion callback
        done(meetingEventSaveErr);
      });
  });

  it('should not be able to save an Meeting event if no name is provided', function (done) {
    // Invalidate name field
    meetingEvent.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Meeting event
        agent.post('/api/meetingEvents')
          .send(meetingEvent)
          .expect(400)
          .end(function (meetingEventSaveErr, meetingEventSaveRes) {
            // Set message assertion
            (meetingEventSaveRes.body.message).should.match('Please fill Meeting event name');

            // Handle Meeting event save error
            done(meetingEventSaveErr);
          });
      });
  });

  it('should be able to update an Meeting event if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Meeting event
        agent.post('/api/meetingEvents')
          .send(meetingEvent)
          .expect(200)
          .end(function (meetingEventSaveErr, meetingEventSaveRes) {
            // Handle Meeting event save error
            if (meetingEventSaveErr) {
              return done(meetingEventSaveErr);
            }

            // Update Meeting event name
            meetingEvent.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Meeting event
            agent.put('/api/meetingEvents/' + meetingEventSaveRes.body._id)
              .send(meetingEvent)
              .expect(200)
              .end(function (meetingEventUpdateErr, meetingEventUpdateRes) {
                // Handle Meeting event update error
                if (meetingEventUpdateErr) {
                  return done(meetingEventUpdateErr);
                }

                // Set assertions
                (meetingEventUpdateRes.body._id).should.equal(meetingEventSaveRes.body._id);
                (meetingEventUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Meeting events if not signed in', function (done) {
    // Create new Meeting event model instance
    var meetingEventObj = new MeetingEvent(meetingEvent);

    // Save the meetingEvent
    meetingEventObj.save(function () {
      // Request Meeting events
      request(app).get('/api/meetingEvents')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Meeting event if not signed in', function (done) {
    // Create new Meeting event model instance
    var meetingEventObj = new MeetingEvent(meetingEvent);

    // Save the Meeting event
    meetingEventObj.save(function () {
      request(app).get('/api/meetingEvents/' + meetingEventObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', meetingEvent.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Meeting event with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/meetingEvents/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Meeting event is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Meeting event which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Meeting event
    request(app).get('/api/meetingEvents/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Meeting event with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Meeting event if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Meeting event
        agent.post('/api/meetingEvents')
          .send(meetingEvent)
          .expect(200)
          .end(function (meetingEventSaveErr, meetingEventSaveRes) {
            // Handle Meeting event save error
            if (meetingEventSaveErr) {
              return done(meetingEventSaveErr);
            }

            // Delete an existing Meeting event
            agent.delete('/api/meetingEvents/' + meetingEventSaveRes.body._id)
              .send(meetingEvent)
              .expect(200)
              .end(function (meetingEventDeleteErr, meetingEventDeleteRes) {
                // Handle meetingEvent error error
                if (meetingEventDeleteErr) {
                  return done(meetingEventDeleteErr);
                }

                // Set assertions
                (meetingEventDeleteRes.body._id).should.equal(meetingEventSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Meeting event if not signed in', function (done) {
    // Set Meeting event user
    meetingEvent.user = user;

    // Create new Meeting event model instance
    var meetingEventObj = new MeetingEvent(meetingEvent);

    // Save the Meeting event
    meetingEventObj.save(function () {
      // Try deleting Meeting event
      request(app).delete('/api/meetingEvents/' + meetingEventObj._id)
        .expect(403)
        .end(function (meetingEventDeleteErr, meetingEventDeleteRes) {
          // Set message assertion
          (meetingEventDeleteRes.body.message).should.match('User is not authorized');

          // Handle Meeting event error error
          done(meetingEventDeleteErr);
        });

    });
  });

  it('should be able to get a single Meeting event that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Meeting event
          agent.post('/api/meetingEvents')
            .send(meetingEvent)
            .expect(200)
            .end(function (meetingEventSaveErr, meetingEventSaveRes) {
              // Handle Meeting event save error
              if (meetingEventSaveErr) {
                return done(meetingEventSaveErr);
              }

              // Set assertions on new Meeting event
              (meetingEventSaveRes.body.name).should.equal(meetingEvent.name);
              should.exist(meetingEventSaveRes.body.user);
              should.equal(meetingEventSaveRes.body.user._id, orphanId);

              // force the Meeting event to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Meeting event
                    agent.get('/api/meetingEvents/' + meetingEventSaveRes.body._id)
                      .expect(200)
                      .end(function (meetingEventInfoErr, meetingEventInfoRes) {
                        // Handle Meeting event error
                        if (meetingEventInfoErr) {
                          return done(meetingEventInfoErr);
                        }

                        // Set assertions
                        (meetingEventInfoRes.body._id).should.equal(meetingEventSaveRes.body._id);
                        (meetingEventInfoRes.body.name).should.equal(meetingEvent.name);
                        should.equal(meetingEventInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      MeetingEvent.remove().exec(done);
    });
  });
});
