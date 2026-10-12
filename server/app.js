require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'shubhamchakraborty0412@gmail.com';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes mounted under both /api and / so it works seamlessly in standalone Express and Vercel serverless rewrites
app.use('/api', portfolioRoutes);
app.use('/api', contactRoutes);
app.use('/api', interactionRoutes);

app.use('/', portfolioRoutes);
app.use('/', contactRoutes);
app.use('/', interactionRoutes);

// Dedicated route to serve Resume PDF
app.get(['/api/resume', '/resume.pdf'], (req, res) => {
  const resumePublicPath = path.join(__dirname, '../client/public/resume.pdf');
  res.contentType('application/pdf');
  res.sendFile(resumePublicPath, (err) => {
    if (err) {
      // Fallback redirect to Google Drive resume
      res.redirect('https://drive.google.com/file/d/1X8ggVTeTS9EBGWd3W3z8usVZlwnDx2Qv/view?usp=sharing');
    }
  });
});

// API Info route
app.get('/api-info', (req, res) => {
  res.json({
    status: 'ACTIVE',
    project: 'Shubham Chakraborty - E-Portfolio API',
    notificationEmail: NOTIFICATION_EMAIL,
    endpoints: {
      portfolio: '/api/portfolio',
      contact: '/api/contact (GET, POST)',
      stats: '/api/stats',
      health: '/api/health',
      resume: '/api/resume'
    }
  });
});

module.exports = app;
