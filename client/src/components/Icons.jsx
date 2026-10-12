import React from 'react';

// Windows 7 Start Orb Logo (4-color flag inside glass circle)
export function StartOrbLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#0052d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#002b66" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="orbBorder" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(0,100,200,0.6)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#orbGlow)" stroke="url(#orbBorder)" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
      {/* Windows 4-color flag */}
      <g transform="translate(23, 23) scale(0.54)">
        {/* Red */}
        <path d="M5 8 C 22 2, 40 18, 48 10 L 48 46 C 40 52, 22 38, 5 44 Z" fill="#f25022" />
        {/* Green */}
        <path d="M54 9 C 64 2, 85 16, 95 10 L 95 46 C 85 52, 64 38, 54 44 Z" fill="#7fba00" />
        {/* Blue */}
        <path d="M5 49 C 22 43, 40 59, 48 51 L 48 87 C 40 93, 22 79, 5 85 Z" fill="#00a4ef" />
        {/* Yellow */}
        <path d="M54 50 C 64 43, 85 57, 95 51 L 95 87 C 85 93, 64 79, 54 85 Z" fill="#ffb900" />
      </g>
    </svg>
  );
}

// Adobe Acrobat PDF Reader Icon
export function AdobeReaderIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="adobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a2a" />
          <stop offset="100%" stopColor="#b30000" />
        </linearGradient>
      </defs>
      <rect x="6" y="4" width="52" height="56" rx="8" fill="url(#adobeGrad)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      {/* Stylized Adobe Ribbon Curve */}
      <path d="M22 48 C 20 40, 26 26, 32 16 C 38 26, 44 40, 42 48 C 39 40, 35 34, 32 30 C 29 34, 25 40, 22 48 Z" fill="#ffffff" />
      <path d="M16 48 C 22 46, 28 42, 32 36 C 36 42, 42 46, 48 48 C 40 44, 36 38, 32 32 C 28 38, 24 44, 16 48 Z" fill="#ffffff" opacity="0.9" />
      <rect x="36" y="40" width="18" height="12" rx="2" fill="#ffffff" />
      <text x="38" y="49" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#cc0000">PDF</text>
    </svg>
  );
}

// Windows 7 Computer Icon (Monitor + Tower)
export function MyComputerIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#68b4e8" />
          <stop offset="100%" stopColor="#2575b6" />
        </linearGradient>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8e4ee" />
          <stop offset="100%" stopColor="#8da0b5" />
        </linearGradient>
      </defs>
      {/* Monitor frame */}
      <rect x="8" y="8" width="48" height="34" rx="4" fill="url(#frameGrad)" stroke="#6c8095" strokeWidth="1.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))" />
      {/* Screen */}
      <rect x="12" y="12" width="40" height="26" rx="2" fill="url(#screenGrad)" />
      {/* Desktop wallpaper on mini screen */}
      <path d="M12 28 Q 28 16, 40 24 T 52 38 L 12 38 Z" fill="rgba(255,255,255,0.3)" />
      {/* Monitor stand */}
      <rect x="28" y="42" width="8" height="7" fill="#8da0b5" />
      <path d="M20 49 L 44 49 L 40 53 L 24 53 Z" fill="#6c8095" />
    </svg>
  );
}

// Windows Explorer (Yellow Folder + Blue Strap)
export function WindowsExplorerIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7cc66" />
          <stop offset="100%" stopColor="#d99f28" />
        </linearGradient>
        <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffea9f" />
          <stop offset="100%" stopColor="#fab82c" />
        </linearGradient>
      </defs>
      {/* Back flap */}
      <path d="M8 14 C 8 12, 10 10, 12 10 L 26 10 L 32 16 L 52 16 C 54 16, 56 18, 56 20 L 56 46 C 56 48, 54 50, 52 50 L 12 50 C 10 50, 8 48, 8 46 Z" fill="url(#folderBack)" />
      {/* Documents sticking out */}
      <rect x="16" y="14" width="32" height="18" rx="2" fill="#ffffff" stroke="#ccc" strokeWidth="1" />
      <line x1="20" y1="18" x2="40" y2="18" stroke="#0078d7" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="36" y2="22" stroke="#888" strokeWidth="1" />
      {/* Front flap */}
      <path d="M6 22 L 58 22 L 54 54 C 54 56, 52 57, 50 57 L 10 57 C 8 57, 6 56, 6 54 Z" fill="url(#folderFront)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.25))" />
    </svg>
  );
}

