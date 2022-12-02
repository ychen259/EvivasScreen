'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Dining = mongoose.model('Dining'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  dining;

/**
 * Dining routes tests
 */
describe('Dining CRUD tests', function () {

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

    // Save a user to the test db and create new Dining
    user.save(function () {
      dining = {
        name: 'Dining name'
      };

      done();
    });
  });

  it('should be able to save a Dining if logged in', function (done) {
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

        // Save a new Dining
        agent.post('/api/dinings')
          .send(dining)
          .expect(200)
          .end(function (diningSaveErr, diningSaveRes) {
            // Handle Dining save error
            if (diningSaveErr) {
              return done(diningSaveErr);
            }

            // Get a list of Dinings
            agent.get('/api/dinings')
              .end(function (diningsGetErr, diningsGetRes) {
                // Handle Dinings save error
                if (diningsGetErr) {
                  return done(diningsGetErr);
                }

                // Get Dinings list
                var dinings = diningsGetRes.body;

                // Set assertions
                (dinings[0].user._id).should.equal(userId);
                (dinings[0].name).should.match('Dining name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Dining if not logged in', function (done) {
    agent.post('/api/dinings')
      .send(dining)
      .expect(403)
      .end(function (diningSaveErr, diningSaveRes) {
        // Call the assertion callback
        done(diningSaveErr);
      });
  });

  it('should not be able to save an Dining if no name is provided', function (done) {
    // Invalidate name field
    dining.name = '';

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

        // Save a new Dining
        agent.post('/api/dinings')
          .send(dining)
          .expect(400)
          .end(function (diningSaveErr, diningSaveRes) {
            // Set message assertion
            (diningSaveRes.body.message).should.match('Please fill Dining name');

            // Handle Dining save error
            done(diningSaveErr);
          });
      });
  });

  it('should be able to update an Dining if signed in', function (done) {
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

        // Save a new Dining
        agent.post('/api/dinings')
          .send(dining)
          .expect(200)
          .end(function (diningSaveErr, diningSaveRes) {
            // Handle Dining save error
            if (diningSaveErr) {
              return done(diningSaveErr);
            }

            // Update Dining name
            dining.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Dining
            agent.put('/api/dinings/' + diningSaveRes.body._id)
              .send(dining)
              .expect(200)
              .end(function (diningUpdateErr, diningUpdateRes) {
                // Handle Dining update error
                if (diningUpdateErr) {
                  return done(diningUpdateErr);
                }

                // Set assertions
                (diningUpdateRes.body._id).should.equal(diningSaveRes.body._id);
                (diningUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Dinings if not signed in', function (done) {
    // Create new Dining model instance
    var diningObj = new Dining(dining);

    // Save the dining
    diningObj.save(function () {
      // Request Dinings
      request(app).get('/api/dinings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Dining if not signed in', function (done) {
    // Create new Dining model instance
    var diningObj = new Dining(dining);

    // Save the Dining
    diningObj.save(function () {
      request(app).get('/api/dinings/' + diningObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', dining.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Dining with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/dinings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Dining is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Dining which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Dining
    request(app).get('/api/dinings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Dining with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Dining if signed in', function (done) {
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

        // Save a new Dining
        agent.post('/api/dinings')
          .send(dining)
          .expect(200)
          .end(function (diningSaveErr, diningSaveRes) {
            // Handle Dining save error
            if (diningSaveErr) {
              return done(diningSaveErr);
            }

            // Delete an existing Dining
            agent.delete('/api/dinings/' + diningSaveRes.body._id)
              .send(dining)
              .expect(200)
              .end(function (diningDeleteErr, diningDeleteRes) {
                // Handle dining error error
                if (diningDeleteErr) {
                  return done(diningDeleteErr);
                }

                // Set assertions
                (diningDeleteRes.body._id).should.equal(diningSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Dining if not signed in', function (done) {
    // Set Dining user
    dining.user = user;

    // Create new Dining model instance
    var diningObj = new Dining(dining);

    // Save the Dining
    diningObj.save(function () {
      // Try deleting Dining
      request(app).delete('/api/dinings/' + diningObj._id)
        .expect(403)
        .end(function (diningDeleteErr, diningDeleteRes) {
          // Set message assertion
          (diningDeleteRes.body.message).should.match('User is not authorized');

          // Handle Dining error error
          done(diningDeleteErr);
        });

    });
  });

  it('should be able to get a single Dining that has an orphaned user reference', function (done) {
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

          // Save a new Dining
          agent.post('/api/dinings')
            .send(dining)
            .expect(200)
            .end(function (diningSaveErr, diningSaveRes) {
              // Handle Dining save error
              if (diningSaveErr) {
                return done(diningSaveErr);
              }

              // Set assertions on new Dining
              (diningSaveRes.body.name).should.equal(dining.name);
              should.exist(diningSaveRes.body.user);
              should.equal(diningSaveRes.body.user._id, orphanId);

              // force the Dining to have an orphaned user reference
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

                    // Get the Dining
                    agent.get('/api/dinings/' + diningSaveRes.body._id)
                      .expect(200)
                      .end(function (diningInfoErr, diningInfoRes) {
                        // Handle Dining error
                        if (diningInfoErr) {
                          return done(diningInfoErr);
                        }

                        // Set assertions
                        (diningInfoRes.body._id).should.equal(diningSaveRes.body._id);
                        (diningInfoRes.body.name).should.equal(dining.name);
                        should.equal(diningInfoRes.body.user, undefined);

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
      Dining.remove().exec(done);
    });
  });
});
