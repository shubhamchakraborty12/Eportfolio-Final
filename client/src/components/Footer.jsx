import React from 'react';
import { Mail, Phone, ArrowUp, Database, Award, ShieldCheck } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer({ serverOnline, onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-paper-950 border-t border-paper-700/80 pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-paper-800 reveal-on-scroll">
          
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-paper-850 border border-patent-amber/40 flex items-center justify-center font-mono font-bold text-xs text-patent-amber">
                SC
              </div>
              <span className="font-heading font-bold text-lg text-white">Shubham Chakraborty</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Software Engineering • Full-Stack MERN Architecture • Applied AI & Time-Series Research. 
              Co-inventor of patented ARIMA–LSTM Hybrid Forecasting System (Patent 202521127184 A).
            </p>
            <div className="font-mono text-xs text-slate-500 pt-1">
              Affiliation: Symbiosis Institute of Technology (SIT), Nagpur
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
              Portfolio Disclosures
            </div>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <a href="#patent" className="hover:text-patent-amber transition-colors">Patent Application 202521127184 A</a>
              </li>
              <li>
                <a href="#about" className="hover:text-patent-amber transition-colors">Academic Narrative & SIT Nagpur</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-patent-amber transition-colors">Technical Skills & Tooling Index</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-patent-amber transition-colors">Industry Internships & Roles</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-patent-amber transition-colors">Featured Engineering Projects</a>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
              External Coordinates
            </div>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <a href="https://www.linkedin.com/in/shubham-chakraborty-76364a31a" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a href="https://github.com/shubhamchakraborty12" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                  GitHub Repositories
                </a>
              </li>
              <li>
                <a href="mailto:shubhamchakraborty0412@gmail.com" className="hover:text-patent-amber transition-colors">
                  shubhamchakraborty0412@gmail.com
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenResume}
                  className="text-patent-amber hover:underline text-left"
                >
                  View Curriculum Vitae (Print / PDF)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Shubham Chakraborty. Built with MERN Stack & Tailwind CSS.</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{serverOnline ? 'MongoDB: Online • REST API: Active' : 'MERN Mode: Ready'}</span>
            </span>
          </div>

          <button 
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-paper-850 border border-paper-750 hover:border-slate-500 text-slate-300 hover:text-white transition-all"
          >
            <ArrowUp size={12} />
            <span>Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
