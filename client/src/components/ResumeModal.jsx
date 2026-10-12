import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-paper-900 border border-paper-750 rounded-xl shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 bg-paper-900/95 backdrop-blur border-b border-paper-750 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-patent-amber bg-patent-amber/10 px-2.5 py-1 rounded border border-patent-amber/30 uppercase font-bold">
              Curriculum Vitae
            </span>
            <span className="text-sm font-semibold text-white">Shubham Chakraborty</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-paper-950 font-mono text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <Printer size={13} />
              <span>Print / PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-paper-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body / Resume Document Content */}
        <div className="p-6 sm:p-10 text-slate-200 space-y-6 resume-print-area">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-paper-750">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shubham Chakraborty
            </h1>
            <p className="font-mono text-sm text-patent-amber mt-1 font-semibold">
              Software Engineering | MERN / Full-Stack Development | AI/ML
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-1"><MapPin size={12} /> Nagpur, Maharashtra</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Phone size={12} /> +91-9561297328</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail size={12} /> shubhamchakraborty0412@gmail.com</span>
            </div>
            <div className="flex justify-center gap-4 text-xs font-mono text-slate-300 mt-2">
              <a href="https://www.linkedin.com/in/shubham-chakraborty-76364a31a" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                LinkedIn: shubham-chakraborty-76364a31a
              </a>
              <span>•</span>
              <a href="https://github.com/shubhamchakraborty12" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                GitHub: shubhamchakraborty12
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-patent-amber pb-1 border-b border-paper-750 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning (AI/ML), with MERN-stack and Python internships and Java/DSA skills. Built full-stack, REST API, and ML forecasting projects; co-inventor of an ARIMA–LSTM system with a published patent application. Seeking Software Engineer, Full-Stack Developer, Python Developer, or AI/ML Engineer internships and entry-level roles.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-patent-amber pb-1 border-b border-paper-750 mb-2">
              Technical Skills
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1 font-mono">
              <li><strong className="text-white">Programming Languages:</strong> Python, Java, C, JavaScript, HTML, CSS</li>
              <li><strong className="text-white">Web Development:</strong> React.js, Node.js, Express.js, FastAPI, Tailwind CSS, REST API Development</li>
              <li><strong className="text-white">Machine Learning:</strong> Scikit-learn, Random Forest, XGBoost, ARIMA, LSTM, Isolation Forest, Deep Learning</li>
              <li><strong className="text-white">ML Methods:</strong> Time-Series Forecasting, Data Preprocessing, Model Training, Model Evaluation</li>
              <li><strong className="text-white">Databases & Tools:</strong> MongoDB, Git, GitHub, VS Code, ServiceNow, Chart.js, Android Development</li>
              <li><strong className="text-white">CS Fundamentals:</strong> Data Structures and Algorithms (DSA) in Java, OOP, DBMS, Operating Systems</li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-patent-amber pb-1 border-b border-paper-750 mb-3">
              Experience
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">MERN Stack Developer Intern — <span className="text-patent-amber font-semibold">Main Crafts Technology</span></span>
                  <span className="font-mono text-xs text-slate-400">May 2026 – Jun 2026 | Nagpur, MH</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1 space-y-1">
                  <li>Developed MERN-stack web applications using React.js, Node.js, Express.js, and MongoDB, integrating frontend, backend, and persistent storage for 4 CRUD operations: create, read, update, and delete.</li>
                  <li>Implemented 2 task-management workflows for creating and viewing tasks, integrating the user interface with backend application data.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">Python Developer Virtual Intern — <span className="text-patent-amber font-semibold">Kodbud</span></span>
                  <span className="font-mono text-xs text-slate-400">Mar 2026 | Remote</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1">
                  <li>Wrote Python programs for structured programming exercises and application-focused internship assignments.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">ServiceNow Virtual Intern — <span className="text-patent-amber font-semibold">ServiceNow</span></span>
                  <span className="font-mono text-xs text-slate-400">Jun 2025 – Jul 2025 | Remote</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1">
                  <li>Trained in ServiceNow enterprise workflows and application development through guided platform modules.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">Frontend Developer — <span className="text-patent-amber font-semibold">Kelicalix Technologies</span></span>
                  <span className="font-mono text-xs text-slate-400">Feb 2025 – May 2025 | Maharashtra, India</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1">
                  <li>Applied responsive web design principles while contributing to frontend layouts and user interface (UI) elements.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projects & Patent */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-patent-amber pb-1 border-b border-paper-750 mb-3">
              Projects & Published Patent
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">Hybrid AI Time-Series Forecasting System <span className="font-mono text-xs text-patent-amber ml-1">[Patent 202521127184 A]</span></span>
                  <span className="font-mono text-xs text-slate-400">ARIMA, LSTM, Python</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1 space-y-1">
                  <li>Co-invented a time-series forecasting framework combining 2 modeling approaches—statistical ARIMA and deep-learning LSTM—for multi-step prediction.</li>
                  <li>Supported data preprocessing, model training, and evaluation; patent application <strong>202521127184 A</strong> was published in India on January 2, 2026.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">ExfilSentinel: Company Data Exfiltration Detection</span>
                  <span className="font-mono text-xs text-slate-400">React, FastAPI, MongoDB, ML</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1 space-y-1">
                  <li>Built a security operations center (SOC) application for insider threat detection, using behavioral metadata, live telemetry, and 3 ML models: Isolation Forest, Random Forest, and XGBoost.</li>
                  <li>Integrated a React/Chart.js dashboard with FastAPI REST APIs for threat scoring, attack simulation, and monitoring across 4 activity categories: network, file system, process, and USB.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">Stock Market Price Prediction</span>
                  <span className="font-mono text-xs text-slate-400">React, FastAPI, ARIMA, LSTM, GBRT</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1">
                  <li>Created FastAPI REST APIs for Yahoo Finance price history and forecasting, connecting React charts to 3 models with backtesting metrics (RMSE, MAE, MAPE, R², directional accuracy).</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-white">To-Do List App</span>
                  <span className="font-mono text-xs text-slate-400">HTML, CSS, JavaScript</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 mt-1">
                  <li>Deployed a responsive JavaScript task manager supporting 4 task actions with browser local-storage persistence.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-patent-amber pb-1 border-b border-paper-750 mb-2">
              Education
            </h3>
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <span className="font-bold text-white">Symbiosis Institute of Technology, Nagpur</span>
              <span className="font-mono text-xs text-emerald-400">Ongoing</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              B.Tech, Computer Science Engineering (Honours: AI & ML) • Nagpur, Maharashtra
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
