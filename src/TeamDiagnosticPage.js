import { useState, useEffect, useCallback } from "react";
import { C } from "./tokens";

const WEBHOOK = "https://script.google.com/macros/s/AKfycbwIdEXcV4D5oktfu4VMlqelHMkSOScvqAuMJh3QZamQv3HOnKVpXszxFz1R8Jl50vnVMA/exec";
const mono = { fontFamily: "'Courier New', monospace" };
const serif = { fontFamily: "Georgia, serif" };

const Pill = ({ text, color = C.teal }) => (
  <span style={{ background:color+"22", border:`1px solid ${color}55`, borderRadius:4, padding:"4px 14px", fontSize:11, color, ...mono, letterSpacing:2.5, textTransform:"uppercase", display:"inline-block", fontWeight:600 }}>{text}</span>
);

const inputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:6, padding:"11px 14px", color:"#F0F4FF", fontSize:14, fontFamily:"Georgia,serif", outline:"none", width:"100%", boxSizing:"border-box" };
const textareaStyle = { ...inputStyle, resize:"vertical", minHeight:80, lineHeight:1.6 };

function MultipleChoiceQuestion({ id, label, options, value, onValue }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.92)", margin:"0 0 12px", lineHeight:1.7, ...serif }}>{label}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onValue(id, opt.value)} style={{ background:value===opt.value?C.teal+"33":"rgba(255,255,255,0.04)", border:`1px solid ${value===opt.value?C.teal:"rgba(255,255,255,0.15)"}`, borderRadius:8, padding:"11px 16px", color:value===opt.value?"#F0F4FF":"rgba(255,255,255,0.75)", fontSize:13, cursor:"pointer", fontFamily:"Georgia,serif", textAlign:"left", transition:"all 0.15s" }}>
            <span style={{ color:value===opt.value?C.teal:"rgba(255,255,255,0.35)", ...mono, fontSize:11, marginRight:10, fontWeight:700 }}>{opt.label}</span>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function RatingQuestion({ id, label, value, onValue, color = C.teal }) {
  const labels = ["","Does not exist / never","Rarely / inconsistently","Sometimes / partially","Usually works","Always / fully reliable"];
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.92)", margin:"0 0 12px", lineHeight:1.7, ...serif }}>{label}</p>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {[1,2,3,4,5].map(val => (
          <button key={val} onClick={() => onValue(id, val)} style={{ width:52, height:52, borderRadius:8, background:value===val?color:"rgba(255,255,255,0.06)", border:`1px solid ${value===val?color:"rgba(255,255,255,0.18)"}`, color:value===val?"#fff":"rgba(255,255,255,0.75)", fontSize:18, fontWeight:700, cursor:"pointer", ...mono, transition:"all 0.15s" }}>{val}</button>
        ))}
      </div>
      {value && <p style={{ fontSize:12, color:color, margin:"8px 0 0", fontFamily:"Georgia,serif", fontStyle:"italic" }}>{labels[value]}</p>}
    </div>
  );
}

function NumericQuestion({ id, label, unit, value, onValue }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.92)", margin:"0 0 10px", lineHeight:1.7, ...serif }}>{label}</p>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <input type="number" min="0" value={value||""} onChange={e => onValue(id, e.target.value)} placeholder="Enter number" style={{ ...inputStyle, width:160 }} />
        {unit && <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontFamily:"Georgia,serif" }}>{unit}</span>}
      </div>
    </div>
  );
}

function TextQuestion({ id, label, placeholder, value, onValue }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.92)", margin:"0 0 10px", lineHeight:1.7, ...serif }}>{label}</p>
      <textarea value={value||""} onChange={e => onValue(id, e.target.value)} placeholder={placeholder||"Your answer..."} style={textareaStyle} rows={3} />
    </div>
  );
}

function ShortTextQuestion({ id, label, placeholder, value, onValue }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.92)", margin:"0 0 10px", lineHeight:1.7, ...serif }}>{label}</p>
      <input value={value||""} onChange={e => onValue(id, e.target.value)} placeholder={placeholder||"Your answer..."} style={inputStyle} />
    </div>
  );
}

