import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "18", border: `1px solid ${color}44`, borderRadius: 4, padding: "3px 12px", fontSize: 10, color, fontFamily: "'Courier New', monospace", letterSpacing: 3, textTransform: "uppercase", display: "inline-block" }}>{text}</span>
);
const GBox = ({ children, style = {}, accent = C.purple, id }) => (
  <div id={id} style={{ background: C.panel, border: `1px solid ${accent}33`, borderRadius: 12, boxShadow: `0 0 40px ${accent}10, inset 0 1px 0 ${accent}18`, ...style }}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", style = {} }) => (
  <button onClick={onClick} style={{
    background: variant === "primary" ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent",
    border: variant === "primary" ? "none" : `1px solid ${C.border}`,
    borderRadius: 8, padding: "13px 28px", color: variant === "primary" ? "#fff" : C.light,
    fontSize: 13, cursor: "pointer", fontFamily: "'Courier New', monospace",
    fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
    boxShadow: variant === "primary" ? `0 0 30px ${C.purple}44` : "none", transition: "all 0.2s", ...style,
  }}>{children}</button>
);

const phases = [
  {
    step: "Phase 01", name: "The Blueprint", subtitle: "Operational Diagnostic & Architecture Plan",
    color: C.purple, icon: "◈",
    tagline: "Before you can fix what's broken, you have to see all of it.",
    intro: "Most operations aren't broken because of bad people or bad tools. They're broken because the architecture connecting those people and tools was never designed — it evolved. The Blueprint is where that changes.",
    what: "We run a comprehensive operational diagnostic across your entire business — not just one department. We map every point where information breaks down, every manual handoff slowing your team, and every decision your leadership can't make because the data isn't visible.",
    capabilities: ["Full operational workflow audit across all departments", "Vendor data and pricing intelligence gap analysis", "System integration mapping and disconnection points", "Decision intelligence review — what visibility is missing", "Knowledge architecture — what lives in people vs. systems", "AI opportunity identification across the operation"],
    deliverables: ["The Friction Map — visual of every operational bottleneck", "Integration Gap Report — where your systems don't communicate", "AI Opportunity Map — where automation has highest ROI", "12-Month Architecture Plan — your complete roadmap"],
    outcome: "Complete clarity on what's broken and exactly how to fix it — whether you continue with us or not.",
    note: "The Blueprint is a complete standalone engagement. The roadmap is yours regardless of next steps.",
  },
  {
    step: "Phase 02", name: "The Ops Engine", subtitle: "Operational Infrastructure Implementation",
    color: C.teal, icon: "⬡",
    tagline: "Architecture on paper means nothing. This is where it gets built.",
    intro: "We take the Blueprint roadmap and build the connected infrastructure your operation needs. We're not selling you new software — we build the intelligence layer that makes your existing tools work together the way they were supposed to.",
    what: "The Build is fully custom to your operation. Every company gets a system designed around how they actually work. We design, configure, and deploy across every area where the Blueprint identified friction — vendor data, workflows, dashboards, knowledge systems.",
    capabilities: ["Centralized vendor intelligence — pricing, specs, availability, cross-references", "Automated data pipelines eliminating manual entry and copy-paste", "Custom operational dashboards for leadership visibility", "Workflow automation — approvals, onboarding, order tracking, follow-ups", "Exception and alert systems so problems surface before customers do", "Knowledge documentation and process architecture"],
    deliverables: ["Deployed vendor intelligence and lookup system", "Automated workflow integrations across key processes", "Leadership dashboard with real-time operational visibility", "Process documentation and team training"],
    outcome: "An operation that runs faster, with fewer errors, less manual work, and the visibility that lets leadership actually lead.",
    note: null,
  },
  {
    step: "Phase 03", name: "The Architecture", subtitle: "Fractional Operational Intelligence — Ongoing Partnership",
    color: C.amber, icon: "◆",
    tagline: "Your operation keeps evolving. Your architecture should too.",
    intro: "The Architecture is a long-term partnership where we stay embedded in your operation as your fractional operational intelligence architect — continuously improving systems, identifying new friction before it becomes a problem, and evolving your infrastructure as you grow.",
    what: "This is active partnership, not a retainer where we answer questions. We monitor operational health, push improvements, identify emerging gaps, and keep your infrastructure ahead of your growth curve.",
    capabilities: ["Ongoing operational health monitoring and reporting", "Proactive system improvements and optimization", "New workflow automation as the operation scales", "Quarterly operational intelligence reviews with leadership", "Priority access for new initiatives and expansion projects", "Continuous knowledge architecture updates"],
    deliverables: ["Monthly operational intelligence report", "System maintenance and continuous improvement", "Strategic roadmap updates each quarter", "Direct access to your operational architect"],
    outcome: "A continuously evolving intelligence system — and a partner who knows your operation as well as you do.",
    note: null,
  },
];

const areas = [
  { area: "Vendor & Product Data", items: ["Pricing accuracy & speed", "Spec and availability lookup", "Part cross-references", "Backorder visibility"], color: C.purple },
  { area: "Operations & Workflows", items: ["Approval bottlenecks", "Order tracking clarity", "Onboarding friction", "Repetitive admin work"], color: C.teal },
  { area: "Customer-Facing Processes", items: ["Quote turnaround time", "Response speed & accuracy", "Follow-up automation", "Exception alerting"], color: C.amber },
  { area: "Leadership & Decisions", items: ["Real-time dashboards", "Vendor performance data", "Revenue & pipeline visibility", "Proactive problem detection"], color: C.purple },
  { area: "Knowledge & Resilience", items: ["Process documentation", "Single-person dependencies", "Training architecture", "Institutional knowledge capture"], color: C.teal },
];

