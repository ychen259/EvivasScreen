'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  ThingsToDo = mongoose.model('ThingsToDo'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  thingsToDo;

/**
 * Things to do routes tests
 */
describe('Things to do CRUD tests', function () {

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

    // Save a user to the test db and create new Things to do
    user.save(function () {
      thingsToDo = {
        name: 'Things to do name'
      };

      done();
    });
  });

  it('should be able to save a Things to do if logged in', function (done) {
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

        // Save a new Things to do
        agent.post('/api/thingsToDos')
          .send(thingsToDo)
          .expect(200)
          .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
            // Handle Things to do save error
            if (thingsToDoSaveErr) {
              return done(thingsToDoSaveErr);
            }

            // Get a list of Things to dos
            agent.get('/api/thingsToDos')
              .end(function (thingsToDosGetErr, thingsToDosGetRes) {
                // Handle Things to dos save error
                if (thingsToDosGetErr) {
                  return done(thingsToDosGetErr);
                }

                // Get Things to dos list
                var thingsToDos = thingsToDosGetRes.body;

                // Set assertions
                (thingsToDos[0].user._id).should.equal(userId);
                (thingsToDos[0].name).should.match('Things to do name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Things to do if not logged in', function (done) {
    agent.post('/api/thingsToDos')
      .send(thingsToDo)
      .expect(403)
      .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
        // Call the assertion callback
        done(thingsToDoSaveErr);
      });
  });

  it('should not be able to save an Things to do if no name is provided', function (done) {
    // Invalidate name field
    thingsToDo.name = '';

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

        // Save a new Things to do
        agent.post('/api/thingsToDos')
          .send(thingsToDo)
          .expect(400)
          .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
            // Set message assertion
            (thingsToDoSaveRes.body.message).should.match('Please fill Things to do name');

            // Handle Things to do save error
            done(thingsToDoSaveErr);
          });
      });
  });

  it('should be able to update an Things to do if signed in', function (done) {
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

        // Save a new Things to do
        agent.post('/api/thingsToDos')
          .send(thingsToDo)
          .expect(200)
          .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
            // Handle Things to do save error
            if (thingsToDoSaveErr) {
              return done(thingsToDoSaveErr);
            }

            // Update Things to do name
            thingsToDo.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Things to do
            agent.put('/api/thingsToDos/' + thingsToDoSaveRes.body._id)
              .send(thingsToDo)
              .expect(200)
              .end(function (thingsToDoUpdateErr, thingsToDoUpdateRes) {
                // Handle Things to do update error
                if (thingsToDoUpdateErr) {
                  return done(thingsToDoUpdateErr);
                }

                // Set assertions
                (thingsToDoUpdateRes.body._id).should.equal(thingsToDoSaveRes.body._id);
                (thingsToDoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Things to dos if not signed in', function (done) {
    // Create new Things to do model instance
    var thingsToDoObj = new ThingsToDo(thingsToDo);

    // Save the thingsToDo
    thingsToDoObj.save(function () {
      // Request Things to dos
      request(app).get('/api/thingsToDos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Things to do if not signed in', function (done) {
    // Create new Things to do model instance
    var thingsToDoObj = new ThingsToDo(thingsToDo);

    // Save the Things to do
    thingsToDoObj.save(function () {
      request(app).get('/api/thingsToDos/' + thingsToDoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', thingsToDo.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Things to do with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/thingsToDos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Things to do is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Things to do which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Things to do
    request(app).get('/api/thingsToDos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Things to do with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Things to do if signed in', function (done) {
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

        // Save a new Things to do
        agent.post('/api/thingsToDos')
          .send(thingsToDo)
          .expect(200)
          .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
            // Handle Things to do save error
            if (thingsToDoSaveErr) {
              return done(thingsToDoSaveErr);
            }

            // Delete an existing Things to do
            agent.delete('/api/thingsToDos/' + thingsToDoSaveRes.body._id)
              .send(thingsToDo)
              .expect(200)
              .end(function (thingsToDoDeleteErr, thingsToDoDeleteRes) {
                // Handle thingsToDo error error
                if (thingsToDoDeleteErr) {
                  return done(thingsToDoDeleteErr);
                }

                // Set assertions
                (thingsToDoDeleteRes.body._id).should.equal(thingsToDoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Things to do if not signed in', function (done) {
    // Set Things to do user
    thingsToDo.user = user;

    // Create new Things to do model instance
    var thingsToDoObj = new ThingsToDo(thingsToDo);

    // Save the Things to do
    thingsToDoObj.save(function () {
      // Try deleting Things to do
      request(app).delete('/api/thingsToDos/' + thingsToDoObj._id)
        .expect(403)
        .end(function (thingsToDoDeleteErr, thingsToDoDeleteRes) {
          // Set message assertion
          (thingsToDoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Things to do error error
          done(thingsToDoDeleteErr);
        });

    });
  });

  it('should be able to get a single Things to do that has an orphaned user reference', function (done) {
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

          // Save a new Things to do
          agent.post('/api/thingsToDos')
            .send(thingsToDo)
            .expect(200)
            .end(function (thingsToDoSaveErr, thingsToDoSaveRes) {
              // Handle Things to do save error
              if (thingsToDoSaveErr) {
                return done(thingsToDoSaveErr);
              }

              // Set assertions on new Things to do
              (thingsToDoSaveRes.body.name).should.equal(thingsToDo.name);
              should.exist(thingsToDoSaveRes.body.user);
              should.equal(thingsToDoSaveRes.body.user._id, orphanId);

              // force the Things to do to have an orphaned user reference
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

                    // Get the Things to do
                    agent.get('/api/thingsToDos/' + thingsToDoSaveRes.body._id)
                      .expect(200)
                      .end(function (thingsToDoInfoErr, thingsToDoInfoRes) {
                        // Handle Things to do error
                        if (thingsToDoInfoErr) {
                          return done(thingsToDoInfoErr);
                        }

                        // Set assertions
                        (thingsToDoInfoRes.body._id).should.equal(thingsToDoSaveRes.body._id);
                        (thingsToDoInfoRes.body.name).should.equal(thingsToDo.name);
                        should.equal(thingsToDoInfoRes.body.user, undefined);

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
      ThingsToDo.remove().exec(done);
    });
  });
});
