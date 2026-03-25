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
   GLOBAL STYLES — v4
   Dark industrial. Zero AI startup signals.

   What made it look like "every other AI site":
     1. Navy/blue-cast backgrounds — they have a specific association with AI products
     2. Gradient fills on sections and cards (linear-gradient, radial-gradient as bg)
     3. Blurred radial glow decorations (filter: blur(100px) on colored divs)
     4. Neon-bright accent colors used as fills
     5. Frosted glass nav (backdrop-filter)

   What this system uses instead:
     - True near-black #0A0A0A background — no blue cast whatsoever
     - Warm charcoal surfaces #1E1C1A / #252320 — reads as matte steel, not tech
     - ALL section backgrounds are flat single colors
     - Teal #2A9BB5 and Purple #6B4FD8 only on: text, rule lines, borders, tags
     - No backdrop-filter anywhere
     - No box-shadow glows
     - Barlow Condensed 800/900 for all headlines — heavy, condensed, uppercase
       This is the single biggest visual differentiator. It reads like a
       manufacturing company nameplate, not a SaaS landing page.
     - Courier New body — precision instrument aesthetic, familiar to operators
     - Dot grid: warm charcoal #2E2B28 on #0A0A0A — reads as graph paper / spec sheet

   Small business owner read: "This person knows operations. This is not a gadget."
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700;1,800&display=swap');

  :root {
    /* ── Surfaces — zero blue cast ── */
    --vn-bg:         #0A0A0A;
    --vn-dark:       #111111;
    --vn-mid:        #1A1A1A;
    --vn-panel:      #1E1C1A;
    --vn-panel-2:    #252320;
    --vn-border:     #2E2B28;
    --vn-border-mid: #3D3935;

    /* ── Accent inks — visible on dark, used as COLOR not fill ── */
    --vn-teal:       #2A9BB5;
    --vn-teal-l:     #3DBCD8;
    --vn-teal-d:     #1A6B7D;
    --vn-purple:     #6B4FD8;
    --vn-purple-l:   #8B72F0;
    --vn-amber:      #C8922A;

    /* ── Text — warm, not cold gray ── */
    --vn-white:      #E8E4DC;
    --vn-light:      #C4BFB8;
    --vn-slate:      #8A8480;
    --vn-faint:      #5A5550;

    /* ── Status ── */
    --vn-green:      #22A566;
    --vn-red:        #D44A3A;

    /* ── Typography ── */
    --font-display:  'Barlow Condensed', 'Impact', sans-serif;
    --font-mono:     'Courier New', 'Courier', monospace;

    /* ── Motion ── */
    --ease-snap:     cubic-bezier(0.16, 1, 0.3, 1);
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
    color: var(--vn-light);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.65;
    min-height: 100vh;
  }

  /* ── Scrollbar — warm charcoal, not blue ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--vn-bg); }
  ::-webkit-scrollbar-thumb { background: var(--vn-border-mid); }
  ::-webkit-scrollbar-thumb:hover { background: var(--vn-teal); }

  /* ── Selection ── */
  ::selection {
    background: rgba(42, 155, 181, 0.25);
    color: var(--vn-white);
  }

  /* ── Focus ── */
  :focus-visible {
    outline: 1px solid var(--vn-teal);
    outline-offset: 2px;
  }
  button:focus:not(:focus-visible) { outline: none; }

  /* ────────────────────────────────────────────────────
     TYPOGRAPHY UTILITIES
     Barlow Condensed is the visual anchor of the redesign.
     On dark, at large sizes, 800/900 weight reads as a
     nameplate or spec-sheet header — not a startup hero.
  ──────────────────────────────────────────────────── */

  .vn-display-xl {
    font-family: var(--font-display);
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--vn-white);
  }

  .vn-display {
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--vn-white);
  }

  /* Teal headline — used for the key phrase in a large headline */
  .vn-display-teal {
    font-family: var(--font-display);
    font-weight: 800;
    text-transform: uppercase;
    color: var(--vn-teal);
  }

  .vn-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--vn-slate);
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
    color: var(--vn-light);
  }

  /* ────────────────────────────────────────────────────
     STRUCTURAL ELEMENTS
  ──────────────────────────────────────────────────── */

  /* 3px vertical slash — teal or purple, before headlines/list items */
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

  /* Rule lines — warm charcoal, not blue-gray */
  .vn-rule        { border: none; border-top: 1px solid var(--vn-border);     }
  .vn-rule-mid    { border: none; border-top: 1px solid var(--vn-border-mid); }
  .vn-rule-teal   { border: none; border-top: 1px solid var(--vn-teal);       }
  .vn-rule-purple { border: none; border-top: 1px solid var(--vn-purple);     }

  /* Section index mark */
  .vn-index-mark {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--vn-faint);
    user-select: none;
  }

  /* Corner bracket marks — teal, no glow */
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
     Primary: solid teal fill — high contrast on near-black
     Ghost: warm border with warm text
     Both use clip-path notch corner — industrial, not rounded SaaS
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
    transition: background 0.14s var(--ease-snap), border-color 0.14s, transform 0.1s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-primary:hover {
    background: var(--vn-teal-l);
    border-color: var(--vn-teal-l);
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
    color: var(--vn-light);
    background: transparent;
    border: 1px solid var(--vn-border-mid);
    padding: 13px 27px;
    cursor: pointer;
    transition: border-color 0.14s, color 0.14s, transform 0.1s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .vn-btn-ghost:hover {
    border-color: var(--vn-teal);
    color: var(--vn-teal);
    transform: translateY(-1px);
  }

  /* ────────────────────────────────────────────────────
     TAGS / BADGES — border only, no background fill
  ──────────────────────────────────────────────────── */
  .vn-tag        { display: inline-block; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--vn-border-mid); color: var(--vn-slate);  background: transparent; }
  .vn-tag-teal   { border-color: var(--vn-teal);   color: var(--vn-teal);   }
  .vn-tag-purple { border-color: var(--vn-purple);  color: var(--vn-purple-l); }
  .vn-tag-amber  { border-color: var(--vn-amber);   color: var(--vn-amber);  }

  /* ────────────────────────────────────────────────────
     PANELS — flat, warm-charcoal backgrounds, rule borders
     Left-border accent replaces ALL glow/gradient effects
  ──────────────────────────────────────────────────── */
  .vn-panel {
    background: var(--vn-panel);
    border: 1px solid var(--vn-border);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-teal {
    background: var(--vn-panel);
    border: 1px solid var(--vn-border);
    border-left: 3px solid var(--vn-teal);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  .vn-panel-purple {
    background: var(--vn-panel);
    border: 1px solid var(--vn-border);
    border-left: 3px solid var(--vn-purple);
    padding: clamp(24px, 3vw, 40px);
    position: relative;
  }

  /* ────────────────────────────────────────────────────
     GRIDS
  ──────────────────────────────────────────────────── */
  .vn-section       { padding: clamp(64px, 10vw, 120px) clamp(20px, 6vw, 80px); }
  .vn-section-tight { padding: clamp(40px, 6vw, 80px)  clamp(20px, 6vw, 80px); }

  .vn-grid-asym {
    display: grid;
    grid-template-columns: 1fr 2.4fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  .vn-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--vn-border);
  }
  .vn-grid-3 > * { background: var(--vn-panel); }

  .vn-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--vn-border);
  }
  .vn-grid-2 > * { background: var(--vn-panel); }

  @media (max-width: 900px) {
    .vn-grid-asym { grid-template-columns: 1fr; }
    .vn-grid-3    { grid-template-columns: 1fr; }
    .vn-grid-2    { grid-template-columns: 1fr; }
  }

  /* ────────────────────────────────────────────────────
     ANIMATIONS — no glow-related animations
  ──────────────────────────────────────────────────── */
  @keyframes vn-pulse-draw {
    0%   { stroke-dashoffset: 1000; opacity: 0.15; }
    30%  { opacity: 0.7; }
    100% { stroke-dashoffset: 0; opacity: 0.5; }
  }

  @keyframes vn-pulse-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%);  }
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
   DIAGNOSTIC PULSE SVG
   On true near-black, teal #2A9BB5 at 50% opacity reads as a precise
   calibration line — not a neon glow. This is the distinction.
───────────────────────────────────────────────────────────────────────────── */
export function DiagnosticPulse({ style = {}, color = "#2A9BB5", opacity = 0.5 }) {
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
          445,5  460,75 475,18 490,62
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
        style={{ animation: "vn-pulse-draw 2.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}
      />
      <rect x="0" y="0" width="40" height="80"
        fill="url(#vn-scan)"
        style={{ animation: "vn-pulse-scan 3.2s linear 0.6s infinite" }}
      />
      <defs>
        <linearGradient id="vn-scan" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="0"    />
          <stop offset="50%"  stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRUCTURAL GRID
   Warm charcoal dots #2E2B28 on near-black #0A0A0A.
   No blue. Reads as a calibration grid or spec sheet rule — industrial.
───────────────────────────────────────────────────────────────────────────── */
function StructuralGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:           "fixed",
        inset:              0,
        zIndex:             0,
        pointerEvents:      "none",
        backgroundImage:    "radial-gradient(circle, #2E2B28 1px, transparent 1px)",
        backgroundSize:     "28px 28px",
        backgroundPosition: "0 0",
        opacity:            0.7,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT — routing logic unchanged from v1
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