'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Purchase history Schema
 */
var PurchaseHistorySchema = new Schema({
  purchaseHistory: {
    tab_tension: {
      _92inch: { type: Number, default: 0},
      _100inch: { type: Number, default: 0},
      _110inch: { type: Number, default: 0}
    },
    floor_rising: {
      _92inch: { type: Number, default: 0},
      _100inch: { type: Number, default: 0},
      _110inch: { type: Number, default: 0}
    },
    mobile: {
      _92inch: { type: Number, default: 0},
      _100inch: { type: Number, default: 0},
      _110inch: { type: Number, default: 0}
    }
  },
  total:{ type: Number, default:0},
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('PurchaseHistory', PurchaseHistorySchema);
