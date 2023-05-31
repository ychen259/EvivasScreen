'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkout = mongoose.model('Checkout'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config')),
  _ = require('lodash');

var paypal = require('./paypal-api.js');

/**
 * Create a Checkout
 */
exports.createOrder = async function(req, res){
  var tabTension92Price = parseFloat(config.productPrice.tabTension92Price.replace('$',''));
  var tabTension100Price = parseFloat(config.productPrice.tabTension100Price.replace('$',''));
  var tabTension110Price = parseFloat(config.productPrice.tabTension110Price.replace('$',''));
  var floorRising92Price = parseFloat(config.productPrice.floorRising92Price.replace('$',''));
  var floorRising100Price = parseFloat(config.productPrice.floorRising100Price.replace('$',''));
  var floorRising110Price = parseFloat(config.productPrice.floorRising110Price.replace('$',''));
  var mobile92Price = parseFloat(config.productPrice.mobile92Price.replace('$',''));
  var mobile100Price = parseFloat(config.productPrice.mobile100Price.replace('$',''));
  var mobile110Price = parseFloat(config.productPrice.mobile110Price.replace('$',''));

  var purchaseHistory = req.body;
  var total = tabTension92Price * purchaseHistory.purchaseHistory.tab_tension._92inch +
              tabTension100Price * purchaseHistory.purchaseHistory.tab_tension._100inch +
              tabTension110Price * purchaseHistory.purchaseHistory.tab_tension._110inch +
              floorRising92Price * purchaseHistory.purchaseHistory.floor_rising._92inch +
              floorRising100Price * purchaseHistory.purchaseHistory.floor_rising._100inch +
              floorRising110Price * purchaseHistory.purchaseHistory.floor_rising._110inch +
              mobile92Price * purchaseHistory.purchaseHistory.mobile._92inch +
              mobile100Price * purchaseHistory.purchaseHistory.mobile._100inch +
              mobile110Price * purchaseHistory.purchaseHistory.mobile._110inch;
  //if price contain some value like 0.4 x 5 comes out 1.9999, round up number
  total = Math.round(total*100)/100;

  total = total * (1 + config.taxPercentage);
  total = Math.round(total*100)/100;

  console.log(req.body);
  try {
    const order = await paypal.createOrder(total);
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
