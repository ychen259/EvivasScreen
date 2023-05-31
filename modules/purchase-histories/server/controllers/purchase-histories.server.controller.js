'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  PurchaseHistory = mongoose.model('PurchaseHistory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config')),
  _ = require('lodash');

/**
 * Create a Purchase history
 */
exports.create = function(req, res) {

  var purchaseHistory = new PurchaseHistory(req.body);
  purchaseHistory.user = req.user;

  /*  productPrice:{
    tabTension92Price: '$779',
    tabTension100Price:'$799',
    tabTension110Price: '$999',
    floorRising92Price: '$1299',
    floorRising100Price: '$1499',
    floorRising110Price: '$1599',
    mobile92Price: '$50',
    mobile100Price: '$60',
    mobile110Price: '$70'
  },*/
  var tabTension92Price = parseFloat(config.productPrice.tabTension92Price.replace('$',''));
  var tabTension100Price = parseFloat(config.productPrice.tabTension100Price.replace('$',''));
  var tabTension110Price = parseFloat(config.productPrice.tabTension110Price.replace('$',''));
  var floorRising92Price = parseFloat(config.productPrice.floorRising92Price.replace('$',''));
  var floorRising100Price = parseFloat(config.productPrice.floorRising100Price.replace('$',''));
  var floorRising110Price = parseFloat(config.productPrice.floorRising110Price.replace('$',''));
  var mobile92Price = parseFloat(config.productPrice.mobile92Price.replace('$',''));
  var mobile100Price = parseFloat(config.productPrice.mobile100Price.replace('$',''));
  var mobile110Price = parseFloat(config.productPrice.mobile110Price.replace('$',''));

  var total = tabTension92Price * purchaseHistory.purchaseHistory.tab_tension._92inch +
              tabTension100Price * purchaseHistory.purchaseHistory.tab_tension._100inch +
              tabTension110Price * purchaseHistory.purchaseHistory.tab_tension._110inch +
              floorRising92Price * purchaseHistory.purchaseHistory.floor_rising._92inch +
              floorRising100Price * purchaseHistory.purchaseHistory.floor_rising._100inch +
              floorRising110Price * purchaseHistory.purchaseHistory.floor_rising._110inch +
              mobile92Price * purchaseHistory.purchaseHistory.mobile._92inch +
              mobile100Price * purchaseHistory.purchaseHistory.mobile._100inch +
              mobile110Price * purchaseHistory.purchaseHistory.mobile._110inch;
  //if price contain some value like 0.4 x 5 comes out 1.9999, round up number
  total = Math.round(total*100)/100;

  //after tax
  total = total * (1 + config.taxPercentage);
  total = Math.round(total*100)/100;

  purchaseHistory.total = total;

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
  if(req.user){
    console.log("has user");
    var user = req.user;
    PurchaseHistory.find({"user": user}).sort('-created').populate('user', 'displayName').exec(function(err, purchaseHistories) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(purchaseHistories);
      }
    });
  }else{
console.log("do not has user");
  return res.status(400);}
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