// Patent Seal Icon (Indian Patent Certificate with gold ribbon)
export function PatentSealIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="goldSeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe270" />
          <stop offset="60%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>
      </defs>
      {/* Ribbon tails */}
      <path d="M22 38 L 18 58 L 26 52 L 32 58 L 30 38 Z" fill="#c0392b" />
      <path d="M42 38 L 46 58 L 38 52 L 32 58 L 34 38 Z" fill="#2980b9" />
      {/* Starburst rosette */}
      <circle cx="32" cy="28" r="22" fill="url(#goldSeal)" stroke="#78510a" strokeWidth="1" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      <circle cx="32" cy="28" r="16" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Center emblem */}
      <text x="32" y="32" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#5c3d03" textAnchor="middle">2026</text>
    </svg>
  );
}

// Control Panel Icon (Windows 7 Gears & Sliders)
export function ControlPanelIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="cpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5ea7dd" />
          <stop offset="100%" stopColor="#1e5c8a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#cpGrad)" stroke="#1a4f77" strokeWidth="1.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      {/* Gears inside */}
      <circle cx="28" cy="28" r="10" fill="#ffffff" opacity="0.9" />
      <circle cx="28" cy="28" r="5" fill="#1e5c8a" />
      <circle cx="40" cy="40" r="7" fill="#ffe270" stroke="#b8860b" strokeWidth="1" />
      <circle cx="40" cy="40" r="3.5" fill="#1e5c8a" />
    </svg>
  );
}

// Command Prompt Icon (cmd.exe)
export function CmdIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Window */}
      <rect x="6" y="8" width="52" height="48" rx="4" fill="#000000" stroke="#707070" strokeWidth="2" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
      {/* Title bar */}
      <path d="M6 12 C 6 10, 8 8, 10 8 L 54 8 C 56 8, 58 10, 58 12 L 58 16 L 6 16 Z" fill="#333333" />
      {/* Prompt text */}
      <text x="12" y="32" fontFamily="Consolas, monospace" fontSize="11" fontWeight="bold" fill="#ffffff">C:\&gt;_</text>
    </svg>
  );
}

// Windows Live Mail / Outlook Icon (Envelope with blue globe)
export function WindowsLiveMailIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="envGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce4ed" />
        </linearGradient>
      </defs>
      {/* Globe back */}
      <circle cx="38" cy="26" r="18" fill="#3498db" opacity="0.8" />
      <circle cx="38" cy="26" r="17" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
      {/* Envelope */}
      <rect x="8" y="20" width="46" height="34" rx="4" fill="url(#envGrad)" stroke="#7f8c8d" strokeWidth="1.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))" />
      <path d="M8 24 L 31 38 L 54 24" fill="none" stroke="#34495e" strokeWidth="2" />
      <path d="M8 52 L 24 36" stroke="#95a5a6" strokeWidth="1" />
      <path d="M54 52 L 38 36" stroke="#95a5a6" strokeWidth="1" />
    </svg>
  );
}

// Event Viewer Icon (Career Timeline log book)
export function EventViewerIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Book base */}
      <rect x="10" y="8" width="44" height="48" rx="4" fill="#3b5998" stroke="#1d2f57" strokeWidth="1.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      <rect x="14" y="12" width="36" height="40" rx="2" fill="#ffffff" />
      {/* Log lines */}
      <line x1="18" y1="18" x2="42" y2="18" stroke="#27ae60" strokeWidth="2" />
      <line x1="18" y1="24" x2="40" y2="24" stroke="#7f8c8d" strokeWidth="1.5" />
      <line x1="18" y1="30" x2="38" y2="30" stroke="#f39c12" strokeWidth="1.5" />
      <line x1="18" y1="36" x2="42" y2="36" stroke="#7f8c8d" strokeWidth="1.5" />
      <line x1="18" y1="42" x2="34" y2="42" stroke="#2980b9" strokeWidth="1.5" />
    </svg>
  );
}

