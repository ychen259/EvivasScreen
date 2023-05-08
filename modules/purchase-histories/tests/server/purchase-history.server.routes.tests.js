'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PurchaseHistory = mongoose.model('PurchaseHistory'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  purchaseHistory;

/**
 * Purchase history routes tests
 */
describe('Purchase history CRUD tests', function () {

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

    // Save a user to the test db and create new Purchase history
    user.save(function () {
      purchaseHistory = {
        name: 'Purchase history name'
      };

      done();
    });
  });

  it('should be able to save a Purchase history if logged in', function (done) {
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

        // Save a new Purchase history
        agent.post('/api/purchaseHistories')
          .send(purchaseHistory)
          .expect(200)
          .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
            // Handle Purchase history save error
            if (purchaseHistorySaveErr) {
              return done(purchaseHistorySaveErr);
            }

            // Get a list of Purchase histories
            agent.get('/api/purchaseHistories')
              .end(function (purchaseHistoriesGetErr, purchaseHistoriesGetRes) {
                // Handle Purchase histories save error
                if (purchaseHistoriesGetErr) {
                  return done(purchaseHistoriesGetErr);
                }

                // Get Purchase histories list
                var purchaseHistories = purchaseHistoriesGetRes.body;

                // Set assertions
                (purchaseHistories[0].user._id).should.equal(userId);
                (purchaseHistories[0].name).should.match('Purchase history name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Purchase history if not logged in', function (done) {
    agent.post('/api/purchaseHistories')
      .send(purchaseHistory)
      .expect(403)
      .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
        // Call the assertion callback
        done(purchaseHistorySaveErr);
      });
  });

  it('should not be able to save an Purchase history if no name is provided', function (done) {
    // Invalidate name field
    purchaseHistory.name = '';

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

        // Save a new Purchase history
        agent.post('/api/purchaseHistories')
          .send(purchaseHistory)
          .expect(400)
          .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
            // Set message assertion
            (purchaseHistorySaveRes.body.message).should.match('Please fill Purchase history name');

            // Handle Purchase history save error
            done(purchaseHistorySaveErr);
          });
      });
  });

  it('should be able to update an Purchase history if signed in', function (done) {
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

        // Save a new Purchase history
        agent.post('/api/purchaseHistories')
          .send(purchaseHistory)
          .expect(200)
          .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
            // Handle Purchase history save error
            if (purchaseHistorySaveErr) {
              return done(purchaseHistorySaveErr);
            }

            // Update Purchase history name
            purchaseHistory.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Purchase history
            agent.put('/api/purchaseHistories/' + purchaseHistorySaveRes.body._id)
              .send(purchaseHistory)
              .expect(200)
              .end(function (purchaseHistoryUpdateErr, purchaseHistoryUpdateRes) {
                // Handle Purchase history update error
                if (purchaseHistoryUpdateErr) {
                  return done(purchaseHistoryUpdateErr);
                }

                // Set assertions
                (purchaseHistoryUpdateRes.body._id).should.equal(purchaseHistorySaveRes.body._id);
                (purchaseHistoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Purchase histories if not signed in', function (done) {
    // Create new Purchase history model instance
    var purchaseHistoryObj = new PurchaseHistory(purchaseHistory);

    // Save the purchaseHistory
    purchaseHistoryObj.save(function () {
      // Request Purchase histories
      request(app).get('/api/purchaseHistories')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Purchase history if not signed in', function (done) {
    // Create new Purchase history model instance
    var purchaseHistoryObj = new PurchaseHistory(purchaseHistory);

    // Save the Purchase history
    purchaseHistoryObj.save(function () {
      request(app).get('/api/purchaseHistories/' + purchaseHistoryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', purchaseHistory.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Purchase history with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/purchaseHistories/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Purchase history is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Purchase history which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Purchase history
    request(app).get('/api/purchaseHistories/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Purchase history with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Purchase history if signed in', function (done) {
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

        // Save a new Purchase history
        agent.post('/api/purchaseHistories')
          .send(purchaseHistory)
          .expect(200)
          .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
            // Handle Purchase history save error
            if (purchaseHistorySaveErr) {
              return done(purchaseHistorySaveErr);
            }

            // Delete an existing Purchase history
            agent.delete('/api/purchaseHistories/' + purchaseHistorySaveRes.body._id)
              .send(purchaseHistory)
              .expect(200)
              .end(function (purchaseHistoryDeleteErr, purchaseHistoryDeleteRes) {
                // Handle purchaseHistory error error
                if (purchaseHistoryDeleteErr) {
                  return done(purchaseHistoryDeleteErr);
                }

                // Set assertions
                (purchaseHistoryDeleteRes.body._id).should.equal(purchaseHistorySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Purchase history if not signed in', function (done) {
    // Set Purchase history user
    purchaseHistory.user = user;

    // Create new Purchase history model instance
    var purchaseHistoryObj = new PurchaseHistory(purchaseHistory);

    // Save the Purchase history
    purchaseHistoryObj.save(function () {
      // Try deleting Purchase history
      request(app).delete('/api/purchaseHistories/' + purchaseHistoryObj._id)
        .expect(403)
        .end(function (purchaseHistoryDeleteErr, purchaseHistoryDeleteRes) {
          // Set message assertion
          (purchaseHistoryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Purchase history error error
          done(purchaseHistoryDeleteErr);
        });

    });
  });

  it('should be able to get a single Purchase history that has an orphaned user reference', function (done) {
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

          // Save a new Purchase history
          agent.post('/api/purchaseHistories')
            .send(purchaseHistory)
            .expect(200)
            .end(function (purchaseHistorySaveErr, purchaseHistorySaveRes) {
              // Handle Purchase history save error
              if (purchaseHistorySaveErr) {
                return done(purchaseHistorySaveErr);
              }

              // Set assertions on new Purchase history
              (purchaseHistorySaveRes.body.name).should.equal(purchaseHistory.name);
              should.exist(purchaseHistorySaveRes.body.user);
              should.equal(purchaseHistorySaveRes.body.user._id, orphanId);

              // force the Purchase history to have an orphaned user reference
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

                    // Get the Purchase history
                    agent.get('/api/purchaseHistories/' + purchaseHistorySaveRes.body._id)
                      .expect(200)
                      .end(function (purchaseHistoryInfoErr, purchaseHistoryInfoRes) {
                        // Handle Purchase history error
                        if (purchaseHistoryInfoErr) {
                          return done(purchaseHistoryInfoErr);
                        }

                        // Set assertions
                        (purchaseHistoryInfoRes.body._id).should.equal(purchaseHistorySaveRes.body._id);
                        (purchaseHistoryInfoRes.body.name).should.equal(purchaseHistory.name);
                        should.equal(purchaseHistoryInfoRes.body.user, undefined);

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
      PurchaseHistory.remove().exec(done);
    });
  });
});
