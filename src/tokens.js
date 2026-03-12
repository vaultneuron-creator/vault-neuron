import { useState, useEffect } from "react";

export const C = {
  bg:      "#07070F",
  dark:    "#0B0B18",
  mid:     "#0F0F20",
  panel:   "#111128",
  panel2:  "#16163A",
  border:  "#1E1E48",
  purple:  "#7B35ED",
  purpleL: "#A67FF5",
  purpleD: "#4A1FA8",
  teal:    "#1B8FD4",
  tealL:   "#5BB8F5",
  amber:   "#D97706",
  amberL:  "#FCD34D",
  white:   "#F0F4FF",
  slate:   "#7880A0",
  light:   "#B8C2DC",
  green:   "#10B981",
  red:     "#EF4444",
};

export const useFade = (delay = 0) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return {
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    },
  };
};

export const Tag = ({ text, color = C.teal }) => (
  <span style={{
    background: color + "18",
    border: `1px solid ${color}44`,
    borderRadius: 4,
    padding: "3px 12px",
    fontSize: 10,
    color,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 3,
    textTransform: "uppercase",
    display: "inline-block",
  }}>{text}</span>
);