// Windows Photo Viewer Icon
export function PhotoViewerIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Frame */}
      <rect x="8" y="10" width="48" height="44" rx="4" fill="#ffffff" stroke="#bdc3c7" strokeWidth="2" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))" />
      {/* Picture area */}
      <rect x="12" y="14" width="40" height="32" rx="2" fill="#68b4e8" />
      {/* Sun */}
      <circle cx="20" cy="22" r="4" fill="#f1c40f" />
      {/* Mountains */}
      <path d="M12 40 L 24 28 L 34 38 L 44 26 L 52 40 Z" fill="#27ae60" />
    </svg>
  );
}

// Recycle Bin Icon
export function RecycleBinIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="binGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4ecfa" />
          <stop offset="100%" stopColor="#7dbde4" />
        </linearGradient>
      </defs>
      {/* Bin Body */}
      <path d="M16 18 L 20 54 C 20 56, 22 58, 24 58 L 40 58 C 42 58, 44 56, 44 54 L 48 18 Z" fill="url(#binGrad)" stroke="#5299c5" strokeWidth="1.5" opacity="0.85" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))" />
      {/* Rim & Lid */}
      <ellipse cx="32" cy="18" rx="18" ry="4" fill="#b9def4" stroke="#5299c5" strokeWidth="1.5" />
      <rect x="28" y="10" width="8" height="4" rx="1" fill="#7dbde4" stroke="#5299c5" strokeWidth="1" />
      {/* Recycling arrows emblem */}
      <circle cx="32" cy="38" r="8" fill="none" stroke="#27ae60" strokeWidth="2" strokeDasharray="6 3" />
    </svg>
  );
}

// GitHub & LinkedIn Icons
export function Github({ size = 20, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

export function Linkedin({ size = 20, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

// 1. Mozilla Firefox (Classic 2010 Edition)
export function FirefoxIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <radialGradient id="ffGlobe" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4aa3df" />
          <stop offset="70%" stopColor="#255a9b" />
          <stop offset="100%" stopColor="#103260" />
        </radialGradient>
        <linearGradient id="ffFox" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9a00" />
          <stop offset="50%" stopColor="#e84c00" />
          <stop offset="100%" stopColor="#a31800" />
        </linearGradient>
      </defs>
      {/* Blue globe */}
      <circle cx="25" cy="24" r="17" fill="url(#ffGlobe)" />
      {/* Orange Fox body wrapping globe */}
      <path d="M9 22 C 8 32, 17 41, 28 41 C 37 41, 42 34, 42 26 C 42 16, 32 8, 22 8 C 22 11, 26 12, 28 15 C 23 15, 17 19, 17 25 C 17 26, 19 28, 21 28 C 17 29, 14 26, 14 23 C 12 25, 10 27, 9 22 Z" fill="url(#ffFox)" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))" />
      {/* Fox ears and tail highlight */}
      <path d="M14 13 L 18 7 L 22 11 Z" fill="#ff7a00" />
      <path d="M28 39 C 34 38, 39 33, 39 26 C 36 29, 31 32, 26 34 Z" fill="#ffc83b" />
    </svg>
  );
}

// 2. Snipping Tool (Scissors cutting red/blue rectangle)
export function SnippingToolIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Circular white base */}
      <circle cx="24" cy="24" r="18" fill="#ffffff" stroke="#c0d0e0" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
      {/* Cut area red dashed box */}
      <rect x="14" y="14" width="20" height="20" fill="#eef6ff" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Chrome Scissors */}
      <g transform="translate(15, 14)">
        <circle cx="5" cy="18" r="4" fill="none" stroke="#d9230f" strokeWidth="2" />
        <circle cx="15" cy="18" r="4" fill="none" stroke="#d9230f" strokeWidth="2" />
        <line x1="7" y1="15" x2="16" y2="3" stroke="#888888" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="15" x2="4" y2="3" stroke="#aaaaaa" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="#333" />
      </g>
    </svg>
  );
}

