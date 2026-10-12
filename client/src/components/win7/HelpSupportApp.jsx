import React, { useState } from 'react';
import { HelpGuideIcon } from '../Icons';
import { Search, BookOpen, ExternalLink, HelpCircle, Key, FileText } from 'lucide-react';

export default function HelpSupportApp({ onOpenApp }) {
  const [search, setSearch] = useState('');

  const topics = [
    { title: 'How to view the official signed Resume document', app: 'resume', desc: 'Click the Adobe Reader XI / PDF Viewer icon on the desktop or taskbar to view Shubham chakraborty resume updated-6.pdf.' },
    { title: 'How to inspect published Indian Patent details', app: 'patent', desc: 'Open Patent Gazette to view Application 202521127184 A, mathematical formulations, and BibTeX citations.' },
    { title: 'How to explore full-stack and AI project repositories', app: 'projects', desc: 'Launch Windows Explorer to filter and deep-dive into MERN, ARIMA, and security projects.' },
    { title: 'How to test technical competencies in Control Panel', app: 'skills', desc: 'Access Control Panel to review categorized proficiencies in Python, React, Java, DSA, and databases.' },
    { title: 'How to compose an enterprise email to Shubham', app: 'mail', desc: 'Open Windows Live Mail or Windows Live Messenger to send messages directly to Shubham (shubhamchakraborty0412@gmail.com).' }
  ];

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Help Blue Header */}
      <div style={{ background: '#0052cc', color: '#ffffff', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HelpGuideIcon size={32} />
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Windows 7 Help and Support</h2>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>Shubham Chakraborty Engineering Environment Guide</div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ padding: '12px 18px', background: '#f5f7fa', borderBottom: '1px solid #e1e4e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Search size={14} color="#666" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help topics..."
          style={{ flex: 1, padding: '6px 10px', border: '1px solid #c0c6cc', borderRadius: '3px', fontSize: '12px', outline: 'none' }}
        />
      </div>

      {/* Topics List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a3c60', margin: '0 0 6px 0', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
          Frequently Asked Questions &amp; Navigation Topics
        </h3>

        {filteredTopics.map((top, idx) => (
          <div 
            key={idx}
            onClick={() => onOpenApp && onOpenApp(top.app)}
            style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '4px', 
              padding: '12px 14px', 
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
          >
            <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#0052cc', marginBottom: '3px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{top.title}</span>
              <ExternalLink size={12} />
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.4' }}>
              {top.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
