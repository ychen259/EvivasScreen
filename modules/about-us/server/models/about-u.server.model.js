'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * About u Schema
 */
var AboutUSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill About u name',
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

mongoose.model('AboutU', AboutUSchema);
