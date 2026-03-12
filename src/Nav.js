import { useState, useEffect } from "react";
import { C } from "./tokens";

export function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(7,7,15,0.97)" : "transparent",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.3s ease",
      padding: "0 clamp(16px,5vw,80px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 70,
    }}>
      <button onClick={() => setPage("Home")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 12, padding: 0,
      }}>
        <img src="/logo.png" alt="Vault Neuron" style={{ height: 42, width: 42, objectFit: "contain" }} />
        <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: 2.5, fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>
          <span style={{ color: C.purple }}>VAULT</span><span style={{ color: C.teal }}>NEURON</span>
        </span>
      </button>

      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {["Home", "Solutions", "The Vault", "About"].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: page === p ? C.panel2 : "transparent",
            border: `1px solid ${page === p ? C.border : "transparent"}`,
            borderRadius: 6, padding: "7px 16px",
            color: page === p ? C.white : C.slate,
            fontSize: 12, cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            letterSpacing: 1.5, textTransform: "uppercase",
            transition: "all 0.15s",
          }}>{p}</button>
        ))}
        <button onClick={() => setPage("Assessment")} style={{
          marginLeft: 12,
          background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
          border: "none", borderRadius: 6, padding: "9px 20px",
          color: "#fff", fontSize: 12, cursor: "pointer",
          fontFamily: "'Courier New', monospace",
          fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
          boxShadow: `0 0 24px ${C.purple}55`,
        }}>Run Diagnostic →</button>
      </div>
    </nav>
  );
}

export function Footer({ setPage }) {
  const lnk = {
    background: "none", border: "none", cursor: "pointer",
    color: C.slate, fontSize: 13, fontFamily: "Georgia, serif",
    padding: "5px 0", display: "block", textAlign: "left",
  };
  return (
    <footer style={{ background: C.dark, borderTop: `1px solid ${C.border}`, padding: "64px clamp(20px,6vw,80px) 36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/logo.png" alt="Vault Neuron" style={{ height: 44, objectFit: "contain" }} />
            <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: 2.5, fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>
              <span style={{ color: C.purple }}>VAULT</span><span style={{ color: C.teal }}>NEURON</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: C.slate, lineHeight: 1.9, fontFamily: "Georgia, serif", maxWidth: 290, margin: "0 0 12px" }}>
            Architecting Operational Intelligence for industrial distributors and controls companies.
          </p>
          <p style={{ fontSize: 11, color: C.border, fontFamily: "'Courier New', monospace", letterSpacing: 1, margin: 0 }}>
            A division of Lynen Iron Legacy LLC
          </p>
        </div>

        <div>
          <p style={{ fontSize: 10, color: C.slate, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Navigation</p>
          {["Home", "Solutions", "The Vault", "About"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={lnk}>{p}</button>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 10, color: C.slate, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Resources</p>
          <button onClick={() => setPage("Assessment")} style={lnk}>Operational Readiness Assessment</button>
          <button onClick={() => setPage("The Vault")} style={lnk}>Infrastructure Friction Audit</button>
          <button onClick={() => setPage("The Vault")} style={lnk}>15-Point Friction Checklist</button>
        </div>

        <div>
          <p style={{ fontSize: 10, color: C.slate, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Contact</p>
          <p style={{ fontSize: 13, color: C.white, fontFamily: "Georgia, serif", margin: "0 0 8px" }}>Vault Neuron</p>
          <a href="mailto:connect@vaultneuron.com" style={{ fontSize: 13, color: C.teal, fontFamily: "Georgia, serif", display: "block", marginBottom: 20, textDecoration: "none" }}>
            connect@vaultneuron.com
          </a>
          <button onClick={() => setPage("Assessment")} style={{
            background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
            border: "none", borderRadius: 6, padding: "9px 18px",
            color: "#fff", fontSize: 12, cursor: "pointer",
            fontFamily: "'Courier New', monospace", letterSpacing: 1,
          }}>Schedule Consultation</button>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12, color: C.slate, margin: 0, fontFamily: "Georgia, serif" }}>© 2026 Vault Neuron. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", cursor: "pointer", color: C.slate, fontSize: 12, fontFamily: "Georgia, serif", textDecoration: "underline" }}>
              {p === "Privacy" ? "Privacy Policy" : "Terms of Service"}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
