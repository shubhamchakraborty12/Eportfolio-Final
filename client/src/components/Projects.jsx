import React, { useState } from 'react';
import { 
  Layers, 
  Award, 
  ShieldAlert, 
  Maximize2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Github } from './Icons';

export default function Projects({ projectsData, onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = projectsData || [];

  const filterTabs = [
    { id: 'all', label: 'All Architectures' },
    { id: 'AI/ML', label: 'AI/ML & Forecasting' },
    { id: 'Full-Stack & AI', label: 'Full-Stack & SOC' },
    { id: 'Web Development', label: 'Web & MERN' }
  ];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-paper-950 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-850 border border-paper-750 text-xs font-mono text-slate-300 mb-3">
            <Layers size={13} className="text-patent-amber" />
            <span>Applied Engineering Projects & Research Prototypes</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-patent-amber">Projects</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Production-grade systems ranging from patented AI forecasting engines to cybersecurity SOC telemetry dashboards and MERN applications.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-paper-900 border border-paper-750 mb-8 w-fit reveal-on-scroll">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                activeFilter === tab.id 
                  ? 'bg-patent-amber text-paper-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-paper-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 reveal-on-scroll reveal-stagger">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="p-6 rounded-xl bg-paper-900 border border-paper-750 hover-card-elevate apple-card flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-patent-amber/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                {/* Header Badge & Maximize Button */}
                <div className="flex items-center justify-between pb-3 border-b border-paper-750 mb-4">
                  <span className={`px-2.5 py-1 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                    project.badge.includes('Patent') 
                      ? 'bg-patent-amber/15 text-patent-amber border border-patent-amber/30 group-hover:border-patent-amber/60' 
                      : project.badge.includes('Security')
                      ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                      : 'bg-research-blue/15 text-research-blue border border-research-blue/30'
                  }`}>
                    {project.badge.includes('Patent') && <Award size={13} className="pulse-patent rounded" />}
                    {project.badge.includes('Security') && <ShieldAlert size={13} />}
                    <span>{project.badge}</span>
                  </span>

                  <button 
                    onClick={() => onSelectProject(project)}
                    className="w-7 h-7 rounded border border-paper-700 bg-paper-850 hover:bg-paper-800 hover:border-slate-500 hover:scale-110 active:scale-95 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    title="Open Technical Architecture Deep-Dive"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-patent-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.shortDesc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded bg-paper-850 border border-paper-750 text-[11px] font-mono text-slate-400 group-hover:border-slate-600 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clean Footer Buttons without likes */}
              <div className="pt-4 border-t border-paper-750 flex items-center gap-3 relative z-10">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-paper-850 border border-paper-700 hover:border-slate-500 text-xs font-mono text-slate-200 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Github size={13} />
                  <span>GitHub Repository</span>
                </a>

                <button 
                  onClick={() => onSelectProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-patent-amber/10 border border-patent-amber/35 hover:bg-patent-amber/20 text-xs font-mono text-patent-amber font-medium transition-all hover:-translate-y-0.5"
                >
                  <Maximize2 size={13} />
                  <span>System Architecture</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
