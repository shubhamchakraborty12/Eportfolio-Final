import React, { useState } from 'react';
import { SnippingToolIcon } from '../Icons';
import { Scissors, Camera, Check, RefreshCw } from 'lucide-react';

export default function SnippingToolApp() {
  const [snipState, setSnipState] = useState('ready'); // 'ready', 'captured'

  const handleCapture = () => {
    setSnipState('captured');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f0f4f8', fontFamily: "'Segoe UI', Tahoma, sans-serif", fontSize: '11px' }}>
      {/* Snipping Tool Top Menu */}
      <div style={{ background: '#e0eaf4', borderBottom: '1px solid #b8cbdd', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={handleCapture}
          style={{ 
            background: 'linear-gradient(180deg, #ffffff 0%, #d8e5f2 100%)', 
            border: '1px solid #7c94b2', 
            borderRadius: '3px', 
            padding: '4px 10px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600',
            color: '#1a3c60'
          }}
        >
          <Scissors size={12} color="#cc0000" />
          <span>New Snip</span>
        </button>

        <button 
          onClick={() => setSnipState('ready')}
          style={{ 
            background: 'linear-gradient(180deg, #ffffff 0%, #d8e5f2 100%)', 
            border: '1px solid #7c94b2', 
            borderRadius: '3px', 
            padding: '4px 10px', 
            cursor: 'pointer',
            color: '#333'
          }}
        >
          Cancel
        </button>
      </div>

      {/* Snipping Tool Content Area */}
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {snipState === 'ready' ? (
          <div>
            <SnippingToolIcon size={48} />
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a3c60', margin: '8px 0 4px 0' }}>
              Snipping Tool
            </div>
            <p style={{ color: '#555', maxWidth: '280px', lineHeight: '1.4' }}>
              Click <strong>New Snip</strong> to capture a snapshot of Shubham's Windows 7 desktop portfolio.
            </p>
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#ffffff', border: '1px solid #c0d0e0', borderRadius: '4px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 'bold', marginBottom: '8px' }}>
                <Check size={14} />
                <span>Desktop Screen Captured</span>
              </div>
              <img 
                src="/windows7_wallpaper.jpg" 
                alt="Captured Snip" 
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #ddd' }}
              />
              <div style={{ fontSize: '10px', color: '#777', marginTop: '6px' }}>
                Capture: 1920 x 1080 • Windows 7 Harmony
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
