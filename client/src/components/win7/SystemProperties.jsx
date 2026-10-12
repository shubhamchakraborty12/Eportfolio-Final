import React from 'react';
import thisPcIconImg from '../../assets/This pc icon.png';
import { ShieldCheck, Cpu, HardDrive, Award, UserCheck, GraduationCap } from 'lucide-react';

export default function SystemProperties({ portfolioData, onOpenResume, onOpenPatent }) {
  const personal = portfolioData?.personal || {};
  const education = portfolioData?.education || {};
  const patent = portfolioData?.patent || {};

  const name = personal.name || 'Shubham Chakraborty';
  const institution = education.institution || 'Symbiosis Institute of Technology (SIT), Nagpur, Maharashtra, India';
  const degree = `${education.degree || 'B.Tech in Computer Science and Engineering'} (Honours: ${education.specialization || 'Artificial Intelligence & Machine Learning'})`;
  const patentNo = patent.applicationNumber || '202521127184 A';

  return (
    <div className="sys-properties-app">
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #d4d9de', paddingBottom: '14px', marginBottom: '18px' }}>
        <img src={thisPcIconImg} alt="This PC" style={{ width: 44, height: 44, objectFit: 'contain' }} draggable={false} />
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e395b', margin: 0 }}>
            This PC — System Properties
          </h2>
          <div style={{ fontSize: '11px', color: '#666' }}>
            Control Panel &gt; System and Security &gt; This PC
          </div>
        </div>
      </div>

      {/* Windows Edition Card */}
      <div className="sys-section-card">
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#003399', marginBottom: '8px' }}>
          Windows Edition
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#222' }}>
              Windows 7 Ultimate — Engineer Edition
            </div>
            <div style={{ fontSize: '11px', color: '#555' }}>
              Copyright © 2026 {name}. All research rights reserved.
            </div>
            <div style={{ fontSize: '11px', color: '#0078d7', marginTop: '2px' }}>
              Service Pack 1 (Published Indian Patent {patentNo} Included)
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2e7d32', fontWeight: 'bold', fontSize: '12px' }}>
            <ShieldCheck size={20} color="#2e7d32" />
            <span>Genuine Intellectual Property</span>
          </div>
        </div>
      </div>

      {/* System Specifications Card */}
      <div className="sys-section-card">
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#003399', marginBottom: '12px' }}>
          System Specification
        </div>
        
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', lineHeight: '2' }}>
          <tbody>
            <tr>
              <td style={{ width: '190px', color: '#555', fontWeight: '600' }}>Academic Institution:</td>
              <td style={{ color: '#111', fontWeight: 'bold' }}>
                {institution}
              </td>
            </tr>
            <tr>
              <td style={{ color: '#555', fontWeight: '600' }}>Degree &amp; Honours:</td>
              <td style={{ color: '#111' }}>
                {degree}
              </td>
            </tr>
            <tr>
              <td style={{ color: '#555', fontWeight: '600' }}>Full-Stack Core (RAM):</td>
              <td style={{ color: '#111' }}>
                MERN Stack Architecture (React.js, Node.js, Express.js, MongoDB, Mongoose ODM)
              </td>
            </tr>
            <tr>
              <td style={{ color: '#555', fontWeight: '600' }}>Processor (AI &amp; System):</td>
              <td style={{ color: '#111' }}>
                Time-Series Hybrid Modeling (ARIMA, Bidirectional LSTM, Scikit-learn, FastAPI)
              </td>
            </tr>
            <tr>
              <td style={{ color: '#555', fontWeight: '600' }}>System Type:</td>
              <td style={{ color: '#111' }}>
                64-bit Operating System, Co-Inventor: Indian Patent {patentNo}
              </td>
            </tr>
            <tr>
              <td style={{ color: '#555', fontWeight: '600' }}>Pen and Touch Input:</td>
              <td style={{ color: '#111' }}>
                Java Data Structures &amp; Algorithms (DSA), OOP Design, ServiceNow Workflows
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Computer Name, Domain & Workgroup Card */}
      <div className="sys-section-card">
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#003399', marginBottom: '10px' }}>
          Computer Name, Domain, and Workgroup Settings
        </div>
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', lineHeight: '1.8' }}>
          <tbody>
            <tr>
              <td style={{ width: '190px', color: '#555' }}>Computer name:</td>
              <td style={{ fontFamily: 'Consolas, monospace', fontWeight: 'bold' }}>{name.split(' ')[0].toUpperCase()}-PC</td>
            </tr>
            <tr>
              <td style={{ color: '#555' }}>Full computer name:</td>
              <td style={{ fontFamily: 'Consolas, monospace' }}>{name.split(' ')[0].toUpperCase()}-PC.SIT.NAGPUR</td>
            </tr>
            <tr>
              <td style={{ color: '#555' }}>Computer description:</td>
              <td>{personal.title || 'MERN Stack Developer & AI/ML Researcher Candidate'}</td>
            </tr>
            <tr>
              <td style={{ color: '#555' }}>Workgroup:</td>
              <td style={{ fontFamily: 'Consolas, monospace', fontWeight: 'bold' }}>MERN_RESEARCH_GROUP</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Windows Activation Card */}
      <div className="sys-section-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fdfdfd' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#003399' }}>
            Windows Activation
          </div>
          <div style={{ fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', margin: '3px 0' }}>
            Windows is activated. Genuine Software Engineering Candidate.
          </div>
          <div style={{ fontSize: '11px', color: '#777', fontFamily: 'Consolas, monospace' }}>
            Product ID: SIT-NAGPUR-AI-2026-PATENT-{patentNo.replace(/\s+/g, '')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={onOpenResume}
            style={{ 
              padding: '6px 14px', 
              borderRadius: '3px', 
              border: '1px solid #70a0d0', 
              background: 'linear-gradient(180deg, #f0f7ff 0%, #d0e4f8 100%)', 
              color: '#003399', 
              fontSize: '11px', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            Launch Resume (PDF)
          </button>
          <button 
            onClick={onOpenPatent}
            style={{ 
              padding: '6px 14px', 
              borderRadius: '3px', 
              border: '1px solid #d99b26', 
              background: 'linear-gradient(180deg, #fffbeb 0%, #fed7aa 100%)', 
              color: '#92400e', 
              fontSize: '11px', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            Inspect Patent Gazette
          </button>
        </div>
      </div>
    </div>
  );
}
