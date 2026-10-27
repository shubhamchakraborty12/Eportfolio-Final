const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const TARGET_EMAIL = 'shubhamchakraborty0412@gmail.com';
const PRODUCTION_ORIGIN = 'https://eportfolio-final-kappa.vercel.app';

let memoryVisitorCount = 142;

// In-memory cache to prevent flood from rapid reloads (60 seconds cooldown per IP)
const recentVisitsCache = new Map();
const COOLDOWN_MS = 60 * 1000; // 60 seconds

// Periodic cleanup of cache
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamp] of recentVisitsCache.entries()) {
    if (now - timestamp > COOLDOWN_MS) {
      recentVisitsCache.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Helper to determine if an IP is a private/internal/local address
function isPrivateIp(ip) {
  if (!ip || typeof ip !== 'string') return true;
  const clean = ip.replace(/^::ffff:/, '').trim().toLowerCase();
  if (clean === '127.0.0.1' || clean === '::1' || clean === 'localhost') return true;
  if (clean.startsWith('10.') || clean.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clean)) return true;
  if (clean.startsWith('169.254.')) return true; // Link-local
  if (clean.startsWith('fc00:') || clean.startsWith('fe80:') || clean.startsWith('fd')) return true; // IPv6 local
  return false;
}

// Helper to extract the genuine client IP address
function extractClientIp(req) {
  // 1. Check Vercel edge real-ip
  const realIp = req.headers['x-real-ip'];
  if (realIp && typeof realIp === 'string' && !isPrivateIp(realIp)) {
    return realIp.trim().replace(/^::ffff:/, '');
  }

  // 2. Check x-vercel-forwarded-for
  const vercelForwarded = req.headers['x-vercel-forwarded-for'];
  if (vercelForwarded && typeof vercelForwarded === 'string') {
    const parts = vercelForwarded.split(',').map(s => s.trim().replace(/^::ffff:/, ''));
    for (const p of parts) {
      if (p && !isPrivateIp(p)) return p;
    }
  }

  // 3. Check client-reported public IP (from ipwho.is / api64.ipify.org)
  if (req.body && req.body.ip && typeof req.body.ip === 'string') {
    const candidate = req.body.ip.trim().replace(/^::ffff:/, '');
    if (candidate && candidate !== 'Unknown IP' && !isPrivateIp(candidate)) {
      return candidate;
    }
  }

  // 4. Check standard x-forwarded-for (first non-private IP in chain)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded && typeof forwarded === 'string') {
    const parts = forwarded.split(',').map(s => s.trim().replace(/^::ffff:/, ''));
    for (const p of parts) {
      if (p && !isPrivateIp(p)) return p;
    }
  }

  // 5. Check Cloudflare connecting-ip if applicable
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp && typeof cfIp === 'string' && !isPrivateIp(cfIp)) {
    return cfIp.trim().replace(/^::ffff:/, '');
  }

  const fallback = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress;
  return fallback ? fallback.replace(/^::ffff:/, '') : 'Unknown IP';
}

