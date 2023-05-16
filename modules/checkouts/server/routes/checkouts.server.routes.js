'use strict';

/**
 * Module dependencies
 */
var checkoutsPolicy = require('../policies/checkouts.server.policy'),
  checkouts = require('../controllers/checkouts.server.controller');

module.exports = function(app) {
  // Checkouts Routes
  app.route('/my-server/create-paypal-order').all(checkoutsPolicy.isAllowed)
    .post(checkouts.createOrder);

  app.route('/my-server/capture-paypal-order').all(checkoutsPolicy.isAllowed)
     .post(checkouts.captureOrder);   

};
