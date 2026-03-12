import { useState, useEffect } from "react";
import { C } from "./tokens";

export const CALENDAR_LINK = "https://calendar.app.google/9MuX6FmYUW2SGH3p6";

export function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const navLinks = ["Home", "Solutions", "The Vault", "About"];

  return (
    <>
      <style>{`
        .vn-nav-links { display: flex; gap: 4px; align-items: center; }
        .vn-hamburger { display: none; }
        .vn-mobile-menu { display: none; }
        @media (max-width: 700px) {
          .vn-nav-links { display: none !important; }
          .vn-hamburger { display: flex !important; }
          .vn-mobile-menu.open { display: flex !important; }
        }
      `}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,7,15,0.95)",
        borderBottom: "1px solid rgba(120,128,160,0.25)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
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

        {/* Desktop */}
        <div className="vn-nav-links">
          {navLinks.map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: page === p ? "rgba(123,53,237,0.18)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${page === p ? "rgba(123,53,237,0.5)" : "rgba(255,255,255,0.18)"}`,
              borderRadius: 6, padding: "7px 16px",
              color: page === p ? "#fff" : "rgba(255,255,255,0.88)",
              fontSize: 12, cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              letterSpacing: 1.5, textTransform: "uppercase",
              fontWeight: page === p ? 700 : 500,
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

        {/* Hamburger */}
        <button className="vn-hamburger" onClick={() => setOpen(o => !o)} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6,
          padding: "8px 12px", cursor: "pointer", color: "#fff", fontSize: 18,
        }}>{open ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile menu */}
      <div className={`vn-mobile-menu${open ? " open" : ""}`} style={{
        position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
        background: "rgba(7,7,15,0.98)", borderBottom: "1px solid rgba(120,128,160,0.25)",
        backdropFilter: "blur(24px)",
        flexDirection: "column", padding: "20px clamp(16px,5vw,80px)",
        gap: 8,
      }}>
        {navLinks.map(p => (
          <button key={p} onClick={() => { setPage(p); setOpen(false); }} style={{
            background: page === p ? "rgba(123,53,237,0.18)" : "transparent",
            border: `1px solid ${page === p ? "rgba(123,53,237,0.5)" : "rgba(255,255,255,0.12)"}`,
            borderRadius: 6, padding: "12px 16px",
            color: "rgba(255,255,255,0.88)", fontSize: 13, cursor: "pointer",
            fontFamily: "'Courier New', monospace", letterSpacing: 1.5,
            textTransform: "uppercase", textAlign: "left",
          }}>{p}</button>
        ))}
        <button onClick={() => { setPage("Assessment"); setOpen(false); }} style={{
          background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
          border: "none", borderRadius: 6, padding: "12px 16px",
          color: "#fff", fontSize: 13, cursor: "pointer",
          fontFamily: "'Courier New', monospace", fontWeight: 700,
          letterSpacing: 1.5, textTransform: "uppercase", textAlign: "left",
        }}>Run Diagnostic →</button>
      </div>
    </>
  );
}

export function Footer({ setPage }) {
  const lnk = {
    background: "none", border: "none", cursor: "pointer",
    color: "rgba(255,255,255,0.65)", fontSize: 13, fontFamily: "Georgia, serif",
    padding: "5px 0", display: "block", textAlign: "left",
  };
  return (
    <footer style={{ background: "#0B0B18", borderTop: "1px solid rgba(30,30,72,1)", padding: "64px clamp(20px,6vw,80px) 36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/logo.png" alt="Vault Neuron" style={{ height: 44, objectFit: "contain" }} />
            <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: 2.5, fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>
              <span style={{ color: C.purple }}>VAULT</span><span style={{ color: C.teal }}>NEURON</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontFamily: "Georgia, serif", maxWidth: 290, margin: "0 0 12px" }}>
            Architecting Operational Intelligence for businesses ready to stop patching and start building.
          </p>
          <p style={{ fontSize: 11, color: "rgba(120,128,160,0.6)", fontFamily: "'Courier New', monospace", letterSpacing: 1, margin: 0 }}>
            A division of Lynen Iron Legacy LLC
          </p>
        </div>

        <div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Navigation</p>
          {["Home", "Solutions", "The Vault", "About"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={lnk}>{p}</button>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Resources</p>
          <button onClick={() => setPage("Assessment")} style={lnk}>Operational Readiness Assessment</button>
          <button onClick={() => setPage("The Vault")} style={lnk}>15-Point Friction Checklist</button>
        </div>

        <div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 16, marginTop: 0 }}>Contact</p>
          <p style={{ fontSize: 13, color: "#fff", fontFamily: "Georgia, serif", margin: "0 0 8px" }}>Vault Neuron</p>
          <a href="mailto:connect@vaultneuron.com" style={{ fontSize: 13, color: C.teal, fontFamily: "Georgia, serif", display: "block", marginBottom: 20, textDecoration: "none" }}>
            connect@vaultneuron.com
          </a>
          <a href="https://calendar.app.google/9MuX6FmYUW2SGH3p6" target="_blank" rel="noopener noreferrer" style={{
            background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
            border: "none", borderRadius: 6, padding: "9px 18px",
            color: "#fff", fontSize: 12, cursor: "pointer",
            fontFamily: "'Courier New', monospace", letterSpacing: 1,
            textDecoration: "none", display: "inline-block",
          }}>Schedule Consultation</a>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(30,30,72,1)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, fontFamily: "Georgia, serif" }}>
          © 2026 Vault Neuron · Vault Neuron is a division of Lynen Iron Legacy LLC
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Privacy", "Privacy Policy"], ["Terms", "Terms of Service"]].map(([key, label]) => (
            <button key={key} onClick={() => setPage(key)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.35)", fontSize: 12,
              fontFamily: "Georgia, serif", textDecoration: "underline",
            }}>{label}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}
