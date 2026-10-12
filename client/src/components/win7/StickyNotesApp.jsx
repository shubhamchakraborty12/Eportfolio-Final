import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function StickyNotesApp() {
  const [noteContent, setNoteContent] = useState(
`⭐ KEY CANDIDATE HIGHLIGHTS:

• Co-Inventor, Indian Patent Application:
  No. 202521127184 A
  (Hybrid ARIMA + LSTM Time-Series System)

• Full-Stack MERN Architect:
  React.js, Node.js, Express.js, MongoDB

• Symbiosis Institute of Technology (SIT), Nagpur
  B.Tech CSE with Honours in AI/ML

• Phone: +91-9561297328
• Email: shubhamchakraborty0412@gmail.com`
  );

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        background: '#fff9a6', 
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
        fontFamily: "'Segoe Print', 'Comic Sans MS', cursive, sans-serif" 
      }}
    >
      {/* Top Note Drag & Add Bar */}
      <div 
        style={{ 
          background: '#fff575', 
          height: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 8px',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <button 
          onClick={() => setNoteContent(prev => prev + '\n\n• New Note Added: ' + new Date().toLocaleTimeString())}
          title="New Note"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Plus size={14} color="#776c00" />
        </button>
        <span style={{ fontSize: '11px', color: '#776c00', fontWeight: 'bold' }}>Sticky Note</span>
      </div>

      {/* Note Text Area */}
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          padding: '12px 16px',
          fontSize: '12px',
          lineHeight: '1.6',
          color: '#333300',
          resize: 'none',
          fontFamily: "'Segoe Print', 'Segoe UI', cursive, sans-serif"
        }}
        placeholder="Type quick notes here..."
      />
    </div>
  );
}
