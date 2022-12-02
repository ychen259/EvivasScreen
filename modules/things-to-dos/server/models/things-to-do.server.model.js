'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Things to do Schema
 */
var ThingsToDoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Things to do name',
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

mongoose.model('ThingsToDo', ThingsToDoSchema);
