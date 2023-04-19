'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  AboutU = mongoose.model('AboutU'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a About u
 */
exports.create = function(req, res) {
  var aboutU = new AboutU(req.body);
  aboutU.user = req.user;

  aboutU.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutU);
    }
  });
};

/**
 * Show the current About u
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var aboutU = req.aboutU ? req.aboutU.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  aboutU.isCurrentUserOwner = req.user && aboutU.user && aboutU.user._id.toString() === req.user._id.toString();

  res.jsonp(aboutU);
};

/**
 * Update a About u
 */
exports.update = function(req, res) {
  var aboutU = req.aboutU;

  aboutU = _.extend(aboutU, req.body);

  aboutU.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutU);
    }
  });
};

/**
 * Delete an About u
 */
exports.delete = function(req, res) {
  var aboutU = req.aboutU;

  aboutU.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutU);
    }
  });
};

/**
 * List of About us
 */
exports.list = function(req, res) {
  AboutU.find().sort('-created').populate('user', 'displayName').exec(function(err, aboutUs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutUs);
    }
  });
};

/**
 * About u middleware
 */
exports.aboutUByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'About u is invalid'
    });
  }

  AboutU.findById(id).populate('user', 'displayName').exec(function (err, aboutU) {
    if (err) {
      return next(err);
    } else if (!aboutU) {
      return res.status(404).send({
        message: 'No About u with that identifier has been found'
      });
    }
    req.aboutU = aboutU;
    next();
  });
};
