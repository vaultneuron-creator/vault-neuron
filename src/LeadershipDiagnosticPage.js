import { useState, useEffect } from "react";
import { C } from "./tokens";

const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbwIdEXcV4D5oktfu4VMlqelHMkSOScvqAuMJh3QZamQv3HOnKVpXszxFz1R8Jl50vnVMA/exec";

const mono = { fontFamily: "'Courier New', monospace" };
const serif = { fontFamily: "Georgia, serif" };

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "4px 14px", fontSize: 11, color, ...mono, letterSpacing: 2.5, textTransform: "uppercase", display: "inline-block", fontWeight: 600 }}>{text}</span>
);

const sections = [
  {
    id: "context", label: "Company Context", color: C.teal, tag: "Foundation",
    intro: "Help us understand your operation before we go deep. These context questions shape how we interpret everything else.",
    questions: [
      { id: "ctx_what", type: "textarea", label: "What does your company do?", placeholder: "Describe your core products or services, customers, and how you deliver value..." },
      { id: "ctx_employees", type: "select", label: "How many employees?", options: ["1–10", "11–25", "26–50", "51–100", "101–150", "150+"] },
      { id: "ctx_revenue", type: "select", label: "Approximate annual revenue?", options: ["Under $1M", "$1M–$3M", "$3M–$7M", "$7M–$15M", "$15M+", "Prefer not to say"] },
      { id: "ctx_years", type: "select", label: "Years in business?", options: ["Less than 1", "1–3", "4–7", "8–15", "15+"] },
      { id: "ctx_challenge", type: "textarea", label: "What is your single biggest operational challenge right now?", placeholder: "Be specific — what costs you the most time, money, or stress each week?" },
    ],
  },
  {
    id: "vendor", label: "Vendor Data & Pricing", color: C.purple, tag: "Pillar 1",
    intro: "How pricing information, availability, and vendor data moves through your operation — and where it breaks down.",
    questions: [
      { id: "v1", type: "textarea", label: "Walk me through how a pricing change from a top vendor reaches your team. How fast does it happen and how reliable is it?", placeholder: "Describe the actual path — emails, phone calls, who updates what..." },
      { id: "v2", type: "textarea", label: "Can your team answer a customer pricing question in real time, or does it require a callback? What's the actual process?", placeholder: "What happens when a customer asks about pricing right now?" },
      { id: "v3", type: "textarea", label: "How do you translate customer part numbers or specs to your vendor catalog? Is there a system for this?", placeholder: "Who does this, how long does it take, what happens if that person is unavailable?" },
      { id: "v4", type: "textarea", label: "When a vendor has a backorder or lead time change, how quickly do you find out and how does it affect open jobs?", placeholder: "Describe a recent example if you have one..." },
      { id: "v5", type: "textarea", label: "Describe the last time a pricing or availability problem caused a real business impact. What happened?", placeholder: "Cost overrun, customer complaint, missed deadline — be specific..." },
    ],
  },
  {
    id: "workflow", label: "Operational Workflow", color: C.teal, tag: "Pillar 2",
    intro: "How work actually moves through your organization — the handoffs, approvals, and gaps between people and systems.",
    questions: [
      { id: "w1", type: "textarea", label: "Walk me through how a job or order moves from signed contract to completed delivery. What are the handoffs?", placeholder: "Name every step and who touches it..." },
      { id: "w2", type: "textarea", label: "Where do jobs most commonly stall, get delayed, or fall through the cracks?", placeholder: "What are the top 2–3 places where things consistently go wrong?" },
      { id: "w3", type: "textarea", label: "Are your core processes documented? Could a new employee follow a written process for the top five things your operation does?", placeholder: "Be honest — where does documentation exist and where does it not?" },
      { id: "w4", type: "textarea", label: "How do internal task assignments and approvals happen? Email, verbal, a system?", placeholder: "Describe how work gets assigned and how you know it's done..." },
      { id: "w5", type: "textarea", label: "How long does it take a new employee to reach full independence? What's the biggest barrier?", placeholder: "What does onboarding actually look like today?" },
    ],
  },
  {
    id: "decision", label: "Decision Intelligence", color: C.amber, tag: "Pillar 3",
    intro: "What you can and can't see inside your own operation — and how that affects the decisions you make every day.",
    questions: [
      { id: "d1", type: "textarea", label: "Without asking anyone or pulling a report, what do you know about the current state of your operation right now?", placeholder: "What do you know for certain vs. what would you have to ask someone to find out?" },
      { id: "d2", type: "textarea", label: "How do you find out about a problem — a job behind schedule, a quality issue, a customer complaint? When do you find out?", placeholder: "Describe your early warning system, or lack of one..." },
      { id: "d3", type: "textarea", label: "What is your biggest data blind spot — the thing you wish you could see but can't?", placeholder: "If you had one dashboard you don't have today, what would it show?" },
      { id: "d4", type: "textarea", label: "Do you track vendor performance systematically — fill rates, lead time accuracy, pricing consistency?", placeholder: "What data do you have, and what are you making decisions without?" },
      { id: "d5", type: "textarea", label: "What does your sales pipeline look like right now? Can you pull it up?", placeholder: "Where does pipeline data actually live — CRM, spreadsheet, email, someone's head?" },
    ],
  },
  {
    id: "knowledge", label: "Knowledge & Resilience", color: C.purpleL, tag: "Pillar 4",
    intro: "Where critical knowledge lives in your organization — and what happens when the people who hold it aren't there.",
    questions: [
      { id: "k1", type: "textarea", label: "If your most experienced employee resigned tomorrow, what breaks first?", placeholder: "What knowledge walks out the door with them that nobody else has?" },
      { id: "k2", type: "textarea", label: "How consistent is your operation when different people are running it? Does quality or speed vary by who's working?", placeholder: "Think about your best day vs. an average day — what's different and why?" },
      { id: "k3", type: "textarea", label: "Where does your most critical business knowledge live — heads, files, a system?", placeholder: "Pricing knowledge, customer preferences, machine quirks, process knowledge..." },
      { id: "k4", type: "textarea", label: "What is your single biggest operational single point of failure?", placeholder: "The one person or system that, if removed, would hurt the most..." },
      { id: "k5", type: "textarea", label: "Does your current technology stack support the way your team actually works, or does it create friction?", placeholder: "Which tools help and which ones do people work around?" },
    ],
  },
  {
    id: "leadership", label: "Leadership & Vision", color: C.teal, tag: "Pillar 5",
    intro: "How you spend your time, what's getting in the way, and where you want to take the operation.",
    questions: [
      { id: "l1", type: "textarea", label: "If you got 10 hours a week back from operational management, what would you do with them?", placeholder: "What's the highest-value work you're not doing because you're managing the operation?" },
      { id: "l2", type: "textarea", label: "What keeps you up at night about your operation?", placeholder: "The risks, gaps, or dependencies that you know are real but haven't fixed yet..." },
      { id: "l3", type: "textarea", label: "Where do you want this business to be in 3 years? What's the biggest operational barrier to getting there?", placeholder: "Revenue goals, market position, team size — and what's blocking it operationally..." },
    ],
  },
  {
    id: "customer", label: "Customer Experience", color: C.amber, tag: "Pillar 6",
    intro: "How operational gaps show up for customers — and what it's costing you in retention and reputation.",
    questions: [
      { id: "cx1", type: "textarea", label: "Tell me about the last time you lost a customer or got a complaint you didn't see coming.", placeholder: "What happened, when did you find out, and what caused it operationally?" },
      { id: "cx2", type: "textarea", label: "What's the most common complaint or friction point your customers experience?", placeholder: "Quote turnaround, response time, order accuracy, communication gaps..." },
      { id: "cx3", type: "textarea", label: "How do customers contact you for orders, questions, or issues — and how fast do they get a response?", placeholder: "Phone, email, portal, in-person — and what the typical turnaround looks like..." },
    ],
  },
  {
    id: "sales", label: "Sales & Pipeline", color: C.purple, tag: "Pillar 7",
    intro: "How you generate and close new business — and where the process leaks.",
    questions: [
      { id: "s1", type: "textarea", label: "Walk me through your typical sales process from first contact to signed agreement.", placeholder: "Who's involved, how long it takes, what the steps are..." },
      { id: "s2", type: "textarea", label: "Where does your sales process break down most often?", placeholder: "Quote speed, follow-up, pricing accuracy, decision-maker access..." },
      { id: "s3", type: "textarea", label: "How do you track open opportunities and follow-up activity?", placeholder: "CRM, spreadsheet, email, memory — be specific about what actually gets used..." },
    ],
  },
  {
    id: "financial", label: "Financial Visibility", color: C.amber, tag: "Pillar 8",
    intro: "What financial data is available to you and what decisions you're making without it.",
    questions: [
      { id: "f1", type: "textarea", label: "What financial visibility do you have right now without asking anyone to compile a report?", placeholder: "Revenue, job profitability, cash position, AR aging — what's live vs. delayed?" },
      { id: "f2", type: "textarea", label: "Can you see job-level profitability in real time? If not, how long does it take to find out?", placeholder: "When do you know if a job made money — during or after?" },
      { id: "f3", type: "textarea", label: "What financial risk or gap concerns you most?", placeholder: "Cash flow predictability, margin leakage, AR collections, cost overruns..." },
    ],
  },
  {
    id: "risk", label: "Risk & Continuity", color: C.purpleL, tag: "Pillar 9",
    intro: "The operational risks that are real but haven't been addressed — and what happens if they materialize.",
    questions: [
      { id: "r1", type: "textarea", label: "What operational risk keeps you up at night?", placeholder: "Key person departure, system failure, capacity limits, major customer loss..." },
      { id: "r2", type: "textarea", label: "If you had to step away from the business for 30 days with no communication, what would break?", placeholder: "What decisions can only you make, what processes depend entirely on your presence?" },
      { id: "r3", type: "textarea", label: "What growth opportunity have you declined or delayed because your operation wasn't ready for it?", placeholder: "Larger contracts, new markets, additional headcount — what have you held back on?" },
    ],
  },
];

