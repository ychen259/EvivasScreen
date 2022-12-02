'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Meeting event Schema
 */
var MeetingEventSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Meeting event name',
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

mongoose.model('MeetingEvent', MeetingEventSchema);
