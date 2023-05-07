'use strict';

/**
 * Module dependencies
 */
var thingsToDosPolicy = require('../policies/things-to-dos.server.policy'),
  thingsToDos = require('../controllers/things-to-dos.server.controller');

module.exports = function(app) {
  // Things to dos Routes
  app.route('/api/things-to-dos').all(thingsToDosPolicy.isAllowed)
    //.get(thingsToDos.getUserRecord)  //get shopping record and purchase record from databasse
    //.post(thingsToDos.create)  //create shopping record and purchase record from databasse
    //.put(thingsToDos.updateShoppingCart);  //update shopping cart

  app.route('/api/things-to-dos/:thingsToDoId').all(thingsToDosPolicy.isAllowed)
    .get(thingsToDos.read)
    .put(thingsToDos.update)
    .delete(thingsToDos.delete);

  // Finish by binding the Things to do middleware
  app.param('thingsToDoId', thingsToDos.thingsToDoByID);
};
