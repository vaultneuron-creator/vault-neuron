import { useState } from "react";
import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "18", border: `1px solid ${color}44`, borderRadius: 4, padding: "3px 12px", fontSize: 10, color, fontFamily: "'Courier New', monospace", letterSpacing: 3, textTransform: "uppercase", display: "inline-block" }}>{text}</span>
);

const pillars = [
  {
    id: 1, name: "Vendor Data & Pricing Intelligence", color: C.purple, tag: "Data Architecture",
    questions: [
      { id: 1, text: "Vendor price updates reach our quoting system accurately and quickly.", weight: 5 },
      { id: 2, text: "Our team can access part specs, availability, and pricing from one place during a customer interaction.", weight: 5 },
      { id: 3, text: "We can translate customer part numbers to our vendor part numbers quickly and accurately.", weight: 5 },
      { id: 4, text: "We know quickly when a vendor has a backorder or lead time change.", weight: 4 },
      { id: 5, text: "Pricing across our top vendors is consistent and current at any given moment.", weight: 5 },
    ],
    max: 120,
    tiers: [{ min: 96, label: "Vendor Data Stable" }, { min: 48, label: "Vendor Data Fragmentation" }, { min: 0, label: "Critical Vendor Data Gaps" }],
  },
  {
    id: 2, name: "Operational Workflow & Process", color: C.teal, tag: "Process Design",
    questions: [
      { id: 6, text: "Our team can respond to pricing and availability questions without putting the customer on hold or calling back.", weight: 4 },
      { id: 7, text: "Onboarding a new vendor is a structured, repeatable process.", weight: 3 },
      { id: 8, text: "Order problems are caught and resolved before the customer knows about them.", weight: 5 },
      { id: 9, text: "We have clear visibility into inventory levels and reorder points across our vendors.", weight: 4 },
      { id: 10, text: "Internal tasks, approvals, and handoffs happen through a system — not email or word of mouth.", weight: 3 },
      { id: 11, text: "A new team member can reach full independence within a reasonable amount of time.", weight: 4 },
    ],
    max: 115,
    tiers: [{ min: 92, label: "Automated Operations" }, { min: 46, label: "Manual Coordination Detected" }, { min: 0, label: "Operational Bottlenecks" }],
  },
  {
    id: 3, name: "Decision Intelligence & Visibility", color: C.amber, tag: "Visibility Layer",
    questions: [
      { id: 12, text: "Leadership has access to current operational data without waiting for someone to compile it.", weight: 4 },
      { id: 13, text: "We find out about pricing errors or order problems before our customers do.", weight: 5 },
      { id: 14, text: "We track vendor performance — fill rates, pricing accuracy, lead time reliability.", weight: 4 },
      { id: 15, text: "Sales pipeline and order activity are visible to leadership in real time.", weight: 3 },
      { id: 16, text: "Our operation identifies and addresses problems proactively, not reactively.", weight: 5 },
    ],
    max: 105,
    tiers: [{ min: 84, label: "High Visibility Environment" }, { min: 42, label: "Limited Decision Visibility" }, { min: 0, label: "Leadership Blind Spots" }],
  },
  {
    id: 4, name: "Knowledge Architecture & Resilience", color: C.purpleL || "#A67FF5", tag: "Resilience",
    questions: [
      { id: 17, text: "Critical operational knowledge is documented and accessible to the whole team.", weight: 5 },
      { id: 18, text: "Core processes are documented and followed consistently regardless of who is working.", weight: 4 },
      { id: 19, text: "If our 2–3 most experienced people left in the same month, our operation could continue.", weight: 5 },
      { id: 20, text: "Our current technology stack actually supports the way our team works day to day.", weight: 3 },
    ],
    max: 85,
    tiers: [{ min: 68, label: "Knowledge Systematized" }, { min: 34, label: "Knowledge Risk Present" }, { min: 0, label: "Critical Knowledge Risk" }],
  },
];

const scale = [
  { val: 1, label: "Does not exist / completely manual" },
  { val: 2, label: "Rarely / inconsistently done" },
  { val: 3, label: "Sometimes works / partially connected" },
  { val: 4, label: "Usually works / mostly automated" },
  { val: 5, label: "Fully connected / minimal manual effort" },
];

