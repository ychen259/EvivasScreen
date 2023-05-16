'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Checkout Schema
 */
var CheckoutSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Checkout name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Checkout', CheckoutSchema);
