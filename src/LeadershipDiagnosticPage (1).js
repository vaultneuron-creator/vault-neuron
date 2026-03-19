import { useState, useEffect, useCallback } from "react";
import { C } from "./tokens";

const WEBHOOK = "https://script.google.com/macros/s/AKfycbwIdEXcV4D5oktfu4VMlqelHMkSOScvqAuMJh3QZamQv3HOnKVpXszxFz1R8Jl50vnVMA/exec";
const mono = { fontFamily: "'Courier New', monospace" };
const serif = { fontFamily: "Georgia, serif" };

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "4px 14px", fontSize: 11, color, ...mono, letterSpacing: 2.5, textTransform: "uppercase", display: "inline-block", fontWeight: 600 }}>{text}</span>
);

const IDKBox = ({ checked, onChange }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", marginTop: 10 }}>
    <div onClick={onChange} style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${checked ? C.amber : "rgba(255,255,255,0.3)"}`, background: checked ? C.amber : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}>
      {checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✓</span>}
    </div>
    <span style={{ fontSize: 12, color: checked ? C.amberL : "rgba(255,255,255,0.4)", ...mono, letterSpacing: 1 }}>I don't know / I don't have this information</span>
  </label>
);

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "11px 14px", color: "#F0F4FF", fontSize: 14, fontFamily: "Georgia, serif", outline: "none", width: "100%", boxSizing: "border-box" };
const textareaStyle = { ...inputStyle, resize: "vertical", minHeight: 80, lineHeight: 1.6 };

function NumericQuestion({ id, label, unit, value, idk, onValue, onIdk }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", margin: "0 0 10px", lineHeight: 1.7, ...serif }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="number" min="0" value={idk ? "" : (value || "")} onChange={e => onValue(id, e.target.value)} placeholder={idk ? "—" : "Enter number"} disabled={idk} style={{ ...inputStyle, width: 180, opacity: idk ? 0.4 : 1 }} />
        {unit && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", ...serif }}>{unit}</span>}
      </div>
      <IDKBox checked={idk} onChange={() => onIdk(id)} />
    </div>
  );
}

function MultipleChoiceQuestion({ id, label, options, value, idk, onValue, onIdk }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", margin: "0 0 12px", lineHeight: 1.7, ...serif }}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: idk ? 0.4 : 1 }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => !idk && onValue(id, opt.value)} style={{ background: value === opt.value ? C.purple + "33" : "rgba(255,255,255,0.04)", border: `1px solid ${value === opt.value ? C.purple : "rgba(255,255,255,0.15)"}`, borderRadius: 8, padding: "11px 16px", color: value === opt.value ? "#F0F4FF" : "rgba(255,255,255,0.75)", fontSize: 13, cursor: idk ? "not-allowed" : "pointer", fontFamily: "Georgia, serif", textAlign: "left", transition: "all 0.15s", boxShadow: value === opt.value ? `0 0 12px ${C.purple}33` : "none" }}>
            <span style={{ color: value === opt.value ? C.purple : "rgba(255,255,255,0.35)", ...mono, fontSize: 11, marginRight: 10, fontWeight: 700 }}>{opt.label}</span>
            {opt.text}
          </button>
        ))}
      </div>
      <IDKBox checked={idk} onChange={() => onIdk(id)} />
    </div>
  );
}

function RatingQuestion({ id, label, value, idk, onValue, onIdk }) {
  const labels = ["", "Does not exist / completely manual", "Rarely / inconsistently", "Sometimes / partially", "Usually works well", "Fully connected / minimal manual effort"];
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", margin: "0 0 12px", lineHeight: 1.7, ...serif }}>{label}</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", opacity: idk ? 0.4 : 1 }}>
        {[1,2,3,4,5].map(val => (
          <button key={val} onClick={() => !idk && onValue(id, val)} style={{ width: 52, height: 52, borderRadius: 8, background: value === val ? C.purple : "rgba(255,255,255,0.06)", border: `1px solid ${value === val ? C.purple : "rgba(255,255,255,0.18)"}`, color: value === val ? "#fff" : "rgba(255,255,255,0.75)", fontSize: 18, fontWeight: 700, cursor: idk ? "not-allowed" : "pointer", ...mono, transition: "all 0.15s", boxShadow: value === val ? `0 0 16px ${C.purple}44` : "none" }}>{val}</button>
        ))}
      </div>
      {value && !idk && <p style={{ fontSize: 12, color: C.purpleL, margin: "8px 0 0", ...serif, fontStyle: "italic" }}>{labels[value]}</p>}
      <IDKBox checked={idk} onChange={() => onIdk(id)} />
    </div>
  );
}

function TextQuestion({ id, label, placeholder, value, onValue }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", margin: "0 0 10px", lineHeight: 1.7, ...serif }}>{label}</p>
      <textarea
        value={value === undefined || value === null ? "" : value}
        onChange={e => onValue(id, e.target.value)}
        placeholder={placeholder || "Your answer..."}
        style={textareaStyle}
        rows={3}
      />
    </div>
  );
}

const SECTIONS = [
  { id:"context", label:"Company Context", color:C.purple, tag:"Foundation",
    desc:"These questions establish the baseline for your Blueprint. The more specific you are, the more precise your analysis.",
    questions:[
      { id:"C1", type:"text", label:"What does your company do? Describe your core product or service.", placeholder:"Be specific about what you make, sell, or deliver and who your customers are." },
      { id:"C2", type:"number", label:"How many full-time employees do you have?", unit:"employees" },
      { id:"C3", type:"choice", label:"What is your approximate annual revenue?", options:[{ value:"under1m",label:"A",text:"Under $1M"},{ value:"1to5m",label:"B",text:"$1M – $5M"},{ value:"5to10m",label:"C",text:"$5M – $10M"},{ value:"over10m",label:"D",text:"Over $10M"}] },
      { id:"C4", type:"number", label:"How many years has the business been operating?", unit:"years" },
      { id:"C5", type:"number", label:"How many active jobs, orders, or projects are running right now?", unit:"active jobs" },
      { id:"C6", type:"text", label:"What is your single biggest operational challenge right now? Be as specific as possible.", placeholder:"Describe the problem, not the symptom — what is it actually costing you?" },
    ]
  },
  { id:"vendor", label:"Vendor Data & Pricing", color:C.purple, tag:"Pillar 1",
    desc:"These questions measure how well pricing and vendor data flows through your operation.",
    questions:[
      { id:"V1", type:"number", label:"How many quotes or proposals does your team send per month?", unit:"quotes/month" },
      { id:"V2", type:"number", label:"What is your average job or order value?", unit:"$ per job" },
      { id:"V3", type:"choice", label:"When a vendor changes their pricing, how does your team find out?", options:[{ value:"auto",label:"A",text:"Automatic alert — our system notifies us immediately"},{ value:"rep",label:"B",text:"The vendor rep calls or emails us"},{ value:"ordering",label:"C",text:"We notice when we go to place an order"},{ value:"invoice",label:"D",text:"We find out when the invoice is different than what we quoted"}] },
      { id:"V4", type:"number", label:"How many pricing errors, quote discrepancies, or billing issues occurred in the last 12 months?", unit:"incidents" },
      { id:"V5", type:"choice", label:"What was the average financial impact of those pricing errors?", options:[{ value:"under500",label:"A",text:"Under $500 per incident"},{ value:"500to2k",label:"B",text:"$500 – $2,000"},{ value:"2kto10k",label:"C",text:"$2,000 – $10,000"},{ value:"over10k",label:"D",text:"Over $10,000"}] },
    ]
  },
  { id:"workflow", label:"Workflow & Process", color:C.teal, tag:"Pillar 2",
    desc:"These questions reveal where work slows down, breaks down, or depends on the wrong people.",
    questions:[
      { id:"W1", type:"choice", label:"From the moment a customer requests a quote to when they receive it — how long does it typically take?", options:[{ value:"sameday",label:"A",text:"Same day"},{ value:"1to2",label:"B",text:"1–2 days"},{ value:"3to5",label:"C",text:"3–5 days"},{ value:"week",label:"D",text:"1 week or more"}] },
      { id:"W2", type:"number", label:"Roughly what percentage of quotes you send do you win?", unit:"% win rate" },
      { id:"W3", type:"choice", label:"How many quotes typically expire or go cold without any follow-up?", options:[{ value:"almost_none",label:"A",text:"Almost none — we follow up on everything"},{ value:"some",label:"B",text:"Some — maybe 20–30%"},{ value:"half",label:"C",text:"About half"},{ value:"most",label:"D",text:"Most — follow-up is inconsistent"}] },
      { id:"W4", type:"choice", label:"How are internal task assignments and approvals handled?", options:[{ value:"system",label:"A",text:"A dedicated system — everyone knows what's assigned"},{ value:"email",label:"B",text:"Email — things get tracked in inboxes"},{ value:"verbal",label:"C",text:"Verbal — tasks are assigned in conversation"},{ value:"mixed",label:"D",text:"A mix of all of the above"}] },
      { id:"W5", type:"choice", label:"How long does it typically take a new employee to work fully independently?", options:[{ value:"2weeks",label:"A",text:"Less than 2 weeks"},{ value:"month",label:"B",text:"2–4 weeks"},{ value:"quarter",label:"C",text:"1–3 months"},{ value:"long",label:"D",text:"3+ months"}] },
      { id:"W6", type:"rating", label:"Rate how well your core processes work when different people are running them. (1 = depends entirely on specific people, 5 = fully systematized and consistent)" },
    ]
  },
  { id:"decision", label:"Decision Intelligence", color:C.amber, tag:"Pillar 3",
    desc:"These questions reveal what you can and cannot see about your own operation — and what that costs you.",
    questions:[
      { id:"D1", type:"choice", label:"How do you typically find out about operational problems — a job behind schedule, a pricing error, a customer complaint?", options:[{ value:"proactive",label:"A",text:"A system flags it before it becomes a problem"},{ value:"team",label:"B",text:"Someone on my team tells me"},{ value:"customer",label:"C",text:"The customer tells me first"},{ value:"mixed",label:"D",text:"It varies — no consistent way"}] },
      { id:"D2", type:"choice", label:"How long does it take to pull together a status report on your current operations?", options:[{ value:"realtime",label:"A",text:"Real time — I can see it at any moment"},{ value:"hour",label:"B",text:"Less than an hour"},{ value:"halfday",label:"C",text:"Half a day"},{ value:"fullday",label:"D",text:"A full day or more"}] },
      { id:"D3", type:"number", label:"How many different software systems does your team actively use day to day?", unit:"systems" },
      { id:"D4", type:"choice", label:"Do you track vendor performance — fill rates, lead time accuracy, pricing consistency?", options:[{ value:"scored",label:"A",text:"Yes — we have a formal scoring system"},{ value:"informal",label:"B",text:"Informally — notes or memory"},{ value:"patterns",label:"C",text:"We notice patterns but don't formally track"},{ value:"no",label:"D",text:"No — we don't track vendor performance"}] },
      { id:"D5", type:"rating", label:"Rate your confidence in the data you use to make decisions. (1 = often deciding without reliable data, 5 = clean accurate data for every major decision)" },
      { id:"D6", type:"text", label:"What is the most important thing about your operation that you wish you could see but currently cannot?", placeholder:"Describe the specific blind spot and what you'd do differently if you had the information." },
    ]
  },
  { id:"knowledge", label:"Knowledge & Resilience", color:C.purpleL, tag:"Pillar 4",
    desc:"These questions reveal how much of your operation lives in people's heads versus systems — and what that concentration risk is worth.",
    questions:[
      { id:"K1", type:"number", label:"How many people in your business are single points of failure — if they left, a significant part of the operation would break?", unit:"people" },
      { id:"K2", type:"choice", label:"What percentage of your core processes are documented well enough that anyone could follow them?", options:[{ value:"over80",label:"A",text:"Over 80% — most things are well documented"},{ value:"50to80",label:"B",text:"50–80% — major processes are documented"},{ value:"20to50",label:"C",text:"20–50% — some things are written down"},{ value:"under20",label:"D",text:"Under 20% — most knowledge lives with people"}] },
      { id:"K3", type:"rating", label:"Rate how consistent work quality is when different people handle the same tasks. (1 = wildly inconsistent, 5 = same result regardless of who does it)" },
      { id:"K4", type:"text", label:"If your single most experienced person resigned tomorrow, what would break first?", placeholder:"Be specific — what processes, relationships, or knowledge would immediately be at risk?" },
      { id:"K5", type:"choice", label:"How long has your most critical single point of failure been with the company?", options:[{ value:"under5",label:"A",text:"Under 5 years"},{ value:"5to10",label:"B",text:"5–10 years"},{ value:"10to20",label:"C",text:"10–20 years"},{ value:"over20",label:"D",text:"Over 20 years"}] },
    ]
  },
  { id:"time", label:"Time & Capacity", color:C.teal, tag:"Pillar 5",
    desc:"These questions quantify the time your operation is losing to manual work and firefighting — and the revenue sitting on the table.",
    questions:[
      { id:"T1", type:"number", label:"How many hours per week do you personally spend on operational firefighting, status checks, or tasks that should be handled by a system?", unit:"hours/week" },
      { id:"T2", type:"choice", label:"Across your entire team, how many hours per week are spent on tasks that should be automated or systematized?", options:[{ value:"under5",label:"A",text:"Under 5 hours total"},{ value:"5to15",label:"B",text:"5–15 hours"},{ value:"15to30",label:"C",text:"15–30 hours"},{ value:"over30",label:"D",text:"30+ hours per week"}] },
      { id:"T3", type:"choice", label:"Have you turned down, deferred, or lost work in the last 12 months because your operation couldn't support it?", options:[{ value:"yes_often",label:"A",text:"Yes — this has happened multiple times"},{ value:"yes_once",label:"B",text:"Yes — once or twice"},{ value:"close",label:"C",text:"No — but we've been close"},{ value:"no",label:"D",text:"No"}] },
      { id:"T4", type:"number", label:"If you turned down or deferred work — roughly how much revenue was involved? (Optional)", unit:"$ estimate" },
      { id:"T5", type:"text", label:"If you got 10 hours a week back from operational work, what would you actually do with them?", placeholder:"Be honest — sales, strategy, customers, personal time? This helps us show you the real value of what we're building." },
    ]
  },
];

function calcEstimates(answers, idk) {
  const safe = (id, fb = 0) => { if (idk[id]) return null; const v = parseFloat(answers[id]); return isNaN(v) ? fb : v; };
  const quotesPerMonth = safe("V1"); const avgJobValue = safe("V2");
  const pricingErrors = safe("V4"); const winRate = safe("W2");
  const leaderHours = safe("T1"); const turnedDown = safe("T4");
  const errorCostMap = { under500:250,"500to2k":1250,"2kto10k":6000,over10k:15000 };
  const avgErrorCost = errorCostMap[answers["V5"]] || 0;
  const pricingErrorCost = pricingErrors !== null ? Math.round(pricingErrors * avgErrorCost) : null;
  const quoteSpeedMap = { sameday:0.02,"1to2":0.08,"3to5":0.15,week:0.25 };
  const speedLossPct = quoteSpeedMap[answers["W1"]] || 0;
  const quoteRevenueLost = (quotesPerMonth !== null && avgJobValue !== null) ? Math.round(quotesPerMonth * 12 * avgJobValue * speedLossPct) : null;
  const followupMap = { almost_none:0.02,some:0.10,half:0.20,most:0.35 };
  const followupLossPct = followupMap[answers["W3"]] || 0;
  const followupRevLost = (quotesPerMonth !== null && avgJobValue !== null && winRate !== null) ? Math.round(quotesPerMonth * 12 * avgJobValue * followupLossPct * (winRate / 100)) : null;
  const teamHoursMap = { under5:3,"5to15":10,"15to30":22,over30:40 };
  const teamHoursWeekly = teamHoursMap[answers["T2"]] || 0;
  const weeklyHoursWasted = leaderHours !== null ? leaderHours + teamHoursWeekly : (teamHoursWeekly || null);
  const annualLaborCost = weeklyHoursWasted !== null ? Math.round(weeklyHoursWasted * 52 * 35) : null;
  const revenueTurnedDown = (turnedDown !== null && answers["T3"] !== "no") ? turnedDown : null;
  const reportDelayMap = { realtime:0,hour:0.5,halfday:4,fullday:8 };
  const reportHours = reportDelayMap[answers["D2"]] || 0;
  const annualReportCost = reportHours > 0 ? Math.round(reportHours * 52 * 50) : 0;
  const components = [pricingErrorCost, quoteRevenueLost, followupRevLost, annualLaborCost, revenueTurnedDown].filter(v => v !== null);
  const totalRecoverable = components.length > 0 ? components.reduce((a,b) => a+b, 0) : null;
  const keyFields = { V4:"Pricing error frequency", W2:"Quote win rate", T1:"Your hours lost to firefighting", T4:"Revenue turned down", K1:"Single points of failure count" };
  const visibilityGaps = Object.entries(keyFields).filter(([k]) => idk[k]).map(([,v]) => v);
  return { pricingErrorCost, quoteRevenueLost, followupRevLost, annualLaborCost, weeklyHoursWasted, revenueTurnedDown, annualReportCost, totalRecoverable, visibilityGaps, idkCount: Object.values(idk).filter(Boolean).length, idkFields: Object.keys(idk).filter(k => idk[k]), calc_pricingErrorCost: pricingErrorCost, calc_quoteRevenueLost: (quoteRevenueLost||0)+(followupRevLost||0), calc_weeklyHoursWasted: weeklyHoursWasted, calc_annualLaborCost: annualLaborCost, calc_revenueTurnedDown: revenueTurnedDown, calc_totalRecoverable: totalRecoverable };
}

function fmt(n) {
  if (n === null || n === undefined) return null;
  if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n/1000)}K`;
  return `$${n.toLocaleString()}`;
}

