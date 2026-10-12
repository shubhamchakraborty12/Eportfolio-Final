import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Win7 Authentic Icons
import {
  StartOrbLogo,
  AdobeReaderIcon,
  MyComputerIcon,
  WindowsExplorerIcon,
  PatentSealIcon,
  ControlPanelIcon,
  CmdIcon,
  WindowsLiveMailIcon,
  EventViewerIcon,
  RecycleBinIcon,
  SnippingToolIcon,
  PaintIcon,
  AudioWaveIcon,
  GoogleTalkIcon,
  LiveMessengerIcon,
  NetworkHubIcon,
  ExcelIcon,
  StickyNotesIcon,
  OneNoteIcon,
  HelpGuideIcon,
  SearchFolderIcon,
  Github,
  Linkedin
} from './components/Icons';

// Lucide Icons for Tray & Menu
import {
  Wifi,
  Volume2,
  VolumeX,
  ChevronUp,
  Search,
  Power,
  RefreshCw,
  Folder,
  FileText,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Monitor,
  ShieldCheck,
  ShieldAlert,
  BatteryCharging,
  Flag,
  RotateCw
} from 'lucide-react';

// Dedicated Windows 7 Applications
import AdobePdfViewer from './components/win7/AdobePdfViewer';
import ProjectsExplorer from './components/win7/ProjectsExplorer';
import PatentViewer from './components/win7/PatentViewer';
import ControlPanelSkills from './components/win7/ControlPanelSkills';
import EventViewerExperience from './components/win7/EventViewerExperience';
import SystemProperties from './components/win7/SystemProperties';
import WindowsLiveMail from './components/win7/WindowsLiveMail';
import CmdTerminal from './components/win7/CmdTerminal';
import PaintApp from './components/win7/PaintApp';
import ExcelViewer from './components/win7/ExcelViewer';
import StickyNotesApp from './components/win7/StickyNotesApp';
import SnippingToolApp from './components/win7/SnippingToolApp';
import MediaPlayerApp from './components/win7/MediaPlayerApp';
import MessengerApp from './components/win7/MessengerApp';
import HelpSupportApp from './components/win7/HelpSupportApp';

// Custom Requested App Icons & Wallpaper
import fileExplorerIconImg from './assets/File Explorer Icon.png';
import thisPcIconImg from './assets/This pc icon.png';
import recycleBinIconImg from './assets/Recycle bin icon.png';
import pdfViewerIconImg from './assets/PDF Viewer icon.png';
import controlPanelIconImg from './assets/Control Panel icon.png';
import windows7WallpaperImg from './assets/Windows 7 wallpaper.jpg';

const ControlPanelAppIcon = ({ size = 32 }) => (
  <img
    src={controlPanelIconImg}
    alt="Control Panel"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
    }}
    draggable={false}
  />
);

const FileExplorerAppIcon = ({ size = 32 }) => (
  <img
    src={fileExplorerIconImg}
    alt="File Explorer Projects"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
    }}
    draggable={false}
  />
);

const ThisPcAppIcon = ({ size = 32 }) => (
  <img
    src={thisPcIconImg}
    alt="This PC"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
    }}
    draggable={false}
  />
);

const RecycleBinAppIcon = ({ size = 32 }) => (
  <img
    src={recycleBinIconImg}
    alt="Recycle Bin"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
    }}
    draggable={false}
  />
);

const PdfViewerAppIcon = ({ size = 32 }) => (
  <img
    src={pdfViewerIconImg}
    alt="PDF Viewer"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
    }}
    draggable={false}
  />
);

