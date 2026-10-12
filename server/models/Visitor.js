const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    default: 'anonymous'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  referrer: {
    type: String,
    default: 'direct'
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
