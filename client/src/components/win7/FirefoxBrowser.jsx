import React, { useState } from 'react';
import { FirefoxIcon, Github, Linkedin } from '../Icons';
import { ArrowLeft, ArrowRight, RotateCw, Home, ExternalLink, Star, ShieldCheck } from 'lucide-react';

export default function FirefoxBrowser({ portfolioData }) {
  const [activeTab, setActiveTab] = useState('linkedin');

  const linkedinUrl = 'https://www.linkedin.com/in/shubham-chakraborty-76364a31a';
  const githubUrl = 'https://github.com/shubhamchakraborty12';

  const personal = portfolioData?.personal || {};
  const name = personal.name || 'Shubham Chakraborty';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f0f0f0', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Firefox Title / Tab Bar */}
      <div style={{ background: '#d0dae5', display: 'flex', alignItems: 'flex-end', padding: '4px 6px 0 6px', gap: '3px', borderBottom: '1px solid #9bb2c9' }}>
        <div 
          onClick={() => setActiveTab('linkedin')}
          style={{ 
            background: activeTab === 'linkedin' ? '#ffffff' : '#c0cddb', 
            borderRadius: '5px 5px 0 0', 
            padding: '5px 14px', 
            fontSize: '11px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #9bb2c9',
            borderBottom: activeTab === 'linkedin' ? '1px solid #ffffff' : 'none',
            fontWeight: activeTab === 'linkedin' ? '600' : 'normal'
          }}
        >
          <Linkedin size={13} color="#0077b5" />
          <span>LinkedIn - {name}</span>
        </div>

        <div 
          onClick={() => setActiveTab('github')}
          style={{ 
            background: activeTab === 'github' ? '#ffffff' : '#c0cddb', 
            borderRadius: '5px 5px 0 0', 
            padding: '5px 14px', 
            fontSize: '11px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #9bb2c9',
            borderBottom: activeTab === 'github' ? '1px solid #ffffff' : 'none',
            fontWeight: activeTab === 'github' ? '600' : 'normal'
          }}
        >
          <Github size={13} color="#24292e" />
          <span>GitHub - @shubhamchakraborty12</span>
        </div>
      </div>

      {/* Firefox Navigation & Address Bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #c9d2db', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button style={{ width: '24px', height: '24px', border: '1px solid #c0c6cc', borderRadius: '3px', background: '#f5f5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={13} color="#666" />
          </button>
          <button style={{ width: '24px', height: '24px', border: '1px solid #c0c6cc', borderRadius: '3px', background: '#f5f5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={13} color="#888" />
          </button>
          <button style={{ width: '24px', height: '24px', border: '1px solid #c0c6cc', borderRadius: '3px', background: '#f5f5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RotateCw size={12} color="#666" />
          </button>
        </div>

        {/* Address Input */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #a0b0c0', borderRadius: '3px', padding: '3px 8px', fontSize: '11px', gap: '6px' }}>
          <ShieldCheck size={13} color="#16a34a" />
          <span style={{ color: '#16a34a', fontWeight: 'bold' }}>https://</span>
          <span style={{ color: '#222' }}>
            {activeTab === 'linkedin' ? 'www.linkedin.com/in/shubham-chakraborty-76364a31a' : 'github.com/shubhamchakraborty12'}
          </span>
        </div>

        <button 
          onClick={() => window.open(activeTab === 'linkedin' ? linkedinUrl : githubUrl, '_blank')}
          style={{ background: '#0052cc', border: 'none', borderRadius: '3px', color: '#fff', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          title="Open in real browser tab"
        >
          <ExternalLink size={12} />
          <span>Open Live</span>
        </button>
      </div>

      {/* Web Content Viewport */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f3f4f6' }}>
        {activeTab === 'linkedin' ? (
          <div style={{ maxWidth: '680px', margin: '0 auto', background: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ height: '120px', background: 'linear-gradient(90deg, #0077b5 0%, #00a0dc 100%)' }} />
            <div style={{ padding: '0 24px 24px 24px', position: 'relative' }}>
              <div style={{ marginTop: '-45px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <img 
                  src={personal.photo || '/shubham_portrait.jpg'} 
                  alt={name}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', border: '4px solid #fff', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'; }}
                />
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ background: '#0a66c2', color: '#fff', padding: '6px 16px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}
                >
                  View Full Profile on LinkedIn ↗
                </a>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', margin: '0 0 2px 0' }}>{name}</h2>
              <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px 0' }}>{personal.title || 'MERN Stack Developer • AI/ML Researcher • Patent Co-Inventor'}</p>
              <p style={{ fontSize: '11px', color: '#777', margin: 0 }}>Nagpur, Maharashtra, India • Symbiosis Institute of Technology</p>
              
              <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '12px', fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                <p>
                  Welcome to my LinkedIn profile! Co-inventor of Indian Patent Application <strong>202521127184 A</strong> (Hybrid AI Time-Series Forecaster). Actively architecting full-stack web platforms and predictive deep learning microservices.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '680px', margin: '0 auto', background: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <Github size={36} color="#24292e" />
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>shubhamchakraborty12</h2>
                <div style={{ fontSize: '12px', color: '#555' }}>Full-Stack Developer &amp; AI Researcher Repositories</div>
              </div>
            </div>
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'inline-block', background: '#24292e', color: '#fff', padding: '6px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', marginBottom: '16px' }}
            >
              Browse All Repositories on GitHub ↗
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ border: '1px solid #e1e4e8', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontWeight: 'bold', color: '#0366d6', fontSize: '12px' }}>hybrid-arima-lstm-patent</div>
                <div style={{ fontSize: '11px', color: '#586069', marginTop: '4px' }}>Indian Patent 202521127184 A dual-stream forecasting algorithm.</div>
              </div>
              <div style={{ border: '1px solid #e1e4e8', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontWeight: 'bold', color: '#0366d6', fontSize: '12px' }}>exfil-sentinel-soc-radar</div>
                <div style={{ fontSize: '11px', color: '#586069', marginTop: '4px' }}>Real-time telemetry anomaly detector &amp; threat mitigation hub.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
