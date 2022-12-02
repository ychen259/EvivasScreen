'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  MeetingEvent = mongoose.model('MeetingEvent'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Meeting event
 */
exports.create = function(req, res) {
  var meetingEvent = new MeetingEvent(req.body);
  meetingEvent.user = req.user;

  meetingEvent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meetingEvent);
    }
  });
};

/**
 * Show the current Meeting event
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var meetingEvent = req.meetingEvent ? req.meetingEvent.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  meetingEvent.isCurrentUserOwner = req.user && meetingEvent.user && meetingEvent.user._id.toString() === req.user._id.toString();

  res.jsonp(meetingEvent);
};

/**
 * Update a Meeting event
 */
exports.update = function(req, res) {
  var meetingEvent = req.meetingEvent;

  meetingEvent = _.extend(meetingEvent, req.body);

  meetingEvent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meetingEvent);
    }
  });
};

/**
 * Delete an Meeting event
 */
exports.delete = function(req, res) {
  var meetingEvent = req.meetingEvent;

  meetingEvent.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meetingEvent);
    }
  });
};

/**
 * List of Meeting events
 */
exports.list = function(req, res) {
  MeetingEvent.find().sort('-created').populate('user', 'displayName').exec(function(err, meetingEvents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meetingEvents);
    }
  });
};

/**
 * Meeting event middleware
 */
exports.meetingEventByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Meeting event is invalid'
    });
  }

  MeetingEvent.findById(id).populate('user', 'displayName').exec(function (err, meetingEvent) {
    if (err) {
      return next(err);
    } else if (!meetingEvent) {
      return res.status(404).send({
        message: 'No Meeting event with that identifier has been found'
      });
    }
    req.meetingEvent = meetingEvent;
    next();
  });
};