function CalcPanel({ calcs, idkCount }) {
  const rows = [
    { label:"Pricing error cost / year", val:calcs.pricingErrorCost },
    { label:"Revenue lost to slow quoting", val:calcs.quoteRevenueLost },
    { label:"Revenue lost to no follow-up", val:calcs.followupRevLost },
    { label:"Annual cost of manual work", val:calcs.annualLaborCost },
    { label:"Revenue turned down", val:calcs.revenueTurnedDown },
  ];
  const hasAny = rows.some(r => r.val !== null && r.val > 0);
  return (
    <div style={{ background:"#0B0B18", border:`1px solid ${C.border}`, borderRadius:12, padding:20, position:"sticky", top:100 }}>
      <div style={{ ...mono, fontSize:10, color:C.teal, letterSpacing:3, marginBottom:14, textTransform:"uppercase" }}>Live Estimate</div>
      {!hasAny && <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontFamily:"Georgia,serif", fontStyle:"italic", marginBottom:12 }}>Estimates appear as you answer the quantitative questions.</p>}
      {rows.filter(r => r.val !== null && r.val > 0).map(r => (
        <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontFamily:"Georgia,serif", maxWidth:140, lineHeight:1.4 }}>{r.label}</span>
          <span style={{ fontSize:14, fontWeight:700, color:C.teal, ...mono }}>{fmt(r.val)}</span>
        </div>
      ))}
      {calcs.totalRecoverable > 0 && (
        <div style={{ background:C.purple+"22", border:`1px solid ${C.purple}44`, borderRadius:8, padding:"12px 14px", marginTop:8 }}>
          <div style={{ fontSize:10, color:C.purple, ...mono, letterSpacing:2, marginBottom:6 }}>EST. RECOVERABLE VALUE</div>
          <div style={{ fontSize:28, fontWeight:700, color:C.purple, ...mono }}>{fmt(calcs.totalRecoverable)}</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontFamily:"Georgia,serif", marginTop:4, fontStyle:"italic" }}>Conservative annual estimate</div>
        </div>
      )}
      {idkCount > 0 && (
        <div style={{ background:C.amber+"18", border:`1px solid ${C.amber}44`, borderRadius:8, padding:"10px 14px", marginTop:12 }}>
          <div style={{ fontSize:10, color:C.amber, ...mono, letterSpacing:2, marginBottom:4 }}>VISIBILITY GAPS</div>
          <div style={{ fontSize:12, color:C.amberL, fontFamily:"Georgia,serif" }}>{idkCount} field{idkCount > 1?"s":""} marked unknown — actual value is likely higher.</div>
        </div>
      )}
      {calcs.visibilityGaps && calcs.visibilityGaps.length > 0 && (
        <div style={{ marginTop:12 }}>
          {calcs.visibilityGaps.map(g => (
            <div key={g} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:C.amber, flexShrink:0 }} />
              <span style={{ fontSize:11, color:C.amberL, fontFamily:"Georgia,serif" }}>{g}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function validateToken(token) {
  try { const r = await fetch(`${WEBHOOK}?action=validateToken&token=${encodeURIComponent(token)}&type=leadership`); return await r.json(); }
  catch { return { valid:false, message:"Connection error. Please try again." }; }
}

async function submitDiagnostic(payload) {
  try { await fetch(WEBHOOK, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ action:"submitLeadershipDiagnostic", data:payload }) }); return true; }
  catch { return false; }
}

