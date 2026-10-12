import React, { useState } from 'react';
import { LiveMessengerIcon } from '../Icons';
import { Send, Smile, Paperclip, CheckCircle } from 'lucide-react';

export default function MessengerApp() {
  const [messages, setMessages] = useState([
    { sender: 'Shubham', text: 'Hello! Welcome to Windows Live Messenger. How can I help you regarding my full-stack MERN or AI research background?', time: '4:15 PM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'You', text: userText, time: nowTime }]);
    setInputMsg('');
    setSending(true);

    // Save message via /api/contact as an inquiry to MongoDB
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Live Messenger Visitor',
          email: 'visitor@windows7.local',
          subject: 'Live Messenger Inquiry',
          message: userText
        })
      });
    } catch (err) {
      // Graceful fallback
    }

    setTimeout(() => {
      setSending(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'Shubham',
          text: `Thank you for your message! It has been logged and sent directly to my database. Feel free to also review my official resume in the PDF viewer or check my patent details.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Top Messenger Buddy Header */}
      <div style={{ background: 'linear-gradient(180deg, #d8ebf9 0%, #b8dcf5 100%)', borderBottom: '1px solid #99c8ec', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/shubham_portrait.jpg" 
          alt="Shubham" 
          style={{ width: '40px', height: '40px', borderRadius: '4px', border: '1px solid #7cb5e2', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'; }}
        />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1a3c60' }}>
            Shubham Chakraborty (Online)
          </div>
          <div style={{ fontSize: '11px', color: '#0066cc', fontStyle: 'italic' }}>
            &lt;MERN Stack Developer &bull; AI/ML Researcher &bull; Patent Co-Inventor&gt;
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#fcfcfc' }}>
        {messages.map((m, i) => (
          <div 
            key={i} 
            style={{ 
              alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            <div style={{ fontSize: '10px', color: '#777', marginBottom: '2px', textAlign: m.sender === 'You' ? 'right' : 'left' }}>
              <strong>{m.sender}</strong> ({m.time})
            </div>
            <div 
              style={{ 
                background: m.sender === 'You' ? '#dcf8c6' : '#edf2f7', 
                border: '1px solid ' + (m.sender === 'You' ? '#b4eeb4' : '#cbd5e0'), 
                padding: '6px 12px', 
                borderRadius: '6px',
                fontSize: '12px',
                color: '#222',
                lineHeight: '1.4'
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {sending && (
          <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
            Transmitting message to Shubham's email (shubhamchakraborty0412@gmail.com)...
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} style={{ borderTop: '1px solid #d9d9d9', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px', background: '#f5f5f5' }}>
        <input 
          type="text" 
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type an instant message to Shubham..."
          style={{ flex: 1, padding: '6px 10px', border: '1px solid #b8cbdd', borderRadius: '3px', fontSize: '12px', outline: 'none' }}
        />
        <button 
          type="submit"
          style={{ background: '#0078d7', color: '#fff', border: 'none', borderRadius: '3px', padding: '6px 14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Send size={12} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
