const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const TARGET_EMAIL = 'shubhamchakraborty0412@gmail.com';

let memoryVisitorCount = 142;

// In-memory cache to prevent duplicate email alerts from the same IP within 5 minutes
const recentVisitsCache = new Map();
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

// Clean up old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamp] of recentVisitsCache.entries()) {
    if (now - timestamp > COOLDOWN_MS) {
      recentVisitsCache.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Helper to extract the client IP address from Vercel / proxy headers
function extractClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const list = forwarded.split(',');
    if (list.length > 0 && list[0].trim()) {
      return list[0].trim();
    }
  }
  const realIp = req.headers['x-real-ip'];
  if (realIp && realIp.trim()) return realIp.trim();

  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp && cfIp.trim()) return cfIp.trim();

  if (req.body && req.body.ip && typeof req.body.ip === 'string' && req.body.ip.trim()) {
    return req.body.ip.trim();
  }

  return req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || 'Unknown IP';
}

// Helper to fetch quick GeoIP details
async function getGeoDetails(ip) {
  if (!ip || ip === 'Unknown IP' || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return { location: 'Localhost / Internal Network', isp: 'Development Environment' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await res.json();
    if (data && data.status === 'success') {
      const parts = [data.city, data.regionName, data.country].filter(Boolean);
      return {
        location: parts.join(', ') || 'Unknown Location',
        isp: data.isp || data.org || ''
      };
    }
  } catch (err) {
    // GeoIP lookup error ignored gracefully
  }

  return { location: 'Location unavailable', isp: '' };
}

// Send alert via Nodemailer if SMTP configured
async function sendAlertViaNodemailer(visitInfo) {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    return { sent: false, reason: 'No SMTP credentials' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const mailOptions = {
    from: `"Portfolio Monitor" <${user}>`,
    to: TARGET_EMAIL,
    subject: `👁️ ${visitInfo.ip} viewed your portfolio webpage`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 20px 24px;">
          <h2 style="margin: 0; font-size: 19px; font-weight: 600;">Portfolio View Alert</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Silent Real-Time Visitor Notification</p>
        </div>
        <div style="padding: 24px; background: #ffffff;">
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 16px; color: #1e3a8a; font-weight: 700;">
              ${visitInfo.ip} viewed your portfolio webpage.
            </p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #334155;">
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; width: 140px; color: #64748b;">IP Address:</td><td style="color: #0f172a; font-family: monospace; font-size: 14px; font-weight: 600;">${visitInfo.ip}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Location:</td><td style="color: #0f172a;">${visitInfo.location}</td></tr>
            ${visitInfo.isp ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Network / ISP:</td><td style="color: #0f172a;">${visitInfo.isp}</td></tr>` : ''}
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Time (IST):</td><td style="color: #0f172a;">${visitInfo.time}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Device / OS / Browser:</td><td style="color: #0f172a; font-size: 12px;">${visitInfo.userAgent}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Referrer:</td><td style="color: #0f172a;">${visitInfo.referrer}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Page Viewed:</td><td><a href="${visitInfo.pageUrl}" style="color: #2563eb; text-decoration: none;">${visitInfo.pageUrl}</a></td></tr>
          </table>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return { sent: true, messageId: info.messageId };
}

// Send alert via FormSubmit webhook
async function sendAlertViaFormSubmit(visitInfo) {
  try {
    const origin = 'https://eportfolio-final-kappa.vercel.app';
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': origin + '/'
      },
      body: JSON.stringify({
        _subject: `👁️ ${visitInfo.ip} viewed your portfolio webpage`,
        Visitor_Notification: `${visitInfo.ip} viewed your portfolio webpage.`,
        IP_Address: visitInfo.ip,
        Location: visitInfo.location || 'Unknown',
        Network_ISP: visitInfo.isp || 'Unknown',
        Timestamp_IST: visitInfo.time,
        Device_Browser: visitInfo.userAgent,
        Referrer: visitInfo.referrer,
        Page_URL: visitInfo.pageUrl,
        _template: 'table'
      })
    });
    const result = await response.json();
    return { success: result.success === 'true' || result.success === true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

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

// POST /api/visit - Record a page view and silently notify the portfolio owner
router.post('/visit', async (req, res) => {
  try {
    memoryVisitorCount++;

    const ip = extractClientIp(req);
    const now = Date.now();

    // Check rate limit / cooldown for this IP
    const lastSeen = recentVisitsCache.get(ip);
    const shouldNotify = !lastSeen || (now - lastSeen > COOLDOWN_MS);

    if (shouldNotify && ip && ip !== 'Unknown IP') {
      recentVisitsCache.set(ip, now);

      const geo = await getGeoDetails(ip);
      const userAgent = req.headers['user-agent'] || req.body?.userAgent || 'Unknown Device/Browser';
      const referrer = req.headers['referer'] || req.body?.referrer || 'Direct Visit';
      const pageUrl = req.body?.pageUrl || 'https://eportfolio-final-kappa.vercel.app/';

      const istTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
      });

      const visitInfo = {
        ip,
        location: geo.location,
        isp: geo.isp,
        time: `${istTime} (IST)`,
        userAgent,
        referrer,
        pageUrl
      };

      console.log(`👁️ Visitor detected: ${ip}. Dispatching email alert...`);

      // Try Nodemailer first if configured
      let delivered = false;
      try {
        const smtpRes = await sendAlertViaNodemailer(visitInfo);
        if (smtpRes.sent) {
          delivered = true;
          console.log(`✅ Visitor alert sent via SMTP for ${ip}`);
        }
      } catch (smtpErr) {
        // silently fallback
      }

      // If not sent via SMTP, send via FormSubmit webhook
      if (!delivered) {
        try {
          const fsRes = await sendAlertViaFormSubmit(visitInfo);
          if (fsRes.success) {
            console.log(`✅ Visitor alert sent via FormSubmit for ${ip}`);
          }
        } catch (fsErr) {
          console.warn('Visitor notification notice:', fsErr.message);
        }
      }
    }

    // Always respond clean and normal to client
    return res.json({
      success: true,
      count: memoryVisitorCount
    });
  } catch (err) {
    // Fail silently so the visitor never notices anything
    return res.json({
      success: true,
      count: memoryVisitorCount
    });
  }
});

module.exports = router;
