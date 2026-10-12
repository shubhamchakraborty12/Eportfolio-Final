const express = require('express');
const router = express.Router();

let memoryVisitorCount = 142;

// GET /api/stats - Live visitor and portfolio statistics
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalVisitors: memoryVisitorCount,
      patentPublished: true,
      patentNumber: "202521127184 A"
    }
  });
});

// POST /api/visit - Record a page view
router.post('/visit', (req, res) => {
  memoryVisitorCount++;
  res.json({ success: true, message: 'Visit logged' });
});

module.exports = router;
