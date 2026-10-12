const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  roleType: {
    type: String,
    enum: ['Recruiter / Hiring Manager', 'Engineering Collaborator', 'Client / Freelance', 'Student / Peer', 'Other'],
    default: 'Recruiter / Hiring Manager'
  },
  subject: {
    type: String,
    trim: true,
    default: 'Portfolio Inquiry'
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  }
});

module.exports = mongoose.model('Contact', contactSchema);
