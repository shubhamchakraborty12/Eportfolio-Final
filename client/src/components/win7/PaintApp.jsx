import React, { useState, useRef, useEffect } from 'react';
import { PaintIcon } from '../Icons';
import { RotateCcw, Download, Eraser, Edit3, Trash2 } from 'lucide-react';

export default function PaintApp() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
    '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial playful welcome doodle
    ctx.fillStyle = '#0052cc';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillText('Welcome to MS Paint (Windows 7)', 20, 35);
    ctx.fillStyle = '#666666';
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.fillText('Draw something or sketch an architecture diagram!', 20, 55);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f6f7', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Paint Ribbon Bar */}
      <div style={{ background: '#e5eaf1', borderBottom: '1px solid #d0d7de', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderRight: '1px solid #c0c6cc', paddingRight: '10px' }}>
          <button 
            onClick={() => setIsEraser(false)}
            style={{ 
              background: !isEraser ? '#cce8ff' : '#ffffff', 
              border: '1px solid #99d1ff', 
              borderRadius: '2px', 
              padding: '4px 8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
          >
            <Edit3 size={13} color="#0052cc" />
            <span>Brush</span>
          </button>
          <button 
            onClick={() => setIsEraser(true)}
            style={{ 
              background: isEraser ? '#cce8ff' : '#ffffff', 
              border: '1px solid #99d1ff', 
              borderRadius: '2px', 
              padding: '4px 8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
          >
            <Eraser size={13} color="#d9230f" />
            <span>Eraser</span>
          </button>
          <button 
            onClick={handleClear}
            style={{ 
              background: '#ffffff', 
              border: '1px solid #c0c6cc', 
              borderRadius: '2px', 
              padding: '4px 8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
            title="Clear Canvas"
          >
            <Trash2 size={13} color="#555" />
            <span>Clear</span>
          </button>
        </div>

        {/* Brush Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRight: '1px solid #c0c6cc', paddingRight: '10px', fontSize: '11px' }}>
          <span>Size:</span>
          {[2, 4, 8, 14].map(sz => (
            <button
              key={sz}
              onClick={() => setBrushSize(sz)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: brushSize === sz ? '#0078d7' : '#ffffff',
                color: brushSize === sz ? '#ffffff' : '#000000',
                border: '1px solid #999',
                cursor: 'pointer',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Color Palette */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap', maxWidth: '240px' }}>
          {colors.map(c => (
            <div
              key={c}
              onClick={() => { setColor(c); setIsEraser(false); }}
              style={{
                width: '14px',
                height: '14px',
                background: c,
                border: color === c && !isEraser ? '2px solid #000' : '1px solid #999',
                cursor: 'pointer',
                borderRadius: '1px'
              }}
              title={c}
            />
          ))}
        </div>
      </div>

      {/* Drawing Canvas Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#cbd5e1' }}>
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            background: '#ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            cursor: isEraser ? 'cell' : 'crosshair',
            borderRadius: '2px'
          }}
        />
      </div>

      {/* Paint Status Bar */}
      <div style={{ background: '#f0f0f0', borderTop: '1px solid #d9d9d9', padding: '3px 12px', fontSize: '11px', color: '#555', display: 'flex', justifyContent: 'space-between' }}>
        <span>640 x 400px</span>
        <span>100%</span>
      </div>
    </div>
  );
}