export default function LeadershipDiagnosticPage({ setPage }) {
  const [stage, setStage] = useState("validating");
  const [tokenData, setTokenData] = useState(null);
  const [token, setToken] = useState("");
  const [answers, setAnswers] = useState({});
  const [idk, setIdk] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [error, setError] = useState("");
  const [calcs, setCalcs] = useState({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("token");
    if (t) { setToken(t); runValidation(t); }
    else { setStage("invalid"); setError("No access token found. Please use the link from your token email."); }
  }, []);

  useEffect(() => { setCalcs(calcEstimates(answers, idk)); }, [answers, idk]);

  async function runValidation(t) {
    setStage("validating");
    const r = await validateToken(t.toUpperCase().trim());
    if (r.valid) { setTokenData(r); setStage("diagnostic"); }
    else { setError(r.message || "Invalid token."); setStage("invalid"); }
  }

  const setAnswer = useCallback((id, val) => setAnswers(prev => ({ ...prev, [id]:val })), []);
  const toggleIdk = useCallback((id) => { setIdk(prev => ({ ...prev, [id]:!prev[id] })); setAnswers(prev => ({ ...prev, [id]:undefined })); }, []);

  function qAnswered(q) {
    if (idk[q.id]) return true;
    if (q.id === "T4") return true;
    const v = answers[q.id];
    if (q.type === "text") return v && v.trim().length >= 3;
    return v !== undefined && v !== null && v !== "";
  }

  function secComplete(sec) { return sec.questions.every(q => qAnswered(q)); }

  function renderQ(q) {
    const p = { id:q.id, value:answers[q.id], idk:!!idk[q.id], onValue:setAnswer, onIdk:toggleIdk };
    switch(q.type) {
      case "number": return <NumericQuestion key={q.id} label={q.label} unit={q.unit} {...p} />;
      case "choice": return <MultipleChoiceQuestion key={q.id} label={q.label} options={q.options} {...p} />;
      case "rating": return <RatingQuestion key={q.id} label={q.label} {...p} />;
      case "text":   return <TextQuestion key={q.id} id={q.id} label={q.label} placeholder={q.placeholder} value={answers[q.id]} onValue={setAnswer} />;
      default: return null;
    }
  }

  async function handleSubmit() {
    setStage("submitting");
    await submitDiagnostic({ diagId:tokenData.diagId, company:tokenData.company, clientEmail:tokenData.clientEmail||tokenData.email, timestamp:new Date().toISOString(), token, ...answers, ...calcs });
    setStage("done");
  }

  const pulse = `@keyframes vn{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}`;

  if (stage === "validating") return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ textAlign:"center" }}><div style={{ width:10, height:10, borderRadius:"50%", background:C.purple, margin:"0 auto 20px", animation:"vn 1s ease-in-out infinite" }} /><p style={{ ...mono, fontSize:13, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>VALIDATING ACCESS TOKEN...</p><style>{pulse}</style></div></div>;

  if (stage === "invalid") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
        <Pill text="Access Error" color={C.red} />
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:900, margin:"20px 0 12px", color:"#F0F4FF" }}>Token Not Valid</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", fontFamily:"Georgia,serif", lineHeight:1.7, marginBottom:32 }}>{error}</p>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:24, marginBottom:24 }}>
          <input value={token} onChange={e => setToken(e.target.value.toUpperCase())} placeholder="VN-26-COMPANY-L-XXXX" style={{ ...inputStyle, ...mono, letterSpacing:2, marginBottom:12 }} />
          <button onClick={() => runValidation(token)} disabled={token.length < 8} style={{ background:token.length>=8?`linear-gradient(135deg,${C.purple},${C.teal})`:"rgba(255,255,255,0.08)", border:"none", borderRadius:8, padding:"12px 28px", color:token.length>=8?"#fff":"rgba(255,255,255,0.3)", fontSize:12, cursor:token.length>=8?"pointer":"not-allowed", ...mono, fontWeight:700, letterSpacing:1.5, width:"100%" }}>Validate Token →</button>
        </div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontFamily:"Georgia,serif" }}>Need help? <a href="mailto:connect@vaultneuron.com" style={{ color:C.teal }}>connect@vaultneuron.com</a></p>
      </div>
    </div>
  );

  if (stage === "submitting") return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ textAlign:"center" }}><div style={{ width:10, height:10, borderRadius:"50%", background:C.teal, margin:"0 auto 20px", animation:"vn 1s ease-in-out infinite" }} /><p style={{ ...mono, fontSize:13, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>SUBMITTING DIAGNOSTIC...</p><style>{pulse}</style></div></div>;

  if (stage === "done") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:560, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:24 }}>◈</div>
        <Pill text="Diagnostic Received" color={C.green} />
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:32, fontWeight:900, margin:"20px 0 16px", color:"#F0F4FF" }}>Your Blueprint is being built.</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.7)", fontFamily:"Georgia,serif", lineHeight:1.75, margin:"0 auto 28px", maxWidth:420 }}>Vault Neuron has received your diagnostic. Once your team responses are collected, your Blueprint will be compiled and delivered.</p>
        {calcs.totalRecoverable > 0 && (
          <div style={{ background:C.purple+"18", border:`1px solid ${C.purple}44`, borderRadius:12, padding:"20px 24px", marginBottom:24 }}>
            <div style={{ fontSize:11, color:C.purple, ...mono, letterSpacing:2, marginBottom:8 }}>YOUR ESTIMATED RECOVERABLE VALUE</div>
            <div style={{ fontSize:42, fontWeight:700, color:C.purple, ...mono }}>{fmt(calcs.totalRecoverable)}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:"Georgia,serif", marginTop:6, fontStyle:"italic" }}>Annual conservative estimate based on your answers</div>
          </div>
        )}
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontFamily:"Georgia,serif" }}>Questions? <a href="mailto:connect@vaultneuron.com" style={{ color:C.teal }}>connect@vaultneuron.com</a></p>
      </div>
    </div>
  );

  const sec = SECTIONS[currentSection];
  const isLast = currentSection === SECTIONS.length - 1;
  const complete = secComplete(sec);
  const showCalc = ["vendor","workflow","decision","knowledge","time"].includes(sec.id);

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:"#F0F4FF", padding:"100px clamp(20px,5vw,60px) 60px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:showCalc?"1fr 280px":"1fr", gap:40, alignItems:"start" }}>
        <div>
          <div style={{ marginBottom:40 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ ...mono, fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>SECTION {currentSection+1} OF {SECTIONS.length}  ·  {sec.label.toUpperCase()}</span>
              {tokenData?.company && <span style={{ ...mono, fontSize:11, color:C.purple }}>{tokenData.company}</span>}
            </div>
            <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
              <div style={{ height:"100%", width:`${(currentSection/SECTIONS.length)*100}%`, background:`linear-gradient(90deg,${C.purple},${C.teal})`, borderRadius:2, transition:"width 0.4s" }} />
            </div>
            <div style={{ display:"flex", gap:4, marginTop:8 }}>
              {SECTIONS.map((s,i) => <div key={s.id} style={{ flex:1, height:2, borderRadius:1, background:i<currentSection?s.color:"rgba(255,255,255,0.08)", transition:"background 0.3s" }} />)}
            </div>
          </div>

          <div style={{ marginBottom:32 }}>
            <Pill text={sec.tag} color={sec.color} />
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,34px)", fontWeight:900, margin:"16px 0 10px", color:"#F0F4FF" }}>{sec.label}</h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", fontFamily:"Georgia,serif", lineHeight:1.7, margin:0 }}>{sec.desc}</p>
          </div>

          {currentSection === 0 && (
            <div style={{ background:C.amber+"15", border:`1px solid ${C.amber}33`, borderRadius:10, padding:"14px 18px", marginBottom:28 }}>
              <div style={{ fontSize:11, color:C.amber, ...mono, letterSpacing:2, marginBottom:6 }}>ABOUT THE "I DON'T KNOW" OPTION</div>
              <p style={{ fontSize:13, color:C.amberL, fontFamily:"Georgia,serif", lineHeight:1.65, margin:0 }}>Many questions have an "I don't know" checkbox. Checking it isn't a negative — it's important data. A leader who doesn't know their pricing error rate or quote win rate has a visibility gap that's just as valuable to identify as a low score. Answer honestly.</p>
            </div>
          )}

          <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:"28px 32px" }}>
            {sec.questions.map(q => renderQ(q))}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:28 }}>
            <button onClick={() => currentSection > 0 && setCurrentSection(n => n-1)} disabled={currentSection===0} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"12px 24px", color:"rgba(255,255,255,0.75)", fontSize:12, cursor:currentSection===0?"not-allowed":"pointer", ...mono, letterSpacing:1, opacity:currentSection===0?0.3:1 }}>← Back</button>
            {!complete && <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", margin:0, fontFamily:"Georgia,serif" }}>Answer all required questions to continue</p>}
            <button onClick={() => isLast ? handleSubmit() : setCurrentSection(n => n+1)} disabled={!complete} style={{ background:complete?`linear-gradient(135deg,${C.purple},${C.teal})`:"rgba(255,255,255,0.08)", border:"none", borderRadius:8, padding:"12px 28px", color:complete?"#fff":"rgba(255,255,255,0.3)", fontSize:12, cursor:complete?"pointer":"not-allowed", ...mono, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", boxShadow:complete?`0 0 24px ${C.purple}44`:"none", transition:"all 0.2s" }}>{isLast?"Submit Diagnostic →":`Next: ${SECTIONS[currentSection+1]?.label} →`}</button>
          </div>
        </div>

        {showCalc && <CalcPanel calcs={calcs} idkCount={Object.values(idk).filter(Boolean).length} />}
      </div>
    </div>
  );
}
