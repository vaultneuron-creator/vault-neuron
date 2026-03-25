/**
 * tokens.js — Vault Neuron Design System v3
 *
 * DESIGN DIRECTION: Light industrial — NOT dark AI startup.
 *
 * Reference: machinery spec sheets, industrial equipment catalogs,
 * process engineering documents. The buyer knows what these look like.
 * They trust them. That's the register.
 *
 * Background: #F0EDE6 — warm bone/linen, not white, not gray
 * Surfaces:   #E8E4DC — slightly darker bone for panels
 * Ink:        #0F0F0F — near-black, heavy
 * Teal:       #0D8FAF — deeper, less neon. Used as ink accent, not glow
 * Purple:     #5B3FD4 — true ink purple. Sparingly.
 * Rule lines: #C8C2B6 — warm mid-tone, reads as printed spec rule
 *
 * The site should feel typeset — not designed in Figma.
 */

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   COLOR TOKENS
───────────────────────────────────────────────────────────────────────────── */
export const C = {
  // ── Page surfaces — warm linen, not white ──
  bg:         "#F0EDE6",
  surface:    "#E8E4DC",
  surface2:   "#DDD8CF",
  ink:        "#0F0F0F",
  inkMid:     "#3A3632",
  inkLight:   "#6B6560",
  rule:       "#C8C2B6",
  ruleDark:   "#A09990",

  // ── Accent inks — used as color, not glow ──
  teal:       "#0D8FAF",
  tealMid:    "#1AABCF",
  tealInk:    "#094F61",
  purple:     "#5B3FD4",
  purpleMid:  "#7B5CF5",
  amber:      "#A8620A",

  // ── Status ──
  green:      "#1A6B3A",
  red:        "#B33A2A",

  // ── Legacy aliases — keeps existing page components from breaking ──
  dark:       "#0F0F0F",
  mid:        "#E8E4DC",
  panel:      "#E8E4DC",
  panel2:     "#DDD8CF",
  border:     "#C8C2B6",
  borderMid:  "#A09990",
  white:      "#F0EDE6",
  offWhite:   "#E8E4DC",
  muted:      "#6B6560",
  faint:      "#A09990",
  slate:      "#6B6560",
  light:      "#3A3632",
  purpleL:    "#7B5CF5",
  purpleD:    "#3A2490",
  tealL:      "#1AABCF",
  amberL:     "#D4820E",
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
    color:         "#0F0F0F",
  },
  headlineXl: {
    fontFamily:    "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight:    900,
    lineHeight:    0.88,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color:         "#0F0F0F",
  },
  label: {
    fontFamily:    "'Courier New', 'Courier', monospace",
    fontSize:      10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "#6B6560",
  },
  labelTeal: {
    fontFamily:    "'Courier New', 'Courier', monospace",
    fontSize:      10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "#0D8FAF",
  },
  body: {
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize:   13,
    lineHeight: 1.75,
    color:      "#3A3632",
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

/** Tag — printed-spec label badge, border only */
export const Tag = ({ text, variant = "teal", color }) => {
  const variants = {
    teal:   { border: "1px solid #0D8FAF", color: "#0D8FAF" },
    purple: { border: "1px solid #5B3FD4", color: "#5B3FD4" },
    amber:  { border: "1px solid #A8620A", color: "#A8620A" },
    muted:  { border: "1px solid #A09990", color: "#6B6560" },
  };
  const v = variants[variant] || variants.teal;
  return (
    <span style={{
      display:       "inline-block",
      fontFamily:    "'Courier New', monospace",
      fontSize:      9,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      padding:       "3px 10px",
      border:        color ? `1px solid ${color}` : v.border,
      color:         color || v.color,
      background:    "transparent",
      whiteSpace:    "nowrap",
    }}>{text}</span>
  );
};

/** Slash — 3px vertical accent bar */
export const Slash = ({ color = "#0D8FAF", height = "1em", width = 3, style = {} }) => (
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

/** RuleLabel — rule line with label */
export const RuleLabel = ({ children, color = "#0D8FAF", style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, ...style }}>
    <span style={{ flex: "0 0 40px", height: 1, background: color, display: "block" }} />
    <span style={{
      fontFamily:    "'Courier New', monospace",
      fontSize:      10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color:         "#6B6560",
      whiteSpace:    "nowrap",
    }}>{children}</span>
    <span style={{ flex: 1, height: 1, background: "#C8C2B6", display: "block" }} />
  </div>
);

/** IndexMark — section number */
export const IndexMark = ({ n, style = {} }) => (
  <div style={{
    fontFamily:    "'Courier New', monospace",
    fontSize:      11,
    letterSpacing: "0.15em",
    color:         "#A09990",
    userSelect:    "none",
    paddingTop:    4,
    ...style,
  }}>{String(n).padStart(2, "0")}</div>
);

/** SectionLabel — teal overline above a headline */
export const SectionLabel = ({ children, style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, ...style }}>
    <Slash color="#0D8FAF" height={12} />
    <span style={{
      fontFamily:    "'Courier New', monospace",
      fontSize:      10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color:         "#0D8FAF",
    }}>{children}</span>
  </div>
);