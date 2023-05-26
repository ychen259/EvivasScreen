'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkout = mongoose.model('Checkout'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var paypal = require('./paypal-api.js');

/**
 * Create a Checkout
 */
exports.createOrder = async function(req, res){
  console.log("createorder function sedddddddddddddddddddddddddddddddddddddddddddddddrver");
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Show the current Checkout
 */
exports.captureOrder =  async function(req, res) {
    console.log("captureOrder function server");
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
