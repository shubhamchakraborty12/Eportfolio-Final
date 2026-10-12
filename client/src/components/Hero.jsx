import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Award, 
  FileText, 
  Terminal, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Hero({ onOpenResume }) {
  const roles = [
    "Full-Stack MERN Developer",
    "AI/ML & Forecasting Researcher",
    "Co-Inventor: Published Indian Patent",
    "Python & FastAPI System Architect"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 35 : 75);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-paper-700/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Meta Banner */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-850 border border-paper-700 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Software Engineer & AI/ML Candidate</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-patent-amber/10 border border-patent-amber/30 text-xs font-mono text-patent-amber">
            <Award size={13} />
            <span>Patent Application No: 202521127184 A</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper-850 border border-paper-700 text-xs font-mono text-slate-400">
            <span>Symbiosis Institute of Technology, Nagpur</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 reveal-on-scroll">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2">
                Curriculum Vitae & Research Portfolio
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Shubham Chakraborty
              </h1>
            </div>

            {/* Subtitle / Dynamic Typewriter */}
            <div className="flex items-center font-mono text-lg sm:text-xl text-patent-amber h-8">
              <span>{displayText}</span>
              <span className="inline-block w-2 h-5 bg-patent-amber ml-1 animate-pulse"></span>
            </div>

            {/* Academic & Engineering Summary */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Computer Science undergraduate specializing in <strong>Artificial Intelligence & Machine Learning</strong> at 
              <strong> Symbiosis Institute of Technology, Nagpur</strong>. Co-inventor of an 
              <strong> ARIMA–LSTM hybrid time-series forecasting system</strong> with a published patent in India. 
              Experienced in architecting production <strong>MERN-stack applications</strong>, low-latency <strong>FastAPI microservices</strong>, 
              and enterprise workflows.
            </p>

            {/* Official Patent Gazette Highlight Box */}
            <a 
              href="#patent" 
              className="p-4 rounded-lg bg-paper-850/90 border border-patent-amber/40 hover:border-patent-amber transition-all shadow-sm group no-underline block hover-card-elevate relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-patent-amber/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start gap-3.5 relative z-10">
                <div className="p-2.5 rounded bg-patent-amber/15 border border-patent-amber/30 text-patent-amber flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={22} className="pulse-patent rounded" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-patent-amber bg-patent-amber/10 px-2 py-0.5 rounded border border-patent-amber/20">
                      Official Patent Gazette • Jan 02, 2026
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">The Patent Office, Govt. of India</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-patent-light transition-colors">
                    Hybrid AI Time-Series Forecasting System
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Dual-stream predictive framework decomposing structural linear trends via statistical ARIMA while isolating non-linear residual errors through deep bidirectional LSTM cells.
                  </p>
                </div>
              </div>
            </a>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="#projects" 
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-paper-950 font-medium text-sm hover:bg-slate-200 transition-all shadow-md group"
              >
                <span>Examine Projects</span>
                <ArrowRight size={15} className="arrow-slide" />
              </a>

              <a 
                href="#experience" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-paper-850 border border-paper-700 hover:border-slate-500 text-slate-200 font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <span>Industry Experience</span>
              </a>

              <button 
                onClick={onOpenResume} 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-paper-850 border border-paper-700 hover:border-slate-500 text-slate-200 font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <FileText size={15} />
                <span>Official Resume</span>
              </button>
            </div>
          </div>

          {/* Editorial Visual Column */}
          <div className="lg:col-span-5 flex justify-center relative reveal-scale">
            <div className="ambient-glow-mesh -top-12 -right-12"></div>
            <div className="relative w-full max-w-sm sm:max-w-md floating-subtle">
              
              {/* Paper / Frame Card */}
              <div className="bg-paper-850 border border-paper-700 rounded-xl p-3 shadow-panel hover-card-elevate backdrop-blur-sm">
                
                {/* Academic Metadata Tag */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-paper-750 font-mono text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-patent-amber"></span>
                    <span>RESEARCHER ID: SIT-AI-2026</span>
                  </span>
                  <span>NAGPUR, MH, IN</span>
                </div>

                {/* Portrait Image */}
                <div className="relative rounded-lg overflow-hidden border border-paper-700 aspect-square">
                  <img 
                    src="/shubham_portrait.jpg" 
                    alt="Shubham Chakraborty - Software Engineer and AI/ML Researcher"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-paper-950 via-paper-950/80 to-transparent">
                    <p className="font-serif font-bold text-sm text-white">Shubham Chakraborty</p>
                    <p className="font-mono text-[11px] text-slate-300">Software Engineering • AI/ML Honours</p>
                  </div>
                </div>

                {/* Technical Footnote Box */}
                <div className="mt-3 p-2.5 rounded bg-paper-900 border border-paper-750 font-mono text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">PRIMARY FOCUS:</span>
                    <span className="text-slate-300 font-semibold">MERN & Time-Series AI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PATENT DISCLOSURE:</span>
                    <span className="text-patent-amber font-semibold">App 202521127184 A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">VERIFICATION:</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck size={12} /> Indian Patent Gazette
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