async function submitDiagnostic(token, answers) {
  try {
    await fetch(SHEETS_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitLeadershipDiagnostic",
        token,
        answers,
        timestamp: new Date().toISOString(),
      }),
    });
    return true;
  } catch (e) {
    console.warn("Submit failed:", e);
    return false;
  }
}

export default function LeadershipDiagnosticPage({ token: propToken }) {
  const [token, setToken] = useState(propToken || "");
  const [tokenInput, setTokenInput] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const totalSections = sections.length;

  useEffect(() => {
    if (propToken && propToken.trim()) {
      setTokenInput(propToken);
      validateToken(propToken.trim());
    }
  }, [propToken]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  async function validateToken(t) {
    setTokenChecking(true);
    setTokenError("");
    try {
      const res = await fetch(`${SHEETS_WEBHOOK}?action=validateToken&token=${encodeURIComponent(t)}&type=leadership`);
      const data = await res.json();
      if (data.valid) {
        setToken(t);
        setTokenValid(true);
        setStep(1);
      } else {
        setTokenError(data.message || "Invalid or expired token. Check your email and try again.");
      }
    } catch (e) {
      // no-cors fallback — proceed anyway since fetch with no-cors returns opaque response
      setToken(t);
      setTokenValid(true);
      setStep(1);
    }
    setTokenChecking(false);
  }

  function setAnswer(qId, value) {
    setAnswers(a => ({ ...a, [qId]: value }));
  }

  const currentSection = sections[step - 1];

  const isSectionComplete = (sec) => {
    if (!sec) return false;
    return sec.questions.every(q => answers[q.id] && String(answers[q.id]).trim().length > 0);
  };

  async function handleSubmit() {
    setSubmitting(true);
    await submitDiagnostic(token, answers);
    setSubmitting(false);
    setStep(totalSections + 2);
  }

  const inputBase = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8, padding: "12px 16px",
    color: C.white, fontSize: 15, width: "100%",
    boxSizing: "border-box", outline: "none", ...serif,
    transition: "border-color 0.2s",
  };

  const textareaBase = { ...inputBase, minHeight: 100, resize: "vertical", lineHeight: 1.7 };

  // ── TOKEN ENTRY ──────────────────────────────────────────────────────────
  if (!tokenValid) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 20, color: C.purple }}>◈</div>
        <Pill text="Leadership Diagnostic" color={C.purple} />
        <h1 style={{ ...serif, fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 900, margin: "20px 0 12px", color: C.white }}>Enter Your Access Token</h1>
        <p style={{ ...serif, fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 auto 32px", maxWidth: 400 }}>
          Your unique token was emailed to you after payment. Check the email from Vault Neuron with subject "Your Blueprint Diagnostic Is Ready."
        </p>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 32, textAlign: "left" }}>
          <label style={{ ...mono, fontSize: 11, color: C.teal, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Access Token</label>
          <input
            value={tokenInput}
            onChange={e => setTokenInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && tokenInput.trim() && validateToken(tokenInput.trim())}
            placeholder="VN-26-COMPANY-L-XXXX"
            style={{ ...inputBase, ...mono, letterSpacing: 2, fontSize: 14, marginBottom: 16 }}
          />
          {tokenError && (
            <div style={{ background: "#EF444415", border: "1px solid #EF444433", borderRadius: 6, padding: "10px 14px", ...mono, fontSize: 12, color: "#EF4444", marginBottom: 16 }}>
              {tokenError}
            </div>
          )}
          <button
            onClick={() => validateToken(tokenInput.trim())}
            disabled={!tokenInput.trim() || tokenChecking}
            style={{
              background: tokenInput.trim() && !tokenChecking ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "rgba(255,255,255,0.08)",
              border: "none", borderRadius: 8, padding: "13px 28px",
              color: tokenInput.trim() && !tokenChecking ? "#fff" : "rgba(255,255,255,0.35)",
              fontSize: 13, cursor: tokenInput.trim() && !tokenChecking ? "pointer" : "not-allowed",
              ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", width: "100%",
              boxShadow: tokenInput.trim() ? `0 0 24px ${C.purple}33` : "none",
            }}
          >{tokenChecking ? "Validating..." : "Begin Diagnostic →"}</button>
        </div>
        <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 20, letterSpacing: 1 }}>
          Questions? <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal, textDecoration: "none" }}>connect@vaultneuron.com</a>
        </p>
      </div>
    </div>
  );

  // ── COMPLETE ─────────────────────────────────────────────────────────────
  if (step === totalSections + 2) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 580, width: "100%", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${C.green}18`, border: `2px solid ${C.green}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: C.green, margin: "0 auto 24px", ...mono }}>◉</div>
        <Pill text="Diagnostic Complete" color={C.green} />
        <h1 style={{ ...serif, fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, margin: "20px 0 16px", color: C.white }}>Leadership Diagnostic Submitted</h1>
        <p style={{ ...serif, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 auto 32px", maxWidth: 440 }}>
          Thank you. Your responses have been received. Vault Neuron will compile your full Blueprint once all team diagnostics are collected.
        </p>
        <div style={{ background: C.panel, border: `1px solid ${C.green}33`, borderRadius: 12, padding: "24px 28px", textAlign: "left", marginBottom: 32 }}>
          <div style={{ ...mono, fontSize: 11, color: C.green, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>What Happens Next</div>
          {["Your team completes the anonymous team diagnostic", "Vault Neuron reviews all responses and builds your Blueprint", "You'll receive an email when your Blueprint is ready", "Amber will schedule a debrief walkthrough with you"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ color: C.teal, ...mono, fontSize: 12, flexShrink: 0, marginTop: 2 }}>▸</span>
              <span style={{ ...serif, fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>
          Questions? <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal, textDecoration: "none" }}>connect@vaultneuron.com</a>
        </p>
      </div>
    </div>
  );

  // ── REVIEW ───────────────────────────────────────────────────────────────
  if (step === totalSections + 1) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px,5vw,60px) 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill text="Review & Submit" color={C.teal} />
          <h2 style={{ ...serif, fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, margin: "20px 0 12px", color: C.white }}>Review your responses</h2>
          <p style={{ ...serif, fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 460, margin: "0 auto" }}>Take a moment to review before submitting. Click Edit on any section to make changes.</p>
        </div>
        {sections.map((sec, si) => (
          <div key={sec.id} style={{ background: C.panel, border: `1px solid ${sec.color}33`, borderRadius: 10, padding: "24px 28px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Pill text={sec.tag} color={sec.color} />
                <span style={{ ...serif, fontSize: 15, fontWeight: 700, color: C.white }}>{sec.label}</span>
              </div>
              <button onClick={() => setStep(si + 1)} style={{ background: "transparent", border: `1px solid ${sec.color}44`, borderRadius: 6, padding: "6px 14px", color: sec.color, fontSize: 11, cursor: "pointer", ...mono, letterSpacing: 1 }}>Edit</button>
            </div>
            {sec.questions.map(q => (
              <div key={q.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{q.label}</div>
                <div style={{ ...serif, fontSize: 14, color: answers[q.id] ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.22)", lineHeight: 1.6 }}>{answers[q.id] || "— Not answered —"}</div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <button onClick={() => setStep(totalSections)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "13px 24px", color: "rgba(255,255,255,0.75)", fontSize: 13, cursor: "pointer", ...mono, letterSpacing: 1 }}>← Back</button>
          <button onClick={handleSubmit} disabled={submitting} style={{
            background: submitting ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
            border: "none", borderRadius: 8, padding: "13px 36px",
            color: submitting ? "rgba(255,255,255,0.4)" : "#fff",
            fontSize: 13, cursor: submitting ? "not-allowed" : "pointer",
            ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: submitting ? "none" : `0 0 30px ${C.purple}44`,
          }}>{submitting ? "Submitting..." : "Submit Diagnostic →"}</button>
        </div>
      </div>
    </div>
  );

  // ── SECTION QUESTIONS ────────────────────────────────────────────────────
  const progress = ((step - 1) / totalSections) * 100;
  const sectionComplete = isSectionComplete(currentSection);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px,5vw,60px) 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>SECTION {step} OF {totalSections}</span>
            <span style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${C.purple}, ${C.teal})`, borderRadius: 2, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {sections.map((s, i) => (
              <div key={s.id} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step - 1 ? s.color : i === step - 1 ? s.color + "88" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <Pill text={currentSection.tag} color={currentSection.color} />
          <h2 style={{ ...serif, fontSize: "clamp(20px,3vw,30px)", fontWeight: 900, margin: "16px 0 8px", color: C.white }}>{currentSection.label}</h2>
          <p style={{ ...mono, fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5, lineHeight: 1.6, margin: 0 }}>{currentSection.intro}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {currentSection.questions.map((q, qi) => (
            <div key={q.id} style={{
              background: answers[q.id] ? "rgba(255,255,255,0.05)" : C.panel,
              border: `1px solid ${answers[q.id] ? currentSection.color + "55" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 10, padding: "24px 28px", transition: "border-color 0.2s",
            }}>
              <label style={{ display: "block", ...serif, fontSize: 16, color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.5, marginBottom: 14 }}>
                <span style={{ ...mono, fontSize: 11, color: currentSection.color, letterSpacing: 2, marginRight: 10, fontWeight: 700 }}>Q{qi + 1}</span>
                {q.label}
              </label>
              {q.type === "select" ? (
                <select value={answers[q.id] || ""} onChange={e => setAnswer(q.id, e.target.value)}
                  style={{ ...inputBase, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}>
                  <option value="" disabled style={{ background: C.dark }}>Select an option...</option>
                  {q.options.map(o => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
                </select>
              ) : (
                <textarea value={answers[q.id] || ""} onChange={e => setAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder} style={{ ...textareaBase }}
                  onFocus={e => { e.target.style.borderColor = currentSection.color + "88"; }}
                  onBlur={e => { e.target.style.borderColor = answers[q.id] ? currentSection.color + "55" : "rgba(255,255,255,0.15)"; }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setStep(s => Math.max(1, s - 1))} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "12px 24px", color: "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", ...mono, letterSpacing: 1 }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            {!sectionComplete && <p style={{ ...serif, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Answer all questions to continue</p>}
          </div>
          <button onClick={() => setStep(s => s + 1)} disabled={!sectionComplete} style={{
            background: sectionComplete ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "rgba(255,255,255,0.06)",
            border: "none", borderRadius: 8, padding: "12px 28px",
            color: sectionComplete ? "#fff" : "rgba(255,255,255,0.3)",
            fontSize: 12, cursor: sectionComplete ? "pointer" : "not-allowed",
            ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: sectionComplete ? `0 0 24px ${C.purple}44` : "none", transition: "all 0.2s",
          }}>{step === totalSections ? "Review Answers →" : "Next Section →"}</button>
        </div>
      </div>
    </div>
  );
}
