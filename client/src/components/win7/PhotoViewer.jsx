import React, { useState } from 'react';
import { PhotoViewerIcon } from '../Icons';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Play, 
  Pause,
  Printer, 
  Mail, 
  Trash2, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

export default function PhotoViewer({ personalData, onOpenContact }) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const photoUrl = personalData?.photo || '/shubham_portrait.jpg';
  const name = personalData?.name || 'Shubham Chakraborty';
  const title = personalData?.title || 'Software Engineer & AI/ML Researcher';

  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 20));
  const handleZoomOut = () => setZoom(prev => Math.max(50, prev - 20));
  const handleRotateCw = () => setRotation(prev => (prev + 90) % 360);
  const handleRotateCcw = () => setRotation(prev => (prev - 90 + 360) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1c1d1e', color: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Top Menu Bar */}
      <div style={{ background: '#2d3033', borderBottom: '1px solid #404448', padding: '4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#ccc' }}>
        <div style={{ display: 'flex', gap: '14px' }}>
          <span style={{ cursor: 'pointer', color: '#fff' }}>File</span>
          <span style={{ cursor: 'pointer' }} onClick={() => window.print()}>Print</span>
          <span style={{ cursor: 'pointer' }} onClick={onOpenContact}>E-mail</span>
          <span style={{ cursor: 'pointer' }}>Burn</span>
          <span style={{ cursor: 'pointer' }}>Open</span>
        </div>
        <div style={{ color: '#888' }}>
          {name}_Portrait.jpg • 1200 x 1200 • JPEG Image
        </div>
      </div>

      {/* Main Picture Canvas */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', background: '#111315' }}>
        <div 
          style={{ 
            transition: 'transform 0.2s ease', 
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}
        >
          <img 
            src={photoUrl} 
            alt={name}
            style={{ 
              maxHeight: '440px', 
              maxWidth: '440px', 
              objectFit: 'cover',
              borderRadius: '4px',
              border: '2px solid rgba(255,255,255,0.1)'
            }} 
            onError={(e) => {
              // Graceful fallback if image path missing
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Floating Info Overlay on bottom left of canvas */}
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '11px' }}>
          <div style={{ fontWeight: 'bold', color: '#fff' }}>{name}</div>
          <div style={{ color: '#aaa' }}>{title}</div>
        </div>
      </div>

      {/* Authentic Windows 7 Bottom Toolbar */}
      <div 
        style={{ 
          height: '52px', 
          background: 'linear-gradient(180deg, #373b3e 0%, #202224 100%)', 
          borderTop: '1px solid #4a4f54', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '12px',
          padding: '0 16px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)'
        }}
      >
        {/* Zoom controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={handleZoomOut}
            title="Zoom Out"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '5px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <ZoomOut size={14} />
          </button>
          <span style={{ fontSize: '11px', color: '#aaa', minWidth: '38px', textAlign: 'center' }}>{zoom}%</span>
          <button 
            onClick={handleZoomIn}
            title="Zoom In"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '5px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <ZoomIn size={14} />
          </button>
        </div>

        <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

        {/* Previous Button */}
        <button 
          title="Previous Image"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', alignItems: 'center', padding: '6px' }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Big Windows 7 Play Slideshow Button (Green glow circle) */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          title="Slide show (F11)"
          style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle at 35% 35%, #4caf50 0%, #2e7d32 100%)', 
            border: '2px solid rgba(255,255,255,0.8)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 10px rgba(76, 175, 80, 0.6), inset 0 1px 2px rgba(255,255,255,0.5)'
          }}
        >
          {isPlaying ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />}
        </button>

        {/* Next Button */}
        <button 
          title="Next Image"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', alignItems: 'center', padding: '6px' }}
        >
          <ChevronRight size={18} />
        </button>

        <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

        {/* Rotation controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={handleRotateCcw}
            title="Rotate counterclockwise (Ctrl+<)"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '5px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <RotateCcw size={14} />
          </button>
          <button 
            onClick={handleRotateCw}
            title="Rotate clockwise (Ctrl+>)"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '5px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <RotateCw size={14} />
          </button>
        </div>

        <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

        {/* Reset View */}
        <button 
          onClick={handleReset}
          title="Actual size (100%)"
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer', color: '#ccc', fontSize: '11px' }}
        >
          100%
        </button>
      </div>
    </div>
  );
}
