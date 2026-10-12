import React, { useState } from 'react';
import { AudioWaveIcon } from '../Icons';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc } from 'lucide-react';

export default function MediaPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a101d', color: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Top Header */}
      <div style={{ background: '#131b2e', padding: '6px 12px', borderBottom: '1px solid #233152', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#a0aec0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
          <AudioWaveIcon size={18} />
          <span>Windows Media Player — Now Playing</span>
        </div>
        <div>Symphony in C • 320 kbps</div>
      </div>

      {/* Visualizer Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #1a2a4a 0%, #060a12 100%)', position: 'relative' }}>
        <div style={{ animation: isPlaying ? 'spin 12s linear infinite' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          <Disc size={90} color="#63b3ed" />
        </div>

        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>
            Windows 7 Harmony Theme (Symphonic Edition)
          </div>
          <div style={{ fontSize: '12px', color: '#63b3ed', marginTop: '2px' }}>
            Shubham Chakraborty Engineering Soundtrack
          </div>
        </div>

        {/* Dynamic Frequency Visualizer Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', marginTop: '18px' }}>
          {[18, 32, 24, 38, 20, 28, 35, 16, 30, 26, 38, 22].map((h, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: isPlaying ? `${Math.min(40, h + (i % 3) * 6)}px` : '6px',
                background: 'linear-gradient(180deg, #63b3ed 0%, #3182ce 100%)',
                borderRadius: '2px 2px 0 0',
                transition: 'height 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Media Controls Bar */}
      <div style={{ height: '54px', background: 'linear-gradient(180deg, #1f2d47 0%, #111a2c 100%)', borderTop: '1px solid #2d3f63', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '0 16px' }}>
        <button style={{ background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer' }}>
          <SkipBack size={18} />
        </button>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: 'linear-gradient(180deg, #3182ce 0%, #1e4e8c 100%)', 
            border: '2px solid rgba(255,255,255,0.7)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: '0 0 10px rgba(49, 130, 206, 0.6)'
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
        </button>

        <button style={{ background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer' }}>
          <SkipForward size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px' }}>
          <Volume2 size={15} color="#a0aec0" />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => setVolume(e.target.value)} 
            style={{ width: '70px', accentColor: '#3182ce', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
