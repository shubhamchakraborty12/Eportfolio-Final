import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Award,
  Layers,
  Cpu
} from 'lucide-react';

export default function About({ onOpenResume }) {
  const coursework = [
    'Deep Learning & Neural Networks',
    'Time-Series Forecasting & Analysis',
    'Data Structures & Algorithms in Java',
    'Database Management Systems (DBMS)',
    'Operating Systems & Concurrency',
    'REST API System Architecture'
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-paper-900 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-800 border border-paper-750 text-xs font-mono text-slate-300 mb-3">
            <BookOpen size={13} className="text-patent-amber" />
            <span>Academic Background & Engineering Disciplines</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Academic & <span className="text-patent-amber">Engineering</span> Profile
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Undergraduate researcher at Symbiosis Institute of Technology, Nagpur, bridging full-stack systems with applied machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 reveal-on-scroll">
            <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                My engineering focus centers on bridging two disciplines: <strong>high-throughput full-stack architectures (MERN Stack)</strong> and <strong>mathematical machine learning systems</strong>. I approach software development not merely as assembling libraries, but as constructing dependable, measurable, and performant systems.
              </p>
              <p>
                Through competitive internships at <strong>Main Crafts Technology</strong>, <strong>Kodbud</strong>, <strong>ServiceNow</strong>, and <strong>Kelicalix Technologies</strong>, I have engineered full-stack web applications with complete database persistence, automated enterprise workflows, and developed low-latency telemetry pipelines.
              </p>
              <p>
                My academic research in non-stationary sequential signals led to the co-invention of an ARIMA–LSTM hybrid time-series forecasting framework, recognized through a published Indian Patent (<strong>Application No. 202521127184 A</strong>).
              </p>
            </div>

            {/* Core Competencies Box */}
            <div className="p-5 rounded-lg bg-paper-850 border border-paper-750 hover-card-elevate apple-card transition-all">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                Technical Disciplines & Foundation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Full-Stack MERN:</strong> React state workflows with Node/Express and MongoDB persistence.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>AI & Neural Modeling:</strong> Recurrent LSTMs, ARIMA decomposition, Scikit-learn pipelines.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>DSA in Java:</strong> Rigorous trees, graphs, dynamic programming, and OOP system design.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Cybersecurity ML:</strong> Insider threat detection via Isolation Forest and XGBoost ensembles.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={onOpenResume} 
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white text-paper-950 font-medium text-sm hover:bg-slate-200 transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <FileText size={15} />
                <span>Open Full Curriculum Vitae</span>
              </button>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-paper-700 bg-paper-850 hover:border-slate-500 text-slate-200 font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <span>Initiate Contact</span>
              </a>
            </div>
          </div>

          {/* Education & Institution Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-scale">
            <div className="p-6 rounded-xl bg-paper-850 border border-paper-750 shadow-sm hover-card-elevate apple-card transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-paper-700/80 mb-4">
                <span className="font-mono text-xs text-patent-amber font-semibold uppercase tracking-wider">
                  Academic Institution
                </span>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Degree in Progress
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 rounded-lg bg-paper-900 border border-paper-750 text-patent-amber">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Symbiosis Institute of Technology
                  </h3>
                  <p className="text-xs text-slate-400">Nagpur Campus, Maharashtra, India</p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-paper-900 border border-paper-750 font-mono text-xs space-y-1.5 mb-5">
                <div className="text-white font-semibold">
                  B.Tech, Computer Science and Engineering
                </div>
                <div className="text-patent-amber">
                  Honours Specialization: Artificial Intelligence & Machine Learning
                </div>
                <div className="text-slate-400 flex items-center gap-1.5 pt-1">
                  <MapPin size={12} /> Nagpur, Maharashtra • Ongoing
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Advanced Coursework & Research Units
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((c, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded bg-paper-900 border border-paper-750 text-xs font-mono text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