export default function SolutionsPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white }}>
      {/* HERO */}
      <section style={{ padding: "140px clamp(20px,6vw,80px) 100px", textAlign: "center", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.bg} 100%)` }}>
        <div style={{ position: "absolute", top: "30%", left: "10%", width: 500, height: 500, background: C.purple + "0D", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 350, height: 350, background: C.teal + "0D", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto" }}>
          <Pill text="The Vault Neuron System" color={C.teal} />
          <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, margin: "24px 0 20px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            AI doesn't fix broken systems.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Neither does new software.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: C.light, lineHeight: 1.8, maxWidth: 640, margin: "0 auto 40px", fontFamily: "Georgia, serif" }}>
            We don't fix one workflow or one department. We architect the entire operational intelligence layer — data flows, process design, decision visibility, and knowledge resilience. Every system. The whole operation.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
            <Btn variant="secondary" onClick={() => setPage("About")}>Meet the Architect</Btn>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section style={{ padding: "20px clamp(20px,6vw,80px) 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill text="What We Actually Fix" color={C.amber} />
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
              Every department. Every system. Every gap.
            </h2>
            <p style={{ fontSize: 17, color: C.light, maxWidth: 600, margin: "0 auto", lineHeight: 1.8, fontFamily: "Georgia, serif" }}>
              The bottleneck you see is rarely the one costing you the most. We look at the whole operation before touching anything.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {areas.map(({ area, items, color }) => (
              <GBox key={area} accent={color} style={{ padding: 28 }}>
                <div style={{ width: 4, height: 28, background: color, borderRadius: 2, marginBottom: 16 }} />
                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.white, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>{area}</h3>
                {items.map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.light, fontFamily: "Georgia, serif" }}>{i}</span>
                  </div>
                ))}
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PHASES */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: C.dark }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Pill text="The System" color={C.purple} />
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
              A structured path from fragmentation<br />to operational intelligence.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {phases.map(({ step, name, subtitle, color, icon, tagline, intro, what, capabilities, deliverables, outcome, note }, idx) => (
              <GBox key={name} accent={color} style={{ padding: "44px 40px" }} id={`phase-${idx + 1}`}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start", marginBottom: 32, borderBottom: `1px solid ${color}22`, paddingBottom: 28 }}>
                  <div style={{ textAlign: "center", minWidth: 60 }}>
                    <div style={{ fontSize: 10, color, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 8 }}>{step}</div>
                    <div style={{ fontSize: 36, color, lineHeight: 1 }}>{icon}</div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, color: C.white, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>{name}</h3>
                    <p style={{ fontSize: 12, color, fontFamily: "'Courier New', monospace", letterSpacing: 1, margin: "0 0 10px", textTransform: "uppercase" }}>{subtitle}</p>
                    <p style={{ fontSize: 15, color: C.light, fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0 }}>{tagline}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
                  <div>
                    <p style={{ fontSize: 14, color: C.light, lineHeight: 1.85, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>{intro}</p>
                    <p style={{ fontSize: 14, color: C.light, lineHeight: 1.85, margin: 0, fontFamily: "Georgia, serif" }}>{what}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", margin: "0 0 10px" }}>Capabilities</p>
                    {capabilities.map(c => (
                      <div key={c} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                        <span style={{ color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: 13, color: C.light, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{c}</span>
                      </div>
                    ))}
                    <div style={{ background: color + "10", border: `1px solid ${color}33`, borderRadius: 8, padding: "14px 18px", marginTop: 16, marginBottom: 12 }}>
                      <p style={{ fontSize: 10, color, letterSpacing: 2, fontFamily: "'Courier New', monospace", textTransform: "uppercase", margin: "0 0 8px" }}>Deliverables</p>
                      {deliverables.map(d => (
                        <div key={d} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                          <span style={{ color, fontSize: 10, marginTop: 5, flexShrink: 0 }}>◉</span>
                          <span style={{ fontSize: 13, color: C.white, fontFamily: "Georgia, serif" }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: C.mid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px" }}>
                      <span style={{ fontSize: 10, color: C.slate, letterSpacing: 2, fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>Outcome: </span>
                      <span style={{ fontSize: 13, color: C.light, fontFamily: "Georgia, serif" }}>{outcome}</span>
                    </div>
                    {note && <p style={{ fontSize: 12, color: C.slate, fontFamily: "Georgia, serif", fontStyle: "italic", margin: "10px 0 0", lineHeight: 1.6 }}>{note}</p>}
                  </div>
                </div>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
            Not a tool. Not a consultant.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              The architecture in between.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: C.light, lineHeight: 1.9, margin: "0 auto 36px", maxWidth: 560, fontFamily: "Georgia, serif" }}>
            Consultants deliver decks and leave. SaaS tools give you another subscription. Vault Neuron builds the operational system that makes everything you already have work the way it was supposed to.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
            <Btn variant="secondary" onClick={() => setPage("The Vault")}>Explore Free Resources</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
