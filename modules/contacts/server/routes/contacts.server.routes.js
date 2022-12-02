'use strict';

/**
 * Module dependencies
 */
var contactsPolicy = require('../policies/contacts.server.policy'),
  contacts = require('../controllers/contacts.server.controller');

module.exports = function(app) {



  app.route('/api/sendEmail').all(contactsPolicy.isAllowed)
    .post(contacts.sendEmail);

};