// 3. Paint (Palette with paint blobs & wooden brush)
export function PaintIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <radialGradient id="palWood" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e4effa" />
          <stop offset="100%" stopColor="#b0c8e0" />
        </radialGradient>
      </defs>
      {/* Artist Palette */}
      <path d="M10 24 C 8 33, 16 42, 26 42 C 36 42, 42 36, 42 28 C 42 22, 38 18, 34 18 C 31 18, 29 20, 27 20 C 25 20, 24 17, 26 14 C 28 11, 26 7, 20 7 C 14 7, 10 14, 10 24 Z" fill="url(#palWood)" stroke="#7a9cb8" strokeWidth="1.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      {/* Paint Blobs */}
      <circle cx="17" cy="16" r="3.5" fill="#e74c3c" />
      <circle cx="15" cy="25" r="3.5" fill="#f39c12" />
      <circle cx="18" cy="33" r="3.5" fill="#2ecc71" />
      <circle cx="26" cy="36" r="3.5" fill="#3498db" />
      {/* Brush dipping */}
      <g transform="rotate(-35 32 18)">
        <rect x="30" y="4" width="4" height="24" rx="2" fill="#d35400" stroke="#7e3202" strokeWidth="0.8" />
        <rect x="30" y="24" width="4" height="5" fill="#bdc3c7" />
        <path d="M30 29 C 30 33, 34 33, 34 29 Z" fill="#2980b9" />
      </g>
    </svg>
  );
}

// 4. Audio Line / Winamp (Blue graph with gold frequency curve)
export function AudioWaveIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Dark blue glass frame */}
      <rect x="8" y="10" width="32" height="28" rx="3" fill="#1b365d" stroke="#5d8aa8" strokeWidth="1.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))" />
      {/* Grid lines */}
      <line x1="8" y1="24" x2="40" y2="24" stroke="#2c5282" strokeWidth="1" />
      <line x1="24" y1="10" x2="24" y2="38" stroke="#2c5282" strokeWidth="1" />
      {/* Golden sine frequency wave */}
      <path d="M10 32 Q 16 12, 22 24 T 34 20 T 38 30" fill="none" stroke="#f1c40f" strokeWidth="2.5" strokeLinecap="round" filter="drop-shadow(0 0 3px rgba(241,196,15,0.8))" />
      {/* Blue lightning / frequency spike */}
      <path d="M12 28 L 20 16 L 24 30 L 32 14 L 38 26" fill="none" stroke="#63b3ed" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 5. Google Talk (White bubble with 4-color 'talk')
export function GoogleTalkIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Speech bubble */}
      <path d="M10 14 C 10 10, 14 7, 24 7 C 34 7, 38 10, 38 14 C 38 23, 32 27, 24 27 C 21 27, 18 28, 14 31 L 15 27 C 12 25, 10 22, 10 14 Z" fill="#ffffff" stroke="#90caf9" strokeWidth="1.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      {/* Multi-colored 'talk' letters */}
      <g transform="translate(13, 11)" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="bold" fontSize="11">
        <text x="2" y="11" fill="#4285f4">t</text>
        <text x="7" y="11" fill="#ea4335">a</text>
        <text x="13" y="11" fill="#fbbc05">l</text>
        <text x="16" y="11" fill="#34a853">k</text>
      </g>
    </svg>
  );
}

// 6. Windows Live Messenger (MSN 2 buddies with gold swoosh)
export function LiveMessengerIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Green buddy (left) */}
      <circle cx="18" cy="16" r="4.5" fill="#78be20" />
      <path d="M12 32 C 12 24, 24 24, 24 32 Z" fill="#78be20" />
      {/* Blue buddy (right) */}
      <circle cx="28" cy="18" r="4.5" fill="#00a4e4" />
      <path d="M22 34 C 22 26, 34 26, 34 34 Z" fill="#00a4e4" />
      {/* Gold swoosh ribbon */}
      <path d="M10 28 Q 24 14, 38 22" fill="none" stroke="#fdb913" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 7. Network Hub / Connections (Hub connecting dual PCs)
export function NetworkHubIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Monitor left */}
      <rect x="8" y="12" width="12" height="9" rx="1" fill="#3182ce" stroke="#cbd5e0" strokeWidth="1" />
      <rect x="12" y="21" width="4" height="3" fill="#718096" />
      {/* Monitor right */}
      <rect x="28" y="12" width="12" height="9" rx="1" fill="#38a169" stroke="#cbd5e0" strokeWidth="1" />
      <rect x="32" y="21" width="4" height="3" fill="#718096" />
      {/* Network Hub switch below */}
      <rect x="14" y="28" width="20" height="9" rx="2" fill="#805ad5" stroke="#d6bcfa" strokeWidth="1" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      <circle cx="18" cy="32" r="1.5" fill="#48bb78" />
      <circle cx="24" cy="32" r="1.5" fill="#f6e05e" />
      <circle cx="30" cy="32" r="1.5" fill="#48bb78" />
      {/* Cables */}
      <path d="M14 24 L 14 28 M34 24 L 34 28" stroke="#4a5568" strokeWidth="1.5" />
    </svg>
  );
}

