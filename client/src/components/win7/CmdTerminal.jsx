import React, { useState, useRef, useEffect } from 'react';

export default function CmdTerminal({ onLaunchApp }) {
  const [history, setHistory] = useState([
    "Microsoft Windows [Version 6.1.7601]",
    "Copyright (c) 2009 Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\Shubham> help",
    "Available commands: help, skills, patent, projects, whoami, experience, systeminfo, dir, cls",
    ""
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim().toLowerCase();
      const newHistory = [...history, `C:\\Users\\Shubham> ${inputVal}`];

      switch (cmd) {
        case 'help':
          newHistory.push(
            "SUPPORTED COMMANDS:",
            "  whoami       - Display current researcher & engineer identity",
            "  ipconfig     - Display Windows IP and network adapter configuration",
            "  patent       - View published Indian Patent disclosure details",
            "  skills       - Print full-stack and machine learning competency index",
            "  projects     - List engineering projects and repositories",
            "  experience   - List industry internships and positions",
            "  systeminfo   - Display MERN environment and system telemetry",
            "  dir          - List files in current directory",
            "  resume       - Launch Adobe Acrobat Resume viewer",
            "  contact      - Launch Windows Live Mail composer",
            "  cls / clear  - Clear the command prompt window"
          );
          break;

        case 'ipconfig':
          newHistory.push(
            "Windows IP Configuration",
            "",
            "Wireless LAN adapter Wi-Fi:",
            "   Connection-specific DNS Suffix  . : lan",
            "   Link-local IPv6 Address . . . . . : fe80::2111:c2de:3563:78b0%14",
            "   IPv4 Address (Device LAN) . . . . : 10.17.101.54",
            "   Subnet Mask . . . . . . . . . . . : 255.255.224.0",
            "   Default Gateway . . . . . . . . . : 10.17.96.1",
            "",
            "Public WAN Network Gateway:",
            "   Internet Routing (NAT)  . . . . . : 103.83.136.x (Optical Broadband, MH)",
            "   Browser Privacy Shield  . . . . . : mDNS active (*.local host masking)"
          );
          break;

        case 'whoami':
          newHistory.push(
            "Shubham Chakraborty",
            "  Institution : Symbiosis Institute of Technology, Nagpur",
            "  Discipline  : Computer Science & Engineering (AI/ML Honours)",
            "  Core Focus  : Full-Stack MERN Architecture & Sequential Deep Learning",
            "  Patent      : Co-Inventor, Indian Patent Application 202521127184 A"
          );
          break;

        case 'patent':
          newHistory.push(
            "[OFFICIAL PATENT GAZETTE DISCLOSURE]",
            "  Title       : Hybrid AI Time-Series Forecasting System",
            "  App Number  : 202521127184 A",
            "  Published   : January 02, 2026",
            "  Office      : The Patent Office, Government of India",
            "  Innovation  : ARIMA linear decomposition + bidirectional LSTM residual modeling",
            "  Metric Gain : 28.4% RMSE error variance reduction"
          );
          if (onLaunchApp) onLaunchApp('patent');
          break;

        case 'skills':
          newHistory.push(
            "[TECHNICAL COMPETENCY INDEX]",
            "  Languages   : Python (95%), JavaScript (90%), Java (85%), C (80%), HTML/CSS (92%)",
            "  Web / MERN  : React.js, Node.js, Express.js, MongoDB, FastAPI, REST APIs",
            "  AI / ML     : Time-Series ARIMA, LSTM, Scikit-learn, Isolation Forest, XGBoost",
            "  Core CS     : DSA in Java, OOP Design Patterns, DBMS, Operating Systems"
          );
          break;

        case 'projects':
          newHistory.push(
            "[FEATURED ENGINEERING PROJECTS]",
            "  1. Hybrid ARIMA-LSTM Forecaster (Patent 202521127184 A)",
            "  2. ExfilSentinel SOC Threat Radar (Ensemble ML & Anomaly Detection)",
            "  3. MERN Taskflow & Operations Manager",
            "  4. Smart Campus IoT Monitoring Hub",
            "  5. Enterprise Workflow Engine (ServiceNow Integration)",
            "  6. Python High-Throughput Algorithmic Microservice"
          );
          break;

        case 'experience':
          newHistory.push(
            "[CAREER & INTERNSHIP TRAJECTORY]",
            "  * Main Crafts Technology (Nagpur)  - MERN Stack Developer Intern (May-Jun 2026)",
            "  * Kodbud (Remote)                  - Python Developer Virtual Intern (Mar 2026)",
            "  * ServiceNow (Remote)              - ServiceNow Virtual Intern (Jun-Jul 2025)",
            "  * Kelicalix Technologies (MH)      - Frontend Developer (Feb-May 2025)"
          );
          break;

        case 'systeminfo':
          newHistory.push(
            "OS Name                   : Microsoft Windows 7 Ultimate (Engineer Edition)",
            "OS Version                : 6.1.7601 Service Pack 1 Build 7601",
            "System Manufacturer       : Symbiosis Institute of Technology",
            "System Model              : SIT-NAGPUR-AI-2026",
            "Processor(s)              : Intel Core i7 - Full-Stack & AI Co-Processor",
            "Email Dispatch Service    : Active (shubhamchakraborty0412@gmail.com)",
            "Patent Registry Status    : Published & Genuine (202521127184 A)"
          );
          break;

        case 'dir':
          newHistory.push(
            " Directory of C:\\Users\\Shubham",
            "",
            "10/12/2026  11:00 PM    <DIR>          .",
            "10/12/2026  11:00 PM    <DIR>          ..",
            "01/02/2026  09:15 AM           142,520 Resume_Shubham_Chakraborty.pdf",
            "01/02/2026  10:00 AM            98,400 Patent_202521127184A_Gazette.doc",
            "06/01/2026  02:30 PM    <DIR>          Projects",
            "03/15/2026  04:45 PM            12,288 Skills_Registry.dat",
            "05/20/2026  11:20 AM            45,056 Experience_Log.evtx",
            "               4 File(s)        298,264 bytes",
            "               3 Dir(s)  428,921,856,000 bytes free"
          );
          break;

        case 'resume':
          newHistory.push("Launching Adobe Acrobat Reader XI for Resume.pdf...");
          if (onLaunchApp) onLaunchApp('resume');
          break;

        case 'contact':
          newHistory.push("Opening Windows Live Mail composer...");
          if (onLaunchApp) onLaunchApp('contact');
          break;

        case 'cls':
        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case '':
          break;

        default:
          newHistory.push(`'${cmd}' is not recognized as an internal or external command. Type 'help' for available commands.`);
          break;
      }

      newHistory.push("");
      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="cmd-terminal-app" onClick={() => document.getElementById('cmd-input-box')?.focus()}>
      {history.map((line, idx) => (
        <div key={idx} style={{ minHeight: '18px', whiteSpace: 'pre-wrap' }}>
          {line}
        </div>
      ))}

      <div className="cmd-input-line">
        <span>C:\Users\Shubham&gt;&nbsp;</span>
        <input 
          id="cmd-input-box"
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommand}
          className="cmd-input-field"
          autoFocus
          spellCheck="false"
        />
      </div>
      <div ref={terminalEndRef} />
    </div>
  );
}
