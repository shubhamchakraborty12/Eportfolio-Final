const express = require('express');
const router = express.Router();
const portfolioData = require('../data/portfolioData');

// GET /api/portfolio - Returns full profile data
router.get('/portfolio', (req, res) => {
  res.json({
    success: true,
    data: {
      ...portfolioData,
      personal: portfolioData.profile
    }
  });
});

// GET /api/health - Server status & email service telemetry
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ONLINE',
    emailService: {
      status: 'Ready',
      target: 'shubhamchakraborty0412@gmail.com'
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