// 8. Microsoft Excel (Green spreadsheet with 'X')
export function ExcelIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id="excelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#21a366" />
          <stop offset="100%" stopColor="#107c41" />
        </linearGradient>
      </defs>
      {/* Spreadsheet grid backing */}
      <rect x="14" y="10" width="24" height="28" rx="2" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1" />
      <line x1="14" y1="18" x2="38" y2="18" stroke="#e0e0e0" strokeWidth="1" />
      <line x1="14" y1="24" x2="38" y2="24" stroke="#e0e0e0" strokeWidth="1" />
      <line x1="14" y1="30" x2="38" y2="30" stroke="#e0e0e0" strokeWidth="1" />
      <line x1="22" y1="10" x2="22" y2="38" stroke="#e0e0e0" strokeWidth="1" />
      <line x1="30" y1="10" x2="30" y2="38" stroke="#e0e0e0" strokeWidth="1" />
      {/* Green 3D flap with bold 'X' */}
      <rect x="8" y="12" width="18" height="24" rx="2" fill="url(#excelGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))" />
      <text x="17" y="29" fill="#ffffff" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="bold" fontSize="16" textAnchor="middle">X</text>
    </svg>
  );
}

// 9. Sticky Notes (Yellow note with download/fold)
export function StickyNotesIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id="stickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff785" />
          <stop offset="100%" stopColor="#ffd43f" />
        </linearGradient>
      </defs>
      {/* Yellow note paper */}
      <path d="M10 10 L 38 10 L 38 28 L 28 38 L 10 38 Z" fill="url(#stickGrad)" stroke="#d4ac0d" strokeWidth="1" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      {/* Folded corner */}
      <path d="M28 38 L 28 28 L 38 28 Z" fill="#f7ca18" stroke="#d4ac0d" strokeWidth="1" />
      {/* Note rule lines */}
      <line x1="14" y1="17" x2="34" y2="17" stroke="#e1b12c" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="23" x2="32" y2="23" stroke="#e1b12c" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="29" x2="24" y2="29" stroke="#e1b12c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 10. Microsoft OneNote (Purple notebook with bold 'N')
export function OneNoteIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id="oneNoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#6c3483" />
        </linearGradient>
      </defs>
      {/* Notebook page backing */}
      <rect x="14" y="10" width="24" height="28" rx="2" fill="#ffffff" stroke="#cbb4d4" strokeWidth="1" />
      {/* Purple flap with white 'N' */}
      <rect x="8" y="12" width="20" height="24" rx="2" fill="url(#oneNoteGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))" />
      <text x="18" y="29" fill="#ffffff" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="bold" fontSize="16" textAnchor="middle">N</text>
    </svg>
  );
}

// 11. Windows Help and Support (Question Mark on Page)
export function HelpGuideIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Document page */}
      <path d="M12 8 L 30 8 L 36 14 L 36 40 L 12 40 Z" fill="#ffffff" stroke="#a0b4c8" strokeWidth="1.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      <path d="M30 8 L 30 14 L 36 14 Z" fill="#e2e8f0" stroke="#a0b4c8" strokeWidth="1" />
      {/* Big Yellow / Blue Question Mark */}
      <text x="24" y="32" fill="#f39c12" stroke="#b7791f" strokeWidth="0.5" fontFamily="Georgia, serif" fontWeight="bold" fontSize="22" textAnchor="middle">?</text>
    </svg>
  );
}

// 12. Search & Indexer (Magnifier over folders)
export function SearchFolderIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Back folder */}
      <rect x="10" y="16" width="24" height="18" rx="2" fill="#48bb78" stroke="#2f855a" strokeWidth="1" />
      {/* Front folder */}
      <rect x="14" y="20" width="24" height="18" rx="2" fill="#4299e1" stroke="#2b6cb0" strokeWidth="1" opacity="0.9" />
      {/* Magnifier glass */}
      <circle cx="28" cy="22" r="7" fill="#ebf8ff" stroke="#2b6cb0" strokeWidth="2.5" />
      <line x1="33" y1="27" x2="40" y2="34" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
