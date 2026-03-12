import { useState, useEffect } from "react";
import { C } from "./tokens";

const mono = { fontFamily: "'Courier New', monospace" };
const serif = { fontFamily: "Georgia, serif" };

function BootLine({ text, delay, color = C.teal }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      ...mono, fontSize: 12, color: show ? color : "transparent",
      letterSpacing: 1.5, marginBottom: 4, transition: "color 0.2s",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {show && <span style={{ color: C.teal }}>▸</span>}
      {text}
    </div>
  );
}

function PillarBar({ pillar, delay }) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(true);
      setTimeout(() => setPct(pillar.pct), 100);
    }, delay);
    return () => clearTimeout(t);
  }, [delay, pillar.pct]);

  const barColor = pillar.pct >= 80 ? "#10B981" : pillar.pct >= 60 ? C.teal : pillar.pct >= 40 ? C.amber : "#EF4444";

  return (
    <div style={{
      opacity: show ? 1 : 0, transition: "opacity 0.5s",
      background: C.panel, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${pillar.color}`,
      borderRadius: 8, padding: "18px 22px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ ...mono, fontSize: 10, color: pillar.color, letterSpacing: 3, marginBottom: 4 }}>
            PILLAR {pillar.id}
          </div>
          <div style={{ ...serif, fontSize: 14, color: C.white, fontWeight: 700 }}>{pillar.name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: barColor }}>{pillar.pct}%</div>
          <div style={{ ...mono, fontSize: 9, color: C.slate, letterSpacing: 1 }}>{pillar.score}/{pillar.max} pts</div>
        </div>
      </div>
      <div style={{ height: 6, background: C.dark, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${pillar.color}, ${barColor})`,
          borderRadius: 3, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
      <div style={{ ...mono, fontSize: 11, color: C.slate, letterSpacing: 1 }}>{pillar.tier}</div>
    </div>
  );
}

export default function SystemInitializedPage({ results, setPage }) {
  const [phase, setPhase] = useState(0); // 0=boot, 1=results
  const [diagId] = useState(() => {
    const now = new Date();
    const y = now.getFullYear().toString().slice(2);
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const mn = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `VN-${y}${m}${d}-${h}${mn}${s}`;
  });

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2800);
    return () => clearTimeout(t);
  }, []);

  if (!results) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...mono, color: C.slate, fontSize: 13 }}>No diagnostic data found.</div>
    </div>
  );

  const { pillarScores, total, totalMax, totalPct, overallTier, tierColor, name, company } = results;

  const tierRec = {
    "Operational Intelligence Ready": {
      rec: "Your architecture is in strong shape. The priority now is staying ahead of growth — ongoing system evolution as you scale.",
      cta: "Explore The Architecture (Monthly Partnership)",
      ctaPage: "Solutions",
    },
    "Scaling Friction Detected": {
      rec: "You have solid foundations but specific friction points are costing you. A targeted Build engagement can close those gaps fast.",
      cta: "See The Ops Engine →",
      ctaPage: "Solutions",
    },
    "Architecture Stress Identified": {
      rec: "Multiple systems are underperforming and creating compounding friction. This needs a structured Blueprint before anything else is built.",
      cta: "Start with The Blueprint →",
      ctaPage: "Solutions",
    },
    "Critical Operational Fragmentation": {
      rec: "Your operation is running on fragile architecture. Manual processes, disconnected systems, and knowledge gaps are creating real risk. The Blueprint is the starting point.",
      cta: "Run The Blueprint →",
      ctaPage: "Solutions",
    },
  };
  const rec = tierRec[overallTier] || tierRec["Architecture Stress Identified"];

  // BOOT SEQUENCE
  if (phase === 0) return (
    <div style={{
      background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{
          background: C.dark, border: `1px solid ${C.teal}33`,
          borderRadius: 12, padding: "32px 36px",
          boxShadow: `0 0 60px ${C.teal}15`,
        }}>
          <div style={{ ...mono, fontSize: 10, color: C.teal, letterSpacing: 3, marginBottom: 24 }}>
            VAULT NEURON // DIAGNOSTIC ENGINE v2.6
          </div>
          <BootLine text="Initializing Vault Neuron Diagnostic Engine..." delay={100} />
          <BootLine text="Loading operational intelligence modules..." delay={400} />
          <BootLine text="Cross-referencing pillar weights..." delay={700} />
          <BootLine text="Analyzing vendor data architecture..." delay={900} color={C.purple} />
          <BootLine text="Mapping workflow bottlenecks..." delay={1100} color={C.purple} />
          <BootLine text="Scoring decision intelligence layer..." delay={1300} color={C.amber} />
          <BootLine text="Evaluating knowledge resilience..." delay={1500} color={C.amber} />
          <BootLine text="Computing weighted score matrix..." delay={1800} />
          <BootLine text="Generating architecture report..." delay={2100} />
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: C.teal,
              animation: "pulse 1s ease-in-out infinite",
            }} />
            <span style={{ ...mono, fontSize: 11, color: C.teal, letterSpacing: 2 }}>
              ANALYSIS COMPLETE
            </span>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }`}</style>
      </div>
    </div>
  );

  // RESULTS
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px, 5vw, 80px) 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ ...mono, fontSize: 10, color: C.teal, letterSpacing: 4, marginBottom: 16 }}>
            SYSTEM INITIALIZED
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
            Vault Neuron Diagnostic Engine
          </h1>
          <div style={{ ...mono, fontSize: 11, color: C.slate, letterSpacing: 2, marginBottom: 24 }}>
            {diagId} · Analysis Complete
            {(name || company) && ` · ${[name, company].filter(Boolean).join(" — ")}`}
          </div>

          {/* OVERALL SCORE */}
          <div style={{
            display: "inline-block",
            background: C.dark, border: `1px solid ${tierColor}44`,
            borderRadius: 16, padding: "32px 56px",
            boxShadow: `0 0 60px ${tierColor}18`,
          }}>
            <div style={{ ...mono, fontSize: 10, color: C.slate, letterSpacing: 3, marginBottom: 12 }}>
              OPERATIONAL INTELLIGENCE SCORE
            </div>
            <div style={{ ...mono, fontSize: 72, fontWeight: 700, color: tierColor, lineHeight: 1 }}>
              {totalPct}<span style={{ fontSize: 32 }}>%</span>
            </div>
            <div style={{ ...mono, fontSize: 11, color: C.slate, marginTop: 8, letterSpacing: 1 }}>
              {total} / {totalMax} points
            </div>
            <div style={{
              marginTop: 16, display: "inline-block",
              background: tierColor + "18", border: `1px solid ${tierColor}44`,
              borderRadius: 6, padding: "6px 18px",
              ...mono, fontSize: 11, color: tierColor, letterSpacing: 2,
            }}>
              {overallTier.toUpperCase()}
            </div>
          </div>
        </div>

        {/* PILLAR BREAKDOWN */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ ...mono, fontSize: 10, color: C.slate, letterSpacing: 3, marginBottom: 20, textAlign: "center" }}>
            PILLAR BREAKDOWN
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 16 }}>
            {pillarScores.map((p, i) => (
              <PillarBar key={p.id} pillar={p} delay={i * 200} />
            ))}
          </div>
        </div>

        {/* RECOMMENDATION */}
        <div style={{
          background: C.panel, border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${tierColor}`,
          borderRadius: 12, padding: "32px 36px", marginBottom: 40,
        }}>
          <div style={{ ...mono, fontSize: 10, color: tierColor, letterSpacing: 3, marginBottom: 16 }}>
            ARCHITECT'S RECOMMENDATION
          </div>
          <p style={{ ...serif, fontSize: 16, color: C.light, lineHeight: 1.8, margin: "0 0 24px" }}>
            {rec.rec}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => setPage(rec.ctaPage)} style={{
              background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
              border: "none", borderRadius: 8, padding: "12px 28px",
              color: "#fff", fontSize: 13, cursor: "pointer",
              ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
              boxShadow: `0 0 30px ${C.purple}44`,
            }}>{rec.cta}</button>
            <a href="mailto:connect@vaultneuron.com" style={{
              background: "transparent", border: `1px solid ${C.border}`,
              borderRadius: 8, padding: "12px 24px",
              color: C.light, fontSize: 13, cursor: "pointer",
              ...mono, letterSpacing: 1, textDecoration: "none",
              display: "inline-flex", alignItems: "center",
            }}>Schedule a Conversation →</a>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Assessment")} style={{
            background: "transparent", border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "10px 22px",
            color: C.slate, fontSize: 12, cursor: "pointer",
            ...mono, letterSpacing: 1,
          }}>← Retake Assessment</button>
          <button onClick={() => setPage("Home")} style={{
            background: "transparent", border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "10px 22px",
            color: C.slate, fontSize: 12, cursor: "pointer",
            ...mono, letterSpacing: 1,
          }}>← Return Home</button>
        </div>

        <div style={{ marginTop: 40, textAlign: "center", ...mono, fontSize: 10, color: C.border, letterSpacing: 2 }}>
          {diagId} · VAULT NEURON DIAGNOSTIC ENGINE · CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
