/**
 * tokens.js — Vault Neuron Design System v2
 *
 * DESIGN DIRECTION: Industrial precision, not AI startup.
 * - Teal (#4db8e8) and purple (#7b5cf5) as accent strokes/rule lines ONLY
 * - NO gradient fills, NO glowing backgrounds
 * - Barlow Condensed (display) + Courier New (body/mono)
 * - Heavy negative space, asymmetric grid, structural dot-grid
 *
 * Components exported:
 *   C         — color tokens (mirrors CSS vars for use in inline styles)
 *   T         — typography constants
 *   Tag       — label badge component
 *   Slash     — 3px vertical accent bar (teal default)
 *   RuleLabel — horizontal rule with inline label text
 *   IndexMark — section number indicator (01, 02, etc.)
 *   useFade   — simple fade-up animation hook
 *   useInView — intersection observer hook for scroll-triggered reveals
 */

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   COLOR TOKENS
   These mirror the CSS custom properties defined in App.js GLOBAL_STYLES.
   Use these for inline styles in JSX. Use the CSS vars in className-based styles.
───────────────────────────────────────────────────────────────────────────── */
export const C = {
  // ── Core surfaces ──
  black:      "#0a0a0a",
  nearBlack:  "#0f0f0f",
  surface:    "#141414",
  surface2:   "#1a1a1a",
  border:     "#262626",
  borderMid:  "#333333",

  // ── Accents — stroke/rule/highlight use ONLY ──
  teal:       "#4db8e8",
  tealDim:    "rgba(77, 184, 232, 0.18)",
  tealRule:   "rgba(77, 184, 232, 0.35)",
  purple:     "#7b5cf5",
  purpleDim:  "rgba(123, 92, 245, 0.15)",
  purpleRule: "rgba(123, 92, 245, 0.40)",
  amber:      "#c8922a",

  // ── Text hierarchy ──
  white:      "#f4f4f4",
  offWhite:   "#d4d4d4",
  muted:      "#737373",
  faint:      "#404040",

  // ── Status ──
  green:      "#22c55e",
  red:        "#ef4444",

  // ── Legacy aliases (keeps existing page components from breaking) ──
  bg:       "#0a0a0a",
  dark:     "#0f0f0f",
  mid:      "#141414",
  panel:    "#141414",
  panel2:   "#1a1a1a",
  purpleL:  "#a87fff",
  purpleD:  "#5b3db5",
  tealL:    "#7dd4f8",
  amberL:   "#e5b554",
  slate:    "#737373",
  light:    "#d4d4d4",
};

/* ─────────────────────────────────────────────────────────────────────────────
   TYPOGRAPHY CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
export const T = {
  display:  "'Barlow Condensed', 'Impact', sans-serif",
  mono:     "'Courier New', 'Courier', monospace",

  // Pre-built style objects for common text treatments
  headline: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight: 800,
    lineHeight: 0.92,
    letterSpacing: "-0.01em",
    textTransform: "uppercase",
    color: "#f4f4f4",
  },
  headlineXl: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight: 900,
    lineHeight: 0.88,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: "#f4f4f4",
  },
  label: {
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#737373",
  },
  labelTeal: {
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#4db8e8",
  },
  body: {
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize: 13,
    lineHeight: 1.75,
    color: "#d4d4d4",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */

/**
 * useFade — mounts with a delay then reveals via opacity + translateY
 * Same interface as v1 for backwards compatibility.
 */
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
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    },
  };
};

/**
 * useInView — fires once when the element enters the viewport
 * Returns [ref, isVisible]. Attach ref to any element you want to animate on scroll.
 */
export const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
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
 * Tag — compact label badge
 * v2: cleaner, no background fill, border-only with accent color
 *
 * @param {string} text
 * @param {'teal'|'purple'|'amber'|'muted'} variant
 * @param {string} color — legacy: override with any hex
 */
export const Tag = ({ text, variant = "teal", color }) => {
  const variants = {
    teal:   { border: `1px solid ${C.tealRule}`,   color: C.teal   },
    purple: { border: `1px solid ${C.purpleRule}`, color: C.purple },
    amber:  { border: `1px solid rgba(200,146,42,0.4)`, color: C.amber },
    muted:  { border: `1px solid ${C.borderMid}`,  color: C.muted  },
  };

  const v = variants[variant] || variants.teal;
  const overrideColor = color; // legacy support

  return (
    <span
      style={{
        display:        "inline-block",
        fontFamily:     T.mono,
        fontSize:       9,
        letterSpacing:  "0.22em",
        textTransform:  "uppercase",
        padding:        "3px 10px",
        border:         overrideColor ? `1px solid ${overrideColor}55` : v.border,
        color:          overrideColor || v.color,
        background:     "transparent",
        whiteSpace:     "nowrap",
      }}
    >
      {text}
    </span>
  );
};

/**
 * Slash — 3px vertical accent bar
 * Used inline before headlines or list items to create industrial rhythm
 */
export const Slash = ({ color = C.teal, height = "1em", width = 3, style = {} }) => (
  <span
    aria-hidden="true"
    style={{
      display:      "inline-block",
      width:        width,
      height:       height,
      background:   color,
      flexShrink:   0,
      alignSelf:    "center",
      ...style,
    }}
  />
);

/**
 * RuleLabel — horizontal rule with a centered label
 * Usage: <RuleLabel>Section Title</RuleLabel>
 */
export const RuleLabel = ({ children, color = C.tealRule, style = {} }) => (
  <div
    style={{
      display:    "flex",
      alignItems: "center",
      gap:        16,
      ...style,
    }}
  >
    <span
      style={{
        flex:       "0 0 40px",
        height:     1,
        background: color,
        display:    "block",
      }}
    />
    <span
      style={{
        fontFamily:    T.mono,
        fontSize:      10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color:         C.muted,
        whiteSpace:    "nowrap",
      }}
    >
      {children}
    </span>
    <span
      style={{
        flex:       1,
        height:     1,
        background: C.border,
        display:    "block",
      }}
    />
  </div>
);

/**
 * IndexMark — section index number, e.g. "01"
 * Placed in the left column of asymmetric layouts
 */
export const IndexMark = ({ n, style = {} }) => (
  <div
    style={{
      fontFamily:    T.mono,
      fontSize:      11,
      letterSpacing: "0.15em",
      color:         C.faint,
      userSelect:    "none",
      paddingTop:    4,
      ...style,
    }}
  >
    {String(n).padStart(2, "0")}
  </div>
);

/**
 * SectionLabel — teal overline label used above headlines
 */
export const SectionLabel = ({ children, style = {} }) => (
  <div
    style={{
      display:       "flex",
      alignItems:    "center",
      gap:           10,
      marginBottom:  16,
      ...style,
    }}
  >
    <Slash color={C.teal} height={12} />
    <span
      style={{
        fontFamily:    T.mono,
        fontSize:      10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color:         C.teal,
      }}
    >
      {children}
    </span>
  </div>
);