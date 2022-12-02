'use strict';

/**
 * Module dependencies
 */
var meetingEventsPolicy = require('../policies/meeting-events.server.policy'),
  meetingEvents = require('../controllers/meeting-events.server.controller');

module.exports = function(app) {
  // Meeting events Routes
  app.route('/api/meeting-events').all(meetingEventsPolicy.isAllowed)
    .get(meetingEvents.list)
    .post(meetingEvents.create);

  app.route('/api/meeting-events/:meetingEventId').all(meetingEventsPolicy.isAllowed)
    .get(meetingEvents.read)
    .put(meetingEvents.update)
    .delete(meetingEvents.delete);

  // Finish by binding the Meeting event middleware
  app.param('meetingEventId', meetingEvents.meetingEventByID);
};
