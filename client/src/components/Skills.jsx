import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  Terminal, 
  Search,
  BookOpen
} from 'lucide-react';

export default function Skills({ skillsData }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web & MERN' },
    { id: 'ml', label: 'AI & Machine Learning' },
    { id: 'tools', label: 'Tools & DB' },
    { id: 'fundamentals', label: 'CS Fundamentals' }
  ];

  const allSkillsList = [
    // Languages
    { name: "Python", category: "languages", level: 95, tag: "Primary for AI/ML, FastAPI, Scientific Computing", badge: "Primary" },
    { name: "JavaScript (ES6+)", category: "languages", level: 90, tag: "MERN Stack, React, Async DOM APIs", badge: "Primary" },
    { name: "Java", category: "languages", level: 85, tag: "Data Structures & Algorithms (DSA), OOP Design", badge: "Core CS" },
    { name: "C", category: "languages", level: 80, tag: "Pointers, Memory Management, Systems Fundamentals", badge: "Systems" },
    { name: "HTML5 & CSS3", category: "languages", level: 92, tag: "Semantic Markup, Modern Responsive Layouts", badge: "Frontend" },

    // Web & MERN
    { name: "React.js", category: "web", level: 92, tag: "Hooks, Context, SPAs, Telemetry Visualizations", badge: "MERN" },
    { name: "Node.js", category: "web", level: 88, tag: "Event Loop, REST Services, Streaming Pipelines", badge: "MERN" },
    { name: "Express.js", category: "web", level: 90, tag: "REST API Middleware, Routing, Controller Design", badge: "MERN" },
    { name: "MongoDB", category: "web", level: 88, tag: "NoSQL Schemas, Mongoose ODM, Aggregations", badge: "MERN" },
    { name: "FastAPI", category: "web", level: 88, tag: "High-Throughput Python REST Services, Pydantic", badge: "Backend" },
    { name: "REST API Architecture", category: "web", level: 94, tag: "Stateless Endpoints, CRUD Operations, JSON", badge: "Architecture" },
    { name: "Tailwind CSS", category: "web", level: 90, tag: "Utility-First, Responsive Design, Clean UI", badge: "Styling" },

    // Machine Learning & AI
    { name: "Time-Series Forecasting", category: "ml", level: 95, tag: "Patent Co-Inventor, Dual-Stream Decomposition", badge: "Patent" },
    { name: "ARIMA Modeling", category: "ml", level: 92, tag: "Stationarity, Differencing, Trend Analysis", badge: "Statistical" },
    { name: "LSTM & Deep Learning", category: "ml", level: 88, tag: "Recurrent Networks, Residual Error Fitting", badge: "Deep Learning" },
    { name: "Scikit-learn", category: "ml", level: 90, tag: "Feature Preprocessing, Estimator Pipelines", badge: "ML" },
    { name: "Random Forest & XGBoost", category: "ml", level: 88, tag: "Gradient Boosted Trees, Hyperparameter Tuning", badge: "Ensemble" },
    { name: "Isolation Forest", category: "ml", level: 86, tag: "Unsupervised Anomaly Detection in SOC Telemetry", badge: "Security ML" },
    { name: "Model Evaluation & Metrics", category: "ml", level: 90, tag: "RMSE, MAE, MAPE, R², Directional Accuracy", badge: "Validation" },

    // Tools & Databases
    { name: "MongoDB Compass", category: "tools", level: 88, tag: "Query Optimization, Document Management", badge: "Database" },
    { name: "Git & GitHub", category: "tools", level: 92, tag: "Branching, Collaboration, Version Control", badge: "DevOps" },
    { name: "VS Code", category: "tools", level: 95, tag: "Debugging, Environment Configuration", badge: "IDE" },
    { name: "ServiceNow Platform", category: "tools", level: 82, tag: "Enterprise Digital Workflows, ITSM Modules", badge: "Enterprise" },
    { name: "Chart.js", category: "tools", level: 90, tag: "Real-Time Telemetry & Predictive Charting", badge: "Data Viz" },
    { name: "Android Development", category: "tools", level: 78, tag: "Mobile UI, Activity Lifecycle, Studio", badge: "Mobile" },

    // CS Fundamentals
    { name: "DSA in Java", category: "fundamentals", level: 90, tag: "Trees, Graphs, DP, Heaps, Arrays, HashMaps", badge: "DSA" },
    { name: "Object-Oriented Programming (OOP)", category: "fundamentals", level: 92, tag: "Inheritance, Polymorphism, Encapsulation, SOLID", badge: "Design" },
    { name: "Database Management Systems (DBMS)", category: "fundamentals", level: 88, tag: "ACID Properties, Normalization, SQL & NoSQL", badge: "Database" },
    { name: "Operating Systems (OS)", category: "fundamentals", level: 85, tag: "Process Scheduling, Threading, Virtual Memory", badge: "Systems" }
  ];

  const filteredSkills = allSkillsList.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 md:py-28 bg-paper-950 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-850 border border-paper-750 text-xs font-mono text-slate-300 mb-3">
            <Cpu size={13} className="text-patent-amber" />
            <span>Technical Proficiency & Tooling Index</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-patent-amber">Competencies</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Systematic overview of programming languages, full-stack frameworks, machine learning models, and core computer science foundations.
          </p>
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 reveal-on-scroll">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-paper-900 border border-paper-750">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === cat.id 
                    ? 'bg-patent-amber text-paper-950 font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-paper-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter by keyword (e.g. React, LSTM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-paper-900 border border-paper-750 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-patent-amber"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 reveal-on-scroll reveal-stagger">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-lg bg-paper-900 border border-paper-750 hover-card-elevate apple-card flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-semibold text-sm text-white group-hover:text-patent-light transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      skill.badge === 'Patent' 
                        ? 'bg-patent-amber/15 text-patent-amber border border-patent-amber/30' 
                        : skill.badge === 'Primary' || skill.badge === 'MERN'
                        ? 'bg-research-blue/15 text-research-blue border border-research-blue/30'
                        : 'bg-paper-800 text-slate-400 border border-paper-700'
                    }`}>
                      {skill.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold group-hover:text-white transition-colors">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress Meter Bar */}
                <div className="w-full h-1.5 rounded-full bg-paper-800 overflow-hidden mb-2.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 group-hover:brightness-125 ${
                      skill.badge === 'Patent' 
                        ? 'bg-patent-amber shadow-[0_0_8px_rgba(217,155,38,0.5)]' 
                        : skill.badge === 'Primary' || skill.badge === 'MERN'
                        ? 'bg-research-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-normal group-hover:text-slate-300 transition-colors">
                {skill.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
