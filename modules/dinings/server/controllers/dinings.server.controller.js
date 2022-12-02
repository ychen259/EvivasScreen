'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dining = mongoose.model('Dining'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Dining
 */
exports.create = function(req, res) {
  var dining = new Dining(req.body);
  dining.user = req.user;

  dining.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dining);
    }
  });
};

/**
 * Show the current Dining
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var dining = req.dining ? req.dining.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  dining.isCurrentUserOwner = req.user && dining.user && dining.user._id.toString() === req.user._id.toString();

  res.jsonp(dining);
};

/**
 * Update a Dining
 */
exports.update = function(req, res) {
  var dining = req.dining;

  dining = _.extend(dining, req.body);

  dining.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dining);
    }
  });
};

/**
 * Delete an Dining
 */
exports.delete = function(req, res) {
  var dining = req.dining;

  dining.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dining);
    }
  });
};

/**
 * List of Dinings
 */
exports.list = function(req, res) {
  Dining.find().sort('-created').populate('user', 'displayName').exec(function(err, dinings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dinings);
    }
  });
};

/**
 * Dining middleware
 */
exports.diningByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dining is invalid'
    });
  }

  Dining.findById(id).populate('user', 'displayName').exec(function (err, dining) {
    if (err) {
      return next(err);
    } else if (!dining) {
      return res.status(404).send({
        message: 'No Dining with that identifier has been found'
      });
    }
    req.dining = dining;
    next();
  });
};