// Fast GeoIP enrichment with Vercel edge headers preference
async function getGeoDetails(ip, req) {
  // 1. Try Vercel's native edge headers first (instant, 100% accurate, no external API call)
  const vCity = req.headers['x-vercel-ip-city'];
  const vRegion = req.headers['x-vercel-ip-country-region'];
  const vCountry = req.headers['x-vercel-ip-country'];
  if (vCity || vCountry) {
    const parts = [vCity ? decodeURIComponent(vCity) : '', vRegion, vCountry].filter(Boolean);
    return {
      location: parts.join(', ') || 'Location detected',
      isp: 'Vercel Edge Network'
    };
  }

  // 2. Check if client gathered geo info
  if (req.body && (req.body.location || req.body.city)) {
    const parts = [req.body.city, req.body.region, req.body.country].filter(Boolean);
    return {
      location: req.body.location || parts.join(', ') || 'Location detected',
      isp: req.body.isp || ''
    };
  }

  // 3. If local or private IP, return dev network
  if (isPrivateIp(ip)) {
    return { location: 'Local / Development Network', isp: 'Internal' };
  }

  // 4. Fallback lookup via ipwho.is with 2.5s strict timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal });
    clearTimeout(timeout);
    const data = await res.json();
    if (data && data.success) {
      const parts = [data.city, data.region, data.country].filter(Boolean);
      return {
        location: parts.join(', ') || 'Location detected',
        isp: data.connection?.isp || data.connection?.org || ''
      };
    }
  } catch (err) {
    // GeoIP lookup error ignored
  }

  return { location: 'Location detected', isp: '' };
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

  const deviceLabel = visitInfo.localIp 
    ? `Device IP: ${visitInfo.localIp}` 
    : (visitInfo.deviceDetails?.platform ? `Device: ${visitInfo.deviceDetails.platform}` : 'Device Alert');

  const mailOptions = {
    from: `"Portfolio Visitor Monitor" <${user}>`,
    to: TARGET_EMAIL,
    subject: `👁️ ${deviceLabel} | WAN: ${visitInfo.ip} viewed your portfolio`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 22px 24px;">
          <h2 style="margin: 0; font-size: 19px; font-weight: 600;">Portfolio View Alert</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Silent Real-Time Visitor Notification</p>
        </div>
        <div style="padding: 24px; background: #ffffff;">
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 15px; color: #1e3a8a; font-weight: 700;">
              ${deviceLabel} (Internet WAN: ${visitInfo.ip}) viewed your portfolio webpage.
            </p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #334155;">
            <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: 700; width: 170px; color: #1e3a8a;">Device / Local IP (LAN):</td>
              <td style="padding: 10px 12px; color: #1d4ed8; font-family: monospace; font-size: 13px; font-weight: 700;">
                ${visitInfo.localIp ? `${visitInfo.localIp} (Local Network Adapter)` : 'Protected by Browser mDNS (Internal 10.x.x.x / 192.168.x.x Subnet)'}
              </td>
            </tr>
            ${visitInfo.localIpv6 ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Link-Local IPv6:</td><td style="padding: 10px 12px; color: #0f172a; font-family: monospace; font-size: 12px;">${visitInfo.localIpv6}</td></tr>` : ''}
            ${visitInfo.mdnsHost ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Device Host Token:</td><td style="padding: 10px 12px; color: #0f172a; font-family: monospace; font-size: 12px;">${visitInfo.mdnsHost}</td></tr>` : ''}
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Public Internet IP (WAN):</td>
              <td style="padding: 10px 12px; color: #0f172a; font-family: monospace; font-size: 14px; font-weight: 700;">
                ${visitInfo.ip} <span style="font-size: 11px; font-weight: 400; color: #64748b;">(Assigned by ${visitInfo.isp || 'Broadband ISP'})</span>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Location:</td><td style="padding: 10px 12px; color: #0f172a;">${visitInfo.location}</td></tr>
            ${visitInfo.isp ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Network / ISP:</td><td style="padding: 10px 12px; color: #0f172a;">${visitInfo.isp}</td></tr>` : ''}
            ${visitInfo.deviceDetails?.connection ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Network Connection:</td><td style="padding: 10px 12px; color: #0f172a;">${visitInfo.deviceDetails.connection}</td></tr>` : ''}
            ${(visitInfo.deviceDetails?.cores || visitInfo.deviceDetails?.memory || visitInfo.deviceDetails?.screenRes) ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Device Hardware:</td>
              <td style="padding: 10px 12px; color: #0f172a; font-size: 12px;">
                ${[visitInfo.deviceDetails.cores, visitInfo.deviceDetails.memory, `Display: ${visitInfo.deviceDetails.screenRes}`].filter(Boolean).join(' • ')}
              </td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Time (IST):</td><td style="padding: 10px 12px; color: #0f172a;">${visitInfo.time}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">OS & Browser:</td><td style="padding: 10px 12px; color: #0f172a; font-size: 12px;">${visitInfo.userAgent}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Referrer:</td><td style="padding: 10px 12px; color: #0f172a;">${visitInfo.referrer}</td></tr>
            <tr><td style="padding: 10px 12px; font-weight: 600; color: #64748b;">Page Viewed:</td><td style="padding: 10px 12px;"><a href="${visitInfo.pageUrl}" style="color: #2563eb; text-decoration: none;">${visitInfo.pageUrl}</a></td></tr>
          </table>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return { sent: true, messageId: info.messageId };
}

// Send alert via FormSubmit webhook with 6-second timeout & _captcha: 'false'
async function sendAlertViaFormSubmit(visitInfo) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const deviceLabel = visitInfo.localIp 
      ? `Device IP: ${visitInfo.localIp}` 
      : (visitInfo.deviceDetails?.platform ? `Device: ${visitInfo.deviceDetails.platform}` : 'Device Alert');

    const subject = `👁️ ${deviceLabel} | WAN: ${visitInfo.ip} viewed your portfolio`;

    const browserUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': PRODUCTION_ORIGIN,
        'Referer': PRODUCTION_ORIGIN + '/',
        'User-Agent': browserUserAgent
      },
      body: JSON.stringify({
        name: `Portfolio Visitor (${deviceLabel})`,
        email: 'visitor-alert@portfolio-tracker.com',
        _subject: subject,
        message: `A visitor viewed your portfolio webpage.\n\n• Device / Local IP (LAN): ${visitInfo.localIp ? `${visitInfo.localIp} (Local Network Adapter)` : 'Protected by Browser mDNS (Subnet: 10.x.x.x / 192.168.x.x)'}\n${visitInfo.localIpv6 ? `• Link-Local IPv6: ${visitInfo.localIpv6}\n` : ''}${visitInfo.mdnsHost ? `• Device Host Token: ${visitInfo.mdnsHost}\n` : ''}• Public Internet IP (WAN): ${visitInfo.ip} (${visitInfo.isp || 'Broadband ISP'})\n• Location: ${visitInfo.location}\n• Network / ISP: ${visitInfo.isp}\n• Device Specs: ${[visitInfo.deviceDetails?.cores, visitInfo.deviceDetails?.memory, visitInfo.deviceDetails?.screenRes].filter(Boolean).join(' • ')}\n• Network Connection: ${visitInfo.deviceDetails?.connection || 'Broadband / Wi-Fi'}\n• Time (IST): ${visitInfo.time}\n• Device & Browser: ${visitInfo.userAgent}\n• Referrer: ${visitInfo.referrer}\n• Page Viewed: ${visitInfo.pageUrl}`,
        Device_Local_IP: visitInfo.localIp || 'Protected by Browser mDNS (Internal 10.x.x.x)',
        Public_WAN_IP: visitInfo.ip,
        Location: visitInfo.location || 'Unknown',
        Network_ISP: visitInfo.isp || 'Unknown',
        Device_Specs: [visitInfo.deviceDetails?.cores, visitInfo.deviceDetails?.memory, visitInfo.deviceDetails?.screenRes].filter(Boolean).join(' • ') || 'Standard PC',
        Timestamp_IST: visitInfo.time,
        Device_Browser: visitInfo.userAgent,
        Referrer: visitInfo.referrer,
        Page_URL: visitInfo.pageUrl,
        _captcha: 'false',
        _template: 'table'
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const text = await response.text();
    let result = {};
    try {
      result = JSON.parse(text);
    } catch (_) {
      result = { success: false, raw: text.slice(0, 150) };
    }
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

// POST /api/visit - Record a page view and silently notify portfolio owner
router.post('/visit', async (req, res) => {
  try {
    memoryVisitorCount++;

    const ip = extractClientIp(req);
    const now = Date.now();
    const isForce = req.query?.force === 'true' || req.body?.force === true;

    // Check rate limit / cooldown for this IP
    const lastSeen = recentVisitsCache.get(ip);
    const shouldNotify = isForce || !lastSeen || (now - lastSeen > COOLDOWN_MS);

    let delivered = false;

    if (shouldNotify && ip && ip !== 'Unknown IP') {
      recentVisitsCache.set(ip, now);

      const geo = await getGeoDetails(ip, req);
      const userAgent = req.headers['user-agent'] || req.body?.userAgent || 'Unknown Device/Browser';
      const referrer = req.headers['referer'] || req.body?.referrer || 'Direct Visit';
      const pageUrl = req.body?.pageUrl || PRODUCTION_ORIGIN;

      const istTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
      });

      const localIp = req.body && req.body.localIp && typeof req.body.localIp === 'string' ? req.body.localIp.trim() : '';
      const localIpv6 = req.body && req.body.localIpv6 && typeof req.body.localIpv6 === 'string' ? req.body.localIpv6.trim() : '';
      const mdnsHost = req.body && req.body.mdnsHost && typeof req.body.mdnsHost === 'string' ? req.body.mdnsHost.trim() : '';
      const deviceDetails = req.body?.deviceDetails || {};

      const visitInfo = {
        ip,
        localIp,
        localIpv6,
        mdnsHost,
        deviceDetails,
        location: geo.location,
        isp: geo.isp,
        time: `${istTime} (IST)`,
        userAgent,
        referrer,
        pageUrl
      };

      console.log(`👁️ Visitor detected: ${ip}. Delivering alert to ${TARGET_EMAIL}...`);

      // Try Nodemailer first if configured
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
            delivered = true;
            console.log(`✅ Visitor alert sent via FormSubmit for ${ip}`);
          }
        } catch (fsErr) {
          console.warn('FormSubmit notice:', fsErr.message);
        }
      }
    }

    return res.json({
      success: true,
      delivered,
      count: memoryVisitorCount,
      detectedIp: ip
    });
  } catch (err) {
    // Fail silently so the visitor never notices anything
    return res.json({
      success: true,
      delivered: false,
      count: memoryVisitorCount
    });
  }
});

module.exports = router;
