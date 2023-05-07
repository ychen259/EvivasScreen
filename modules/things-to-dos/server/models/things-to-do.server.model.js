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
    required: 'Please fill Service name',
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

ThingsToDoSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});


mongoose.model('ThingsToDo', ThingsToDoSchema);
