import React from 'react';
import { Award, Briefcase, Code, TrendingUp } from 'lucide-react';

export default function StatsRibbon() {
  const stats = [
    {
      icon: <Award size={20} className="text-patent-amber" />,
      number: "1",
      label: "Published Patent",
      meta: "Application: 202521127184 A",
      tag: "Jan 02, 2026 Gazette"
    },
    {
      icon: <Briefcase size={20} className="text-research-blue" />,
      number: "4",
      label: "Industry Internships",
      meta: "MERN, Python, ServiceNow, Frontend",
      tag: "Production & Enterprise"
    },
    {
      icon: <Code size={20} className="text-indigo-400" />,
      number: "6+",
      label: "Engineered Projects",
      meta: "SOC Dashboard, ML Engines, Web Apps",
      tag: "Full-Stack & Applied AI"
    },
    {
      icon: <TrendingUp size={20} className="text-emerald-400" />,
      number: "28.4%",
      label: "RMSE Error Reduction",
      meta: "Empirical gain vs baseline LSTM",
      tag: "Holdout Validated"
    }
  ];

  return (
    <div className="bg-paper-900 border-b border-paper-700/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-on-scroll reveal-stagger">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col p-4 rounded-lg bg-paper-850 border border-paper-750/80 hover-card-elevate apple-card transition-all group cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded bg-paper-900 border border-paper-700/80 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </span>
                <span className="font-mono text-[10px] text-slate-400 tracking-wider uppercase bg-paper-900 px-2 py-0.5 rounded border border-paper-750 group-hover:border-slate-600 transition-colors">
                  {stat.tag}
                </span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-patent-light transition-colors">
                {stat.number}
              </div>
              <div className="font-medium text-sm text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="font-mono text-xs text-slate-400 mt-0.5">
                {stat.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
