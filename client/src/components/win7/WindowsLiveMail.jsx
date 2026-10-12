import React, { useState } from 'react';
import { WindowsLiveMailIcon } from '../Icons';
import { Send, CheckCircle2, AlertCircle, Paperclip, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WindowsLiveMail() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Recruiter / Hiring Manager',
    subject: 'Engineering Opportunity / Research Collaboration',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please specify your sender name, email address, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let isSuccess = false;
      let replyMessage = '';

      // 1. Try sending via backend /api/contact
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success && !data.needsActivation) {
          isSuccess = true;
          replyMessage = data.message;
        } else if (data.needsActivation) {
          setErrorMsg(data.message);
          return;
        }
      } catch (apiErr) {
        console.warn('Backend API submission note:', apiErr.message);
      }

      // 2. If backend didn't confirm delivery, seamlessly forward directly via FormSubmit
      if (!isSuccess) {
        try {
          const directRes = await fetch('https://formsubmit.co/ajax/shubhamchakraborty0412@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              role: formData.roleType,
              _subject: `[Portfolio Message] ${formData.subject} - From ${formData.name}`,
              message: formData.message,
              _template: 'table'
            })
          });
          const directData = await directRes.json();
          if (directData.success === 'true' || directData.success === true) {
            isSuccess = true;
            replyMessage = `Thank you, ${formData.name}! Your message has been sent directly to Shubham's email (shubhamchakraborty0412@gmail.com).`;
          } else if (directData.message && directData.message.toLowerCase().includes('activation')) {
            setErrorMsg(directData.message);
            return;
          }
        } catch (directErr) {
          console.warn('Direct FormSubmit note:', directErr.message);
        }
      }

      if (isSuccess) {
        setSuccessMsg(replyMessage || 'Your message has been sent directly to Shubham (shubhamchakraborty0412@gmail.com).');
        setFormData({
          name: '',
          email: '',
          roleType: 'Recruiter / Hiring Manager',
          subject: 'Engineering Opportunity / Research Collaboration',
          message: ''
        });

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg('Could not deliver email. Please email directly to shubhamchakraborty0412@gmail.com');
      }
    } catch (err) {
      setErrorMsg('Connection failed. You can also write directly to shubhamchakraborty0412@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mail-app">
      {/* Ribbon Bar */}
      <div className="mail-ribbon">
        <button 
          onClick={handleSend}
          disabled={loading}
          className="mail-send-btn"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          <Send size={18} color="#0078d7" />
          <span style={{ marginTop: '2px' }}>{loading ? 'Sending...' : 'Send'}</span>
        </button>
      </div>

      {/* Status Messages */}
      {successMsg && (
        <div style={{ background: '#ecfdf5', borderBottom: '1px solid #a7f3d0', color: '#065f46', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
          <CheckCircle2 size={14} color="#059669" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca', color: '#991b1b', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
          <AlertCircle size={14} color="#dc2626" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Mail Composer Form */}
      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="mail-fields-container">
          <div className="mail-field-row">
            <label className="mail-field-label">To:</label>
            <div style={{ flex: 1, padding: '4px 8px', background: '#eef2f6', borderRadius: '2px', border: '1px solid #c0c6cc', fontSize: '12px', color: '#333' }}>
              Shubham Chakraborty &lt;shubhamchakraborty0412@gmail.com&gt;
            </div>
          </div>

          <div className="mail-field-row">
            <label className="mail-field-label">Sender Name *:</label>
            <input 
              type="text"
              name="name"
              placeholder="e.g. Dr. Aris Thorne / Recruiter Name"
              value={formData.name}
              onChange={handleChange}
              className="mail-input"
              required
            />
          </div>

          <div className="mail-field-row">
            <label className="mail-field-label">Email Address *:</label>
            <input 
              type="email"
              name="email"
              placeholder="e.g. recruiter@organization.com"
              value={formData.email}
              onChange={handleChange}
              className="mail-input"
              required
            />
          </div>

          <div className="mail-field-row">
            <label className="mail-field-label">Inquiry Scope:</label>
            <select 
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              className="mail-input"
            >
              <option value="Recruiter / Hiring Manager">Software Engineering Role (Full-Time / Entry-Level)</option>
              <option value="Internship Inquiry">Internship Opportunity (MERN / Python / AI)</option>
              <option value="Patent / Research Collaboration">Patent / Research Collaboration</option>
              <option value="General Professional Connection">General Engineering Inquiry</option>
            </select>
          </div>

          <div className="mail-field-row">
            <label className="mail-field-label">Subject:</label>
            <input 
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mail-input"
              required
            />
          </div>
        </div>

        {/* Mail Body Editor */}
        <textarea 
          name="message"
          placeholder="Dear Shubham,

We reviewed your portfolio, patent disclosure, and software engineering background. We would like to connect with you regarding..."
          value={formData.message}
          onChange={handleChange}
          className="mail-body-textarea"
          required
        />
      </form>
    </div>
  );
}
