'use strict';

/**
 * Module dependencies
 */
var diningsPolicy = require('../policies/dinings.server.policy'),
  dinings = require('../controllers/dinings.server.controller');

module.exports = function(app) {
  // Dinings Routes
  app.route('/api/dinings').all(diningsPolicy.isAllowed)
    .get(dinings.list)
    .post(dinings.create);

  app.route('/api/dinings/:diningId').all(diningsPolicy.isAllowed)
    .get(dinings.read)
    .put(dinings.update)
    .delete(dinings.delete);

  // Finish by binding the Dining middleware
  app.param('diningId', dinings.diningByID);
};
