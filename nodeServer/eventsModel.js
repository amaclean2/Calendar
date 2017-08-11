'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: 'New Event'
  },
  body: {
    type: String,
    default: ''
  },
  Assigned_date: {
    type: Date,
    default: Date.now
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Events', EventSchema);