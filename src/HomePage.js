import { useState, useEffect } from "react";
import { C, Tag, useFade } from "./tokens";

const PILLARS = [
  { num: 1, color: C.purple,  title: "Data Architecture",       desc: "Pricing accuracy, part lookups, spec sheets, customer data — connected and accessible in real time. No more chasing the right number." },
  { num: 2, color: C.teal,    title: "Workflow & Process Design", desc: "Broken approval chains, manual order tracking, onboarding gaps, repetitive admin work — systematically redesigned and automated across every department." },
  { num: 3, color: C.amber,   title: "Decision Intelligence",    desc: "Leadership visibility into live operations, proactive problem detection, real-time pipeline data. See it before it becomes a crisis." },
  { num: 4, color: C.purpleL, title: "Knowledge Resilience",    desc: "Critical processes documented, systematized, and resilient — so your operation doesn't collapse when one key person leaves or has a bad week." },
];

const PROBLEMS = [
  "Pricing errors reaching customers before your team catches them",
  "Status meetings held just to find out what's actually happening",
  "Critical knowledge living only in someone's head",
  "New software purchased — same chaos running underneath",
  "Orders and approvals tracked in emails and memory",
  "Leadership making decisions on data that's already wrong",
  "A key person leaves and half your processes go with them",
  "Reporting that takes hours to produce and nobody reads",
];

const SERVICES = [
  { tag: "PHASE 01", name: "The Blueprint",             color: C.purple,  desc: "A full operational diagnostic across vendor data, workflows, decision visibility, and knowledge architecture. You get a clear map of what's broken, what's fragile, and what to build first.", deliverable: "Diagnostic Report + Architecture Plan" },
  { tag: "PHASE 02", name: "The Ops Engine",            color: C.teal,    desc: "Implementation of your operational intelligence infrastructure — connected data pipelines, automated workflows, exception alerting, and dashboards your team will actually use.", deliverable: "Built & Deployed Systems" },
  { tag: "PHASE 03", name: "The Architecture",          color: C.amber,   desc: "Ongoing fractional oversight to evolve your architecture as you scale. Monthly strategy, system tuning, and a partner who knows your operation from the inside.", deliverable: "Monthly Retainer Engagement" },
];

