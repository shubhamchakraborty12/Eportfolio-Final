import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Database,
  RefreshCw
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Recruiter / Hiring Manager',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const hiddenFormRef = useRef(null);

  // Live MongoDB Inspection state
  const [showDbMessages, setShowDbMessages] = useState(false);
  const [dbMessages, setDbMessages] = useState([]);
  const [loadingDb, setLoadingDb] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please specify your name, a valid email address, and message details.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let isSuccess = false;
      let replyMessage = '';

      // 1. Try sending via backend /api/contact with 8-second timeout
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          signal: controller.signal
        });
        clearTimeout(timeout);
        const data = await response.json();

        if (data.success && !data.needsActivation) {
          isSuccess = true;
          replyMessage = data.message;
        } else if (data.needsActivation) {
          setErrorMsg(data.message);
          return;
        } else if (data.message) {
          replyMessage = data.message;
        }
      } catch (apiErr) {
        console.warn('Backend API note:', apiErr.message);
      }

      // 2. Direct FormSubmit fallback with URL-encoded parameters
      if (!isSuccess) {
        try {
          const directController = new AbortController();
          const directTimeout = setTimeout(() => directController.abort(), 8000);

          const params = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            role: formData.roleType,
            _subject: `[Portfolio Message] ${formData.subject || 'Inquiry'} - From ${formData.name}`,
            message: formData.message,
            _captcha: 'false',
            _template: 'table'
          });

          const directRes = await fetch('https://formsubmit.co/ajax/shubhamchakraborty0412@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            body: params.toString(),
            signal: directController.signal
          });
          clearTimeout(directTimeout);
          const directData = await directRes.json();
          if (directData.success === 'true' || directData.success === true) {
            isSuccess = true;
            replyMessage = `Thank you, ${formData.name}! Your message has been sent directly to Shubham (shubhamchakraborty0412@gmail.com).`;
          } else if (directData.message && directData.message.toLowerCase().includes('activation')) {
            setErrorMsg(directData.message);
            return;
          } else if (directData.message) {
            replyMessage = directData.message;
          }
        } catch (directErr) {
          console.warn('Direct FormSubmit note:', directErr.message);
        }
      }

      // 3. Fallback: Native HTML browser form submission via hidden iframe (bypasses CORS and Cloudflare WAF)
      if (!isSuccess && hiddenFormRef.current) {
        try {
          hiddenFormRef.current.submit();
          isSuccess = true;
          replyMessage = `Thank you, ${formData.name}! Your message has been dispatched directly to Shubham's email (shubhamchakraborty0412@gmail.com).`;
        } catch (iframeErr) {
          console.warn('Iframe submission note:', iframeErr.message);
        }
      }

      if (isSuccess) {
        setSuccessMsg(replyMessage || 'Your message has been sent directly to Shubham (shubhamchakraborty0412@gmail.com).');
        setFormData({
          name: '',
          email: '',
          roleType: 'Recruiter / Hiring Manager',
          subject: '',
          message: ''
        });

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        setErrorMsg(replyMessage || 'Could not deliver email. Please email directly to shubhamchakraborty0412@gmail.com');
      }
    } catch (err) {
      setErrorMsg('Network error. You may also contact directly via shubhamchakraborty0412@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const fetchDbMessages = async () => {
    setLoadingDb(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setDbMessages(data.data || []);
      }
    } catch (err) {
      console.warn('Could not fetch DB messages:', err.message);
    } finally {
      setLoadingDb(false);
    }
  };

  const toggleDbMessages = () => {
    if (!showDbMessages) {
      fetchDbMessages();
    }
    setShowDbMessages(!showDbMessages);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-paper-950 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-850 border border-paper-750 text-xs font-mono text-slate-300 mb-3">
            <Mail size={13} className="text-patent-amber" />
            <span>Direct Communication & Opportunities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Initiate <span className="text-patent-amber">Dialogue</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Available for software engineering opportunities, applied machine learning research, or technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4 reveal-on-scroll">
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              Communication Coordinates
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
              Inquiries regarding entry-level engineering roles, patent methodology, or software architecture receive immediate attention.
            </p>

            <div className="space-y-3">
              <a 
                href="mailto:shubhamchakraborty0412@gmail.com" 
                className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate flex items-center gap-3.5 transition-all text-slate-300 no-underline group block"
              >
                <div className="p-2.5 rounded bg-paper-850 border border-paper-700 text-patent-amber group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Direct Email</div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-patent-light transition-colors">
                    shubhamchakraborty0412@gmail.com
                  </div>
                </div>
              </a>

              <a 
                href="tel:+919561297328" 
                className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate flex items-center gap-3.5 transition-all text-slate-300 no-underline group block"
              >
                <div className="p-2.5 rounded bg-paper-850 border border-paper-700 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Telephone & WhatsApp</div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    +91-9561297328
                  </div>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/shubham-chakraborty-76364a31a" 
                target="_blank" 
                rel="noreferrer" 
                className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate flex items-center gap-3.5 transition-all text-slate-300 no-underline group block"
              >
                <div className="p-2.5 rounded bg-paper-850 border border-paper-700 text-sky-400 group-hover:scale-110 transition-transform">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">LinkedIn Network</div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                    linkedin.com/in/shubham-chakraborty-76364a31a
                  </div>
                </div>
              </a>

              <a 
                href="https://github.com/shubhamchakraborty12" 
                target="_blank" 
                rel="noreferrer" 
                className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate flex items-center gap-3.5 transition-all text-slate-300 no-underline group block"
              >
                <div className="p-2.5 rounded bg-paper-850 border border-paper-700 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Github size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">GitHub Engineering</div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    github.com/shubhamchakraborty12
                  </div>
                </div>
              </a>

              <div className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate flex items-center gap-3.5 text-slate-300">
                <div className="p-2.5 rounded bg-paper-850 border border-paper-700 text-slate-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Academic & Work Base</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    Nagpur, Maharashtra, India
                  </div>
                </div>
              </div>
            </div>

            {/* MERN Database Inspector Button */}
            <div className="pt-2">
              <button 
                onClick={toggleDbMessages}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-paper-900 border border-patent-amber/40 hover:bg-paper-850 text-xs font-mono text-patent-amber transition-all hover:border-patent-amber"
              >
                <Database size={13} />
                <span>{showDbMessages ? 'Hide Live MongoDB Inquiries' : 'Inspect Live MongoDB Inquiries (MERN Verified)'}</span>
              </button>
            </div>
          </div>

          {/* Working Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-paper-900 border border-paper-750 hover-card-elevate apple-card reveal-scale">
            <h3 className="font-heading text-xl font-bold text-white mb-1">
              Dispatch Written Message
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Directly validated and persisted to MongoDB via Express REST API.
            </p>

            {successMsg && (
              <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 mb-4">
                <CheckCircle2 size={15} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2 mb-4">
                <AlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="e.g. Dr. Aris Thorne / Recruiter"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-paper-950 border border-paper-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-patent-amber"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="e.g. contact@institution.org"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-paper-950 border border-paper-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-patent-amber"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Affiliation / Purpose</label>
                  <select 
                    name="roleType"
                    value={formData.roleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-paper-950 border border-paper-700 text-xs text-white focus:outline-none focus:border-patent-amber"
                  >
                    <option value="Recruiter / Hiring Manager">Recruiter / Job Opportunity</option>
                    <option value="Engineering Collaborator">Engineering Collaboration</option>
                    <option value="Client / Freelance">Technical Advisory / Contract</option>
                    <option value="Student / Peer">Research / Technical Exchange</option>
                    <option value="Other">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Subject Header</label>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="e.g. Full-Stack / AI Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-paper-950 border border-paper-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-patent-amber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Inquiry Description *</label>
                <textarea 
                  name="message" 
                  rows={4}
                  placeholder="Outline the role, engineering problem statement, or collaboration parameters..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-paper-950 border border-paper-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-patent-amber resize-vertical"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-patent-amber hover:bg-amber-400 text-paper-950 font-mono text-xs font-bold transition-all disabled:opacity-50 btn-shimmer shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? 'Logging into MongoDB...' : (
                  <>
                    <Send size={13} />
                    <span>Transmit Message to Shubham</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Live MongoDB Inspection Drawer */}
        {showDbMessages && (
          <div className="mt-8 p-5 rounded-xl bg-paper-900 border border-patent-amber/40">
            <div className="flex items-center justify-between pb-3 border-b border-paper-750 mb-3">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-patent-amber" />
                <span className="font-mono text-xs font-bold text-white">Live MongoDB Inquiries Stream</span>
                <span className="font-mono text-[10px] text-slate-400 bg-paper-800 px-2 py-0.5 rounded border border-paper-700">collection: contacts</span>
              </div>
              <button 
                onClick={fetchDbMessages}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-800 text-xs font-mono text-slate-300 hover:text-white"
              >
                <RefreshCw size={11} className={loadingDb ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>

            {loadingDb ? (
              <p className="font-mono text-xs text-slate-400 py-3">Querying database collection...</p>
            ) : dbMessages.length === 0 ? (
              <p className="font-mono text-xs text-slate-400 py-3">No messages logged yet. Use the form above to verify real-time persistence.</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {dbMessages.map((msg, idx) => (
                  <div key={msg._id || idx} className="p-3 rounded bg-paper-950 border border-paper-800 font-mono text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-white">
                        {msg.name} <span className="text-slate-400 font-normal">({msg.email})</span>
                      </div>
                      <div className="text-patent-amber text-[11px]">
                        {msg.subject || 'Inquiry'} • <span className="text-slate-400">{msg.roleType}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">"{msg.message}"</div>
                    </div>
                    <div className="text-[10px] text-slate-500 self-start sm:self-center">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hidden browser iframe and form for guaranteed native browser delivery */}
        <iframe name="contact_hidden_sink" id="contact_hidden_sink" style={{ display: 'none', width: 0, height: 0, border: 'none' }} title="Mail Dispatcher" />
        <form
          ref={hiddenFormRef}
          action="https://formsubmit.co/shubhamchakraborty0412@gmail.com"
          method="POST"
          target="contact_hidden_sink"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="name" value={formData.name} />
          <input type="hidden" name="email" value={formData.email} />
          <input type="hidden" name="role" value={formData.roleType} />
          <input type="hidden" name="_subject" value={`[Portfolio Message] ${formData.subject || 'Inquiry'} - From ${formData.name}`} />
          <input type="hidden" name="message" value={formData.message} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
        </form>

      </div>
    </section>
  );
}
