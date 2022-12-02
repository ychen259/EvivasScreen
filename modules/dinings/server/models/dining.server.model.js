'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dining Schema
 */
var DiningSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Dining name',
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

mongoose.model('Dining', DiningSchema);
