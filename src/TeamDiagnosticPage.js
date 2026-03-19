import { useState, useEffect } from "react";
import { C } from "./tokens";

const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbwIdEXcV4D5oktfu4VMlqelHMkSOScvqAuMJh3QZamQv3HOnKVpXszxFz1R8Jl50vnVMA/exec";

const mono = { fontFamily: "'Courier New', monospace" };
const serif = { fontFamily: "Georgia, serif" };

const Pill = ({ text, color = C.teal }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "4px 14px", fontSize: 11, color, ...mono, letterSpacing: 2.5, textTransform: "uppercase", display: "inline-block", fontWeight: 600 }}>{text}</span>
);

const sections = [
  {
    id: "role", label: "Your Role", color: C.teal, tag: "Context",
    intro: "A few quick questions to help us understand your perspective. Your responses are completely anonymous.",
    questions: [
      { id: "role_tenure", type: "select", label: "How long have you been with the company?", options: ["Less than 6 months", "6-12 months", "1-2 years", "3-5 years", "6-10 years", "10+ years"] },
      { id: "role_area", type: "select", label: "Which area best describes your role?", options: ["Sales / Business Development", "Operations / Production / Shop Floor", "Estimating / Quoting", "Customer Service", "Purchasing / Procurement", "Administration / Finance", "Management / Leadership", "Other"] },
    ],
  },
  {
    id: "workflow", label: "Daily Workflow", color: C.purple, tag: "Section 1",
    intro: "How you experience your day-to-day work - what helps, what slows you down, and where things fall apart.",
    questions: [
      { id: "w1", type: "textarea", label: "When you start a new day, how clear are your priorities?", placeholder: "Do you always know what to work on, or does it feel unclear or constantly changing?" },
      { id: "w2", type: "textarea", label: "What is the single biggest time-waster in your week?", placeholder: "The task, process, or situation that eats your time without adding value..." },
      { id: "w3", type: "textarea", label: "Describe a process that breaks down regularly. What happens and why?", placeholder: "A handoff that fails, a step that always causes problems, a system that does not work..." },
      { id: "w4", type: "textarea", label: "How often do handoffs between you and other departments fail or slow you down?", placeholder: "Between sales and ops, between estimating and purchasing, between any two teams..." },
    ],
  },
  {
    id: "info", label: "Information & Tools", color: C.teal, tag: "Section 2",
    intro: "What information you need to do your job well, and whether you actually have it when you need it.",
    questions: [
      { id: "i1", type: "textarea", label: "How easy is it to find the information you need to do your job?", placeholder: "Pricing, specs, job status, customer info - what is easy to find and what requires hunting?" },
      { id: "i2", type: "textarea", label: "What information do you wish you had easier access to?", placeholder: "If you could look something up in 10 seconds that currently takes 10 minutes, what would it be?" },
      { id: "i3", type: "textarea", label: "If you could have one tool or system you do not have now, what would it be?", placeholder: "A dashboard, a lookup tool, a better process, an automated notification..." },
      { id: "i4", type: "select", label: "How well does the current technology you use support the way you actually work?", options: ["It actively helps me", "It is okay - some things work, some do not", "It mostly gets in the way", "I work around it most of the time"] },
    ],
  },
  {
    id: "customer", label: "Customer Experience", color: C.amber, tag: "Section 3",
    intro: "How operational gaps show up in customer interactions from your vantage point.",
    questions: [
      { id: "cx1", type: "textarea", label: "What is the most common complaint or frustration you hear from customers?", placeholder: "Turnaround time, pricing accuracy, communication, order issues, response speed..." },
      { id: "cx2", type: "textarea", label: "When a customer has a question you cannot answer immediately, what does that process look like?", placeholder: "Who do you have to ask, how long does it take, how does the customer respond?" },
      { id: "cx3", type: "select", label: "How confident are you in the accuracy of the information you give customers?", options: ["Very confident - I trust the data I have", "Mostly confident - occasionally I find errors after the fact", "Somewhat confident - I double-check a lot", "Not very confident - I know the data has gaps"] },
    ],
  },
  {
    id: "open", label: "Open Feedback", color: C.purple, tag: "Section 4",
    intro: "This is your chance to say what leadership should hear. There are no wrong answers.",
    questions: [
      { id: "o1", type: "textarea", label: "If you could change one thing about how this operation runs, what would it be?", placeholder: "Be direct. What one change would make the biggest difference to you and your team?" },
      { id: "o2", type: "textarea", label: "What does this company do really well that we should protect?", placeholder: "What works, what you value, what would be a mistake to change..." },
      { id: "o3", type: "textarea", label: "Is there anything important that leadership should know but probably does not?", placeholder: "This is anonymous - say what needs to be said..." },
    ],
  },
];

