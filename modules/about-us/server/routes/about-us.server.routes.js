'use strict';

/**
 * Module dependencies
 */
var aboutUsPolicy = require('../policies/about-us.server.policy'),
  aboutUs = require('../controllers/about-us.server.controller');

module.exports = function(app) {
  // About us Routes
  app.route('/api/about-us').all(aboutUsPolicy.isAllowed)
    .get(aboutUs.list)
    .post(aboutUs.create);

  app.route('/api/about-us/:aboutUId').all(aboutUsPolicy.isAllowed)
    .get(aboutUs.read)
    .put(aboutUs.update)
    .delete(aboutUs.delete);

  // Finish by binding the About u middleware
  app.param('aboutUId', aboutUs.aboutUByID);
};
