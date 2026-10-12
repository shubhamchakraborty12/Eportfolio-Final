const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const TARGET_EMAIL = 'shubhamchakraborty0412@gmail.com';

// Local in-memory log of recent submissions
const recentSubmissions = [];

// Helper to send via Nodemailer if SMTP credentials are provided in environment variables
async function sendViaNodemailer(contactData) {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    return { sent: false, reason: 'No SMTP credentials in environment variables' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const mailOptions = {
    from: `"${contactData.name} (via E-Portfolio)" <${user}>`,
    to: TARGET_EMAIL,
    replyTo: contactData.email,
    subject: `[Portfolio Message] ${contactData.subject} (${contactData.roleType})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c0d1e5; border-radius: 6px; overflow: hidden;">
        <div style="background: linear-gradient(to bottom, #2b78e4, #0052cc); color: white; padding: 16px 20px;">
          <h2 style="margin: 0; font-size: 18px;">New Contact Inquiry Received</h2>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Windows 7 E-Portfolio Notification</p>
        </div>
        <div style="padding: 20px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; color: #555; width: 120px;"><strong>Sender Name:</strong></td><td style="color: #111;">${contactData.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #555;"><strong>Sender Email:</strong></td><td><a href="mailto:${contactData.email}">${contactData.email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #555;"><strong>Inquiry Scope:</strong></td><td style="color: #0052cc;"><strong>${contactData.roleType}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #555;"><strong>Subject:</strong></td><td style="color: #111;">${contactData.subject}</td></tr>
            <tr><td style="padding: 6px 0; color: #555;"><strong>Received At:</strong></td><td style="color: #777;">${new Date().toLocaleString()}</td></tr>
          </table>
          <div style="background: #f4f7fb; border-left: 4px solid #0052cc; padding: 14px; font-size: 13px; color: #222; line-height: 1.6; white-space: pre-wrap;">
            ${contactData.message}
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${contactData.email}?subject=Re: ${encodeURIComponent(contactData.subject)}" style="background: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: bold; display: inline-block;">
              Reply to ${contactData.name}
            </a>
          </div>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return { sent: true, messageId: info.messageId };
}

// Helper to send via FormSubmit HTTP API
async function sendViaFormSubmit(contactData, originUrl) {
  try {
    const origin = originUrl ? originUrl.replace(/\/+$/, '') : 'https://eportfolio-final-kappa.vercel.app';
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': origin + '/'
      },
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        role: contactData.roleType,
        _subject: `[Portfolio Message] ${contactData.subject} - From ${contactData.name}`,
        message: contactData.message,
        _template: 'table'
      })
    });
    const result = await response.json();
    const isSuccess = result.success === true || result.success === 'true';
    const needsActivation = result.message && result.message.toLowerCase().includes('activation');
    return {
      success: isSuccess,
      needsActivation,
      message: result.message,
      result
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// POST /api/contact - Send inquiry email directly to shubhamchakraborty0412@gmail.com
router.post('/contact', async (req, res) => {
  try {
    const { name, email, roleType, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    const contactData = {
      _id: 'sub_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      roleType: roleType || 'Recruiter / Hiring Manager',
      subject: subject && subject.trim() ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim(),
      createdAt: new Date()
    };

    recentSubmissions.unshift(contactData);
    if (recentSubmissions.length > 50) recentSubmissions.pop();

    console.log(`📨 Contact submission from ${contactData.name} (${contactData.email}). Target: ${TARGET_EMAIL}`);

    let emailDelivered = false;
    let deliveryMethod = 'none';
    let activationWarning = null;

    // 1. Try Nodemailer if SMTP credentials configured in Vercel environment variables
    try {
      const nodeMailerResult = await sendViaNodemailer(contactData);
      if (nodeMailerResult.sent) {
        emailDelivered = true;
        deliveryMethod = 'nodemailer';
        console.log('✅ Delivered directly via Gmail SMTP to', TARGET_EMAIL);
      }
    } catch (smtpErr) {
      console.warn('⚠️ Nodemailer notice:', smtpErr.message);
    }

    // 2. Try FormSubmit webhook
    const requestOrigin = req.headers.origin || req.headers.referer;
    try {
      const formSubmitResult = await sendViaFormSubmit(contactData, requestOrigin);
      if (formSubmitResult.success) {
        emailDelivered = true;
        if (deliveryMethod === 'none') deliveryMethod = 'formsubmit';
        console.log('✅ Dispatched via FormSubmit to', TARGET_EMAIL);
      } else if (formSubmitResult.needsActivation) {
        activationWarning = formSubmitResult.message;
        console.warn('⚠️ FormSubmit requires one-time activation click on', TARGET_EMAIL);
      }
    } catch (fsErr) {
      console.warn('⚠️ FormSubmit dispatch notice:', fsErr.message);
    }

    if (emailDelivered) {
      return res.status(200).json({
        success: true,
        message: `Thank you, ${contactData.name}! Your message has been sent directly to Shubham's email (${TARGET_EMAIL}).`,
        targetEmail: TARGET_EMAIL,
        deliveryMethod: deliveryMethod,
        timestamp: new Date().toISOString()
      });
    }

    if (activationWarning) {
      return res.status(200).json({
        success: true,
        needsActivation: true,
        message: `Action Required: FormSubmit sent an activation link to ${TARGET_EMAIL}. Please check your Inbox (or Spam/Promotions folder) and click 'Activate Form' once to enable automatic email delivery!`,
        targetEmail: TARGET_EMAIL,
        timestamp: new Date().toISOString()
      });
    }

    return res.status(500).json({
      success: false,
      message: `Could not deliver email. Please email directly to ${TARGET_EMAIL} or configure SMTP credentials in Vercel.`,
      targetEmail: TARGET_EMAIL
    });
  } catch (error) {
    console.error('Contact processing error:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to transmit message. You can write directly to ${TARGET_EMAIL}`,
      error: error.message
    });
  }
});

// GET /api/contact - List recent submissions
router.get('/contact', (req, res) => {
  res.json({
    success: true,
    count: recentSubmissions.length,
    data: recentSubmissions,
    targetEmail: TARGET_EMAIL
  });
});

module.exports = router;
