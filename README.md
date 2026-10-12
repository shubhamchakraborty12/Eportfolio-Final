# Shubham Chakraborty — Full-Stack MERN E-Portfolio & Research Showcase

An ultra-modern, high-performance, and visually stunning personal portfolio web application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Highlights Shubham Chakraborty's engineering expertise in full-stack web development, machine learning algorithms, and his **published Indian Patent** (Application No: **202521127184 A**).

---

## 🌟 Key Features

1. **Executive Hero & Visual Presence**
   - High-fidelity studio developer portrait with glowing ambient cyberpunk/tech rim rings.
   - Dynamic typewriter rotator cycling through core identities: *Full-Stack MERN Developer*, *AI/ML & Forecasting Researcher*, *Patent Co-Inventor*, *Python & FastAPI Architect*.
   - Direct CTAs to explore projects, run live ML playgrounds, view patent research, or open the formatted resume.

2. **Official Patent Spotlight (Indian Patent No: 202521127184 A)**
   - Dedicated showcase of the co-invented **Hybrid AI Time-Series Forecasting System** published in the official Indian Patent Journal on January 2, 2026.
   - Interactive dual-stream architecture diagram:
     - **Stream A**: Statistical ARIMA for linear trend and autoregressive structure.
     - **Stream B**: Deep Recurrent LSTM for high-dimensional non-linear residual errors.
     - **Hybrid Recombination**: 28.4% RMSE error reduction and 89.2% directional accuracy.
   - 1-click **Copy Citation** button (APA/BibTeX formatted) with clipboard toast feedback.

3. **Interactive Simulation Playground (Live Technical Demos)**
   - **Demo 1 — Hybrid ARIMA-LSTM Forecaster**: Test the patent's algorithm live with real-time parameter tuning (Market Ticker vs. IoT Sensor, Horizon steps 5–20, Signal Variance slider). Hits Express `/api/demo/forecast` and plots comparative SVG curves with dynamic RMSE calculations!
   - **Demo 2 — ExfilSentinel SOC Threat Radar**: Simulate insider threat telemetry across 4 vectors (Outbound Network MB, File Operations, Process Spawns, Removable USB mount). Computes live ensemble scores: Isolation Forest Anomaly, Random Forest classification, and XGBoost Risk Factor.

4. **Interactive Career Experience Timeline**
   - Detailed timeline covering all 4 industry internships:
     - **Main Crafts Technology** (MERN Stack Developer Intern — Nagpur, MH)
     - **Kodbud** (Python Developer Virtual Intern — Remote)
     - **ServiceNow** (ServiceNow Virtual Intern — Remote)
     - **Kelicalix Technologies** (Frontend Developer — Maharashtra, India)

5. **Categorized Skills Matrix with Live Search**
   - Filter by *Languages*, *Web & MERN*, *AI/ML*, *Tools & Databases*, and *CS Fundamentals (Java DSA, OOP, DBMS, OS)*.
   - Instant search bar and animated skill progress meters.

6. **Interactive Projects Showcase & Architectural Deep-Dives**
   - Filterable projects: Hybrid AI Forecasting, ExfilSentinel SOC Dashboard, Stock Price Prediction Engine, Smart Task App.
   - 1-click **GitHub Repository** access and in-depth **Architecture Modal** detailing technical highlights, benchmarks, and engineering trade-offs.

7. **Full-Stack Working Contact System & Live MongoDB Inspector**
   - Working contact form wired to Express REST API (`POST /api/contact`) that validates and saves directly into **MongoDB**.
   - Confetti celebration burst upon submission.
   - Direct contact channels: Email (`shubhamchakraborty0412@gmail.com`), Phone (`+91-9561297328`), LinkedIn, GitHub.
   - **Inspect Live MongoDB Inquiries**: Collapsible database stream viewer allowing recruiters or reviewers to verify real-time MongoDB document persistence.

8. **In-Browser Interactive Resume Modal**
   - Full formatted digital CV matching the official resume layout.
   - Built-in **Print / Save as PDF** (`window.print()`) button.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v3.4, PostCSS, Google Fonts (Newsreader, Inter, Outfit, JetBrains Mono), Canvas Confetti, Lucide Icons |
| **Backend** | Node.js, Express.js, Mongoose ODM, CORS, Dotenv, REST API architecture |
| **Database** | MongoDB (Running on `mongodb://127.0.0.1:27017/shubham_portfolio`), collections: `contacts`, `projectstats`, `visitors` |
| **AI/ML Stack** | Scikit-learn, ARIMA, LSTM, Random Forest, XGBoost, Isolation Forest, FastAPI integration |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+ or v22+)
- **MongoDB** (Local MongoDB running on port 27017 or a MongoDB Atlas URI)

### 2. Run Both Frontend and Backend Concurrently
From the project root:
```bash
npm run dev
```
This starts:
- **MERN Backend**: `http://localhost:5000`
- **React Frontend**: `http://localhost:5173`

### 3. Or Run Independently
To run the server only:
```bash
npm run dev:server
```
To run the client only:
```bash
npm run dev:client
```

### 4. Build for Production
```bash
npm run build
```
This generates the optimized production build in `client/dist`, which can be served directly by the Express server.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server status and MongoDB connection state |
| `GET` | `/api/portfolio` | Full profile, skills, experience, patent, and projects data |
| `POST` | `/api/contact` | Submits and saves contact inquiries to MongoDB |
| `GET` | `/api/contact` | Retrieves recent contact inquiries from MongoDB |
| `GET` | `/api/stats` | Fetches aggregate visitor and patent analytics |
| `POST` | `/api/demo/forecast` | Simulates the Patent Hybrid ARIMA-LSTM forecasting algorithm |
| `POST` | `/api/demo/soc-simulate` | Simulates ExfilSentinel SOC insider threat scoring ensemble |

---

## 👤 Profile & Credentials

- **Name:** Shubham Chakraborty
- **Education:** Symbiosis Institute of Technology (SIT), Nagpur — B.Tech CSE (Honours: AI & ML)
- **Patent:** Application No: `202521127184 A`, Published Jan 2, 2026 (Patent Office, Govt. of India)
- **Email:** [shubhamchakraborty0412@gmail.com](mailto:shubhamchakraborty0412@gmail.com)
- **Phone:** [+91-9561297328](tel:+919561297328)
- **LinkedIn:** [linkedin.com/in/shubham-chakraborty-76364a31a](https://www.linkedin.com/in/shubham-chakraborty-76364a31a)
- **GitHub:** [github.com/shubhamchakraborty12](https://github.com/shubhamchakraborty12)
