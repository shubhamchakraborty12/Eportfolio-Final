import React, { useState } from 'react';
import controlPanelIconImg from '../../assets/Control Panel icon.png';
import { Search, Code2, Globe, Cpu, Database, BookOpen, CheckCircle } from 'lucide-react';

export default function ControlPanelSkills({ skillsData }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultSkills = [
    // Languages
    { name: "Python", category: "languages", level: 95, desc: "Primary for AI/ML, FastAPI, Scientific Computing", badge: "Primary" },
    { name: "JavaScript (ES6+)", category: "languages", level: 90, desc: "MERN Stack, React, Async DOM, Node.js", badge: "Primary" },
    { name: "Java", category: "languages", level: 85, desc: "Data Structures & Algorithms (DSA), OOP Design", badge: "Core CS" },
    { name: "C", category: "languages", level: 80, desc: "Pointers, Memory Allocation, Systems Fundamentals", badge: "Systems" },
    { name: "HTML5 & CSS3", category: "languages", level: 92, desc: "Semantic Markup, Modern Responsive Layouts", badge: "Frontend" },

    // Web & MERN
    { name: "React.js", category: "web", level: 92, desc: "Hooks, Context, SPAs, Interactive OS Simulation", badge: "MERN" },
    { name: "Node.js", category: "web", level: 88, desc: "Event Loop, REST Services, Streaming Pipelines", badge: "MERN" },
    { name: "Express.js", category: "web", level: 90, desc: "REST API Middleware, Routing, Controller Design", badge: "MERN" },
    { name: "MongoDB", category: "web", level: 88, desc: "NoSQL Schemas, Mongoose ODM, Aggregations", badge: "MERN" },
    { name: "FastAPI", category: "web", level: 88, desc: "High-Throughput Python REST Services, Pydantic", badge: "Backend" },
    { name: "REST API Architecture", category: "web", level: 94, desc: "Stateless Endpoints, CRUD Operations, JSON", badge: "Architecture" },

    // Machine Learning & AI
    { name: "Time-Series Forecasting", category: "ml", level: 95, desc: "Patent Co-Inventor, Dual-Stream Decomposition", badge: "Patent" },
    { name: "ARIMA Modeling", category: "ml", level: 92, desc: "Stationarity, Differencing, Trend Analysis", badge: "Statistical" },
    { name: "LSTM & Deep Learning", category: "ml", level: 88, desc: "Recurrent Networks, Residual Error Fitting", badge: "Deep Learning" },
    { name: "Scikit-learn", category: "ml", level: 90, desc: "Feature Preprocessing, Estimator Pipelines", badge: "ML" },
    { name: "Random Forest & XGBoost", category: "ml", level: 88, desc: "Gradient Boosted Trees, Hyperparameter Tuning", badge: "Ensemble" },
    { name: "Isolation Forest", category: "ml", level: 86, desc: "Unsupervised Anomaly Detection in SOC Telemetry", badge: "Security ML" },

    // Databases & Tools
    { name: "MongoDB Compass", category: "tools", level: 88, desc: "Query Optimization, Document Management", badge: "Database" },
    { name: "Git & GitHub", category: "tools", level: 92, desc: "Branching, Collaboration, Version Control", badge: "DevOps" },
    { name: "ServiceNow Platform", category: "tools", level: 82, desc: "Enterprise Digital Workflows, ITSM Modules", badge: "Enterprise" },
    { name: "Chart.js", category: "tools", level: 90, desc: "Real-Time Telemetry & Predictive Visualizations", badge: "Data Viz" },

    // CS Fundamentals
    { name: "DSA in Java", category: "fundamentals", level: 90, desc: "Trees, Graphs, DP, Heaps, Arrays, HashMaps", badge: "DSA" },
    { name: "Object-Oriented Programming (OOP)", category: "fundamentals", level: 92, desc: "Inheritance, Polymorphism, Encapsulation, SOLID", badge: "Design" },
    { name: "Database Management Systems (DBMS)", category: "fundamentals", level: 88, desc: "ACID Properties, Normalization, SQL & NoSQL", badge: "Database" },
    { name: "Operating Systems (OS)", category: "fundamentals", level: 85, desc: "Process Scheduling, Threading, Virtual Memory", badge: "Systems" }
  ];

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web & MERN' },
    { id: 'ml', label: 'AI & Machine Learning' },
    { id: 'tools', label: 'Tools & Databases' },
    { id: 'fundamentals', label: 'CS Fundamentals' }
  ];

  const filteredSkills = defaultSkills.filter(s => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="control-panel-app">
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #d4d9de', paddingBottom: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={controlPanelIconImg} alt="Control Panel" style={{ width: 48, height: 48, objectFit: 'contain' }} draggable={false} />
          <div>
            <h2 className="cp-header-title">Control Panel &gt; Technical Proficiency Manager</h2>
            <div style={{ fontSize: '11px', color: '#555' }}>
              Adjust system capabilities, framework proficiency, and AI model indices
            </div>
          </div>
        </div>

        {/* Search Control Panel */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search Skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '180px', 
              padding: '4px 8px 4px 26px', 
              border: '1px solid #a0b4c8', 
              borderRadius: '2px', 
              fontSize: '11px', 
              outline: 'none' 
            }}
          />
          <Search size={13} color="#888" style={{ position: 'absolute', left: '8px' }} />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '4px 10px',
              borderRadius: '3px',
              border: activeCategory === cat.id ? '1px solid #0078d7' : '1px solid #c0c6cc',
              background: activeCategory === cat.id ? '#e5f3ff' : '#fcfcfc',
              color: activeCategory === cat.id ? '#003399' : '#333333',
              fontWeight: activeCategory === cat.id ? 'bold' : 'normal',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {filteredSkills.map((skill, idx) => (
          <div 
            key={idx}
            style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '4px', 
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e3a5f' }}>
                  {skill.name}
                </span>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '1px 5px', 
                  borderRadius: '2px', 
                  background: skill.badge === 'Patent' ? '#fef3c7' : '#e0e7ff',
                  color: skill.badge === 'Patent' ? '#b45309' : '#3730a3',
                  fontWeight: '600'
                }}>
                  {skill.badge}
                </span>
              </div>

              {/* Progress Bar (Windows 7 Green/Blue glass meter style) */}
              <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', border: '1px solid #cbd5e1', marginBottom: '6px' }}>
                <div 
                  style={{ 
                    width: `${skill.level}%`, 
                    height: '100%', 
                    background: skill.badge === 'Patent' ? 'linear-gradient(180deg, #fcd34d 0%, #d97706 100%)' : 'linear-gradient(180deg, #86efac 0%, #16a34a 100%)',
                    borderRadius: '2px'
                  }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginBottom: '6px' }}>
                <span>Proficiency Calibrated</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>{skill.level}%</span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4' }}>
              {skill.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
