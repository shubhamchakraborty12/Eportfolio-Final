import React, { useState } from 'react';
import pdfViewerIconImg from '../../assets/PDF Viewer icon.png';
import { 
  Printer, 
  Download, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  Maximize2, 
  FolderOpen, 
  Award, 
  CheckCircle, 
  Eye, 
  Link2 
} from 'lucide-react';

export default function AdobePdfViewer({ portfolioData, onOpenContact }) {
  const [viewMode, setViewMode] = useState('embed'); // 'embed' or 'text'

  const googleDriveLink = 'https://drive.google.com/file/d/1X8ggVTeTS9EBGWd3W3z8usVZlwnDx2Qv/view?usp=sharing';
  const googleDrivePreviewUrl = 'https://drive.google.com/file/d/1X8ggVTeTS9EBGWd3W3z8usVZlwnDx2Qv/preview';

  const personal = portfolioData?.personal || {};
  const experiences = portfolioData?.experience || [];

  const name = personal.name || 'Shubham Chakraborty';

  const handlePrint = () => {
    window.print();
  };

  const handleOpenDrive = () => {
    window.open(googleDriveLink, '_blank');
  };

  return (
    <div className="acrobat-app" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#525659' }}>
      {/* 1. Adobe Reader XI Header Banner */}
      <div 
        style={{ 
          background: '#d9230f', 
          color: '#ffffff', 
          padding: '4px 10px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          fontSize: '11px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={pdfViewerIconImg} alt="PDF Viewer" style={{ width: 18, height: 18, objectFit: 'contain' }} draggable={false} />
          <span style={{ fontWeight: 'bold' }}>PDF Viewer — [Resume_Shubham_Chakraborty.pdf]</span>
        </div>
        <div style={{ fontSize: '10px', opacity: 0.9 }}>
          Google Drive Document (Signed &amp; Verified)
        </div>
      </div>

      {/* 2. Classic Adobe Acrobat Menu Bar */}
      <div 
        style={{ 
          background: '#ece9d8', 
          borderBottom: '1px solid #d0ccc0', 
          padding: '2px 8px', 
          display: 'flex', 
          gap: '12px', 
          fontSize: '11px', 
          color: '#000000',
          userSelect: 'none'
        }}
      >
        <span style={{ cursor: 'pointer' }} onClick={handleOpenDrive}>File</span>
        <span style={{ cursor: 'pointer' }}>Edit</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setViewMode(viewMode === 'embed' ? 'text' : 'embed')}>View</span>
        <span style={{ cursor: 'pointer' }}>Document</span>
        <span style={{ cursor: 'pointer' }}>Tools</span>
        <span style={{ cursor: 'pointer' }}>Window</span>
        <span style={{ cursor: 'pointer' }}>Help</span>
      </div>

      {/* 3. Acrobat Tools Toolbar */}
      <div 
        style={{ 
          background: '#3f4245', 
          borderBottom: '1px solid #2b2d30', 
          padding: '4px 10px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          color: '#ffffff',
          fontSize: '11px',
          flexWrap: 'wrap',
          gap: '6px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Main Action: Open Google Drive Link */}
          <button 
            onClick={handleOpenDrive}
            title="Open exact Google Drive link in new browser tab"
            style={{ 
              background: '#0078d7', 
              border: '1px solid #005a9e', 
              borderRadius: '3px', 
              padding: '4px 10px', 
              color: '#ffffff', 
              fontSize: '11px', 
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            <ExternalLink size={13} />
            <span>Open in Google Drive ↗</span>
          </button>

          {/* Print */}
          <button 
            onClick={handlePrint}
            title="Print Document"
            style={{ 
              background: '#2b2d30', 
              border: '1px solid #5a5f64', 
              borderRadius: '3px', 
              padding: '3px 8px', 
              color: '#ffffff', 
              fontSize: '11px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Printer size={12} />
            <span>Print</span>
          </button>

          <span style={{ color: '#666', margin: '0 2px' }}>|</span>

          {/* Toggle View Mode */}
          <button
            onClick={() => setViewMode(viewMode === 'embed' ? 'text' : 'embed')}
            style={{ 
              background: viewMode === 'embed' ? '#d9230f' : '#2b2d30', 
              border: '1px solid #5a5f64', 
              borderRadius: '3px', 
              padding: '3px 8px', 
              color: '#ffffff', 
              fontSize: '11px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Switch between Google Drive Embed and Formatted Sheet"
          >
            {viewMode === 'embed' ? <FileText size={12} /> : <Eye size={12} />}
            <span>{viewMode === 'embed' ? 'Switch to Sheet View' : 'Switch to Google Drive Embed'}</span>
          </button>
        </div>

        {/* Direct Link Indicator */}
        <div 
          onClick={handleOpenDrive}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px', 
            opacity: 0.9, 
            fontSize: '10px',
            color: '#60a5fa',
            cursor: 'pointer',
            maxWidth: '380px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={googleDriveLink}
        >
          <Link2 size={12} />
          <span style={{ fontFamily: 'Consolas, monospace', textDecoration: 'underline' }}>{googleDriveLink}</span>
        </div>
      </div>

      {/* 4. Main PDF Document Viewport */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#525659' }}>
        {viewMode === 'embed' ? (
          /* Direct Embedded Google Drive PDF document */
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <iframe 
              src={googleDrivePreviewUrl}
              title="Shubham Chakraborty Resume - Google Drive"
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none', 
                background: '#525659' 
              }}
              allow="autoplay"
            />
          </div>
        ) : (
          /* Formatted Sheet Mode */
          <div className="acrobat-pdf-viewport" style={{ overflowY: 'auto', height: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <div 
              className="acrobat-page-sheet" 
              style={{ 
                width: '100%', 
                maxWidth: '720px', 
                background: '#ffffff', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)', 
                padding: '36px 40px',
                color: '#1a1a1a',
                fontFamily: "'Segoe UI', Arial, sans-serif"
              }}
            >
              <div style={{ textAlign: 'center', borderBottom: '2px solid #2c3e50', paddingBottom: '14px', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a252f', margin: 0, textTransform: 'uppercase' }}>
                  {name}
                </h1>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#c0392b', margin: '4px 0' }}>
                  SOFTWARE ENGINEER • FULL-STACK MERN ARCHITECT • APPLIED AI/ML RESEARCHER
                </p>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
                  📍 Nagpur, Maharashtra, India • 📞 +91-9561297328 • ✉️ shubhamchakraborty0412@gmail.com
                </div>
                <div style={{ marginTop: '8px' }}>
                  <button 
                    onClick={handleOpenDrive}
                    style={{ background: '#0078d7', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '3px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    View Original File in Google Drive ↗
                  </button>
                </div>
              </div>

              {/* Patent Box */}
              <div style={{ background: '#fdfaf2', border: '1px solid #f39c12', borderRadius: '4px', padding: '10px 14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b7791f', fontWeight: 'bold', fontSize: '11px', marginBottom: '2px' }}>
                  <Award size={14} />
                  <span>PUBLISHED INDIAN PATENT (APP NO: 202521127184 A)</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Hybrid AI Time-Series Forecasting System (ARIMA + Bidirectional LSTM)
                </div>
                <p style={{ fontSize: '11px', color: '#555', margin: '4px 0 0 0' }}>
                  Published in the official Patent Office Gazette, Govt. of India (Issue 01/2026). Achieved 28.4% reduction in root-mean-square error (RMSE) on high-variance intervals.
                </p>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Professional Profile
                </h3>
                <p style={{ fontSize: '11px', color: '#333', lineHeight: '1.6' }}>
                  Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning at Symbiosis Institute of Technology, Nagpur. Experienced in building scalable full-stack web applications with React.js, Node.js, Express.js, and MongoDB, alongside high-throughput Python and FastAPI backend services.
                </p>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Internships &amp; Experience
                </h3>
                {experiences.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: '#2c3e50' }}>
                      <span>{exp.role} — {exp.company}</span>
                      <span style={{ color: '#7f8c8d' }}>{exp.period}</span>
                    </div>
                    <ul style={{ paddingLeft: '16px', margin: '4px 0 0 0', fontSize: '11px', color: '#444' }}>
                      {exp.bullets?.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Education
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: '#2c3e50' }}>
                  <span>Symbiosis Institute of Technology (SIT), Nagpur</span>
                  <span style={{ color: '#7f8c8d' }}>2023 – 2027</span>
                </div>
                <div style={{ fontSize: '11px', color: '#444' }}>
                  B.Tech in Computer Science and Engineering (Honours: Artificial Intelligence &amp; Machine Learning)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Acrobat Status Bar */}
      <div 
        style={{ 
          background: '#ece9d8', 
          borderTop: '1px solid #c0bcb0', 
          padding: '3px 12px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '11px', 
          color: '#333' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Source:</span>
          <a 
            href={googleDriveLink} 
            target="_blank" 
            rel="noreferrer" 
            style={{ color: '#0052cc', fontWeight: '600', textDecoration: 'none' }}
          >
            Google Drive Resume Link ↗
          </a>
        </div>
        <div style={{ display: 'flex', gap: '14px' }}>
          <span>Cloud Document</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