export default function HomePage({ setPage }) {
  const hero = useFade(100);
  const sub  = useFade(300);
  const cta  = useFade(500);
  const [activeProb, setActiveProb] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveProb(p => (p + 1) % PROBLEMS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(${C.border}33 1px, transparent 1px), linear-gradient(90deg, ${C.border}33 1px, transparent 1px)`, backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.purple}18 0%, transparent 70%)`, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
          <div {...hero}>
            <div style={{ marginBottom: 24 }}><Tag text="OPERATIONAL INTELLIGENCE ARCHITECTURE" color={C.teal} /></div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 28px", color: C.white }}>
              Your tools aren't the problem.<br />
              <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                The architecture connecting them is.
              </span>
            </h1>
          </div>
          <div {...sub}>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: C.slate, lineHeight: 1.8, maxWidth: 620, margin: "0 auto 20px", fontFamily: "'Georgia', serif" }}>
              Vault Neuron designs the operational intelligence layer that connects your systems,
              automates your workflows, and gives your leadership team real-time visibility —
              across your entire operation. We don't fix one department. We fix the architecture.
            </p>
            <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
              <span style={{ fontFamily: "monospace", fontSize: 13, color: C.amber, letterSpacing: 1 }}>
                ▸ Still dealing with: {PROBLEMS[activeProb]}
              </span>
            </div>
          </div>
          <div {...cta} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Assessment")} style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, border: "none", borderRadius: 8, padding: "14px 32px", color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "'Georgia', serif", fontWeight: 700, letterSpacing: 0.5, boxShadow: `0 0 32px ${C.purple}44` }}>
              Run the Operational Assessment →
            </button>
            <button onClick={() => setPage("Solutions")} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 32px", color: C.light, fontSize: 15, cursor: "pointer", fontFamily: "'Georgia', serif" }}>
              See How It Works
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(transparent, #06060F)`, zIndex: 1 }} />
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Tag text="WHO WE SERVE" color={C.slate} />
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, margin: "20px 0 16px", color: C.white }}>
            Any operation running on broken architecture
          </h2>
          <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.8, maxWidth: 660, margin: "0 auto", fontFamily: "'Georgia', serif" }}>
            Industrial distributors, controls companies, service operations, and product businesse. 
             Your people are excellent. Your products are real.
            But somewhere between the systems, the spreadsheets, and the silence,
            your operation is leaking time, money, and momentum every day.
            The problem isn't your team. It's the architecture underneath them.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} style={{ padding: "20px 24px", background: i % 2 === 0 ? C.panel : C.dark, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: C.red, fontFamily: "monospace", fontSize: 12, marginTop: 3, flexShrink: 0 }}>✕</span>
              <span style={{ fontSize: 14, color: C.light, lineHeight: 1.6, fontFamily: "'Georgia', serif" }}>{p}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28, fontSize: 14, color: C.slate, fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          These aren't software problems. They're architecture problems.
        </p>
      </section>

      {/* FOUR PILLARS */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: C.dark, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Tag text="THE FOUR PILLARS" color={C.purple} />
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, margin: "20px 0 16px", color: C.white }}>
              We don't fix tools. We fix the operation.
            </h2>
            <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.8, maxWidth: 580, margin: "0 auto", fontFamily: "'Georgia', serif" }}>
              Operational fragmentation never lives in just one place. Vault Neuron works across
              every layer — from vendor data accuracy to leadership visibility.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{ background: C.panel, border: `1px solid ${C.border}`, borderTop: `2px solid ${p.color}`, borderRadius: 10, padding: "28px 24px", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${p.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: p.color + "22", border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: p.color, fontFamily: "monospace", marginBottom: 16 }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 700, color: C.white, margin: "0 0 10px" }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.slate, lineHeight: 1.7, fontFamily: "'Georgia', serif", margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Tag text="HOW WE WORK" color={C.teal} />
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, margin: "20px 0 16px", color: C.white }}>
            Three phases. One coherent architecture.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 28, padding: "28px 32px", background: C.panel, border: `1px solid ${C.border}`, borderLeft: `3px solid ${s.color}`, borderRadius: i === 0 ? "10px 10px 0 0" : i === 2 ? "0 0 10px 10px" : 0, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: s.color, letterSpacing: 2, marginBottom: 6 }}>{s.tag}</div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.color + "22", border: `1px solid ${s.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: s.color, fontFamily: "monospace", margin: "0 auto" }}>{i + 1}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: C.slate, lineHeight: 1.7, margin: 0, fontFamily: "'Georgia', serif" }}>{s.desc}</p>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: s.color, background: s.color + "11", border: `1px solid ${s.color}33`, borderRadius: 6, padding: "8px 14px", whiteSpace: "nowrap", textAlign: "center" }}>
                {s.deliverable}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button onClick={() => setPage("Solutions")} style={{ background: "transparent", border: `1px solid ${C.purple}`, borderRadius: 8, padding: "12px 28px", color: C.purpleL, fontSize: 14, cursor: "pointer", fontFamily: "'Georgia', serif" }}>
            Full Service Details →
          </button>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", background: `linear-gradient(135deg, ${C.purple}0A, ${C.teal}0A)`, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: C.white, lineHeight: 1.6, margin: "0 0 24px", fontStyle: "italic" }}>
            "Most consultants tell you what's broken.<br />Vault Neuron builds what replaces it."
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "monospace", fontSize: 11, color: C.slate, letterSpacing: 1 }}>
            <span style={{ width: 32, height: 1, background: C.border, display: "inline-block" }} />
            The layer tools can't replace.
            <span style={{ width: 32, height: 1, background: C.border, display: "inline-block" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Tag text="START HERE" color={C.amber} />
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, margin: "20px 0 16px", color: C.white }}>
            See exactly where your operation is leaking
          </h2>
          <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.8, marginBottom: 36, fontFamily: "'Georgia', serif" }}>
            The Operational Readiness Assessment takes 10 minutes and gives you a scored diagnostic
            across all four pillars — vendor data, workflows, decision visibility, and knowledge resilience.
          </p>
          <button onClick={() => setPage("Assessment")} style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, border: "none", borderRadius: 8, padding: "16px 40px", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "'Georgia', serif", fontWeight: 700, boxShadow: `0 0 48px ${C.purple}33` }}>
            Run My Free Assessment →
          </button>
        </div>
      </section>
    </div>
  );
}
