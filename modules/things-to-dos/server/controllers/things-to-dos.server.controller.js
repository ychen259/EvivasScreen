'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ThingsToDo = mongoose.model('ThingsToDo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Things to do
 */
exports.create = function(req, res) {
  var thingsToDo = new ThingsToDo(req.body);
  thingsToDo.user = req.user;

  thingsToDo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(thingsToDo);
    }
  });
};

/**
 * Show the current Things to do
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var thingsToDo = req.thingsToDo ? req.thingsToDo.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  thingsToDo.isCurrentUserOwner = req.user && thingsToDo.user && thingsToDo.user._id.toString() === req.user._id.toString();

  res.jsonp(thingsToDo);
};

/**
 * Update a Things to do
 */
exports.update = function(req, res) {
  var thingsToDo = req.thingsToDo;

  thingsToDo = _.extend(thingsToDo, req.body);

  thingsToDo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(thingsToDo);
    }
  });
};

/**
 * Delete an Things to do
 */
exports.delete = function(req, res) {
  var thingsToDo = req.thingsToDo;

  thingsToDo.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(thingsToDo);
    }
  });
};

/**
 * List of Things to dos
 */
exports.list = function(req, res) {
  ThingsToDo.find().sort('-created').populate('user', 'displayName').exec(function(err, thingsToDos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(thingsToDos);
    }
  });
};

/**
 * Things to do middleware
 */
exports.thingsToDoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Things to do is invalid'
    });
  }

  ThingsToDo.findById(id).populate('user', 'displayName').exec(function (err, thingsToDo) {
    if (err) {
      return next(err);
    } else if (!thingsToDo) {
      return res.status(404).send({
        message: 'No Things to do with that identifier has been found'
      });
    }
    req.thingsToDo = thingsToDo;
    next();
  });
};
