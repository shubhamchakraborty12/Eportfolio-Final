import React, { useState } from 'react';
import { PatentSealIcon } from '../Icons';
import { Award, CheckCircle2, Copy, BookOpen, TrendingUp, Layers } from 'lucide-react';

export default function PatentViewer({ patentData }) {
  const [citationFormat, setCitationFormat] = useState('apa');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const apaCitation = "Chakraborty, S., et al. (2026). Hybrid AI Time-Series Forecasting System. Indian Patent Application 202521127184 A, Published January 2, 2026. The Patent Office, Government of India.";
  const bibtexCitation = `@patent{chakraborty2026hybrid,
  author    = {Chakraborty, Shubham and Collaborators},
  title     = {Hybrid AI Time-Series Forecasting System},
  number    = {202521127184 A},
  country   = {India},
  office    = {The Patent Office, Government of India},
  day       = {02},
  month     = {January},
  year      = {2026},
  type      = {Patent Application}
}`;

  const handleCopyCitation = () => {
    const text = citationFormat === 'apa' ? apaCitation : bibtexCitation;
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="patent-gazette-app">
      {/* Official Gazette Certificate Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #b7791f', paddingBottom: '16px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <PatentSealIcon size={52} />
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8c5e12', fontWeight: 'bold' }}>
              The Patent Office, Government of India • Official Patent Gazette
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a365d', margin: '2px 0' }}>
              Intellectual Property Disclosure Document
            </h2>
            <div style={{ fontSize: '11px', color: '#555' }}>
              Gazette Issue No. 01/2026 • Published: January 02, 2026
            </div>
          </div>
        </div>

        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '4px', padding: '6px 12px', textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#92400e', fontWeight: 'bold' }}>APPLICATION NUMBER</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#b45309', fontFamily: 'Consolas, monospace' }}>
            202521127184 A
          </div>
        </div>
      </div>

      {/* Main Title & Inventors */}
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '4px' }}>
          Hybrid AI Time-Series Forecasting System
        </h3>
        <p style={{ fontSize: '12px', color: '#b7791f', fontWeight: '600' }}>
          Co-Inventors: Shubham Chakraborty et al. • Symbiosis Institute of Technology, Nagpur
        </p>
      </div>

      {/* Patent Abstract */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '14px', marginBottom: '18px', lineHeight: '1.6' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
          Patent Abstract &amp; Specification
        </div>
        <p style={{ fontSize: '12px', color: '#334155', marginBottom: '8px' }}>
          Traditional linear statistical models (ARIMA) demonstrate computational fidelity in isolating stationary periodicities but fail to resolve non-stationary residual variances. Conversely, recurrent neural models (LSTM) are susceptible to overparameterization when exposed directly to noisy high-frequency raw series.
        </p>
        <p style={{ fontSize: '12px', color: '#334155' }}>
          The claimed innovation features a <strong>dual-stream decomposed architecture</strong>: the primary stream extracts linear auto-regressive dynamics (p, d, q) to yield intermediate residual errors ε<sub>t</sub> = y<sub>t</sub> - ŷ<sub>ARIMA</sub>. The secondary deep bidirectional LSTM stream directly models these temporal residuals, feeding an ensemble recombination synthesizer that reduces forecast variance by up to 28.4%.
        </p>
      </div>

      {/* Mathematical Recombination Formulation */}
      <div style={{ background: '#1e293b', color: '#f8fafc', padding: '14px 18px', borderRadius: '4px', marginBottom: '18px', fontFamily: 'Consolas, monospace' }}>
        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
          MATHEMATICAL RECOMBINATION THEOREM
        </div>
        <div style={{ fontSize: '14px', color: '#fef08a', margin: '4px 0' }}>
          ŷ<sub>t+h</sub> = ℳ<sub>ARIMA</sub>(y<sub>t</sub>; Φ, Θ) + ℱ<sub>LSTM</sub>(ε<sub>t</sub>; 𝒲, 𝒷)
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
          Holdout Empirical Proof: Var(ε) decreases by 28.4% compared against standalone recurrent benchmarks.
        </div>
      </div>

      {/* Quantitative Validation Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#b45309' }}>28.4% ↓</div>
          <div style={{ fontSize: '10px', color: '#78350f' }}>RMSE Reduction</div>
        </div>
        <div style={{ background: '#ecfdf5', border: '1px solid #d1fae5', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#047857' }}>89.2%</div>
          <div style={{ fontSize: '10px', color: '#065f46' }}>Directional Accuracy</div>
        </div>
        <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1d4ed8' }}>Dual-Stream</div>
          <div style={{ fontSize: '10px', color: '#1e40af' }}>Pipeline Architecture</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#334155' }}>Multi-Step</div>
          <div style={{ fontSize: '10px', color: '#475569' }}>Forecast Horizon</div>
        </div>
      </div>

      {/* Academic Citation Block */}
      <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#334155' }}>
            <BookOpen size={14} />
            <span>Academic Citation Export</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => setCitationFormat('apa')}
              style={{ 
                fontSize: '10px', 
                padding: '2px 6px', 
                borderRadius: '2px', 
                border: '1px solid #94a3b8', 
                background: citationFormat === 'apa' ? '#0078d7' : '#fff',
                color: citationFormat === 'apa' ? '#fff' : '#333',
                cursor: 'pointer' 
              }}
            >
              APA
            </button>
            <button 
              onClick={() => setCitationFormat('bibtex')}
              style={{ 
                fontSize: '10px', 
                padding: '2px 6px', 
                borderRadius: '2px', 
                border: '1px solid #94a3b8', 
                background: citationFormat === 'bibtex' ? '#0078d7' : '#fff',
                color: citationFormat === 'bibtex' ? '#fff' : '#333',
                cursor: 'pointer' 
              }}
            >
              BibTeX
            </button>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '3px', padding: '8px 10px', fontSize: '11px', fontFamily: 'Consolas, monospace', color: '#333', marginBottom: '8px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
          {citationFormat === 'apa' ? apaCitation : bibtexCitation}
        </div>

        <button 
          onClick={handleCopyCitation}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '5px 12px', 
            background: '#e0f2fe', 
            border: '1px solid #7dd3fc', 
            borderRadius: '3px', 
            color: '#0369a1', 
            fontSize: '11px', 
            fontWeight: '600',
            cursor: 'pointer' 
          }}
        >
          {copiedCitation ? <CheckCircle2 size={13} color="#059669" /> : <Copy size={13} />}
          <span>{copiedCitation ? 'Copied to Clipboard!' : 'Copy Citation to Clipboard'}</span>
        </button>
      </div>
    </div>
  );
}
