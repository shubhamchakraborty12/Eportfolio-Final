const mongoose = require('mongoose');

const projectStatSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  lastInteracted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProjectStat', projectStatSchema);
