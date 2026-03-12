import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "3px 12px", fontSize: 10, color, fontFamily: "'Courier New', monospace", letterSpacing: 3, textTransform: "uppercase", display: "inline-block" }}>{text}</span>
);
const GBox = ({ children, style = {}, accent = C.purple }) => (
  <div style={{ background: C.panel, border: `1px solid ${accent}44`, borderRadius: 12, ...style }}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", href, target }) => {
  const base = {
    borderRadius: 8, padding: "13px 28px", fontSize: 13, cursor: "pointer",
    fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
    textDecoration: "none", display: "inline-block",
  };
  if (href) return <a href={href} target={target} rel="noopener noreferrer" style={{ ...base, background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: "#fff", boxShadow: `0 0 30px ${C.purple}44` }}>{children}</a>;
  return <button onClick={onClick} style={{ ...base, background: variant === "primary" ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent", border: variant === "primary" ? "none" : `1px solid rgba(255,255,255,0.2)`, color: variant === "primary" ? "#fff" : "rgba(255,255,255,0.85)", boxShadow: variant === "primary" ? `0 0 30px ${C.purple}44` : "none" }}>{children}</button>;
};

const credentials = [
  { label: "Military Police & Ordnance Officer", detail: "Operational discipline, security protocols, and mission-critical execution under pressure — where systems have to work the first time." },
  { label: "Cross-Dock Supervisor", detail: "High-volume distribution operations, logistics coordination, and workforce management at scale." },
  { label: "Branch Manager", detail: "Full P&L ownership and operational accountability — leading the company's largest branch end to end." },
  { label: "Business Intelligence Analyst", detail: "Enterprise data infrastructure, AI integration, and operational reporting systems within the U.S. Air Force civilian sector." },
  { label: "M.S. Transportation & Logistics Management", detail: "Graduate-level systems thinking applied to industrial operations and supply chain architecture." },
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
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <Pill text="The Architect" color={C.teal} />
            <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, margin: "20px 0 24px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
              Precision.<br />Security.<br />
              <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Intelligence.
              </span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
              Vault Neuron was built by someone who has run operations, not just consulted on them. From military logistics and branch management to program management and enterprise business intelligence — the architecture we design comes from having lived inside the kinds of operations we fix.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 0 32px", fontFamily: "Georgia, serif" }}>
              We don't pitch strategy and leave. We design the actual infrastructure, build it, and stay inside your operation until it works.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
              <Btn variant="secondary" onClick={() => setPage("Solutions")}>See the System</Btn>
            </div>
          </div>

          {/* PHOTO */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 260, height: 320, borderRadius: 16,
              border: `2px solid ${C.purple}44`,
              boxShadow: `0 0 60px ${C.purple}25, 0 0 120px ${C.teal}10`,
              overflow: "hidden", flexShrink: 0,
            }}>
              <img
                src="/amber.jpg"
                alt="Amber Lynen — Founder, Vault Neuron"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: C.white, letterSpacing: 1, fontFamily: "Georgia, serif" }}>Amber Lynen</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginTop: 4 }}>Founder & Principal Architect</div>
              <div style={{ fontSize: 11, color: C.teal, fontFamily: "Georgia, serif", marginTop: 4 }}>Vault Neuron · Lynen Iron Legacy LLC</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: C.dark }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Pill text="Mission & Vision" color={C.teal} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <GBox accent={C.purple} style={{ padding: "36px 32px" }}>
              <div style={{ fontSize: 11, color: C.purple, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Mission</div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.8, margin: 0, fontFamily: "Georgia, serif" }}>
                To eliminate the operational fragmentation that costs growing businesses time, money, and momentum — by building the intelligence architecture that connects their people, systems, and decisions into one coherent operation.
              </p>
            </GBox>
            <GBox accent={C.teal} style={{ padding: "36px 32px" }}>
              <div style={{ fontSize: 11, color: C.teal, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Vision</div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.8, margin: 0, fontFamily: "Georgia, serif" }}>
                A world where no business fails because of broken architecture. Where every leader has the visibility they need, every team operates from reliable systems, and operational intelligence is built — not hoped for.
              </p>
            </GBox>
          </div>
        </div>
      </section>

      {/* BACKGROUND */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill text="Background" color={C.purple} />
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
              Operations experience across every level.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontFamily: "Georgia, serif" }}>
              The architecture Vault Neuron builds isn't theoretical. It's built on having run operations where the cost of fragmentation was real — and the solution had to actually work.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {credentials.map(({ label, detail }) => (
              <GBox key={label} accent={C.purple} style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.white, fontFamily: "Georgia, serif", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "Georgia, serif", lineHeight: 1.6 }}>{detail}</div>
                </div>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: C.dark }}>
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
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0, fontFamily: "Georgia, serif" }}>{body}</p>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY QUOTE */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <GBox accent={C.purple} style={{ padding: "48px 44px", textAlign: "center", background: `linear-gradient(135deg, ${C.panel} 0%, ${C.panel2} 100%)` }}>
            <Pill text="The Vault Neuron Philosophy" color={C.purple} />
            <blockquote style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: "rgba(255,255,255,0.92)", margin: "24px 0 20px", fontFamily: "Georgia, serif", lineHeight: 1.6, fontStyle: "italic" }}>
              "Every operation has a Decision Hub — the place where data, people, and processes should converge into clear action. Most companies never build it. That's what we do."
            </blockquote>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'Courier New', monospace", letterSpacing: 2, margin: 0 }}>— AMBER LYNEN, FOUNDER</p>
          </GBox>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>
            Ready to see what your operation is missing?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 auto 32px", fontFamily: "Georgia, serif" }}>
            The Operational Readiness Assessment is free, takes 5 minutes, and maps the exact gaps in your architecture.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
            <Btn href="https://calendar.app.google/9MuX6FmYUW2SGH3p6" target="_blank">Schedule a Conversation</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
