import React, { useState } from 'react';
import { WindowsExplorerIcon, Github } from '../Icons';
import fileExplorerIconImg from '../../assets/File Explorer Icon.png';
import { 
  Folder, 
  Search, 
  ExternalLink, 
  Maximize2, 
  Code2, 
  ShieldAlert, 
  Award, 
  ArrowLeft, 
  ArrowRight,
  HardDrive,
  Library
} from 'lucide-react';

export default function ProjectsExplorer({ projectsData, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const projects = projectsData || [];

  const categories = [
    { id: 'all', label: 'All Projects (6)' },
    { id: 'AI/ML', label: 'AI/ML & Forecasting (2)' },
    { id: 'Full-Stack & AI', label: 'Full-Stack & SOC (1)' },
    { id: 'Web Development', label: 'Web & MERN (3)' }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="explorer-app">
      {/* Windows Explorer Navigation Bar */}
      <div className="explorer-nav-bar">
        <div style={{ display: 'flex', gap: '4px' }}>
          <button style={{ width: '24px', height: '22px', border: '1px solid #a0b4c8', borderRadius: '3px', background: '#f5f5f5', cursor: 'pointer' }}>
            <ArrowLeft size={13} color="#555" />
          </button>
          <button style={{ width: '24px', height: '22px', border: '1px solid #a0b4c8', borderRadius: '3px', background: '#f5f5f5', cursor: 'pointer' }}>
            <ArrowRight size={13} color="#888" />
          </button>
        </div>

        {/* Breadcrumb Address Bar */}
        <div className="explorer-address-bar">
          <img src={fileExplorerIconImg} alt="File Explorer" style={{ width: 14, height: 14, objectFit: 'contain', marginRight: '6px' }} draggable={false} />
          <span>This PC</span>
          <span style={{ margin: '0 4px', color: '#888' }}>&gt;</span>
          <span>Local Disk (C:)</span>
          <span style={{ margin: '0 4px', color: '#888' }}>&gt;</span>
          <span>Shubham</span>
          <span style={{ margin: '0 4px', color: '#888' }}>&gt;</span>
          <span style={{ fontWeight: 'bold' }}>File Explorer Projects</span>
        </div>

        {/* Explorer Search Box */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="explorer-search-input"
          />
          <Search size={13} color="#888" style={{ position: 'absolute', right: '6px' }} />
        </div>
      </div>

      {/* Command Bar */}
      <div className="explorer-command-bar">
        <span style={{ fontWeight: '600', color: '#1e3a5f' }}>Organize</span>
        <span style={{ color: '#ccc' }}>|</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>Include in Library</span>
        <span style={{ color: '#ccc' }}>|</span>
        <span style={{ color: '#666' }}>Active Directory: /shubham/portfolio/projects</span>
      </div>

      {/* Explorer Body: Sidebar + Main Area */}
      <div className="explorer-body">
        {/* Left Sidebar Tree */}
        <div className="explorer-sidebar">
          <div className="sidebar-category-title">Favorites</div>
          <div className="sidebar-tree-item" onClick={() => setActiveCategory('all')}>
            <Library size={14} color="#f39c12" />
            <span>All Projects</span>
          </div>

          <div className="sidebar-category-title">Categories</div>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`sidebar-tree-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Folder size={14} color="#f1c40f" />
              <span style={{ fontSize: '11px' }}>{cat.label}</span>
            </div>
          ))}

          <div className="sidebar-category-title" style={{ marginTop: '16px' }}>Network &amp; Repositories</div>
          <a 
            href="https://github.com/shubhamchakraborty12" 
            target="_blank" 
            rel="noreferrer" 
            className="sidebar-tree-item"
            style={{ textDecoration: 'none', color: '#0055aa' }}
          >
            <Github size={14} />
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Right Main File Grid View */}
        <div className="explorer-files-view">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '14px' }}>
            {filteredProjects.map(project => {
              const isSelected = selectedProjectId === project.id;
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  style={{
                    background: isSelected ? '#e5f3ff' : '#ffffff',
                    border: isSelected ? '1px solid #70c0ff' : '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 0 6px rgba(100,180,255,0.4)' : '0 1px 3px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div>
                    {/* Header with Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 'bold', 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        background: project.badge.includes('Patent') ? '#fef3c7' : '#e0e7ff',
                        color: project.badge.includes('Patent') ? '#b45309' : '#3730a3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {project.badge.includes('Patent') ? <Award size={11} /> : <ShieldAlert size={11} />}
                        <span>{project.badge}</span>
                      </span>

                      <button 
                        onClick={(e) => { e.stopPropagation(); onSelectProject(project); }}
                        title="View Architecture Deep-Dive"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }}
                      >
                        <Maximize2 size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a365d', marginBottom: '5px' }}>
                      {project.title}
                    </h4>

                    <p style={{ fontSize: '11px', color: '#4a5568', lineHeight: '1.45', marginBottom: '10px' }}>
                      {project.shortDesc}
                    </p>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {project.tech.map((t, idx) => (
                        <span 
                          key={idx} 
                          style={{ fontSize: '10px', background: '#edf2f7', color: '#4a5568', padding: '1px 5px', borderRadius: '2px', border: '1px solid #e2e8f0' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '5px', 
                        padding: '4px 8px', 
                        border: '1px solid #cbd5e1', 
                        borderRadius: '3px', 
                        background: '#f8fafc', 
                        fontSize: '11px', 
                        color: '#334155', 
                        textDecoration: 'none' 
                      }}
                    >
                      <Github size={12} />
                      <span>Repository</span>
                    </a>

                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectProject(project); }}
                      style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '5px', 
                        padding: '4px 8px', 
                        border: '1px solid #d99b26', 
                        borderRadius: '3px', 
                        background: '#fffbeb', 
                        fontSize: '11px', 
                        color: '#92400e', 
                        fontWeight: '600',
                        cursor: 'pointer' 
                      }}
                    >
                      <Maximize2 size={12} />
                      <span>Architecture</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explorer Status Bar */}
      <div style={{ background: '#f5f6f7', borderTop: '1px solid #d9d9d9', padding: '3px 12px', fontSize: '11px', color: '#666', display: 'flex', justifyContent: 'space-between' }}>
        <span>{filteredProjects.length} items</span>
        <span>{selectedProjectId ? '1 item selected' : 'State: Ready'}</span>
      </div>
    </div>
  );
}