const SECTIONS = [
  { id:"context", label:"Your Role", color:C.teal, tag:"About You",
    desc:"This section is completely anonymous. We just need to understand your role and how long you've been with the company.",
    questions:[
      { id:"t_role", type:"short", label:"What is your role or department area?", placeholder:"e.g. estimating, sales, shop floor, admin, management" },
      { id:"t_tenure", type:"choice", label:"How long have you been with the company?", options:[{ value:"under1",label:"A",text:"Less than 1 year"},{ value:"1to3",label:"B",text:"1–3 years"},{ value:"3to7",label:"C",text:"3–7 years"},{ value:"over7",label:"D",text:"7+ years"}] },
    ]
  },
  { id:"workflow", label:"Workflow", color:C.purple, tag:"Day-to-Day Operations",
    desc:"These questions are about how your work actually flows — not how it's supposed to work, but how it actually works.",
    questions:[
      { id:"TW1", type:"number", label:"Roughly how many hours per week do you spend on tasks that feel like they should be handled by a system or automated?", unit:"hours/week" },
      { id:"TW2", type:"choice", label:"When your priorities change during the day, how do you find out?", options:[{ value:"system",label:"A",text:"A system or tool alerts me automatically"},{ value:"told",label:"B",text:"Someone tells me directly"},{ value:"figure",label:"C",text:"I figure it out when something's late or wrong"},{ value:"varies",label:"D",text:"It varies — there's no consistent way"}] },
      { id:"TW3", type:"rating", label:"How often do handoffs between you and other departments, teams, or people cause delays or errors? (1 = constantly causes problems, 5 = always smooth)", color:C.purple },
      { id:"TW4", type:"text", label:"Describe a process in your work that breaks down regularly. What happens and why?", placeholder:"Be specific — what actually goes wrong and what does it cost in time or quality?" },
      { id:"TW5", type:"text", label:"What is the single biggest time-waster in your week? Why does it still exist?", placeholder:"Be direct — what task should not require as much time as it does?" },
    ]
  },
  { id:"info", label:"Information & Tools", color:C.amber, tag:"Info & Technology",
    desc:"These questions are about whether you have the information and tools you need to do your job well.",
    questions:[
      { id:"TI1", type:"rating", label:"How easy is it to find the information you need to do your job? (1 = very hard, always hunting, 5 = always available immediately)", color:C.amber },
      { id:"TI2", type:"number", label:"How many different systems, tools, or apps do you use regularly to do your job?", unit:"systems" },
      { id:"TI3", type:"choice", label:"When you need information from another department, how long does it typically take to get it?", options:[{ value:"instant",label:"A",text:"Instantly — it's in a shared system"},{ value:"hour",label:"B",text:"Within an hour"},{ value:"sameday",label:"C",text:"Same day, but I have to ask"},{ value:"longer",label:"D",text:"Longer — it often takes multiple follow-ups"}] },
      { id:"TI4", type:"text", label:"If you could have one tool or system you don't have right now, what would it be and what would it do?", placeholder:"Describe what it would do, not just what it's called." },
    ]
  },
  { id:"customer", label:"Customer Impact", color:C.teal, tag:"Customer Experience",
    desc:"These questions are about how operational issues affect the customer experience from your vantage point.",
    questions:[
      { id:"TC1", type:"rating", label:"How often do operational issues affect the customer experience from your position? (1 = constantly, customers notice regularly, 5 = rarely, we catch problems before they do)", color:C.teal },
      { id:"TC2", type:"choice", label:"When a customer problem comes up, how quickly is it typically resolved?", options:[{ value:"sameday",label:"A",text:"Same day — we have a clear process"},{ value:"1to2",label:"B",text:"1–2 days"},{ value:"several",label:"C",text:"Several days — it takes coordination"},{ value:"varies",label:"D",text:"It varies widely depending on who handles it"}] },
      { id:"TC3", type:"text", label:"What is the most common customer complaint or frustration you see from your position?", placeholder:"What do customers say, or what do you see that you know is affecting their experience?" },
    ]
  },
  { id:"open", label:"Open Feedback", color:C.purple, tag:"Your Perspective",
    desc:"This is your space. There are no wrong answers and this is completely anonymous. Say what you actually think.",
    questions:[
      { id:"TO1", type:"text", label:"If you could change one thing about how this operation runs, what would it be?", placeholder:"Be specific — what would you change first and what would it improve?" },
      { id:"TO2", type:"text", label:"What does leadership not know about the day-to-day that you wish they understood?", placeholder:"What's the gap between how things look from the top and how they actually work?" },
      { id:"TO3", type:"rating", label:"How consistent is work quality when different people are handling the same tasks? (1 = wildly inconsistent, 5 = same result every time regardless of who does it)", color:C.purple },
      { id:"TO4", type:"text", label:"What is working well that you would not want to see change?", placeholder:"What should the business keep doing exactly as it is?" },
    ]
  },
];

