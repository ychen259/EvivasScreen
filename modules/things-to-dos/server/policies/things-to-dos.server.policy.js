'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Things to dos Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/things-to-dos',
      permissions: '*'
    }, {
      resources: '/api/things-to-dos/:thingsToDoId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/things-to-dos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/things-to-dos/:thingsToDoId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/things-to-dos',
      permissions: ['get']
    }, {
      resources: '/api/things-to-dos/:thingsToDoId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Things to dos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Things to do is being processed and the current user created it then allow any manipulation
  if (req.thingsToDo && req.user && req.thingsToDo.user && req.thingsToDo.user.id === req.user.id) {
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
