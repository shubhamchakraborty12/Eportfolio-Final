import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Menu, 
  X, 
  Award,
  BookOpen,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Navbar({ onOpenResume, serverOnline }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'patent', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + 180;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Patent Research', href: '#patent' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-paper-950/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-3' 
        : 'bg-transparent border-b border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group text-slate-100 no-underline">
          <div className="w-9 h-9 rounded-md bg-paper-850 border border-patent-amber/40 flex items-center justify-center font-mono font-bold text-sm text-patent-amber shadow-sm group-hover:border-patent-amber group-hover:scale-105 transition-all">
            SC
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-base tracking-tight text-white group-hover:text-patent-light transition-colors">
              Shubham Chakraborty
            </span>
            <span className="font-mono text-[11px] text-slate-400 tracking-wider flex items-center gap-1.5">
              <span>MERN & AI Researcher</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-tight transition-all duration-200 py-1 ${
                  isActive 
                    ? 'text-patent-amber font-semibold border-b-2 border-patent-amber' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/shubhamchakraborty12"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded border border-paper-700 bg-paper-850/80 hover:bg-paper-800 hover:border-slate-500 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            title="GitHub Repositories"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>

          <a
            href="https://www.linkedin.com/in/shubham-chakraborty-76364a31a"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded border border-paper-700 bg-paper-850/80 hover:bg-paper-800 hover:border-slate-500 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-patent-amber/50 bg-patent-amber/10 hover:bg-patent-amber/20 text-patent-amber text-xs font-mono font-medium tracking-wide transition-all btn-shimmer hover:scale-105 active:scale-95 shadow-sm"
          >
            <FileText size={13} />
            <span>Curriculum Vitae</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded text-slate-400 hover:text-white hover:bg-paper-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-900 border-b border-paper-700 px-4 pt-3 pb-5 flex flex-col gap-2 mt-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded text-sm text-slate-300 hover:bg-paper-800 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-paper-700 mt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-patent-amber/40 bg-patent-amber/10 text-patent-amber text-xs font-mono font-medium"
            >
              <FileText size={14} /> View Formatted Curriculum Vitae
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