export default function AssessmentPage({ setPage, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = pillar, 5 = submitting
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const currentPillar = pillars[step - 1];
  const totalQuestions = 20;
  const answeredCount = Object.keys(answers).length;

  const calcResults = () => {
    const pillarScores = pillars.map(p => {
      const raw = p.questions.reduce((sum, q) => sum + (answers[q.id] || 0) * q.weight, 0);
      const pct = Math.round((raw / p.max) * 100);
      const tier = p.tiers.find(t => raw >= t.min)?.label || p.tiers[p.tiers.length - 1].label;
      return { id: p.id, name: p.name, color: p.color, score: raw, max: p.max, pct, tier };
    });
    const total = pillarScores.reduce((s, p) => s + p.score, 0);
    const totalMax = 425;
    const totalPct = Math.round((total / totalMax) * 100);
    let overallTier, tierColor;
    if (totalPct >= 80) { overallTier = "Operational Intelligence Ready"; tierColor = C.green; }
    else if (totalPct >= 60) { overallTier = "Scaling Friction Detected"; tierColor = C.teal; }
    else if (totalPct >= 40) { overallTier = "Architecture Stress Identified"; tierColor = C.amber; }
    else { overallTier = "Critical Operational Fragmentation"; tierColor = "#EF4444"; }
    return { pillarScores, total, totalMax, totalPct, overallTier, tierColor, name, company };
  };

  const handleSubmit = () => {
    const results = calcResults();
    onComplete(results);
  };

  const pillarComplete = currentPillar ? currentPillar.questions.every(q => answers[q.id]) : false;

  // INTRO
  if (step === 0) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
        <Pill text="Operational Readiness Assessment" color={C.teal} />
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "24px 0 20px", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
          Map your operation's<br />
          <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            exact friction points.
          </span>
        </h1>
        <p style={{ fontSize: 17, color: C.light, lineHeight: 1.8, margin: "0 auto 36px", fontFamily: "Georgia, serif", maxWidth: 520 }}>
          20 questions. 4 pillars. A weighted score that identifies where your operation is leaking efficiency — and what tier you're operating in.
        </p>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 36, marginBottom: 32, textAlign: "left" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            {[["20", "Questions"], ["4", "Pillars"], ["425", "Point System"], ["5 min", "Estimated"]].map(([n, l]) => (
              <div key={n} style={{ flex: 1, minWidth: 80, textAlign: "center", background: C.mid, borderRadius: 8, padding: "12px 8px" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: C.white, fontFamily: "'Courier New', monospace" }}>{n}</div>
                <div style={{ fontSize: 11, color: C.slate, fontFamily: "Georgia, serif" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 12, color: C.slate, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>Your Information</div>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name (optional)"
              style={{ background: C.dark, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", color: C.white, fontSize: 14, fontFamily: "Georgia, serif", outline: "none", width: "100%", boxSizing: "border-box" }}
            />
            <input
              value={company} onChange={e => setCompany(e.target.value)}
              placeholder="Company name (optional)"
              style={{ background: C.dark, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", color: C.white, fontSize: 14, fontFamily: "Georgia, serif", outline: "none", width: "100%", boxSizing: "border-box" }}
            />
          </div>
        </div>
        <button onClick={() => setStep(1)} style={{
          background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
          border: "none", borderRadius: 8, padding: "14px 36px", color: "#fff",
          fontSize: 14, cursor: "pointer", fontFamily: "'Courier New', monospace",
          fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
          boxShadow: `0 0 30px ${C.purple}44`,
        }}>Begin Assessment →</button>
      </div>
    </div>
  );

  // REVIEW & SUBMIT
  if (step === 5) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>◈</div>
        <Pill text="Assessment Complete" color={C.teal} />
        <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "20px 0 16px", fontFamily: "Georgia, serif" }}>
          {answeredCount} of {totalQuestions} questions answered
        </h2>
        <p style={{ fontSize: 16, color: C.light, lineHeight: 1.8, margin: "0 auto 36px", fontFamily: "Georgia, serif", maxWidth: 440 }}>
          Your operational architecture report is ready. This will map your exact friction points across all four pillars.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={handleSubmit} style={{
            background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
            border: "none", borderRadius: 8, padding: "14px 32px", color: "#fff",
            fontSize: 13, cursor: "pointer", fontFamily: "'Courier New', monospace",
            fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: `0 0 30px ${C.purple}44`,
          }}>Generate My Report →</button>
          <button onClick={() => setStep(4)} style={{
            background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 28px",
            color: C.light, fontSize: 13, cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: 1,
          }}>← Review Answers</button>
        </div>
      </div>
    </div>
  );

  // PILLAR QUESTIONS
  const progress = ((step - 1) / 4) * 100;
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px,5vw,60px) 60px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: C.slate, fontFamily: "'Courier New', monospace", letterSpacing: 2 }}>
              PILLAR {step} OF 4
            </span>
            <span style={{ fontSize: 12, color: C.slate, fontFamily: "'Courier New', monospace" }}>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <div style={{ height: 4, background: C.panel, borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${progress + 25}%`, background: `linear-gradient(90deg, ${C.purple}, ${C.teal})`, borderRadius: 2, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {pillars.map((p, i) => (
              <div key={p.id} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? p.color : C.panel, transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        {/* Pillar Header */}
        <div style={{ marginBottom: 36 }}>
          <Pill text={currentPillar.tag} color={currentPillar.color} />
          <h2 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 900, margin: "16px 0 8px", fontFamily: "Georgia, serif" }}>
            {currentPillar.name}
          </h2>
          <p style={{ fontSize: 14, color: C.slate, fontFamily: "'Courier New', monospace", letterSpacing: 1, margin: 0 }}>
            Rate each statement 1–5 based on your current operation
          </p>
        </div>

        {/* Scale Legend */}
        <div style={{ background: C.dark, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 20px", marginBottom: 28, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
          {scale.map(({ val, label }) => (
            <div key={val} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: currentPillar.color, fontFamily: "'Courier New', monospace" }}>{val}</span>
              <span style={{ fontSize: 11, color: C.slate, fontFamily: "Georgia, serif" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {currentPillar.questions.map((q, qi) => (
            <div key={q.id} style={{
              background: C.panel, border: `1px solid ${answers[q.id] ? currentPillar.color + "44" : C.border}`,
              borderRadius: 10, padding: "24px 28px",
              boxShadow: answers[q.id] ? `0 0 20px ${currentPillar.color}15` : "none",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontSize: 11, color: currentPillar.color, fontFamily: "'Courier New', monospace", letterSpacing: 2, flexShrink: 0, marginTop: 2 }}>Q{q.id}</span>
                <p style={{ fontSize: 15, color: C.white, margin: 0, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{q.text}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[1, 2, 3, 4, 5].map(val => (
                  <button key={val} onClick={() => setAnswers(a => ({ ...a, [q.id]: val }))} style={{
                    width: 44, height: 44, borderRadius: 8,
                    background: answers[q.id] === val ? currentPillar.color : C.dark,
                    border: `1px solid ${answers[q.id] === val ? currentPillar.color : C.border}`,
                    color: answers[q.id] === val ? "#fff" : C.slate,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Courier New', monospace",
                    transition: "all 0.15s",
                    boxShadow: answers[q.id] === val ? `0 0 16px ${currentPillar.color}44` : "none",
                  }}>{val}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{
            background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 24px",
            color: C.light, fontSize: 12, cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: 1,
          }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            {!pillarComplete && (
              <p style={{ fontSize: 12, color: C.slate, margin: 0, fontFamily: "Georgia, serif" }}>
                Answer all {currentPillar.questions.length} questions to continue
              </p>
            )}
          </div>
          <button onClick={() => setStep(s => s + 1)} disabled={!pillarComplete} style={{
            background: pillarComplete ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : C.panel,
            border: "none", borderRadius: 8, padding: "12px 28px",
            color: pillarComplete ? "#fff" : C.slate,
            fontSize: 12, cursor: pillarComplete ? "pointer" : "not-allowed",
            fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: pillarComplete ? `0 0 24px ${C.purple}44` : "none",
            opacity: pillarComplete ? 1 : 0.5, transition: "all 0.2s",
          }}>{step === 4 ? "Review & Submit →" : "Next Pillar →"}</button>
        </div>
      </div>
    </div>
  );
}
