import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience({ experienceData }) {
  const experiences = experienceData || [
    {
      id: "maincrafts",
      role: "MERN Stack Developer Intern",
      company: "Main Crafts Technology",
      location: "Nagpur, Maharashtra",
      period: "May 2026 – Jun 2026",
      isRecent: true,
      description: "Developed production full-stack web applications utilizing the MERN stack (React.js, Node.js, Express.js, MongoDB), delivering seamless user interfaces backed by persistent database storage.",
      bullets: [
        "Developed MERN-stack web applications using React.js, Node.js, Express.js, and MongoDB, integrating frontend, backend, and persistent storage for 4 CRUD operations: create, read, update, and delete.",
        "Implemented 2 task-management workflows for creating and viewing tasks, integrating the user interface with backend application data.",
        "Architected clean REST API controllers and Mongoose schemas with data validation and error handling.",
        "Optimized frontend re-renders and client-side state handling to ensure responsive user experiences."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JavaScript"]
    },
    {
      id: "kodbud",
      role: "Python Developer Virtual Intern",
      company: "Kodbud",
      location: "Remote",
      period: "Mar 2026",
      isRecent: false,
      description: "Applied structured programming and algorithmic problem solving in Python for real-world software assignments.",
      bullets: [
        "Wrote Python programs for structured programming exercises and application-focused internship assignments.",
        "Implemented modular functions, data manipulation pipelines, and file processing routines.",
        "Practiced clean coding standards, algorithmic optimization, and test-driven validation."
      ],
      technologies: ["Python", "Algorithms", "Object-Oriented Programming", "Data Structures"]
    },
    {
      id: "servicenow",
      role: "ServiceNow Virtual Intern",
      company: "ServiceNow",
      location: "Remote",
      period: "Jun 2025 – Jul 2025",
      isRecent: false,
      description: "Trained in enterprise-level digital workflow automation, ITSM lifecycle processes, and cloud platform development.",
      bullets: [
        "Trained in ServiceNow enterprise workflows and application development through guided platform modules.",
        "Explored automated workflows, business rules, client scripts, and system customization.",
        "Gained comprehensive understanding of enterprise IT service management (ITSM) and modern business process engineering."
      ],
      technologies: ["ServiceNow Platform", "ITSM Workflows", "Enterprise Scripting", "Cloud Architecture"]
    },
    {
      id: "kelicalix",
      role: "Frontend Developer",
      company: "Kelicalix Technologies",
      location: "Maharashtra, India",
      period: "Feb 2025 – May 2025",
      isRecent: false,
      description: "Built responsive, accessible user interfaces and modern web layouts focusing on cross-device performance.",
      bullets: [
        "Applied responsive web design principles while contributing to frontend layouts and user interface (UI) elements.",
        "Collaborated with engineering peers to translate design wireframes into clean, accessible web components.",
        "Ensured seamless cross-browser layout consistency and mobile viewport compatibility."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-28 bg-paper-900 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-800 border border-paper-750 text-xs font-mono text-slate-300 mb-3">
            <Briefcase size={13} className="text-patent-amber" />
            <span>Professional Experience & Industry Positions</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-patent-amber">Trajectory</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Hands-on internships building full-stack MERN software, structured Python algorithms, enterprise automation, and frontend interfaces.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 max-w-4xl reveal-stagger">
          {experiences.map((exp, idx) => (
            <div 
              key={exp.id || idx}
              className={`p-6 rounded-xl bg-paper-850 border hover-card-elevate apple-card reveal-on-scroll transition-all group ${
                exp.isRecent 
                  ? 'border-patent-amber/40 shadow-[0_0_15px_rgba(217,155,38,0.06)]' 
                  : 'border-paper-750'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-paper-750 mb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-patent-light transition-colors">
                      {exp.role}
                    </h3>
                    {exp.isRecent && (
                      <span className="font-mono text-[10px] text-patent-amber bg-patent-amber/10 px-2 py-0.5 rounded border border-patent-amber/30 uppercase pulse-patent">
                        Featured Internship
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span className="text-slate-200 font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {exp.location}</span>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 bg-paper-900 px-3 py-1 rounded border border-paper-750 self-start sm:self-center flex items-center gap-1.5">
                  <Calendar size={12} className="text-patent-amber" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                {exp.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 mb-4">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-patent-amber mt-1 flex-shrink-0 font-mono text-xs">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-paper-750/80">
                {exp.technologies.map((t, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2 py-0.5 rounded bg-paper-900 border border-paper-750 text-[11px] font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
