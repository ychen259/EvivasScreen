'use strict';

/**
 * Module dependencies
 */
var purchaseHistoriesPolicy = require('../policies/purchase-histories.server.policy'),
  purchaseHistories = require('../controllers/purchase-histories.server.controller');

module.exports = function(app) {
  // Purchase histories Routes
  app.route('/api/purchase-histories').all(purchaseHistoriesPolicy.isAllowed)
    .get(purchaseHistories.list)
    .post(purchaseHistories.create);

  app.route('/api/purchase-histories/:purchaseHistoryId').all(purchaseHistoriesPolicy.isAllowed)
    .get(purchaseHistories.read)
    .put(purchaseHistories.update)
    .delete(purchaseHistories.delete);

  // Finish by binding the Purchase history middleware
  app.param('purchaseHistoryId', purchaseHistories.purchaseHistoryByID);
};
