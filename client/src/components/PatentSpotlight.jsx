import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Copy, 
  FileCheck, 
  TrendingUp, 
  Cpu, 
  Network, 
  Zap,
  ArrowRight,
  BookOpen,
  Code
} from 'lucide-react';

export default function PatentSpotlight({ patentData }) {
  const [copiedBib, setCopiedBib] = useState(false);
  const [citationFormat, setCitationFormat] = useState('apa'); // 'apa' | 'bibtex'

  const apaCitation = "Chakraborty, S., et al. (2026). Hybrid AI Time-Series Forecasting System. Indian Patent Application 202521127184 A, Published January 2, 2026. The Patent Office, Government of India.";

  const bibtexCitation = `@patent{chakraborty2026hybrid,
  author    = {Chakraborty, Shubham and Collaborators},
  title     = {Hybrid AI Time-Series Forecasting System},
  number    = {202521127184 A},
  country   = {India},
  office    = {The Patent Office, Government of India},
  day       = {02},
  month     = {January},
  year      = {2026},
  type      = {Patent Application}
}`;

  const handleCopyCitation = () => {
    const textToCopy = citationFormat === 'apa' ? apaCitation : bibtexCitation;
    navigator.clipboard.writeText(textToCopy);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2200);
  };

  return (
    <section id="patent" className="py-20 md:py-28 bg-paper-950 border-b border-paper-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-patent-amber/10 border border-patent-amber/30 text-xs font-mono text-patent-amber mb-3">
            <Award size={14} />
            <span>Official Patent Disclosure • Intellectual Property India</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Published <span className="text-patent-amber">AI Patent</span> Co-Inventor
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Formal technical disclosure for Indian Patent Application <strong>202521127184 A</strong>, 
            co-inventing a dual-stream hybrid architecture integrating statistical auto-regression with deep recurrent networks.
          </p>
        </div>

        {/* Main Patent Gazette Document Card */}
        <div className="rounded-xl border border-patent-amber/40 bg-paper-900/90 shadow-panel overflow-hidden reveal-scale apple-glass">
          
          {/* Official Gazette Top Bar */}
          <div className="px-6 py-4 bg-paper-850 border-b border-paper-750 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-patent-amber bg-patent-amber/10 px-2.5 py-1 rounded border border-patent-amber/30">
                APP NO: 202521127184 A
              </span>
              <span className="font-mono text-xs text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Published: January 02, 2026</span>
              </span>
              <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                Gazette Issue No. 01/2026
              </span>
            </div>

            <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>JURISDICTION: THE PATENT OFFICE, GOVT. OF INDIA</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Patent Abstract & Claim Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Hybrid AI Time-Series Forecasting System
                </h3>
                <p className="font-mono text-xs text-patent-amber mt-1">
                  Inventors: Shubham Chakraborty et al. • Symbiosis Institute of Technology
                </p>
              </div>

              {/* Technical Abstract */}
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Classical linear statistical models (ARIMA) excel at discovering deterministic stationarity and cyclical periodicity but fail when confronted with structural variance shifts. Conversely, purely neural sequential architectures (LSTM) risk overparameterization and saturation on high-frequency noise.
                </p>
                <p>
                  This patent discloses a <strong>dual-phase hybrid synthesis</strong>: the primary stream extracts linear auto-regressive dynamics (p, d, q), producing an intermediate residual error vector ε<sub>t</sub> = y<sub>t</sub> - ŷ<sub>ARIMA</sub>. The secondary stream feeds this high-dimensional residual into bidirectional LSTM memory cells to isolate volatile non-linear dynamics, combining both predictions for robust multi-step horizon forecasting.
                </p>
              </div>

              {/* Mathematical Formulation Box */}
              <div className="p-4 rounded-lg bg-paper-950 border border-paper-750 font-mono text-xs text-slate-300">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-sans font-semibold">
                  Mathematical Formulation
                </div>
                <div className="text-patent-light text-sm overflow-x-auto py-1">
                  ŷ<sub>t+h</sub> = ℳ<sub>ARIMA</sub>(y<sub>t</sub>; Φ, Θ) + ℱ<sub>LSTM</sub>(ε<sub>t</sub>; 𝒲, 𝒷)
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Residual recombination theorem: Error variance Var(ε) decreases by up to 28.4% across volatile test intervals.
                </p>
              </div>

              {/* Quantitative Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 reveal-stagger">
                <div className="p-3 rounded bg-paper-850 border border-paper-750 hover-card-elevate apple-card transition-all cursor-default">
                  <div className="font-heading text-xl font-bold text-patent-amber">28.4% ↓</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">RMSE vs Standalone LSTM</div>
                </div>
                <div className="p-3 rounded bg-paper-850 border border-paper-750 hover-card-elevate apple-card transition-all cursor-default">
                  <div className="font-heading text-xl font-bold text-emerald-400">89.2%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Directional Accuracy</div>
                </div>
                <div className="p-3 rounded bg-paper-850 border border-paper-750 hover-card-elevate apple-card transition-all cursor-default">
                  <div className="font-heading text-xl font-bold text-research-blue">Dual-Stream</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Decomposed Pipeline</div>
                </div>
                <div className="p-3 rounded bg-paper-850 border border-paper-750 hover-card-elevate apple-card transition-all cursor-default">
                  <div className="font-heading text-xl font-bold text-white">Multi-Step</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Forecast Horizon</div>
                </div>
              </div>

              {/* Citation Copy Block */}
              <div className="p-4 rounded-lg bg-paper-850 border border-paper-750 space-y-3 hover:border-slate-600 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-patent-amber" />
                    <span className="font-mono text-xs font-semibold text-white">Academic Citation Format:</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <button
                      onClick={() => setCitationFormat('apa')}
                      className={`px-2.5 py-0.5 rounded text-[11px] transition-all ${citationFormat === 'apa' ? 'bg-patent-amber text-paper-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      APA
                    </button>
                    <button
                      onClick={() => setCitationFormat('bibtex')}
                      className={`px-2.5 py-0.5 rounded text-[11px] transition-all ${citationFormat === 'bibtex' ? 'bg-patent-amber text-paper-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      BibTeX
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-paper-950 border border-paper-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                  {citationFormat === 'apa' ? apaCitation : bibtexCitation}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleCopyCitation}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-patent-amber/15 hover:bg-patent-amber/25 border border-patent-amber/40 text-patent-amber font-mono text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {copiedBib ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedBib ? 'Citation Copied to Clipboard!' : 'Copy Citation Text'}</span>
                  </button>

                  <a 
                    href="#projects" 
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-patent-amber transition-colors group"
                  >
                    <span>View Engineering Projects</span>
                    <ArrowRight size={12} className="arrow-slide" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Decomposition Scheme */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-lg bg-paper-950 border border-paper-750 relative overflow-hidden reveal-on-scroll">
              <div className="ambient-glow-mesh -bottom-20 -left-20 !w-64 !h-64"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-paper-800 mb-5">
                  <span className="font-mono text-xs font-semibold uppercase text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-patent-amber animate-ping"></span>
                    <span>System Architecture Schema</span>
                  </span>
                  <span className="font-mono text-[10px] text-patent-amber pulse-patent px-1.5 py-0.5 rounded border border-patent-amber/30">
                    PAT: 202521127184 A
                  </span>
                </div>

                {/* Stream Blocks */}
                <div className="space-y-4">
                  {/* Stream A */}
                  <div className="p-4 rounded-md bg-paper-900 border-l-4 border-l-research-blue border border-paper-800 hover-card-elevate">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-research-blue"></span>
                        Stream A: Statistical ARIMA
                      </span>
                      <span className="font-mono text-[10px] text-research-blue bg-research-blue/10 px-1.5 py-0.5 rounded">Linear Component</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Computes differences $d$, auto-regression $p$, and moving averages $q$ to extract baseline structural trends.
                    </p>
                  </div>

                  {/* Flow Arrow with Animated Data Dot */}
                  <div className="flex flex-col items-center justify-center text-slate-400 font-mono text-xs py-1 space-y-1">
                    <div className="relative w-1 h-5 flex justify-center items-center">
                      <div className="w-0.5 h-full bg-paper-700"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-patent-amber absolute data-flow-dot"></div>
                    </div>
                    <span className="text-[11px] text-slate-400">↓ Residual Error Extraction ε<sub>t</sub> = y<sub>t</sub> - ŷ<sub>ARIMA</sub></span>
                  </div>

                  {/* Stream B */}
                  <div className="p-4 rounded-md bg-paper-900 border-l-4 border-l-indigo-400 border border-paper-800 hover-card-elevate">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        Stream B: Deep Bidirectional LSTM
                      </span>
                      <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">Non-Linear Errors</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Recurrent memory gates capture temporal dependencies in the residual error distribution without saturated gradients.
                    </p>
                  </div>

                  {/* Flow Arrow to Recombination */}
                  <div className="flex justify-center text-slate-400 font-mono text-[11px] py-0.5">
                    ↓ Feed to Recombination Synthesis
                  </div>

                  {/* Synthesis Block */}
                  <div className="p-4 rounded-md bg-paper-900 border-l-4 border-l-patent-amber border border-paper-800 hover-card-elevate">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-patent-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-patent-amber animate-pulse"></span>
                        Ensemble Recombination Layer
                      </span>
                      <span className="font-mono text-[10px] text-patent-amber bg-patent-amber/10 px-1.5 py-0.5 rounded">Multi-Step</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Dynamic weighting synthesizer yielding final predicted values with calibrated confidence envelopes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Gazette Footnote */}
              <div className="mt-6 pt-4 border-t border-paper-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>PATENT JOURNAL PUBLICATION</span>
                <span className="text-patent-amber">GOVT OF INDIA</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
