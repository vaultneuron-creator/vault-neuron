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
   GLOBAL STYLES — v3
   Direction: Light industrial. Not AI startup. Not SaaS. Not consulting brochure.
   Reference: process equipment spec sheets, machinery catalogs, technical manuals.

   Background:  #F0EDE6 — warm bone/linen. Feels like heavy paper stock.
   Ink:         #0F0F0F — near-black. Heavy. Credible.
   Teal:        #0D8FAF — used as INK color, not glow. Headers, rules, labels.
   Purple:      #5B3FD4 — true ink purple. Tags, secondary accents. Sparingly.
   Dot grid:    #C8C2B6 dots on linen — reads as technical graph paper.
   Typography:  Barlow Condensed 800/900 for headlines (massive, condensed, uppercase)
                Courier New for body — precision instrument, not tech startup
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700;1,800&display=swap');

  :root {
    /* ── Surfaces ── */
    --vn-bg:          #F0EDE6;
    --vn-surface:     #E8E4DC;
    --vn-surface-2:   #DDD8CF;
    --vn-surface-3:   #D2CCC2;

    /* ── Ink hierarchy ── */
    --vn-ink:         #0F0F0F;
    --vn-ink-mid:     #3A3632;
    --vn-ink-light:   #6B6560;
    --vn-rule:        #C8C2B6;
    --vn-rule-dark:   #A09990;

    /* ── Accent inks — color, not glow ── */
    --vn-teal:        #0D8FAF;
    --vn-teal-mid:    #1AABCF;
    --vn-teal-ink:    #094F61;
    --vn-teal-wash:   rgba(13, 143, 175, 0.08);
    --vn-purple:      #5B3FD4;
    --vn-purple-mid:  #7B5CF5;
    --vn-purple-wash: rgba(91, 63, 212, 0.07);
    --vn-amber:       #A8620A;

    /* ── Status ── */
    --vn-green:       #1A6B3A;
    --vn-red:         #B33A2A;

    /* ── Typography ── */
    --font-display:   'Barlow Condensed', 'Impact', sans-serif;
    --font-mono:      'Courier New', 'Courier', monospace;

    /* ── Motion ── */
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
    background: var(--vn-bg);
    color: var(--vn-ink-mid);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.65;
    min-height: 100vh;
  }

  /* ── Scrollbar — matches the linen background ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--vn-bg); }
  ::-webkit-scrollbar-thumb { background: var(--vn-rule-dark); }
  ::-webkit-scrollbar-thumb:hover { background: var(--vn-teal); }

  /* ── Selection ── */
  ::selection {
    background: rgba(13, 143, 175, 0.18);
    color: var(--vn-ink);
  }

  /* ── Focus ── */
  :focus-visible {
    outline: 1px solid var(--vn-teal);
    outline-offset: 2px;
  }
  button:focus:not(:focus-visible) { outline: none; }

  /* ────────────────────────────────────────────────────
     TYPOGRAPHY UTILITIES
  ──────────────────────────────────────────────────── */

  /* Massive condensed display — the ONLY choice for H1 */
  .vn-display-xl {
    font-family: var(--font-display);
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--vn-ink);
  }

  .vn-display {
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--vn-ink);
  }

  .vn-display-teal {
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--vn-teal);
  }

  .vn-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--vn-ink-light);
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
    line-height: 1.78;
    color: var(--vn-ink-mid);
  }

  /* ────────────────────────────────────────────────────
     STRUCTURAL ELEMENTS
  ──────────────────────────────────────────────────── */

  /* 3px teal vertical slash — used before headings, list items */
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

  /* Rule lines — warm, not cold gray */
  .vn-rule        { border: none; border-top: 1px solid var(--vn-rule);      }
  .vn-rule-dark   { border: none; border-top: 1px solid var(--vn-rule-dark); }
  .vn-rule-teal   { border: none; border-top: 1px solid var(--vn-teal);      }
  .vn-rule-purple { border: none; border-top: 1px solid var(--vn-purple);    }

  /* Section index mark */
  .vn-index-mark {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--vn-rule-dark);
    user-select: none;
  }

  /* Corner-mark brackets for panels */
  .vn-corner {
    position: relative;
  }
  .vn-corner::before,
  .vn-corner::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
  }
  .vn-corner::before {
    top: 0; left: 0;
    border-top: 1px solid var(--vn-teal);
    border-left: 1px solid var(--vn-teal);
  }
  .vn-corner::after {
    bottom: 0; right: 0;
    border-bottom: 1px solid var(--vn-teal);
    border-right: 1px solid var(--vn-teal);
  }

  /* ────────────────────────────────────────────────────
     BUTTONS
     Primary: solid teal, black text — high contrast on linen
     Ghost:   ink border, ink text
  ──────────────────────────────────────────────────── */
  .vn-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
    color: #FFFFFF;
    background: var(--vn-teal);
    border: 1px solid var(--vn-teal);
    padding: 14px 28px;
    cursor: pointer;
    transition: background 0.14s var(--ease-snap), color 0.14s, transform 0.1s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-primary:hover {
    background: var(--vn-teal-ink);
    border-color: var(--vn-teal-ink);
    transform: translateY(-1px);
  }
  .vn-btn-primary:active { transform: translateY(0); }

  .vn-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--vn-ink);
    background: transparent;
    border: 1px solid var(--vn-ink);
    padding: 13px 27px;
    cursor: pointer;
    transition: background 0.14s, color 0.14s, transform 0.1s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-ghost:hover {
    background: var(--vn-ink);
    color: var(--vn-bg);
    transform: translateY(-1px);
  }

  /* ────────────────────────────────────────────────────
     TAGS / BADGES
  ──────────────────────────────────────────────────── */
  .vn-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 3px 10px;
    border: 1px solid var(--vn-rule-dark);
    color: var(--vn-ink-light);
    background: transparent;
  }
  .vn-tag-teal   { border-color: var(--vn-teal);   color: var(--vn-teal);   }
  .vn-tag-purple { border-color: var(--vn-purple);  color: var(--vn-purple); }
  .vn-tag-amber  { border-color: var(--vn-amber);   color: var(--vn-amber);  }

  /* ────────────────────────────────────────────────────
     PANELS & CARDS
     On linen, panels use surface color + rule border.
     Left-border accent lines replace all glow effects.
  ──────────────────────────────────────────────────── */
  .vn-panel {
    background: var(--vn-surface);
    border: 1px solid var(--vn-rule);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-teal {
    background: var(--vn-surface);
    border: 1px solid var(--vn-rule);
    border-left: 3px solid var(--vn-teal);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-purple {
    background: var(--vn-surface);
    border: 1px solid var(--vn-rule);
    border-left: 3px solid var(--vn-purple);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  /* Inset/dark panel — used for call-out blocks */
  .vn-panel-ink {
    background: var(--vn-ink);
    border: none;
    padding: clamp(24px, 3vw, 40px);
    position: relative;
    color: var(--vn-bg);
  }

  /* ────────────────────────────────────────────────────
     SECTION LAYOUT
  ──────────────────────────────────────────────────── */
  .vn-section {
    padding: clamp(64px, 10vw, 120px) clamp(20px, 6vw, 80px);
  }

  .vn-section-tight {
    padding: clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px);
  }

  /* Asymmetric editorial grid */
  .vn-grid-asym {
    display: grid;
    grid-template-columns: 1fr 2.4fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  .vn-grid-asym-r {
    display: grid;
    grid-template-columns: 2.4fr 1fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  /* 3-column divider grid — panels touch, divided by 1px rule lines */
  .vn-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--vn-rule);
  }
  .vn-grid-3 > * { background: var(--vn-surface); }

  .vn-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--vn-rule);
  }
  .vn-grid-2 > * { background: var(--vn-surface); }

  @media (max-width: 900px) {
    .vn-grid-asym, .vn-grid-asym-r { grid-template-columns: 1fr; }
    .vn-grid-3 { grid-template-columns: 1fr; }
    .vn-grid-2 { grid-template-columns: 1fr; }
  }

  /* ────────────────────────────────────────────────────
     ANIMATIONS
  ──────────────────────────────────────────────────── */
  @keyframes vn-pulse-draw {
    0%   { stroke-dashoffset: 1000; opacity: 0.2; }
    30%  { opacity: 0.8; }
    100% { stroke-dashoffset: 0; opacity: 0.55; }
  }

  @keyframes vn-pulse-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }

  @keyframes vn-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes vn-slide-in {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }

  @keyframes vn-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   DIAGNOSTIC PULSE SVG — signature visual element
   On the linen background, teal stroke reads clearly as a hard ink line.
   No glow filter. No blur. Just precise stroke on warm paper.