async function submitTeamDiagnostic(token, answers) {
  try {
    await fetch(SHEETS_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submitTeamDiagnostic", token, answers, timestamp: new Date().toISOString() }),
    });
    return true;
  } catch (e) {
    return false;
  }
}

export default function TeamDiagnosticPage({ token: propToken }) {
  const [token, setToken] = useState(propToken || "");
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(true);
  const [tokenError, setTokenError] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const totalSections = sections.length;

  useEffect(() => {
    if (propToken && propToken.trim()) {
      validateToken(propToken.trim());
    } else {
      setTokenChecking(false);
      setTokenError("No team token found. Please use the complete link from your email.");
    }
  }, [propToken]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  async function validateToken(t) {
    setTokenChecking(true);
    try {
      const res = await fetch(SHEETS_WEBHOOK + "?action=validateToken&token=" + encodeURIComponent(t) + "&type=team");
      const data = await res.json();
      if (data.valid) { setToken(t); setTokenValid(true); setStep(1); }
      else { setTokenError(data.message || "This team link is no longer active or has expired."); }
    } catch (e) {
      setToken(t); setTokenValid(true); setStep(1);
    }
    setTokenChecking(false);
  }

  function setAnswer(qId, value) { setAnswers(a => ({ ...a, [qId]: value })); }

  const currentSection = sections[step - 1];
  const isSectionComplete = (sec) => sec && sec.questions.every(q => answers[q.id] && String(answers[q.id]).trim().length > 0);

  async function handleSubmit() {
    setSubmitting(true);
    await submitTeamDiagnostic(token, answers);
    setSubmitting(false);
    setStep(totalSections + 2);
  }

  const inputBase = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 16px", color: C.white, fontSize: 15, width: "100%", boxSizing: "border-box", outline: "none", ...serif, transition: "border-color 0.2s" };
  const textareaBase = { ...inputBase, minHeight: 90, resize: "vertical", lineHeight: 1.7 };

  if (tokenChecking) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, margin: "0 auto 16px" }} />
        <p style={{ ...mono, fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>Validating access...</p>
      </div>
    </div>
  );

  if (!tokenValid) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <Pill text="Link Error" color="#EF4444" />
        <h1 style={{ ...serif, fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, margin: "20px 0 12px", color: C.white }}>Unable to Load Diagnostic</h1>
        <div style={{ background: "#EF444410", border: "1px solid #EF444430", borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ ...serif, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>{tokenError}</p>
        </div>
        <p style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
          Questions? <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal, textDecoration: "none" }}>connect@vaultneuron.com</a>
        </p>
      </div>
    </div>
  );

  if (step === 0) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <Pill text="Team Diagnostic" color={C.teal} />
        <h1 style={{ ...serif, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, margin: "20px 0 16px", color: C.white, lineHeight: 1.2 }}>Your perspective matters.</h1>
        <p style={{ ...serif, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 auto 36px", maxWidth: 480 }}>
          Your company has engaged Vault Neuron to improve how the operation runs. Your honest feedback as someone doing the work every day is the most valuable input we can have.
        </p>
        <div style={{ background: C.panel, border: "1px solid " + C.teal + "33", borderRadius: 12, padding: 32, marginBottom: 32, textAlign: "left" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            {[["5", "Sections"], ["~15", "Minutes"], ["100%", "Anonymous"]].map(([n, l]) => (
              <div key={n} style={{ flex: 1, minWidth: 80, textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "14px 8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.teal, ...mono }}>{n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", ...serif, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.teal + "10", border: "1px solid " + C.teal + "30", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ ...mono, fontSize: 11, color: C.teal, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Important</div>
            <p style={{ ...serif, fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: 0 }}>Your responses are completely anonymous. No names are attached. Individual answers will not be shared with management - only aggregated themes are reviewed. Please be honest.</p>
          </div>
        </div>
        <button onClick={() => setStep(1)} style={{ background: "linear-gradient(135deg, " + C.teal + ", " + C.purple + ")", border: "none", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 14, cursor: "pointer", ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", boxShadow: "0 0 30px " + C.teal + "33" }}>Begin Team Diagnostic</button>
      </div>
    </div>
  );

  if (step === totalSections + 2) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>
        <Pill text="Response Submitted" color={C.green} />
        <h1 style={{ ...serif, fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, margin: "20px 0 16px", color: C.white }}>Thank You</h1>
        <p style={{ ...serif, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 auto 32px", maxWidth: 420 }}>Your response has been recorded and will be included in the operational analysis along with other team responses.</p>
        <div style={{ background: C.panel, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "20px 24px" }}>
          <p style={{ ...serif, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>Your answers are anonymous and will only be reviewed as part of the full team picture. Thank you for taking the time to share your perspective.</p>
        </div>
      </div>
    </div>
  );

  if (step === totalSections + 1) return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px,5vw,60px) 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill text="Review & Submit" color={C.teal} />
          <h2 style={{ ...serif, fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, margin: "20px 0 12px", color: C.white }}>Review your responses</h2>
        </div>
        {sections.map((sec, si) => (
          <div key={sec.id} style={{ background: C.panel, border: "1px solid " + sec.color + "33", borderRadius: 10, padding: "20px 24px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Pill text={sec.tag} color={sec.color} />
                <span style={{ ...serif, fontSize: 14, fontWeight: 700, color: C.white }}>{sec.label}</span>
              </div>
              <button onClick={() => setStep(si + 1)} style={{ background: "transparent", border: "1px solid " + sec.color + "44", borderRadius: 6, padding: "5px 12px", color: sec.color, fontSize: 11, cursor: "pointer", ...mono, letterSpacing: 1 }}>Edit</button>
            </div>
            {sec.questions.map(q => (
              <div key={q.id} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>{q.label}</div>
                <div style={{ ...serif, fontSize: 13, color: answers[q.id] ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)", lineHeight: 1.5 }}>{answers[q.id] || "Not answered"}</div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <button onClick={() => setStep(totalSections)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "13px 24px", color: "rgba(255,255,255,0.75)", fontSize: 13, cursor: "pointer", ...mono, letterSpacing: 1 }}>Back</button>
          <button onClick={handleSubmit} disabled={submitting} style={{ background: submitting ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, " + C.teal + ", " + C.purple + ")", border: "none", borderRadius: 8, padding: "13px 36px", color: submitting ? "rgba(255,255,255,0.4)" : "#fff", fontSize: 13, cursor: submitting ? "not-allowed" : "pointer", ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{submitting ? "Submitting..." : "Submit Response"}</button>
        </div>
      </div>
    </div>
  );

  const progress = ((step - 1) / totalSections) * 100;
  const sectionComplete = isSectionComplete(currentSection);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, padding: "100px clamp(20px,5vw,60px) 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>SECTION {step} OF {totalSections}</span>
            <span style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg, " + C.teal + ", " + C.purple + ")", borderRadius: 2, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {sections.map((s, i) => <div key={s.id} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step - 1 ? s.color : i === step - 1 ? s.color + "88" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />)}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <Pill text={currentSection.tag} color={currentSection.color} />
          <h2 style={{ ...serif, fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, margin: "16px 0 8px", color: C.white }}>{currentSection.label}</h2>
          <p style={{ ...mono, fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{currentSection.intro}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
          {currentSection.questions.map((q, qi) => (
            <div key={q.id} style={{ background: answers[q.id] ? "rgba(255,255,255,0.05)" : C.panel, border: "1px solid " + (answers[q.id] ? currentSection.color + "55" : "rgba(255,255,255,0.1)"), borderRadius: 10, padding: "22px 26px", transition: "border-color 0.2s" }}>
              <label style={{ display: "block", ...serif, fontSize: 15, color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.5, marginBottom: 14 }}>
                <span style={{ ...mono, fontSize: 11, color: currentSection.color, letterSpacing: 2, marginRight: 10, fontWeight: 700 }}>Q{qi + 1}</span>
                {q.label}
              </label>
              {q.type === "select" ? (
                <select value={answers[q.id] || ""} onChange={e => setAnswer(q.id, e.target.value)} style={{ ...inputBase, cursor: "pointer" }}>
                  <option value="" disabled style={{ background: C.dark }}>Select an option...</option>
                  {q.options.map(o => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
                </select>
              ) : (
                <textarea value={answers[q.id] || ""} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} style={{ ...textareaBase }}
                  onFocus={e => { e.target.style.borderColor = currentSection.color + "88"; }}
                  onBlur={e => { e.target.style.borderColor = answers[q.id] ? currentSection.color + "55" : "rgba(255,255,255,0.15)"; }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setStep(s => Math.max(1, s - 1))} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "12px 24px", color: "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", ...mono, letterSpacing: 1 }}>Back</button>
          <div>{!sectionComplete && <p style={{ ...serif, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Answer all questions to continue</p>}</div>
          <button onClick={() => setStep(s => s + 1)} disabled={!sectionComplete} style={{ background: sectionComplete ? "linear-gradient(135deg, " + C.teal + ", " + C.purple + ")" : "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, padding: "12px 28px", color: sectionComplete ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 12, cursor: sectionComplete ? "pointer" : "not-allowed", ...mono, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.2s" }}>
            {step === totalSections ? "Review Answers" : "Next Section"}
          </button>
        </div>
      </div>
    </div>
  );
}
