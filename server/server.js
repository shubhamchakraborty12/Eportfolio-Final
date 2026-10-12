require('dotenv').config();
const path = require('path');
const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'shubhamchakraborty0412@gmail.com';

// Serve static client assets in local production mode if built
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDist, 'index.html'), err => {
    if (err) {
      res.status(200).send('Shubham Chakraborty Portfolio API is running. Client is served via Vite dev server.');
    }
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Portfolio Server running on http://localhost:${PORT}`);
    console.log(`✉️ Email Dispatch Target: ${NOTIFICATION_EMAIL}`);
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    console.log(`💼 Portfolio API: http://localhost:${PORT}/api/portfolio`);
    console.log(`======================================================\n`);
  });
}