export default function App() {
  // 1. Dynamic Portfolio Data from MongoDB / Express Backend
  const [portfolioData, setPortfolioData] = useState(null);
  const [serverOnline, setServerOnline] = useState(true);

  // 2. Windows 7 Desktop State
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState('resume');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [startSearch, setStartSearch] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [calendarFlyoutOpen, setCalendarFlyoutOpen] = useState(false);
  const [trayOverflowOpen, setTrayOverflowOpen] = useState(false);
  const [volumePopupOpen, setVolumePopupOpen] = useState(false);
  const [masterVolume, setMasterVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Default authentic Windows 7 layout grid for desktop icons
  const DEFAULT_ICON_POSITIONS = {
    resume: { x: 18, y: 15 },
    projects: { x: 18, y: 110 },
    system: { x: 18, y: 205 },
    skills: { x: 18, y: 300 },
    patent: { x: 18, y: 395 },
    experience: { x: 18, y: 490 },
    recycleBin: { x: 115, y: 15 },
    mail: { x: 115, y: 110 },
    cmd: { x: 115, y: 205 },
    excel: { x: 115, y: 300 }
  };

  const [iconPositions, setIconPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('win7_desktop_icon_positions');
      if (saved) {
        return { ...DEFAULT_ICON_POSITIONS, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return DEFAULT_ICON_POSITIONS;
  });

  const [draggingIcon, setDraggingIcon] = useState(null);
  const hasDraggedIconRef = useRef(false);

  const handleIconMouseDown = (e, iconId) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setSelectedDesktopIcon(iconId);
    hasDraggedIconRef.current = false;

    const currentPos = iconPositions[iconId] || DEFAULT_ICON_POSITIONS[iconId] || { x: 18, y: 15 };
    setDraggingIcon({
      id: iconId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      initX: currentPos.x,
      initY: currentPos.y,
      currentX: currentPos.x,
      currentY: currentPos.y,
      moved: false
    });
  };

  // 3. Window Management State
  const [activeWindowId, setActiveWindowId] = useState('resume');
  const [highestZ, setHighestZ] = useState(100);

  // Window drag tracking
  const [dragState, setDragState] = useState(null);

  // Google Drive Resume Link provided by user
  const googleDriveResumeLink = 'https://drive.google.com/file/d/1X8ggVTeTS9EBGWd3W3z8usVZlwnDx2Qv/view?usp=sharing';

  // Window definitions
  const initialWindows = {
    resume: {
      id: 'resume',
      title: 'PDF Viewer - [Resume Google Drive Document]',
      Icon: PdfViewerAppIcon,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 140,
      y: 35,
      width: 840,
      height: 560,
      zIndex: 100
    },
    projects: {
      id: 'projects',
      title: 'File Explorer Projects - Local Disk (C:) > Shubham > Projects',
      Icon: FileExplorerAppIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 170,
      y: 50,
      width: 860,
      height: 540,
      zIndex: 90
    },
    patent: {
      id: 'patent',
      title: 'Patent Gazette - Indian Patent Application 202521127184 A',
      Icon: PatentSealIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 190,
      y: 65,
      width: 800,
      height: 540,
      zIndex: 90
    },
    skills: {
      id: 'skills',
      title: 'Control Panel > All Control Panel Items > Technical Competencies',
      Icon: ControlPanelAppIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 210,
      y: 75,
      width: 820,
      height: 530,
      zIndex: 90
    },
    experience: {
      id: 'experience',
      title: 'Event Viewer (Local) > Windows Logs > Career History',
      Icon: EventViewerIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 160,
      y: 45,
      width: 850,
      height: 530,
      zIndex: 90
    },
    system: {
      id: 'system',
      title: 'This PC - System Properties',
      Icon: ThisPcAppIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 230,
      y: 85,
      width: 740,
      height: 520,
      zIndex: 90
    },
    mail: {
      id: 'mail',
      title: 'Windows Live Mail - Message Composer to Shubham',
      Icon: WindowsLiveMailIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 250,
      y: 75,
      width: 680,
      height: 510,
      zIndex: 90
    },
    cmd: {
      id: 'cmd',
      title: 'Command Prompt - cmd.exe',
      Icon: CmdIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 270,
      y: 100,
      width: 720,
      height: 440,
      zIndex: 90
    },
    recycleBin: {
      id: 'recycleBin',
      title: 'Recycle Bin',
      Icon: RecycleBinAppIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 310,
      y: 110,
      width: 600,
      height: 380,
      zIndex: 90
    },
    paint: {
      id: 'paint',
      title: 'untitled - Paint',
      Icon: PaintIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 70,
      width: 720,
      height: 500,
      zIndex: 90
    },
    excel: {
      id: 'excel',
      title: 'Microsoft Excel - [Project_Metrics_2026.xlsx]',
      Icon: ExcelIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 190,
      y: 60,
      width: 820,
      height: 510,
      zIndex: 90
    },
    notes: {
      id: 'notes',
      title: 'Sticky Note',
      Icon: StickyNotesIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 320,
      y: 120,
      width: 320,
      height: 360,
      zIndex: 95
    },
    snipping: {
      id: 'snipping',
      title: 'Snipping Tool',
      Icon: SnippingToolIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 260,
      y: 140,
      width: 440,
      height: 290,
      zIndex: 95
    },
    media: {
      id: 'media',
      title: 'Windows Media Player',
      Icon: AudioWaveIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 230,
      y: 80,
      width: 540,
      height: 420,
      zIndex: 90
    },
    messenger: {
      id: 'messenger',
      title: 'Windows Live Messenger - Shubham Chakraborty (Online)',
      Icon: LiveMessengerIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 250,
      y: 70,
      width: 520,
      height: 480,
      zIndex: 95
    },
    help: {
      id: 'help',
      title: 'Windows Help and Support',
      Icon: HelpGuideIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 220,
      y: 60,
      width: 660,
      height: 500,
      zIndex: 90
    }
  };

  const [windows, setWindows] = useState(initialWindows);

  // Recycle Bin items
  const [recycledFiles, setRecycledFiles] = useState([
    { name: 'Legacy_Tailwind_CSS_Rules.css', size: '42 KB', deleted: '10/12/2026' },
    { name: 'Hardcoded_Data_v1.json', size: '18 KB', deleted: '10/12/2026' },
    { name: 'Old_Static_Portfolio_Mockup.png', size: '1.4 MB', deleted: '10/12/2026' }
  ]);

  // Fetch portfolio data from Express/MongoDB API
  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      if (data.success) {
        setPortfolioData(data.data);
      }
    } catch (err) {
      console.warn('API fetch warning:', err.message);
    }
  };

  useEffect(() => {
    fetchPortfolio();

    // Check server health
    fetch('/api/health')
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          setServerOnline(true);
        }
      })
      .catch(() => setServerOnline(false));

    // Real-time taskbar clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Global Mouse Listeners for Window Dragging & Desktop Icon Dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      // 1. Window dragging
      if (dragState) {
        const deltaX = e.clientX - dragState.startX;
        const deltaY = e.clientY - dragState.startY;

        setWindows(prev => {
          const win = prev[dragState.winId];
          if (!win) return prev;

          const newX = Math.max(0, Math.min(window.innerWidth - 100, dragState.initX + deltaX));
          const newY = Math.max(0, Math.min(window.innerHeight - 80, dragState.initY + deltaY));

          return {
            ...prev,
            [dragState.winId]: {
              ...win,
              x: newX,
              y: newY
            }
          };
        });
      }

      // 2. Desktop icon dragging
      if (draggingIcon) {
        const deltaX = e.clientX - draggingIcon.startMouseX;
        const deltaY = e.clientY - draggingIcon.startMouseY;

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          hasDraggedIconRef.current = true;
        }

        const newX = Math.max(0, Math.min(window.innerWidth - 88, draggingIcon.initX + deltaX));
        const newY = Math.max(0, Math.min(window.innerHeight - 110, draggingIcon.initY + deltaY));

        setDraggingIcon(prev => prev ? {
          ...prev,
          currentX: newX,
          currentY: newY,
          moved: true
        } : null);
      }
    };

    const handleMouseUp = () => {
      if (dragState) {
        setDragState(null);
      }
      if (draggingIcon) {
        if (hasDraggedIconRef.current) {
          const finalPos = {
            x: Math.round(draggingIcon.currentX),
            y: Math.round(draggingIcon.currentY)
          };
          setIconPositions(prev => {
            const nextPositions = {
              ...prev,
              [draggingIcon.id]: finalPos
            };
            try {
              localStorage.setItem('win7_desktop_icon_positions', JSON.stringify(nextPositions));
            } catch (err) {}
            return nextPositions;
          });
        }
        setDraggingIcon(null);
      }
    };

    if (dragState || draggingIcon) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, draggingIcon]);

  // Window Management Actions
  const bringToFront = (winId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(winId);

    setWindows(prev => ({
      ...prev,
      [winId]: {
        ...prev[winId],
        zIndex: nextZ,
        isMinimized: false
      }
    }));
  };

  const openApp = (winId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(winId);
    setStartMenuOpen(false);

    setWindows(prev => ({
      ...prev,
      [winId]: {
        ...prev[winId],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  const closeApp = (winId) => {
    setWindows(prev => ({
      ...prev,
      [winId]: {
        ...prev[winId],
        isOpen: false
      }
    }));

    if (activeWindowId === winId) {
      const openRemaining = Object.values(windows).filter(w => w.id !== winId && w.isOpen && !w.isMinimized);
      if (openRemaining.length > 0) {
        const top = openRemaining.sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const toggleMinimize = (winId) => {
    setWindows(prev => {
      const win = prev[winId];
      if (!win) return prev;
      const isCurrentlyMinimized = win.isMinimized;
      const isCurrentlyActive = activeWindowId === winId;

      if (!isCurrentlyMinimized && isCurrentlyActive) {
        return {
          ...prev,
          [winId]: { ...win, isMinimized: true }
        };
      } else {
        const nextZ = highestZ + 1;
        setHighestZ(nextZ);
        setActiveWindowId(winId);
        return {
          ...prev,
          [winId]: { ...win, isMinimized: false, zIndex: nextZ }
        };
      }
    });
  };

  const toggleMaximize = (winId) => {
    setWindows(prev => ({
      ...prev,
      [winId]: {
        ...prev[winId],
        isMaximized: !prev[winId].isMaximized
      }
    }));
  };

  const startDragging = (e, winId) => {
    if (windows[winId].isMaximized) return;
    bringToFront(winId);
    setDragState({
      winId,
      startX: e.clientX,
      startY: e.clientY,
      initX: windows[winId].x,
      initY: windows[winId].y
    });
  };

  // Show Desktop (Peek)
  const toggleShowDesktop = () => {
    const hasVisible = Object.values(windows).some(w => w.isOpen && !w.isMinimized);
    setWindows(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(k => {
        if (updated[k].isOpen) {
          updated[k].isMinimized = hasVisible;
        }
      });
      return updated;
    });
  };

  // Right-click context menu on desktop
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 180),
      y: Math.min(e.clientY, window.innerHeight - 200)
    });
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
    setCalendarFlyoutOpen(false);
    setVolumePopupOpen(false);
    setTrayOverflowOpen(false);
  };

  // Desktop Icons Configuration
  const desktopIcons = [
    { id: 'resume', title: 'PDF Viewer\n(Resume.pdf)', Icon: PdfViewerAppIcon, isShortcut: true },
    { id: 'projects', title: 'File Explorer\nProjects', Icon: FileExplorerAppIcon, isShortcut: true },
    { id: 'patent', title: 'Patent\nGazette', Icon: PatentSealIcon, isShortcut: true },
    { id: 'skills', title: 'Control Panel\n(Skills)', Icon: ControlPanelAppIcon, isShortcut: false },
    { id: 'experience', title: 'Event Viewer\n(Career)', Icon: EventViewerIcon, isShortcut: true },
    { id: 'system', title: 'This PC', Icon: ThisPcAppIcon, isShortcut: false },
    { id: 'mail', title: 'Windows Live\nMail', Icon: WindowsLiveMailIcon, isShortcut: true },
    { id: 'cmd', title: 'Command\nPrompt', Icon: CmdIcon, isShortcut: true },
    { id: 'recycleBin', title: 'Recycle\nBin', Icon: RecycleBinAppIcon, isShortcut: false },
    { id: 'excel', title: 'Project\nMetrics.xlsx', Icon: ExcelIcon, isShortcut: true }
  ];

  // Exact Replica Taskbar Items matching user's image in sequence from left to right:
  const taskbarReplicaApps = [
    { id: 'projects', title: 'File Explorer Projects', Icon: FileExplorerAppIcon },
    { id: 'snipping', title: 'Snipping Tool', Icon: SnippingToolIcon },
    { id: 'paint', title: 'Paint', Icon: PaintIcon },
    { id: 'media', title: 'Audio / Media Player', Icon: AudioWaveIcon },
    { id: 'messenger', title: 'Google Talk', Icon: GoogleTalkIcon },
    { id: 'messenger', title: 'Windows Live Messenger', Icon: LiveMessengerIcon },
    { id: 'system', title: 'This PC', Icon: ThisPcAppIcon },
    { id: 'excel', title: 'Microsoft Excel', Icon: ExcelIcon },
    { id: 'notes', title: 'Sticky Notes', Icon: StickyNotesIcon },
    { id: 'patent', title: 'Microsoft OneNote', Icon: OneNoteIcon },
    { id: 'help', title: 'Help and Support', Icon: HelpGuideIcon },
    { id: 'cmd', title: 'Search / CMD', Icon: SearchFolderIcon },
    { id: 'resume', title: 'PDF Viewer', Icon: PdfViewerAppIcon }
  ];

  // Start menu programs list (filtered by live search)
  const startPrograms = [
    { id: 'resume', name: 'PDF Viewer (Resume Document)', desc: 'Shubham chakraborty resume updated-6.pdf', Icon: PdfViewerAppIcon },
    { id: 'projects', name: 'File Explorer Projects', desc: 'Browse full-stack and AI repositories', Icon: FileExplorerAppIcon },
    { id: 'patent', name: 'Indian Patent Gazette', desc: 'Hybrid AI Time-Series Forecaster (202521127184 A)', Icon: PatentSealIcon },
    { id: 'skills', name: 'Control Panel (Technical Skills)', desc: 'Inspect programming and MERN competencies', Icon: ControlPanelAppIcon },
    { id: 'excel', name: 'Microsoft Excel (Metrics)', desc: 'Project_Metrics_2026.xlsx benchmark formulas', Icon: ExcelIcon },
    { id: 'paint', name: 'Paint', desc: 'Create drawings and system architecture sketches', Icon: PaintIcon },
    { id: 'notes', name: 'Sticky Notes', desc: 'Quick candidate highlights and achievements', Icon: StickyNotesIcon },
    { id: 'experience', name: 'Event Viewer (Career Logs)', desc: 'Review internships, roles, and milestones', Icon: EventViewerIcon },
    { id: 'system', name: 'This PC (System Properties)', desc: 'View computer specifications and hardware ratings', Icon: ThisPcAppIcon },
    { id: 'mail', name: 'Windows Live Mail', desc: 'Compose direct message & send email to Shubham', Icon: WindowsLiveMailIcon },
    { id: 'media', name: 'Windows Media Player', desc: 'Windows 7 Harmony audio player & visualizer', Icon: AudioWaveIcon },
    { id: 'cmd', name: 'Command Prompt (cmd.exe)', desc: 'Interactive console with terminal commands', Icon: CmdIcon }
  ].filter(p => 
    p.name.toLowerCase().includes(startSearch.toLowerCase()) || 
    p.desc.toLowerCase().includes(startSearch.toLowerCase())
  );

  return (
    <div 
      className="win7-desktop" 
      style={{
        backgroundImage: `url("${windows7WallpaperImg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* --------------------------------------------------------------------
          1. DRAGGABLE DESKTOP ICONS GRID (Windows 7 Free Drag & Placement)
          -------------------------------------------------------------------- */}
      <div className="desktop-icons-area" onClick={(e) => e.stopPropagation()}>
        {desktopIcons.map(iconItem => {
          const isSelected = selectedDesktopIcon === iconItem.id;
          const isDraggingThis = draggingIcon?.id === iconItem.id;
          const pos = isDraggingThis
            ? { x: draggingIcon.currentX, y: draggingIcon.currentY }
            : (iconPositions[iconItem.id] || DEFAULT_ICON_POSITIONS[iconItem.id] || { x: 18, y: 15 });
          const IconComp = iconItem.Icon;
          const isRecycle = iconItem.id === 'recycleBin';
          const isControlPanel = iconItem.id === 'skills';
          const isLargeIcon = isRecycle || isControlPanel;

          return (
            <div
              key={iconItem.id}
              className={`desktop-icon-item ${isSelected ? 'selected' : ''} ${isDraggingThis ? 'dragging' : ''}`}
              style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                zIndex: isDraggingThis ? 1000 : 10,
                cursor: isDraggingThis ? 'grabbing' : 'pointer',
                userSelect: 'none',
                width: isLargeIcon ? '88px' : '82px',
                transition: isDraggingThis ? 'none' : 'box-shadow 0.15s ease, background 0.15s ease'
              }}
              onMouseDown={(e) => handleIconMouseDown(e, iconItem.id)}
              onClick={(e) => {
                e.stopPropagation();
                if (hasDraggedIconRef.current) return;
                setSelectedDesktopIcon(iconItem.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openApp(iconItem.id);
                if (iconItem.id === 'resume') {
                  window.open(googleDriveResumeLink, '_blank');
                }
              }}
            >
              <div className="desktop-icon-graphic" style={{ position: 'relative' }}>
                <IconComp size={isControlPanel ? 60 : isRecycle ? 58 : 42} />
                {iconItem.isShortcut && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '1px',
                      left: '2px',
                      width: '11px',
                      height: '11px',
                      background: '#ffffff',
                      border: '1px solid #7c94b2',
                      borderRadius: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.4)'
                    }}
                    title="Shortcut"
                  >
                    <svg width="7" height="7" viewBox="0 0 10 10">
                      <path d="M1 9 L9 1 M9 1 L9 5" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="desktop-icon-title" style={{ whiteSpace: 'pre-line' }}>
                {iconItem.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* --------------------------------------------------------------------
          2. ACTIVE WINDOWS
          -------------------------------------------------------------------- */}
      {Object.values(windows).map(win => {
        if (!win.isOpen || win.isMinimized) return null;

        const isActive = activeWindowId === win.id;
        const IconComp = win.Icon;

        const windowStyle = win.isMaximized
          ? {
              top: 0,
              left: 0,
              width: '100vw',
              height: 'calc(100vh - 40px)',
              zIndex: win.zIndex,
              borderRadius: 0
            }
          : {
              top: `${win.y}px`,
              left: `${win.x}px`,
              width: `${win.width}px`,
              height: `${win.height}px`,
              zIndex: win.zIndex
            };

        return (
          <div
            key={win.id}
            className={`win7-window ${isActive ? 'active-window' : ''}`}
            style={windowStyle}
            onMouseDown={() => bringToFront(win.id)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Aero Glass Titlebar */}
            <div
              className="aero-titlebar"
              onMouseDown={(e) => startDragging(e, win.id)}
              onDoubleClick={() => toggleMaximize(win.id)}
            >
              <div className="titlebar-content">
                <div className="titlebar-icon">
                  <IconComp size={16} />
                </div>
                <span className="titlebar-title">{win.title}</span>
              </div>

              {/* Windows 7 Window Controls (Min, Max, Close) */}
              <div className="window-controls" onMouseDown={(e) => e.stopPropagation()}>
                <button
                  className="win-btn win-btn-minimize"
                  title="Minimize"
                  onClick={() => toggleMinimize(win.id)}
                >
                  <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '-4px' }}>_</span>
                </button>
                <button
                  className="win-btn win-btn-maximize"
                  title={win.isMaximized ? "Restore Down" : "Maximize"}
                  onClick={() => toggleMaximize(win.id)}
                >
                  <span style={{ fontSize: '10px' }}>{win.isMaximized ? '❐' : '□'}</span>
                </button>
                <button
                  className="win-btn win-btn-close"
                  title="Close"
                  onClick={() => closeApp(win.id)}
                >
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>✕</span>
                </button>
              </div>
            </div>

            {/* Window Interior Content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {win.id === 'resume' && (
                <AdobePdfViewer
                  portfolioData={portfolioData}
                  onOpenContact={() => openApp('mail')}
                />
              )}

              {win.id === 'projects' && (
                <ProjectsExplorer
                  projectsData={portfolioData?.projects}
                  onSelectProject={() => {}}
                />
              )}

              {win.id === 'paint' && (
                <PaintApp />
              )}

              {win.id === 'excel' && (
                <ExcelViewer />
              )}

              {win.id === 'notes' && (
                <StickyNotesApp />
              )}

              {win.id === 'snipping' && (
                <SnippingToolApp />
              )}

              {win.id === 'media' && (
                <MediaPlayerApp />
              )}

              {win.id === 'messenger' && (
                <MessengerApp />
              )}

              {win.id === 'help' && (
                <HelpSupportApp onOpenApp={(appId) => openApp(appId)} />
              )}

              {win.id === 'patent' && (
                <PatentViewer patentData={portfolioData?.patent} />
              )}

              {win.id === 'skills' && (
                <ControlPanelSkills skillsData={portfolioData?.skills} />
              )}

              {win.id === 'experience' && (
                <EventViewerExperience experienceData={portfolioData?.experience} />
              )}

              {win.id === 'system' && (
                <SystemProperties
                  portfolioData={portfolioData}
                  onOpenResume={() => openApp('resume')}
                  onOpenPatent={() => openApp('patent')}
                />
              )}

              {win.id === 'mail' && (
                <WindowsLiveMail />
              )}

              {win.id === 'cmd' && (
                <CmdTerminal onLaunchApp={(targetApp) => openApp(targetApp)} />
              )}

              {win.id === 'recycleBin' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
                  <div style={{ padding: '8px 12px', background: '#f5f7fa', borderBottom: '1px solid #d9d9d9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RecycleBinAppIcon size={20} />
                      <span style={{ fontWeight: 'bold', color: '#1e395b' }}>Recycle Bin</span>
                    </div>
                    <button
                      onClick={() => setRecycledFiles([])}
                      style={{ padding: '3px 10px', fontSize: '11px', border: '1px solid #bbb', borderRadius: '3px', background: '#fff', cursor: 'pointer' }}
                    >
                      Empty Recycle Bin
                    </button>
                  </div>
                  <div style={{ flex: 1, padding: '14px', overflowY: 'auto' }}>
                    {recycledFiles.length > 0 ? (
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc', color: '#666' }}>
                            <th style={{ padding: '4px' }}>Name</th>
                            <th style={{ padding: '4px' }}>Original Location</th>
                            <th style={{ padding: '4px' }}>Date Deleted</th>
                            <th style={{ padding: '4px' }}>Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recycledFiles.map((f, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: '6px 4px', color: '#333', fontWeight: '500' }}>📄 {f.name}</td>
                              <td style={{ padding: '6px 4px', color: '#666' }}>C:\Portfolio\OldStyles</td>
                              <td style={{ padding: '6px 4px', color: '#666' }}>{f.deleted}</td>
                              <td style={{ padding: '6px 4px', color: '#666' }}>{f.size}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        This folder is empty.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* --------------------------------------------------------------------
          3. WINDOWS 7 START MENU (Two-Column Aero Glass)
          -------------------------------------------------------------------- */}
      {startMenuOpen && (
        <div className="win7-start-menu" onClick={(e) => e.stopPropagation()}>
          <div className="start-menu-columns">
            {/* Left Programs Column */}
            <div className="start-menu-left">
              <div className="start-programs-list">
                {startPrograms.map(prog => {
                  const IconC = prog.Icon;
                  return (
                    <div
                      key={prog.id}
                      className="start-program-item"
                      onClick={() => {
                        openApp(prog.id);
                        if (prog.id === 'resume') {
                          window.open(googleDriveResumeLink, '_blank');
                        }
                      }}
                    >
                      <IconC size={prog.id === 'skills' ? 30 : 26} />
                      <div className="start-program-info">
                        <span className="start-program-name">{prog.name}</span>
                        <span className="start-program-desc">{prog.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Search Box */}
              <div className="start-search-box">
                <Search size={14} color="#666" />
                <input
                  type="text"
                  className="start-search-input"
                  placeholder="Search programs and files"
                  value={startSearch}
                  onChange={(e) => setStartSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Right System & Links Column */}
            <div className="start-menu-right">
              <div>
                <div className="user-profile-header">
                  <img
                    src={portfolioData?.personal?.photo || '/shubham_portrait.jpg'}
                    alt="User"
                    className="user-profile-avatar"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="user-profile-name">
                    {portfolioData?.personal?.name || 'Shubham Chakraborty'}
                  </div>
                </div>

                <div className="start-right-links">
                  <span className="start-right-link" onClick={() => {
                    openApp('resume');
                    window.open(googleDriveResumeLink, '_blank');
                  }}>Documents (Resume)</span>
                  <span className="start-right-link" onClick={() => openApp('system')}>This PC</span>
                  <span className="start-right-link" onClick={() => openApp('projects')}>File Explorer Projects</span>
                  <span className="start-right-link" onClick={() => openApp('skills')}>Control Panel</span>
                  <span className="start-right-link" onClick={() => openApp('patent')}>Patent Gazette</span>
                  <span className="start-right-link" onClick={() => openApp('excel')}>Excel (Metrics)</span>
                  <span className="start-right-link" onClick={() => openApp('messenger')}>Windows Live Messenger</span>
                  <span className="start-right-link" onClick={() => openApp('cmd')}>Run (cmd.exe)</span>
                </div>
              </div>

              {/* Shut down button */}
              <div className="shutdown-btn-container">
                <button
                  className="shutdown-btn"
                  onClick={() => {
                    alert('Windows 7 Portfolio is fully operational. To restart sessions, refresh the browser window.');
                  }}
                >
                  <Power size={13} />
                  <span>Shut down</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          4. RIGHT-CLICK DESKTOP CONTEXT MENU
          -------------------------------------------------------------------- */}
      {contextMenu && (
        <div
          style={{
            position: 'absolute',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            background: '#f0f0f0',
            border: '1px solid #979797',
            borderRadius: '3px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            padding: '2px 0',
            zIndex: 20000,
            width: '180px',
            fontFamily: "'Segoe UI', Tahoma, sans-serif",
            fontSize: '11px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{ padding: '4px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => {
              fetchPortfolio();
              setContextMenu(null);
            }}
          >
            <RefreshCw size={12} />
            <span>Refresh (Refetch API)</span>
          </div>
          <div style={{ height: '1px', background: '#e0e0e0', margin: '2px 0' }} />
          <div
            style={{ padding: '4px 16px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => { openApp('resume'); setContextMenu(null); }}
          >
            Open Resume (PDF)
          </div>
          <div
            style={{ padding: '4px 16px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => { openApp('projects'); setContextMenu(null); }}
          >
            Open File Explorer Projects
          </div>
          <div
            style={{ padding: '4px 16px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => { openApp('paint'); setContextMenu(null); }}
          >
            Open MS Paint
          </div>
          <div style={{ height: '1px', background: '#e0e0e0', margin: '2px 0' }} />
          <div
            style={{ padding: '4px 16px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => {
              setIconPositions(DEFAULT_ICON_POSITIONS);
              try {
                localStorage.removeItem('win7_desktop_icon_positions');
              } catch (e) {}
              setContextMenu(null);
            }}
          >
            Auto-arrange desktop icons
          </div>
          <div
            style={{ padding: '4px 16px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5f3ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => { openApp('system'); setContextMenu(null); }}
          >
            Personalize / This PC
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          5. CALENDAR & CLOCK FLYOUT
          -------------------------------------------------------------------- */}
      {calendarFlyoutOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            right: '10px',
            width: '280px',
            background: 'rgba(235, 244, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(135, 206, 250, 0.8)',
            borderRadius: '6px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            padding: '14px',
            zIndex: 20000,
            fontFamily: "'Segoe UI', Tahoma, sans-serif"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a3c60' }}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div style={{ fontSize: '12px', color: '#0052cc', fontWeight: '600' }}>
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #c0d0e0', paddingTop: '10px', fontSize: '11px', color: '#444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Backend API:</span>
              <span style={{ color: serverOnline ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                {serverOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Email Service:</span>
              <span style={{ color: '#0078d7', fontWeight: 'bold' }}>Online (shubhamchakraborty0412@gmail.com)</span>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          6. VOLUME SLIDER POPUP FLYOUT
          -------------------------------------------------------------------- */}
      {volumePopupOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            right: '90px',
            width: '80px',
            height: '160px',
            background: 'rgba(235, 244, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(135, 206, 250, 0.8)',
            borderRadius: '5px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            padding: '12px 8px',
            zIndex: 20000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'Segoe UI', Tahoma, sans-serif",
            fontSize: '11px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontWeight: 'bold', color: '#1a3c60' }}>
            {isMuted ? 'Muted' : `${masterVolume}%`}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : masterVolume}
            onChange={(e) => {
              setMasterVolume(e.target.value);
              setIsMuted(false);
            }}
            style={{
              writingMode: 'bt-lr',
              WebkitAppearance: 'slider-vertical',
              height: '90px',
              width: '20px',
              accentColor: '#0078d7',
              cursor: 'pointer'
            }}
          />
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} color="#d9230f" /> : <Volume2 size={16} color="#1a3c60" />}
          </button>
        </div>
      )}

      {/* --------------------------------------------------------------------
          7. TRAY OVERFLOW ICONS POPUP (Chevron Click)
          -------------------------------------------------------------------- */}
      {trayOverflowOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            right: '180px',
            background: 'rgba(235, 244, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(135, 206, 250, 0.8)',
            borderRadius: '5px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
            padding: '10px 14px',
            zIndex: 20000,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            fontFamily: "'Segoe UI', Tahoma, sans-serif"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div title="Avast Antivirus Active" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <ShieldCheck size={20} color="#f59e0b" />
          </div>
          <div title="Windows Update: Up to date" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <RotateCw size={18} color="#2563eb" />
          </div>
          <div title="Email Dispatcher: Online (shubhamchakraborty0412@gmail.com)" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <Monitor size={18} color="#16a34a" />
          </div>
          <div title="Windows Firewall: On" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <ShieldAlert size={18} color="#dc2626" />
          </div>
          <div title="Battery: 100% Fully Charged" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <BatteryCharging size={18} color="#16a34a" />
          </div>
          <div title="Action Center: No issues detected" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <Flag size={18} color="#2563eb" />
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          8. EXACT REPLICA WINDOWS 7 TASKBAR / SUPERBAR
          -------------------------------------------------------------------- */}
      <div className="win7-taskbar" onClick={(e) => e.stopPropagation()}>
        {/* Leftmost: Glowing Start Orb Protruding ~5px above taskbar */}
        <div className="taskbar-left-zone">
          <div
            className="start-orb-wrapper"
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            title="Start"
          >
            <StartOrbLogo size={42} />
          </div>

          {/* Running & Pinned Apps matching exact sequence from user's image */}
          <div className="taskbar-apps-container">
            {taskbarReplicaApps.map((appItem, idx) => {
              const currentWin = windows[appItem.id];
              const isRunning = currentWin?.isOpen;
              const isActive = isRunning && activeWindowId === appItem.id && !currentWin?.isMinimized;
              const IconComp = appItem.Icon;

              return (
                <div
                  key={`${appItem.id}-${idx}`}
                  className={`taskbar-app-button ${isActive ? 'running-active' : isRunning ? 'running-minimized' : ''}`}
                  onClick={() => {
                    if (appItem.id === 'resume') {
                      openApp('resume');
                      window.open(googleDriveResumeLink, '_blank');
                    } else if (!currentWin || !currentWin.isOpen) {
                      openApp(appItem.id);
                    } else {
                      toggleMinimize(appItem.id);
                    }
                  }}
                  title={appItem.title}
                >
                  <IconComp size={24} />
                </div>
              );
            })}
          </div>
        </div>

        {/* System Tray (Notification Area on the right matching reference image) */}
        <div className="system-tray">
          {/* Subtle vertical frosted glass separator line */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.35)', margin: '0 6px' }} />

          <div className="tray-icons-group">
            {/* 1. Chevron Arrow */}
            <span 
              className="tray-icon-btn" 
              onClick={() => setTrayOverflowOpen(!trayOverflowOpen)} 
              title="Show hidden icons"
            >
              <ChevronUp size={13} color="#ffffff" />
            </span>

            {/* 2. Security Shield */}
            <span className="tray-icon-btn" title="Security Status: Protected">
              <ShieldCheck size={14} color="#f59e0b" />
            </span>

            {/* 3. Sync circle */}
            <span className="tray-icon-btn" title="Sync Status: Idle">
              <RotateCw size={13} color="#dbeafe" />
            </span>

            {/* 4. Email Service Status Monitor */}
            <span className="tray-icon-btn" title={serverOnline ? "Email Dispatch Service: Online (shubhamchakraborty0412@gmail.com)" : "Email Dispatch: Local Mode"}>
              <Monitor size={14} color={serverOnline ? "#86efac" : "#ffffff"} />
            </span>

            {/* 5. Red Shield */}
            <span className="tray-icon-btn" title="Windows Firewall: On">
              <ShieldAlert size={13} color="#f87171" />
            </span>

            {/* 6. Green Battery Power */}
            <span className="tray-icon-btn" title="Battery: 100% (Plugged in)">
              <BatteryCharging size={14} color="#86efac" />
            </span>

            {/* 7. Network / WiFi Signal */}
            <span className="tray-icon-btn" title="Internet Access: Connected">
              <Wifi size={14} color="#ffffff" />
            </span>

            {/* 8. Action Center Flag */}
            <span className="tray-icon-btn" title="Action Center: 0 messages">
              <Flag size={13} color="#ffffff" />
            </span>

            {/* 9. Audio Speaker */}
            <span 
              className="tray-icon-btn" 
              onClick={() => setVolumePopupOpen(!volumePopupOpen)}
              title={`Speakers: ${isMuted ? 'Muted' : `${masterVolume}%`}`}
            >
              {isMuted ? <VolumeX size={14} color="#fca5a5" /> : <Volume2 size={14} color="#ffffff" />}
            </span>
          </div>

          {/* 10. Clock (4:16 PM / 6/4/2010 matching image layout) */}
          <div
            className="tray-clock"
            onClick={() => setCalendarFlyoutOpen(!calendarFlyoutOpen)}
            title="Click to view calendar and network telemetry"
          >
            <div style={{ fontWeight: '600', letterSpacing: '-0.3px' }}>
              {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.95 }}>
              {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* 11. Aero Peek "Show Desktop" Strip at far right edge */}
          <div
            className="show-desktop-strip"
            onClick={toggleShowDesktop}
            title="Show desktop"
          />
        </div>
      </div>
    </div>
  );
}
