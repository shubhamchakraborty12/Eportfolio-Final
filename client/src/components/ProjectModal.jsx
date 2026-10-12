import React from 'react';
import { X, Award, CheckCircle2, Layers } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-paper-900 border border-paper-750 rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 bg-paper-900/95 backdrop-blur border-b border-paper-750 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-patent-amber bg-patent-amber/10 px-2.5 py-1 rounded border border-patent-amber/30 uppercase font-bold">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-slate-400">Category: {project.category}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-paper-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mt-3">
              {project.longDesc || project.shortDesc}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="p-5 rounded-lg bg-paper-950 border border-paper-800 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-patent-amber uppercase tracking-wider">
              <Layers size={14} />
              <span>Architectural Specifications & Results</span>
            </div>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
              Implementation Stack & Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-paper-850 border border-paper-750 text-xs font-mono text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-paper-750 flex flex-wrap gap-3">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-paper-850 border border-paper-700 hover:border-slate-500 text-xs font-mono text-white transition-all"
            >
              <Github size={14} />
              <span>Inspect Source on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
