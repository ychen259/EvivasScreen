'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Meeting events Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/meeting-events',
      permissions: '*'
    }, {
      resources: '/api/meeting-events/:meetingEventId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/meeting-events',
      permissions: ['get', 'post']
    }, {
      resources: '/api/meeting-events/:meetingEventId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/meeting-events',
      permissions: ['get']
    }, {
      resources: '/api/meeting-events/:meetingEventId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Meeting events Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Meeting event is being processed and the current user created it then allow any manipulation
  if (req.meetingEvent && req.user && req.meetingEvent.user && req.meetingEvent.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
