import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "18", border: `1px solid ${color}44`, borderRadius: 4, padding: "3px 12px", fontSize: 10, color, fontFamily: "'Courier New', monospace", letterSpacing: 3, textTransform: "uppercase", display: "inline-block" }}>{text}</span>
);
const GBox = ({ children, style = {}, accent = C.purple }) => (
  <div style={{ background: C.panel, border: `1px solid ${accent}33`, borderRadius: 12, ...style }}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", style = {} }) => (
  <button onClick={onClick} style={{
    background: variant === "primary" ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent",
    border: variant === "primary" ? "none" : `1px solid ${C.border}`,
    borderRadius: 8, padding: "13px 28px", color: variant === "primary" ? "#fff" : C.light,
    fontSize: 13, cursor: "pointer", fontFamily: "'Courier New', monospace",
    fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
    boxShadow: variant === "primary" ? `0 0 30px ${C.purple}44` : "none", ...style,
  }}>{children}</button>
);

const credentials = [
  { label: "Military Police & Ordnance Officer", detail: "U.S. Army Reserve — operational discipline, security protocols, mission-critical execution under pressure" },
  { label: "Cross-Dock Supervisor", detail: "Hormel Foods — logistics management, high-volume distribution operations, workforce coordination" },
  { label: "Branch Manager", detail: "Airgas — led company's largest branch, P&L ownership, full operational accountability" },
  { label: "C-17 Program Manager", detail: "DoD contractor — complex multi-stakeholder program management, technical documentation, compliance systems" },
  { label: "Business Intelligence Analyst", detail: "AFICC, U.S. Air Force (civilian) — enterprise data infrastructure, AI integration, operational reporting systems" },
  { label: "M.S. Transportation & Logistics Management", detail: "Graduate-level systems thinking applied to industrial operations and supply chain intelligence" },
];

const values = [
  { title: "Precision", body: "Every system we build is designed to eliminate ambiguity. Clear data. Clear processes. Clear accountability.", color: C.purple },
  { title: "Security", body: "Operational knowledge is an asset. We build systems that protect it, document it, and keep it inside your organization — not dependent on any single person.", color: C.teal },
  { title: "Intelligence", body: "Not just data. Not just dashboards. The architecture that turns operational information into the ability to actually lead.", color: C.amber },
];

export default function AboutPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white }}>
      {/* HERO */}
      <section style={{ padding: "140px clamp(20px,6vw,80px) 80px", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.bg} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, background: C.purple + "0E", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <Pill text="The Architect" color={C.teal} />
            <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, margin: "20px 0 24px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
              Precision.<br />Security.<br />
              <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Intelligence.
              </span>
            </h1>
            <p style={{ fontSize: 17, color: C.light, lineHeight: 1.85, margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
              Vault Neuron was built by someone who has run operations, not just consulted on them. From military logistics and distribution management to program management and enterprise business intelligence — the architecture we design comes from having lived inside the kinds of operations we fix.
            </p>
            <p style={{ fontSize: 17, color: C.light, lineHeight: 1.85, margin: "0 0 32px", fontFamily: "Georgia, serif" }}>
              We don't pitch strategy and leave. We design the actual infrastructure, build it, and stay inside your operation until it works.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
              <Btn variant="secondary" onClick={() => setPage("Solutions")}>See the System</Btn>
            </div>
          </div>

          {/* Photo placeholder / logo display */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{
              width: 280, height: 340, borderRadius: 16,
              background: `linear-gradient(135deg, ${C.panel2}, ${C.mid})`,
              border: `1px solid ${C.purple}33`,
              boxShadow: `0 0 60px ${C.purple}20`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 16,
            }}>
              <img src="/logo.png" alt="Vault Neuron" style={{ width: 80, height: 80, objectFit: "contain", opacity: 0.7 }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: C.white, letterSpacing: 2, fontFamily: "'Courier New', monospace" }}>
                  <span style={{ color: C.purple }}>AMBER</span><br />
                  <span style={{ color: C.teal }}>LYNEN</span>
                </div>
                <div style={{ fontSize: 11, color: C.slate, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginTop: 8 }}>Founder & Principal Architect</div>
              </div>
            </div>
            <div style={{ background: C.panel2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.slate, letterSpacing: 2, fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>Lynen Iron Legacy LLC</div>
              <div style={{ fontSize: 12, color: C.teal, fontFamily: "Georgia, serif", marginTop: 4 }}>Vault Neuron DBA · Ohio</div>
            </div>
          </div>
        </div>
      </section>

      {/* BACKGROUND */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: C.dark }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill text="Background" color={C.purple} />
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
              Operations experience across every level.
            </h2>
            <p style={{ fontSize: 16, color: C.light, maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontFamily: "Georgia, serif" }}>
              The architecture Vault Neuron builds isn't theoretical. It's built on having run operations where the cost of fragmentation was real — and the solution had to actually work.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {credentials.map(({ label, detail }) => (
              <GBox key={label} accent={C.purple} style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.white, fontFamily: "Georgia, serif", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: C.light, fontFamily: "Georgia, serif", lineHeight: 1.6 }}>{detail}</div>
                </div>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill text="The Foundation" color={C.teal} />
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
              Three principles. One architecture.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {values.map(({ title, body, color }) => (
              <GBox key={title} accent={color} style={{ padding: 36, textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: "Georgia, serif", marginBottom: 16 }}>{title}</div>
                <p style={{ fontSize: 15, color: C.light, lineHeight: 1.8, margin: 0, fontFamily: "Georgia, serif" }}>{body}</p>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* DECISION HUB CONCEPT */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", background: C.dark }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <GBox accent={C.purple} style={{ padding: "48px 44px", textAlign: "center" }}>
            <Pill text="The Vault Neuron Philosophy" color={C.purple} />
            <blockquote style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 900, color: C.white, margin: "24px 0 20px", fontFamily: "Georgia, serif", lineHeight: 1.5, fontStyle: "italic" }}>
              "Every operation has a Decision Hub — the place where data, people, and processes should converge into clear action. Most companies never build it. That's what we do."
            </blockquote>
            <p style={{ fontSize: 13, color: C.slate, fontFamily: "'Courier New', monospace", letterSpacing: 2, margin: 0 }}>— AMBER LYNEN, FOUNDER</p>
          </GBox>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>
            Ready to see what your operation is missing?
          </h2>
          <p style={{ fontSize: 16, color: C.light, lineHeight: 1.8, margin: "0 auto 32px", fontFamily: "Georgia, serif" }}>
            The Operational Readiness Assessment is free, takes 5 minutes, and maps the exact gaps in your architecture.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
            <Btn variant="secondary" onClick={() => setPage("Solutions")}>See the Full System</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
