import { useState, useEffect } from "react";
import { Nav, Footer } from "./Nav";
import HomePage from "./HomePage";
import SolutionsPage from "./SolutionsPage";
import VaultPage from "./VaultPage";
import AboutPage from "./AboutPage";
import AssessmentPage from "./AssessmentPage";
import SystemInitializedPage from "./SystemInitializedPage";
import BlogPage from "./BlogPage";
import { TermsPage, PrivacyPage } from "./LegalPages";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
   Injected once at the root. All page components inherit these.
   Fonts:  Barlow Condensed (headlines) + Courier New (body/mono)
   Grid:   Structural dot-grid background pattern — NOT a SaaS glow
   Pulse:  SVG diagnostic line animation for signature visual element
   Color:  Teal + purple as accent strokes, never as fills/gradients
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700;1,800&display=swap');

  :root {
    /* ── Core palette ── */
    --vn-black:       #0a0a0a;
    --vn-near-black:  #0f0f0f;
    --vn-surface:     #141414;
    --vn-surface-2:   #1a1a1a;
    --vn-border:      #262626;
    --vn-border-mid:  #333333;

    /* ── Accents — used as strokes, rule lines, highlights ONLY ── */
    --vn-teal:        #4db8e8;
    --vn-teal-dim:    rgba(77, 184, 232, 0.18);
    --vn-teal-rule:   rgba(77, 184, 232, 0.35);
    --vn-purple:      #7b5cf5;
    --vn-purple-dim:  rgba(123, 92, 245, 0.15);
    --vn-purple-rule: rgba(123, 92, 245, 0.40);
    --vn-amber:       #c8922a;

    /* ── Text ── */
    --vn-white:       #f4f4f4;
    --vn-off-white:   #d4d4d4;
    --vn-muted:       #737373;
    --vn-faint:       #404040;

    /* ── Typography ── */
    --font-display:   'Barlow Condensed', 'Impact', sans-serif;
    --font-mono:      'Courier New', 'Courier', monospace;

    /* ── Spacing grid ── */
    --grid-unit:      8px;

    /* ── Transitions ── */
    --ease-snap:      cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    background: var(--vn-black);
    color: var(--vn-off-white);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--vn-black); }
  ::-webkit-scrollbar-thumb { background: var(--vn-border-mid); }
  ::-webkit-scrollbar-thumb:hover { background: var(--vn-teal-rule); }

  /* ── Selection ── */
  ::selection {
    background: var(--vn-teal-dim);
    color: var(--vn-white);
  }

  /* ── Typography utilities ── */
  .vn-display {
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--vn-white);
  }

  .vn-display-xl {
    font-family: var(--font-display);
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--vn-white);
  }

  .vn-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--vn-muted);
  }

  .vn-label-teal {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--vn-teal);
  }

  .vn-body {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.75;
    color: var(--vn-off-white);
  }

  /* ── Accent slash element ── */
  .vn-slash {
    display: inline-block;
    width: 3px;
    height: 1em;
    background: var(--vn-teal);
    margin-right: 10px;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .vn-slash-purple {
    display: inline-block;
    width: 3px;
    background: var(--vn-purple);
    flex-shrink: 0;
  }

  /* ── Rule lines ── */
  .vn-rule-teal {
    border: none;
    border-top: 1px solid var(--vn-teal-rule);
    margin: 0;
  }

  .vn-rule-purple {
    border: none;
    border-top: 1px solid var(--vn-purple-rule);
    margin: 0;
  }

  .vn-rule-dim {
    border: none;
    border-top: 1px solid var(--vn-border);
    margin: 0;
  }

  /* ── Grid background pattern — structural, not decorative glows ── */
  .vn-grid-bg {
    background-image:
      radial-gradient(circle, var(--vn-border) 1px, transparent 1px);
    background-size: 28px 28px;
    background-position: 0 0;
  }

  /* ── Cross-hair corner marks ── */
  .vn-corner-marks {
    position: relative;
  }
  .vn-corner-marks::before,
  .vn-corner-marks::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    pointer-events: none;
  }
  .vn-corner-marks::before {
    top: 0; left: 0;
    border-top: 1px solid var(--vn-teal-rule);
    border-left: 1px solid var(--vn-teal-rule);
  }
  .vn-corner-marks::after {
    bottom: 0; right: 0;
    border-bottom: 1px solid var(--vn-teal-rule);
    border-right: 1px solid var(--vn-teal-rule);
  }

  /* ── Diagnostic pulse animation — signature visual element ── */
  @keyframes vn-pulse-draw {
    0%   { stroke-dashoffset: 1000; opacity: 0.3; }
    30%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0.6; }
  }

  @keyframes vn-pulse-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }

  @keyframes vn-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @keyframes vn-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes vn-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes vn-slide-right {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }

  /* ── Button primitives ── */
  .vn-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--vn-black);
    background: var(--vn-teal);
    border: none;
    padding: 14px 28px;
    cursor: pointer;
    transition: background 0.15s var(--ease-snap), transform 0.12s;
    font-weight: 600;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-primary:hover {
    background: #6fd0ff;
    transform: translateY(-1px);
  }
  .vn-btn-primary:active {
    transform: translateY(0);
  }

  .vn-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--vn-off-white);
    background: transparent;
    border: 1px solid var(--vn-border-mid);
    padding: 13px 27px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, transform 0.12s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-ghost:hover {
    border-color: var(--vn-teal-rule);
    color: var(--vn-teal);
    transform: translateY(-1px);
  }

  /* ── Tag / badge ── */
  .vn-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 3px 10px;
    border: 1px solid var(--vn-border-mid);
    color: var(--vn-muted);
    background: transparent;
  }

  .vn-tag-teal {
    border-color: var(--vn-teal-rule);
    color: var(--vn-teal);
  }

  .vn-tag-purple {
    border-color: var(--vn-purple-rule);
    color: var(--vn-purple);
  }

  /* ── Section containers ── */
  .vn-section {
    padding: clamp(64px, 10vw, 120px) clamp(20px, 6vw, 80px);
  }

  .vn-section-tight {
    padding: clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px);
  }

  /* ── Asymmetric content grid ── */
  .vn-grid-asymmetric {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  .vn-grid-asymmetric-reverse {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  .vn-grid-3col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--vn-border);
  }

  .vn-grid-3col > * {
    background: var(--vn-near-black);
  }

  @media (max-width: 900px) {
    .vn-grid-asymmetric,
    .vn-grid-asymmetric-reverse {
      grid-template-columns: 1fr;
    }
    .vn-grid-3col {
      grid-template-columns: 1fr;
    }
  }

  /* ── Panel / card — NO glow, NO gradient background ── */
  .vn-panel {
    background: var(--vn-surface);
    border: 1px solid var(--vn-border);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-accent {
    background: var(--vn-surface);
    border: 1px solid var(--vn-border);
    border-left: 3px solid var(--vn-teal);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-accent-purple {
    background: var(--vn-surface);
    border: 1px solid var(--vn-border);
    border-left: 3px solid var(--vn-purple);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  /* ── Section number / index mark ── */
  .vn-index-mark {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--vn-faint);
    user-select: none;
  }

  /* ── Horizontal rule with label ── */
  .vn-rule-labeled {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .vn-rule-labeled::before {
    content: '';
    flex: 0 0 40px;
    height: 1px;
    background: var(--vn-teal-rule);
  }
  .vn-rule-labeled::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--vn-border);
  }

  /* ── Print / accessibility ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ── Focus visible ── */
  :focus-visible {
    outline: 1px solid var(--vn-teal);
    outline-offset: 2px;
  }
  button:focus:not(:focus-visible) {
    outline: none;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   DIAGNOSTIC PULSE SVG — signature visual, renders behind hero content
   A single animated ECG-style waveform. Teal stroke, no glow filter.
───────────────────────────────────────────────────────────────────────────── */
export function DiagnosticPulse({ style = {}, color = "var(--vn-teal)", opacity = 0.45 }) {
  return (
    <svg
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: 80,
        display: "block",
        overflow: "visible",
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <polyline
        points="
          0,40
          80,40
          110,40
          120,10
          135,70
          150,20
          165,60
          180,40
          220,40
          240,40
          260,15
          275,65
          290,22
          305,58
          320,40
          400,40
          430,40
          445,5
          460,75
          475,18
          490,62
          505,40
          560,40
          590,40
          605,25
          618,55
          632,30
          645,50
          660,40
          720,40
          800,40
        "
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{
          animation: "vn-pulse-draw 2.4s var(--ease-snap, cubic-bezier(0.16,1,0.3,1)) 0.3s forwards",
        }}
      />
      {/* Scan line */}
      <rect
        x="0" y="0"
        width="40" height="80"
        fill={`url(#pulse-scan-${color.replace(/[^a-z]/g, '')})`}
        style={{
          animation: "vn-pulse-scan 3s linear 0.5s infinite",
        }}
      />
      <defs>
        <linearGradient id={`pulse-scan-${color.replace(/[^a-z]/g, '')}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="0" />
          <stop offset="50%"  stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRUCTURAL GRID BACKGROUND — renders as a fixed layer behind all content
   Dot grid at 28px intervals. Subtle. Industrial. Not decorative.
───────────────────────────────────────────────────────────────────────────── */
function StructuralGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #262626 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        backgroundPosition: "0 0",
        opacity: 0.5,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
   - Injects global styles once
   - Renders the structural grid behind everything
   - Manages all page routing state (unchanged from v1 logic)
   - Passes setPage (aliased as `go`) down to all page components
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage]       = useState("Home");
  const [results, setResults] = useState(null);
  const [articleId, setArticleId] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Navigation handler — supports Article_ prefix routing
  const go = (p) => {
    if (p.startsWith("Article_")) {
      setArticleId(p.replace("Article_", ""));
      setPage("Article");
    } else {
      if (p !== "Results") setResults(null);
      setPage(p);
    }
  };

  // Called when AssessmentPage completes
  const handleAssessmentComplete = (r) => {
    setResults(r);
    setPage("Results");
  };

  // Assessment + Results are fullscreen — no nav/footer chrome
  const isFullscreen = page === "Assessment" || page === "Results";

  const renderPage = () => {
    switch (page) {
      case "Home":       return <HomePage      setPage={go} />;
      case "Solutions":  return <SolutionsPage setPage={go} />;
      case "The Vault":  return <VaultPage     setPage={go} />;
      case "About":      return <AboutPage     setPage={go} />;
      case "Assessment": return <AssessmentPage setPage={go} onComplete={handleAssessmentComplete} />;
      case "Results":    return <SystemInitializedPage results={results} setPage={go} />;
      case "Article":    return <BlogPage      articleId={articleId} setPage={go} />;
      case "Terms":      return <TermsPage     setPage={go} />;
      case "Privacy":    return <PrivacyPage   setPage={go} />;
      default:           return <HomePage      setPage={go} />;
    }
  };

  return (
    <>
      {/* ── Inject global styles once ── */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {/* ── Root shell ── */}
      <div
        style={{
          background: "var(--vn-black)",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Structural dot-grid background layer */}
        <StructuralGrid />

        {/* All content sits above the grid */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {!isFullscreen && <Nav page={page} setPage={go} />}
          {renderPage()}
          {!isFullscreen && <Footer setPage={go} />}
        </div>
      </div>
    </>
  );
}