'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  AboutU = mongoose.model('AboutU'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  aboutU;

/**
 * About u routes tests
 */
describe('About u CRUD tests', function () {

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

    // Save a user to the test db and create new About u
    user.save(function () {
      aboutU = {
        name: 'About u name'
      };

      done();
    });
  });

  it('should be able to save a About u if logged in', function (done) {
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

        // Save a new About u
        agent.post('/api/aboutUs')
          .send(aboutU)
          .expect(200)
          .end(function (aboutUSaveErr, aboutUSaveRes) {
            // Handle About u save error
            if (aboutUSaveErr) {
              return done(aboutUSaveErr);
            }

            // Get a list of About us
            agent.get('/api/aboutUs')
              .end(function (aboutUsGetErr, aboutUsGetRes) {
                // Handle About us save error
                if (aboutUsGetErr) {
                  return done(aboutUsGetErr);
                }

                // Get About us list
                var aboutUs = aboutUsGetRes.body;

                // Set assertions
                (aboutUs[0].user._id).should.equal(userId);
                (aboutUs[0].name).should.match('About u name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an About u if not logged in', function (done) {
    agent.post('/api/aboutUs')
      .send(aboutU)
      .expect(403)
      .end(function (aboutUSaveErr, aboutUSaveRes) {
        // Call the assertion callback
        done(aboutUSaveErr);
      });
  });

  it('should not be able to save an About u if no name is provided', function (done) {
    // Invalidate name field
    aboutU.name = '';

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

        // Save a new About u
        agent.post('/api/aboutUs')
          .send(aboutU)
          .expect(400)
          .end(function (aboutUSaveErr, aboutUSaveRes) {
            // Set message assertion
            (aboutUSaveRes.body.message).should.match('Please fill About u name');

            // Handle About u save error
            done(aboutUSaveErr);
          });
      });
  });

  it('should be able to update an About u if signed in', function (done) {
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

        // Save a new About u
        agent.post('/api/aboutUs')
          .send(aboutU)
          .expect(200)
          .end(function (aboutUSaveErr, aboutUSaveRes) {
            // Handle About u save error
            if (aboutUSaveErr) {
              return done(aboutUSaveErr);
            }

            // Update About u name
            aboutU.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing About u
            agent.put('/api/aboutUs/' + aboutUSaveRes.body._id)
              .send(aboutU)
              .expect(200)
              .end(function (aboutUUpdateErr, aboutUUpdateRes) {
                // Handle About u update error
                if (aboutUUpdateErr) {
                  return done(aboutUUpdateErr);
                }

                // Set assertions
                (aboutUUpdateRes.body._id).should.equal(aboutUSaveRes.body._id);
                (aboutUUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of About us if not signed in', function (done) {
    // Create new About u model instance
    var aboutUObj = new AboutU(aboutU);

    // Save the aboutU
    aboutUObj.save(function () {
      // Request About us
      request(app).get('/api/aboutUs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single About u if not signed in', function (done) {
    // Create new About u model instance
    var aboutUObj = new AboutU(aboutU);

    // Save the About u
    aboutUObj.save(function () {
      request(app).get('/api/aboutUs/' + aboutUObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', aboutU.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single About u with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/aboutUs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'About u is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single About u which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent About u
    request(app).get('/api/aboutUs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No About u with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an About u if signed in', function (done) {
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

        // Save a new About u
        agent.post('/api/aboutUs')
          .send(aboutU)
          .expect(200)
          .end(function (aboutUSaveErr, aboutUSaveRes) {
            // Handle About u save error
            if (aboutUSaveErr) {
              return done(aboutUSaveErr);
            }

            // Delete an existing About u
            agent.delete('/api/aboutUs/' + aboutUSaveRes.body._id)
              .send(aboutU)
              .expect(200)
              .end(function (aboutUDeleteErr, aboutUDeleteRes) {
                // Handle aboutU error error
                if (aboutUDeleteErr) {
                  return done(aboutUDeleteErr);
                }

                // Set assertions
                (aboutUDeleteRes.body._id).should.equal(aboutUSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an About u if not signed in', function (done) {
    // Set About u user
    aboutU.user = user;

    // Create new About u model instance
    var aboutUObj = new AboutU(aboutU);

    // Save the About u
    aboutUObj.save(function () {
      // Try deleting About u
      request(app).delete('/api/aboutUs/' + aboutUObj._id)
        .expect(403)
        .end(function (aboutUDeleteErr, aboutUDeleteRes) {
          // Set message assertion
          (aboutUDeleteRes.body.message).should.match('User is not authorized');

          // Handle About u error error
          done(aboutUDeleteErr);
        });

    });
  });

  it('should be able to get a single About u that has an orphaned user reference', function (done) {
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

          // Save a new About u
          agent.post('/api/aboutUs')
            .send(aboutU)
            .expect(200)
            .end(function (aboutUSaveErr, aboutUSaveRes) {
              // Handle About u save error
              if (aboutUSaveErr) {
                return done(aboutUSaveErr);
              }

              // Set assertions on new About u
              (aboutUSaveRes.body.name).should.equal(aboutU.name);
              should.exist(aboutUSaveRes.body.user);
              should.equal(aboutUSaveRes.body.user._id, orphanId);

              // force the About u to have an orphaned user reference
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

                    // Get the About u
                    agent.get('/api/aboutUs/' + aboutUSaveRes.body._id)
                      .expect(200)
                      .end(function (aboutUInfoErr, aboutUInfoRes) {
                        // Handle About u error
                        if (aboutUInfoErr) {
                          return done(aboutUInfoErr);
                        }

                        // Set assertions
                        (aboutUInfoRes.body._id).should.equal(aboutUSaveRes.body._id);
                        (aboutUInfoRes.body.name).should.equal(aboutU.name);
                        should.equal(aboutUInfoRes.body.user, undefined);

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
      AboutU.remove().exec(done);
    });
  });
});