async function validateToken(token) {
  try { const r = await fetch(`${WEBHOOK}?action=validateToken&token=${encodeURIComponent(token)}&type=team`); return await r.json(); }
  catch { return { valid:false, message:"Connection error. Please try again." }; }
}

async function submitDiagnostic(payload) {
  try { await fetch(WEBHOOK, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ action:"submitTeamDiagnostic", data:payload }) }); return true; }
  catch { return false; }
}

export default function TeamDiagnosticPage({ setPage }) {
  const [stage, setStage] = useState("validating");
  const [tokenData, setTokenData] = useState(null);
  const [token, setToken] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("token");
    if (t) { setToken(t); runValidation(t); }
    else { setStage("invalid"); setError("No access token found. Please use the exact link your employer forwarded to you."); }
  }, []);

  async function runValidation(t) {
    setStage("validating");
    const r = await validateToken(t.toUpperCase().trim());
    if (r.valid) { setTokenData(r); setStage("intro"); }
    else { setError(r.message || "Invalid token."); setStage("invalid"); }
  }

  const setAnswer = useCallback((id, val) => setAnswers(prev => ({ ...prev, [id]:val })), []);

  function qAnswered(q) {
    if (q.id === "TO4") return true;
    const v = answers[q.id];
    if (q.type === "text" || q.type === "short") return v && v.trim().length >= 2;
    return v !== undefined && v !== null && v !== "";
  }

  function secComplete(sec) { return sec.questions.every(q => qAnswered(q)); }

  function totalAnswered() { return SECTIONS.reduce((sum,s) => sum + s.questions.filter(q => qAnswered(q)).length, 0); }
  function totalQs() { return SECTIONS.reduce((sum,s) => sum + s.questions.length, 0); }

  function renderQ(q) {
    const p = { id:q.id, value:answers[q.id], onValue:setAnswer };
    switch(q.type) {
      case "choice": return <MultipleChoiceQuestion key={q.id} label={q.label} options={q.options} {...p} />;
      case "rating": return <RatingQuestion key={q.id} label={q.label} color={q.color||C.teal} {...p} />;
      case "number": return <NumericQuestion key={q.id} label={q.label} unit={q.unit} {...p} />;
      case "text":   return <TextQuestion key={q.id} label={q.label} placeholder={q.placeholder} {...p} />;
      case "short":  return <ShortTextQuestion key={q.id} label={q.label} placeholder={q.placeholder} {...p} />;
      default: return null;
    }
  }

  async function handleSubmit() {
    setStage("submitting");
    await submitDiagnostic({ diagId:tokenData.diagId, company:tokenData.company, token, timestamp:new Date().toISOString(), anonymous:true, TW1_hours:answers["TW1"], TI2_systems:answers["TI2"], TW3_rating:answers["TW3"], TC1_rating:answers["TC1"], TO3_rating:answers["TO3"], ...answers });
    setStage("done");
  }

  const pulse = `@keyframes vn{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}`;

  if (stage === "validating") return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ textAlign:"center" }}><div style={{ width:10, height:10, borderRadius:"50%", background:C.teal, margin:"0 auto 20px", animation:"vn 1s ease-in-out infinite" }} /><p style={{ ...mono, fontSize:13, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>VALIDATING ACCESS LINK...</p><style>{pulse}</style></div></div>;

  if (stage === "invalid") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
        <Pill text="Access Error" color={C.red} />
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:900, margin:"20px 0 12px", color:"#F0F4FF" }}>Link Not Valid</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", fontFamily:"Georgia,serif", lineHeight:1.7, marginBottom:24 }}>{error}</p>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontFamily:"Georgia,serif" }}>Please use the exact link forwarded to you, or contact <a href="mailto:connect@vaultneuron.com" style={{ color:C.teal }}>connect@vaultneuron.com</a>.</p>
      </div>
    </div>
  );

  if (stage === "intro") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth:640, width:"100%", textAlign:"center" }}>
        <Pill text="Team Operational Diagnostic" color={C.teal} />
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, margin:"24px 0 20px", lineHeight:1.2, color:"#F0F4FF" }}>Your perspective matters.<br /><span style={{ background:`linear-gradient(135deg,${C.purple},${C.teal})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>This is 100% anonymous.</span></h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.72)", fontFamily:"Georgia,serif", lineHeight:1.8, margin:"0 auto 32px", maxWidth:520 }}>Your employer has engaged Vault Neuron to analyze the operational architecture of <strong style={{ color:"#F0F4FF" }}>{tokenData?.company}</strong>. This diagnostic collects honest feedback from the team — not management — about how the operation actually works.</p>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:28, marginBottom:32, textAlign:"left" }}>
          {[["100% Anonymous","Your name is never attached to your responses. Your employer receives summarized team insights, not individual answers."],["Honest answers help more","Responses that describe real friction are what produce the most useful analysis. Say what you actually think."],["Takes 10–15 minutes","Five sections covering your workflow, tools, customer experience, and open feedback."]].map(([t,b]) => (
            <div key={t} style={{ display:"flex", gap:14, marginBottom:20 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:C.teal, flexShrink:0, marginTop:7 }} />
              <div><div style={{ fontSize:14, fontWeight:800, color:"#F0F4FF", fontFamily:"Georgia,serif", marginBottom:4 }}>{t}</div><div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontFamily:"Georgia,serif", lineHeight:1.65 }}>{b}</div></div>
            </div>
          ))}
        </div>
        <button onClick={() => { setCurrentSection(0); setStage("section"); }} style={{ background:`linear-gradient(135deg,${C.purple},${C.teal})`, border:"none", borderRadius:8, padding:"14px 36px", color:"#fff", fontSize:14, cursor:"pointer", ...mono, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", boxShadow:`0 0 30px ${C.purple}44` }}>Begin Diagnostic →</button>
      </div>
    </div>
  );

  if (stage === "submitting") return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ textAlign:"center" }}><div style={{ width:10, height:10, borderRadius:"50%", background:C.teal, margin:"0 auto 20px", animation:"vn 1s ease-in-out infinite" }} /><p style={{ ...mono, fontSize:13, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>SUBMITTING RESPONSES...</p><style>{pulse}</style></div></div>;

  if (stage === "done") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:520, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:24 }}>◈</div>
        <Pill text="Responses Received" color={C.green} />
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,34px)", fontWeight:900, margin:"20px 0 16px", color:"#F0F4FF" }}>Thank you.</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.7)", fontFamily:"Georgia,serif", lineHeight:1.75, margin:"0 auto 28px", maxWidth:400 }}>Your responses have been received and anonymized. Your feedback will be part of the team intelligence summary that Vault Neuron uses to build the Blueprint.</p>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", fontFamily:"Georgia,serif" }}>You can close this window.</p>
      </div>
    </div>
  );

  if (stage === "review") return (
    <div style={{ background:C.bg, minHeight:"100vh", color:"#F0F4FF", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth:560, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:20 }}>◈</div>
        <Pill text="Ready to Submit" color={C.teal} />
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,34px)", fontWeight:900, margin:"20px 0 16px", color:"#F0F4FF" }}>{totalAnswered()} of {totalQs()} questions answered.</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.7)", fontFamily:"Georgia,serif", lineHeight:1.75, margin:"0 auto 28px", maxWidth:420 }}>Your responses are ready to submit. They will be anonymized and included in the team intelligence analysis for {tokenData?.company}.</p>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:20, marginBottom:28, textAlign:"left" }}>
          {SECTIONS.map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:s.color, flexShrink:0 }} />
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.8)", fontFamily:"Georgia,serif" }}>{s.label}</span>
              </div>
              <span style={{ ...mono, fontSize:11, color:C.teal }}>{s.questions.filter(q => qAnswered(q)).length}/{s.questions.length}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={handleSubmit} style={{ background:`linear-gradient(135deg,${C.purple},${C.teal})`, border:"none", borderRadius:8, padding:"14px 32px", color:"#fff", fontSize:13, cursor:"pointer", ...mono, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", boxShadow:`0 0 30px ${C.purple}44` }}>Submit My Responses →</button>
          <button onClick={() => { setCurrentSection(SECTIONS.length-1); setStage("section"); }} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"14px 24px", color:"rgba(255,255,255,0.75)", fontSize:13, cursor:"pointer", ...mono, letterSpacing:1 }}>← Review Answers</button>
        </div>
      </div>
    </div>
  );

  const sec = SECTIONS[currentSection];
  const isLast = currentSection === SECTIONS.length - 1;
  const complete = secComplete(sec);
  const progress = (currentSection / SECTIONS.length) * 100;

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:"#F0F4FF", padding:"100px clamp(20px,5vw,60px) 60px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ ...mono, fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:2 }}>{sec.label.toUpperCase()}  ·  {currentSection+1} OF {SECTIONS.length}</span>
            <span style={{ ...mono, fontSize:11, color:"rgba(255,255,255,0.4)" }}>{totalAnswered()}/{totalQs()} answered</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
            <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${C.purple},${C.teal})`, borderRadius:2, transition:"width 0.4s" }} />
          </div>
          <div style={{ display:"flex", gap:4, marginTop:8 }}>
            {SECTIONS.map((s,i) => <div key={s.id} style={{ flex:1, height:2, borderRadius:1, background:i<=currentSection?s.color:"rgba(255,255,255,0.08)", transition:"background 0.3s" }} />)}
          </div>
        </div>

        <div style={{ marginBottom:28 }}>
          <Pill text={sec.tag} color={sec.color} />
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(20px,3vw,30px)", fontWeight:900, margin:"16px 0 10px", color:"#F0F4FF" }}>{sec.label}</h2>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", fontFamily:"Georgia,serif", lineHeight:1.7, margin:0 }}>{sec.desc}</p>
        </div>

        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:"28px 32px" }}>
          {sec.questions.map(q => renderQ(q))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:28 }}>
          <button onClick={() => { if(currentSection===0) setStage("intro"); else setCurrentSection(n=>n-1); }} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"12px 24px", color:"rgba(255,255,255,0.75)", fontSize:12, cursor:"pointer", ...mono, letterSpacing:1 }}>← Back</button>
          {!complete && <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", margin:0, fontFamily:"Georgia,serif" }}>Answer all required questions to continue</p>}
          <button onClick={() => { if(isLast) setStage("review"); else setCurrentSection(n=>n+1); }} disabled={!complete} style={{ background:complete?`linear-gradient(135deg,${C.purple},${C.teal})`:"rgba(255,255,255,0.08)", border:"none", borderRadius:8, padding:"12px 28px", color:complete?"#fff":"rgba(255,255,255,0.3)", fontSize:12, cursor:complete?"pointer":"not-allowed", ...mono, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", boxShadow:complete?`0 0 24px ${C.teal}44`:"none", transition:"all 0.2s" }}>{isLast?"Review & Submit →":`Next: ${SECTIONS[currentSection+1]?.label} →`}</button>
        </div>
      </div>
    </div>
  );
}
