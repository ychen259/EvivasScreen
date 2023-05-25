'use strict';

/**
 * Module dependencies
 */
var checkoutsPolicy = require('../policies/checkouts.server.policy'),
  checkouts = require('../controllers/checkouts.server.controller');
var paypal = require('../controllers/paypal-api.js');
var express = require('express');

module.exports = function(app) {

  // Checkouts Routes
  /*app.route('api/my-server/create-paypal-order').all(checkoutsPolicy.isAllowed)
    .post(checkouts.createOrder);
  /*app.route('/my-server/capture-paypal-order').all(checkoutsPolicy.isAllowed)
     .post(checkouts.captureOrder);   
*/
app.use(express.json());

app.post("/api/my-server/create-paypal-order", async (req, res) => {
  console.log("sssssssssssssssssssssssssssssssssserver")
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  console.log("order id: " + orderID);
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
};

