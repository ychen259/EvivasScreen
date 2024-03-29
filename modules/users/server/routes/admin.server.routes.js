'use strict';

/**
 * Module dependencies
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(adminPolicy.isAllowed, admin.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  app.route('/api/orders')
    .get(adminPolicy.isAllowed, admin.listOrders);

  app.route('/api/orders/:orderId')
    .put(adminPolicy.isAllowed, admin.updateOrder);
    
  // Single user routes
 /* app.route('/api/orders/:orderId')
    .get(adminPolicy.isAllowed, admin.readOrder)
    .put(adminPolicy.isAllowed, admin.updateOrder)
    .delete(adminPolicy.isAllowed, admin.deleteOrder);*/

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
  app.param('orderId', admin.purchaseHistoryByID);
};
