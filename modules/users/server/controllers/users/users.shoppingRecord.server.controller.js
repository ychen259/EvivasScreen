'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  aws = require('aws-sdk'),
  amazonS3URI = require('amazon-s3-uri'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User'),
  validator = require('validator');

/**
 * List of Things to dos
 */
exports.getUserRecord = function(req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = req.user;
  }

  res.json(safeUserObject || null);
};

exports.updateShoppingCart = function(req, res) {
  var user = req.user;

  user.shoppingCart = req.body.shoppingCart;
  user.purchaseHistory = req.body.purchaseHistory;
    console.log("update function user: " + req.user);
  /* Save the article */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });

};