───────────────────────────────────────────────────────────────────────────── */
export function DiagnosticPulse({ style = {}, color = "#0D8FAF", opacity = 0.55 }) {
  return (
    <svg
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 80, display: "block", overflow: "visible", opacity, ...style }}
      aria-hidden="true"
    >
      <polyline
        points="
          0,40 80,40 110,40
          120,10 135,70 150,20 165,60
          180,40 220,40 240,40
          260,15 275,65 290,22 305,58
          320,40 400,40 430,40
          445,5 460,75 475,18 490,62
          505,40 560,40 590,40
          605,25 618,55 632,30 645,50
          660,40 720,40 800,40
        "
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{
          animation: "vn-pulse-draw 2.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards",
        }}
      />
      {/* Scan glint */}
      <rect x="0" y="0" width="40" height="80"
        fill="url(#scan-grad)"
        style={{ animation: "vn-pulse-scan 3.2s linear 0.6s infinite" }}
      />
      <defs>
        <linearGradient id="scan-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="0" />
          <stop offset="50%"  stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRUCTURAL GRID BACKGROUND
   On linen: warm #C8C2B6 dots at 28px grid.
   Reads as technical graph paper — industrial, calibrated, not decorative.
───────────────────────────────────────────────────────────────────────────── */
function StructuralGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          0,
        pointerEvents:   "none",
        backgroundImage: "radial-gradient(circle, #C8C2B6 1px, transparent 1px)",
        backgroundSize:  "28px 28px",
        backgroundPosition: "0 0",
        opacity:         0.55,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage]           = useState("Home");
  const [results, setResults]     = useState(null);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const go = (p) => {
    if (p.startsWith("Article_")) {
      setArticleId(p.replace("Article_", ""));
      setPage("Article");
    } else {
      if (p !== "Results") setResults(null);
      setPage(p);
    }
  };

  const handleAssessmentComplete = (r) => {
    setResults(r);
    setPage("Results");
  };

  const isFullscreen = page === "Assessment" || page === "Results";

  const renderPage = () => {
    switch (page) {
      case "Home":       return <HomePage       setPage={go} />;
      case "Solutions":  return <SolutionsPage  setPage={go} />;
      case "The Vault":  return <VaultPage      setPage={go} />;
      case "About":      return <AboutPage      setPage={go} />;
      case "Assessment": return <AssessmentPage setPage={go} onComplete={handleAssessmentComplete} />;
      case "Results":    return <SystemInitializedPage results={results} setPage={go} />;
      case "Article":    return <BlogPage       articleId={articleId} setPage={go} />;
      case "Terms":      return <TermsPage      setPage={go} />;
      case "Privacy":    return <PrivacyPage    setPage={go} />;
      default:           return <HomePage       setPage={go} />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <div style={{
        background: "var(--vn-bg)",
        minHeight:  "100vh",
        position:   "relative",
        zIndex:     1,
      }}>
        <StructuralGrid />
        <div style={{ position: "relative", zIndex: 2 }}>
          {!isFullscreen && <Nav page={page} setPage={go} />}
          {renderPage()}
          {!isFullscreen && <Footer setPage={go} />}
        </div>
      </div>
    </>
  );
}