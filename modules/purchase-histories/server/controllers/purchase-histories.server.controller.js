'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  PurchaseHistory = mongoose.model('PurchaseHistory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Purchase history
 */
exports.create = function(req, res) {

  var purchaseHistory = new PurchaseHistory(req.body);
  purchaseHistory.user = req.user;

  console.log("purchase: " + purchaseHistory);
  purchaseHistory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purchaseHistory);
    }
  });
};

/**
 * Show the current Purchase history
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var purchaseHistory = req.purchaseHistory ? req.purchaseHistory.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  purchaseHistory.isCurrentUserOwner = req.user && purchaseHistory.user && purchaseHistory.user._id.toString() === req.user._id.toString();

  res.jsonp(purchaseHistory);
};

/**
 * Update a Purchase history
 */
exports.update = function(req, res) {
  var purchaseHistory = req.purchaseHistory;

  purchaseHistory = _.extend(purchaseHistory, req.body);

  purchaseHistory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purchaseHistory);
    }
  });
};

/**
 * Delete an Purchase history
 */
exports.delete = function(req, res) {
  var purchaseHistory = req.purchaseHistory;

  purchaseHistory.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purchaseHistory);
    }
  });
};

/**
 * List of Purchase histories
 */
exports.list = function(req, res) {
  PurchaseHistory.find().sort('-created').populate('user', 'displayName').exec(function(err, purchaseHistories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purchaseHistories);
    }
  });
};

/**
 * Purchase history middleware
 */
exports.purchaseHistoryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Purchase history is invalid'
    });
  }

  PurchaseHistory.findById(id).populate('user', 'displayName').exec(function (err, purchaseHistory) {
    if (err) {
      return next(err);
    } else if (!purchaseHistory) {
      return res.status(404).send({
        message: 'No Purchase history with that identifier has been found'
      });
    }
    req.purchaseHistory = purchaseHistory;
    next();
  });
};
