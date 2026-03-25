/**
 * tokens.js — Vault Neuron Design System v4
 *
 * DIRECTION: Dark industrial — stripped of every AI startup signal.
 *
 * What made it look like "every other AI site":
 *   - Navy/blue-cast backgrounds (#07070F, #0B0B18) → these ARE the AI startup color
 *   - Gradient fills on cards and sections
 *   - Glowing blurred radial backgrounds (filter: blur())
 *   - Neon-bright teal/purple (#4db8e8, #7b5cf5) used as fills
 *   - Frosted glass nav with backdrop-filter
 *
 * What replaces it:
 *   - True near-black with zero blue cast: #0A0A0A, #111111, #1A1A1A
 *   - Charcoal warm-gray surfaces: #1E1C1A, #252320
 *   - All backgrounds are flat — no gradients, no glows, no blurs
 *   - Teal #2A9BB5 — deeper, less neon, reads as industrial marking ink
 *   - Purple #6B4FD8 — deeper, less neon, reads as a printed label color
 *   - Both used ONLY for text accents, rule lines, borders, tags
 *   - Text hierarchy: off-white #E8E4DC → warm gray #A09890 → dim #5A5550
 *   - Borders are visible warm charcoal #2E2B28 — not blue, not glowing
 *
 * The existing page components use C.white, C.light, C.dark, C.bg, etc.
 * All legacy aliases are preserved and mapped to the new palette so nothing breaks.
 */

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   COLOR TOKENS
───────────────────────────────────────────────────────────────────────────── */
export const C = {
  // ── Core surfaces — true near-black, zero blue cast ──
  bg:      "#0A0A0A",   // page background: true black, not navy
  dark:    "#111111",   // primary dark surface (replaces #07070F)
  mid:     "#1A1A1A",   // mid surface (replaces #0F0F20 blue-cast)
  panel:   "#1E1C1A",   // panel background — warm dark charcoal
  panel2:  "#252320",   // slightly lighter panel
  border:  "#2E2B28",   // border: warm charcoal, visible but not glowing
  borderMid: "#3D3935", // mid border for emphasis

  // ── Accent colors — ink weight, not neon ──
  // Used for: text, border accents, rule lines, tags. NEVER as background fills.
  teal:    "#2A9BB5",   // industrial teal — deeper than #4db8e8, less neon
  tealL:   "#3DBCD8",   // lighter teal for hover states only
  tealD:   "#1A6B7D",   // dark teal for emphasis text on dark bg
  purple:  "#6B4FD8",   // ink purple — deeper than #7b5cf5
  purpleL: "#8B72F0",   // lighter purple for hover
  purpleD: "#4A35A0",   // dark purple
  amber:   "#C8922A",   // warm amber — unchanged, already correct
  amberL:  "#E5B554",

  // ── Text hierarchy — warm, not cold gray ──
  white:   "#E8E4DC",   // primary text: warm off-white, NOT pure white
  light:   "#C4BFB8",   // secondary text
  slate:   "#8A8480",   // muted text
  muted:   "#8A8480",   // alias
  faint:   "#5A5550",   // dim text / placeholders

  // ── Status ──
  green:   "#22A566",
  red:     "#D44A3A",

  // ── Additional legacy aliases used by existing components ──
  offWhite: "#E8E4DC",
  borderDark: "#222020",
};

/* ─────────────────────────────────────────────────────────────────────────────
   TYPOGRAPHY CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
export const T = {
  display: "'Barlow Condensed', 'Impact', sans-serif",
  mono:    "'Courier New', 'Courier', monospace",

  headline: {
    fontFamily:    "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight:    800,
    lineHeight:    0.92,
    letterSpacing: "-0.01em",
    textTransform: "uppercase",
    color:         "#E8E4DC",
  },
  headlineXl: {
    fontFamily:    "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight:    900,
    lineHeight:    0.88,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color:         "#E8E4DC",
  },
  label: {
    fontFamily:    "'Courier New', 'Courier', monospace",
    fontSize:      10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "#8A8480",
  },
  labelTeal: {
    fontFamily:    "'Courier New', 'Courier', monospace",
    fontSize:      10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "#2A9BB5",
  },
  body: {
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize:   13,
    lineHeight: 1.75,
    color:      "#C4BFB8",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
export const useFade = (delay = 0) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return {
    style: {
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    },
  };
};

export const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

/**
 * Tag — spec label badge, border only, no fill background
 * On dark: teal/purple border + matching text is clearly visible
 */
export const Tag = ({ text, variant = "teal", color }) => {
  const variants = {
    teal:   { border: "1px solid #2A9BB5", color: "#2A9BB5" },
    purple: { border: "1px solid #6B4FD8", color: "#8B72F0" },
    amber:  { border: "1px solid #C8922A", color: "#C8922A" },
    muted:  { border: "1px solid #3D3935", color: "#8A8480" },
  };
  const v = variants[variant] || variants.teal;
  // Legacy: if color hex passed directly, use it
  const legacyBorder = color ? `1px solid ${color}55` : v.border;
  const legacyColor  = color || v.color;
  return (
    <span style={{
      display:       "inline-block",
      fontFamily:    "'Courier New', monospace",
      fontSize:      9,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      padding:       "3px 10px",
      border:        legacyBorder,
      color:         legacyColor,
      background:    "transparent",
      whiteSpace:    "nowrap",
    }}>{text}</span>
  );
};

/** Slash — 3px vertical accent bar, used before headlines and list items */
export const Slash = ({ color = "#2A9BB5", height = "1em", width = 3, style = {} }) => (
  <span aria-hidden="true" style={{
    display:    "inline-block",
    width,
    height,
    background: color,
    flexShrink: 0,
    alignSelf:  "center",
    ...style,
  }} />
);

/** RuleLabel — horizontal rule with inline text label */
export const RuleLabel = ({ children, color = "#2A9BB5", style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, ...style }}>
    <span style={{ flex: "0 0 40px", height: 1, background: color,     display: "block" }} />
    <span style={{
      fontFamily:    "'Courier New', monospace",
      fontSize:      10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color:         "#8A8480",
      whiteSpace:    "nowrap",
    }}>{children}</span>
    <span style={{ flex: 1, height: 1, background: "#2E2B28", display: "block" }} />
  </div>
);

/** IndexMark — section index number, e.g. "01" */
export const IndexMark = ({ n, style = {} }) => (
  <div style={{
    fontFamily:    "'Courier New', monospace",
    fontSize:      11,
    letterSpacing: "0.15em",
    color:         "#5A5550",
    userSelect:    "none",
    paddingTop:    4,
    ...style,
  }}>{String(n).padStart(2, "0")}</div>
);

/** SectionLabel — teal overline label above a headline */
export const SectionLabel = ({ children, style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, ...style }}>
    <Slash color="#2A9BB5" height={12} />
    <span style={{
      fontFamily:    "'Courier New', monospace",
      fontSize:      10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color:         "#2A9BB5",
    }}>{children}</span>
  </div>
);