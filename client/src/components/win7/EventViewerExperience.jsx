import React, { useState } from 'react';
import { EventViewerIcon } from '../Icons';
import { 
  Info, 
  AlertTriangle, 
  Folder, 
  Calendar, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function EventViewerExperience({ experienceData }) {
  const experiences = experienceData || [
    {
      id: "maincrafts",
      role: "MERN Stack Developer Intern",
      company: "Main Crafts Technology",
      location: "Nagpur, Maharashtra",
      type: "Internship",
      period: "May 2026 – Jun 2026",
      isRecent: true,
      eventId: 2026,
      level: "Information",
      description: "Engineered scalable full-stack web applications utilizing the MERN stack (React.js, Node.js, Express.js, MongoDB), delivering seamless user interfaces backed by high-throughput server architecture.",
      bullets: [
        "Developed MERN-stack web applications using React.js, Node.js, Express.js, and MongoDB, integrating frontend, backend, and persistent storage for 4 CRUD operations.",
        "Implemented 2 task-management workflows for creating and viewing tasks, integrating the user interface with backend application data.",
        "Architected clean REST API controllers and Mongoose schemas with data validation and error handling.",
        "Optimized frontend re-renders and client-side state handling to ensure ultra-responsive user experiences."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JavaScript"]
    },
    {
      id: "kodbud",
      role: "Python Developer Virtual Intern",
      company: "Kodbud",
      location: "Remote",
      type: "Virtual Internship",
      period: "Mar 2026",
      isRecent: false,
      eventId: 2025,
      level: "Information",
      description: "Strengthened core algorithmic capabilities and backend design patterns by building structured Python programs and resolving algorithmic challenges.",
      bullets: [
        "Wrote modular Python programs for structured programming exercises and application-focused internship assignments.",
        "Implemented clean data processing pipelines, file I/O operations, and algorithmic routines.",
        "Applied best practices in unit testing, code modularity, and error handling."
      ],
      technologies: ["Python", "Object-Oriented Python", "Algorithmic Design", "Data Structures"]
    },
    {
      id: "servicenow",
      role: "ServiceNow Virtual Intern",
      company: "ServiceNow",
      location: "Remote",
      type: "Virtual Internship",
      period: "Jun 2025 – Jul 2025",
      isRecent: false,
      eventId: 2024,
      level: "Information",
      description: "Explored enterprise-scale digital workflow automation, ITSM lifecycle management, and platform application development.",
      bullets: [
        "Trained in ServiceNow enterprise workflows and application development through guided platform modules.",
        "Studied automated business rules, client scripts, table architectures, and incident resolution workflows.",
        "Acquired practical exposure to IT Service Management (ITSM) operational models and system integration patterns."
      ],
      technologies: ["ServiceNow Platform", "ITSM", "Enterprise Workflows", "Business Logic Scripting"]
    },
    {
      id: "kelicalix",
      role: "Frontend Developer",
      company: "Kelicalix Technologies",
      location: "Maharashtra, India",
      type: "Internship",
      period: "Feb 2025 – May 2025",
      isRecent: false,
      eventId: 2023,
      level: "Information",
      description: "Contributed to user-facing web applications focusing on intuitive layout designs, cross-browser compatibility, and responsive ergonomics.",
      bullets: [
        "Designed accessible, cross-browser component layouts using modern frontend standards.",
        "Collaborated with senior designers and backend engineers to translate wireframes into interactive prototypes.",
        "Conducted UI regression tests across Chromium and WebKit rendering engines."
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "Responsive UI", "Cross-Browser Testing"]
    }
  ];

  const [selectedExpId, setSelectedExpId] = useState(experiences[0]?.id || 'maincrafts');
  const [activeTab, setActiveTab] = useState('general');

  const selectedExp = experiences.find(e => e.id === selectedExpId) || experiences[0];

  return (
    <div style={{ display: 'flex', height: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif", fontSize: '12px' }}>
      {/* Left Tree Pane (MMC Console Tree) */}
      <div style={{ width: '210px', background: '#f5f7fa', borderRight: '1px solid #d9d9d9', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '6px 10px', background: '#e8edf3', borderBottom: '1px solid #d0d7de', fontWeight: 'bold', fontSize: '11px', color: '#333' }}>
          Console Root
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 6px', color: '#333', fontWeight: '600', cursor: 'pointer' }}>
            <ChevronDown size={13} color="#666" />
            <EventViewerIcon size={16} />
            <span>Event Viewer (Local)</span>
          </div>

          <div style={{ paddingLeft: '16px', marginTop: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 6px', color: '#555', cursor: 'pointer' }}>
              <ChevronRight size={12} color="#888" />
              <Folder size={14} color="#f5b041" />
              <span>Custom Views</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 6px', color: '#555', cursor: 'pointer' }}>
              <ChevronDown size={12} color="#888" />
              <Folder size={14} color="#f5b041" />
              <span style={{ fontWeight: '600', color: '#003399' }}>Windows Logs</span>
            </div>

            <div style={{ paddingLeft: '16px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '5px', 
                  padding: '3px 6px', 
                  background: '#cce8ff', 
                  borderRadius: '2px',
                  fontWeight: '600', 
                  color: '#000', 
                  cursor: 'pointer' 
                }}
              >
                <FileText size={13} color="#2980b9" />
                <span>Career History ({experiences.length})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 6px', color: '#666', cursor: 'pointer' }}>
                <FileText size={13} color="#7f8c8d" />
                <span>Application</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 6px', color: '#666', cursor: 'pointer' }}>
                <FileText size={13} color="#7f8c8d" />
                <span>Security</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 6px', color: '#666', cursor: 'pointer' }}>
                <FileText size={13} color="#7f8c8d" />
                <span>System</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Main Pane (Table top + Event Properties bottom) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Events Table */}
        <div style={{ height: '45%', borderBottom: '2px solid #a0b4c8', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '6px 12px', background: '#f0f4f8', borderBottom: '1px solid #d0d7de', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#1a3c60' }}>
              Career History: Number of events: {experiences.length}
            </span>
            <span style={{ fontSize: '11px', color: '#666' }}>Log Name: Windows Logs\Career</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f5f5f5', borderBottom: '1px solid #d0d0d0', position: 'sticky', top: 0, zIndex: 1 }}>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #e0e0e0', width: '70px', color: '#444' }}>Level</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #e0e0e0', width: '130px', color: '#444' }}>Date and Time</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #e0e0e0', width: '160px', color: '#444' }}>Source (Company)</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #e0e0e0', width: '70px', color: '#444' }}>Event ID</th>
                  <th style={{ padding: '4px 8px', color: '#444' }}>Task Category (Role)</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp, idx) => {
                  const isSelected = exp.id === selectedExpId;
                  return (
                    <tr 
                      key={exp.id || idx}
                      onClick={() => setSelectedExpId(exp.id)}
                      style={{ 
                        background: isSelected ? '#cce8ff' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfc'),
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <td style={{ padding: '5px 8px', borderRight: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Info size={13} color="#2980b9" />
                        <span>Information</span>
                      </td>
                      <td style={{ padding: '5px 8px', borderRight: '1px solid #f0f0f0' }}>{exp.period}</td>
                      <td style={{ padding: '5px 8px', borderRight: '1px solid #f0f0f0', fontWeight: '600' }}>{exp.company}</td>
                      <td style={{ padding: '5px 8px', borderRight: '1px solid #f0f0f0', fontFamily: 'Consolas, monospace' }}>{exp.eventId || 2026 - idx}</td>
                      <td style={{ padding: '5px 8px', color: '#003399', fontWeight: isSelected ? '600' : 'normal' }}>{exp.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Event Properties Preview */}
        {selectedExp && (
          <div style={{ height: '55%', display: 'flex', flexDirection: 'column', background: '#fdfdfd' }}>
            {/* Properties Tabs */}
            <div style={{ display: 'flex', gap: '2px', padding: '6px 12px 0 12px', background: '#eaeff5', borderBottom: '1px solid #c0d0e0' }}>
              <button 
                onClick={() => setActiveTab('general')}
                style={{ 
                  padding: '4px 14px', 
                  borderTop: activeTab === 'general' ? '2px solid #0078d7' : '1px solid #c0d0e0',
                  borderLeft: '1px solid #c0d0e0',
                  borderRight: '1px solid #c0d0e0',
                  borderBottom: activeTab === 'general' ? '1px solid #ffffff' : 'none',
                  background: activeTab === 'general' ? '#ffffff' : '#e0e7ee',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'general' ? '600' : 'normal',
                  fontSize: '11px',
                  borderRadius: '3px 3px 0 0'
                }}
              >
                General
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                style={{ 
                  padding: '4px 14px', 
                  borderTop: activeTab === 'details' ? '2px solid #0078d7' : '1px solid #c0d0e0',
                  borderLeft: '1px solid #c0d0e0',
                  borderRight: '1px solid #c0d0e0',
                  borderBottom: activeTab === 'details' ? '1px solid #ffffff' : 'none',
                  background: activeTab === 'details' ? '#ffffff' : '#e0e7ee',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'details' ? '600' : 'normal',
                  fontSize: '11px',
                  borderRadius: '3px 3px 0 0'
                }}
              >
                Details (JSON / XML)
              </button>
            </div>

            {/* Properties Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
              {activeTab === 'general' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a3c60', margin: 0 }}>
                        {selectedExp.role}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#0052cc', fontWeight: '600', marginTop: '2px' }}>
                        {selectedExp.company} • {selectedExp.type}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '11px', color: '#555' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <Calendar size={12} color="#777" />
                        <span>{selectedExp.period}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '2px' }}>
                        <MapPin size={12} color="#777" />
                        <span>{selectedExp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.5', marginBottom: '12px', background: '#f5f7fa', padding: '8px 12px', borderRadius: '4px', borderLeft: '3px solid #0078d7' }}>
                    {selectedExp.description}
                  </p>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#444', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Key Responsibilities &amp; Technical Milestones:
                    </div>
                    <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11px', color: '#333', lineHeight: '1.6' }}>
                      {selectedExp.bullets?.map((b, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#444', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Environment &amp; Stack:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedExp.technologies?.map((tech, idx) => (
                        <span 
                          key={idx} 
                          style={{ 
                            background: '#e8f4fd', 
                            border: '1px solid #b6d8f2', 
                            borderRadius: '3px', 
                            padding: '2px 8px', 
                            fontSize: '11px', 
                            color: '#0052cc',
                            fontWeight: '500'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ fontFamily: 'Consolas, monospace', fontSize: '11px', background: '#f8f9fa', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', whiteSpace: 'pre-wrap', color: '#222' }}>
                  {JSON.stringify(selectedExp, null, 2)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Actions Pane */}
      <div style={{ width: '190px', background: '#f5f7fa', borderLeft: '1px solid #d9d9d9', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#1a3c60', borderBottom: '1px solid #d0d7de', paddingBottom: '3px', marginBottom: '6px' }}>
            Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px', color: '#0066cc' }}>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RefreshCw size={11} /> Refresh Log
            </span>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FileText size={11} /> Filter Current Log...
            </span>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ExternalLink size={11} /> Export Experience
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#1a3c60', borderBottom: '1px solid #d0d7de', paddingBottom: '3px', marginBottom: '6px' }}>
            Event {selectedExp?.eventId || 2026}
          </div>
          <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.4' }}>
            <div>Log: Career History</div>
            <div>Source: {selectedExp?.company}</div>
            <div>Logged: Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}
