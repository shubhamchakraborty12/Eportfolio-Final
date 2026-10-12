import React, { useState } from 'react';
import { ExcelIcon } from '../Icons';
import { Table, Download, Calculator, BarChart2 } from 'lucide-react';

export default function ExcelViewer() {
  const [selectedCell, setSelectedCell] = useState('B2');

  const rows = [
    { id: 1, a: 'Patent 202521127184 A', b: 'RMSE Error Variance', c: '3.842', d: '2.751', e: '28.4% Variance Drop', f: 'Gazette Verified' },
    { id: 2, a: 'ExfilSentinel Radar', b: 'Anomaly Detection F1', c: '0.781', d: '0.942', e: '+16.1% Precision', f: 'Isolation Forest' },
    { id: 3, a: 'MERN Taskflow CRUD', b: 'API Response Latency', c: '98ms', d: '14ms', e: '7x Throughput Gain', f: 'Express / MongoDB' },
    { id: 4, a: 'Time-Series Forecast', b: 'Directional Accuracy', c: '72.4%', d: '89.2%', e: '+16.8% Gain', f: 'Holdout Validated' },
    { id: 5, a: 'Campus IoT System', b: 'Packet Loss Rate', c: '4.2%', d: '0.3%', e: '93% Reliability', f: 'MQTT Broker' },
    { id: 6, a: 'FastAPI Microservice', b: 'Concurrent Requests', c: '320 req/s', d: '2,400 req/s', e: '7.5x Concurrency', f: 'Async Event Loop' },
    { id: 7, a: 'DSA Problem Solving', b: 'Java LeetCode / Alg', c: 'Top 15%', d: 'Top 5%', e: '99.8% Pass', f: 'SIT Nagpur' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Excel Green Header */}
      <div style={{ background: '#107c41', color: '#ffffff', padding: '4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExcelIcon size={18} />
          <span style={{ fontWeight: 'bold' }}>Microsoft Excel — [Project_Metrics_2026.xlsx]</span>
        </div>
        <div style={{ fontSize: '10px', opacity: 0.9 }}>
          Research &amp; Engineering Quantitative Benchmark
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div style={{ background: '#f3f2f1', borderBottom: '1px solid #d2d0ce', display: 'flex', padding: '2px 8px', gap: '14px', fontSize: '11px', color: '#323130' }}>
        <span style={{ fontWeight: 'bold', color: '#107c41', borderBottom: '2px solid #107c41', paddingBottom: '2px' }}>Home</span>
        <span>Insert</span>
        <span>Page Layout</span>
        <span>Formulas</span>
        <span>Data</span>
        <span>Review</span>
        <span>View</span>
      </div>

      {/* Formula Bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #d2d0ce', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
        <div style={{ background: '#f3f2f1', border: '1px solid #c8c6c4', padding: '1px 8px', borderRadius: '2px', fontWeight: 'bold', width: '40px', textAlign: 'center' }}>
          {selectedCell}
        </div>
        <span style={{ color: '#605e5c', fontStyle: 'italic', fontWeight: 'bold' }}>fx</span>
        <div style={{ flex: 1, border: '1px solid #c8c6c4', padding: '2px 8px', borderRadius: '2px', color: '#323130', fontFamily: 'Consolas, monospace' }}>
          =BENCHMARK_PROVEN(Shubham_Projects, "High_Performance")
        </div>
      </div>

      {/* Spreadsheet Table Viewport */}
      <div style={{ flex: 1, overflow: 'auto', background: '#fdfdfd' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#e1dfdd', borderBottom: '1px solid #a19f9d' }}>
              <th style={{ width: '32px', textAlign: 'center', background: '#d2d0ce', borderRight: '1px solid #a19f9d', padding: '4px 0', color: '#323130' }}>#</th>
              <th style={{ borderRight: '1px solid #c8c6c4', padding: '4px 8px', color: '#323130', width: '180px' }}>A (Project / System)</th>
              <th style={{ borderRight: '1px solid #c8c6c4', padding: '4px 8px', color: '#323130', width: '160px' }}>B (Metric Evaluated)</th>
              <th style={{ borderRight: '1px solid #c8c6c4', padding: '4px 8px', color: '#323130', width: '110px' }}>C (Baseline)</th>
              <th style={{ borderRight: '1px solid #c8c6c4', padding: '4px 8px', color: '#323130', width: '110px' }}>D (Engineered)</th>
              <th style={{ borderRight: '1px solid #c8c6c4', padding: '4px 8px', color: '#323130', width: '140px' }}>E (Improvement)</th>
              <th style={{ padding: '4px 8px', color: '#323130' }}>F (Verification)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr 
                key={r.id} 
                style={{ 
                  background: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  borderBottom: '1px solid #e1dfdd'
                }}
              >
                <td style={{ textAlign: 'center', background: '#e1dfdd', borderRight: '1px solid #a19f9d', fontWeight: 'bold', color: '#605e5c', padding: '4px 0' }}>{idx + 1}</td>
                <td 
                  onClick={() => setSelectedCell(`A${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    borderRight: '1px solid #e1dfdd',
                    fontWeight: '600',
                    color: '#201f1e',
                    border: selectedCell === `A${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.a}
                </td>
                <td 
                  onClick={() => setSelectedCell(`B${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    borderRight: '1px solid #e1dfdd',
                    color: '#323130',
                    border: selectedCell === `B${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.b}
                </td>
                <td 
                  onClick={() => setSelectedCell(`C${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    borderRight: '1px solid #e1dfdd',
                    color: '#797775',
                    border: selectedCell === `C${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.c}
                </td>
                <td 
                  onClick={() => setSelectedCell(`D${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    borderRight: '1px solid #e1dfdd',
                    fontWeight: 'bold',
                    color: '#107c41',
                    border: selectedCell === `D${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.d}
                </td>
                <td 
                  onClick={() => setSelectedCell(`E${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    borderRight: '1px solid #e1dfdd',
                    fontWeight: 'bold',
                    color: '#005a9e',
                    border: selectedCell === `E${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.e}
                </td>
                <td 
                  onClick={() => setSelectedCell(`F${idx + 2}`)}
                  style={{ 
                    padding: '5px 8px', 
                    color: '#498205',
                    fontWeight: '500',
                    border: selectedCell === `F${idx + 2}` ? '2px solid #107c41' : '1px solid #e1dfdd'
                  }}
                >
                  {r.f}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Sheet Tabs */}
      <div style={{ background: '#f3f2f1', borderTop: '1px solid #c8c6c4', padding: '4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #c8c6c4', borderBottom: 'none', borderRadius: '3px 3px 0 0', padding: '3px 12px', fontWeight: 'bold', color: '#107c41' }}>
            Empirical Proofs
          </div>
          <div style={{ padding: '3px 10px', color: '#605e5c' }}>Architecture Ratios</div>
          <div style={{ padding: '3px 10px', color: '#605e5c' }}>Holdout Loss</div>
        </div>
        <div style={{ color: '#605e5c', fontSize: '10px' }}>
          READY • 100% Zoom • 7 Metrics Computed
        </div>
      </div>
    </div>
  );
}
