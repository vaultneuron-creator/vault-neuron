import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "4px 14px", fontSize: 11, color, fontFamily: "'Courier New', monospace", letterSpacing: 2.5, textTransform: "uppercase", display: "inline-block", fontWeight: 600 }}>{text}</span>
);
const GBox = ({ children, style = {}, accent = C.purple }) => (
  <div style={{ background: C.panel, border: `1px solid ${accent}44`, borderRadius: 12, boxShadow: `0 0 40px ${accent}10`, ...style }}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", href }) => {
  const base = { borderRadius: 8, padding: "13px 28px", fontSize: 13, cursor: "pointer", fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", display: "inline-block" };
  if (href) return <a href={href} download style={{ ...base, background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: "#fff", boxShadow: `0 0 30px ${C.purple}44` }}>{children}</a>;
  return <button onClick={onClick} style={{ ...base, background: variant === "primary" ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent", border: variant === "primary" ? "none" : "1px solid rgba(255,255,255,0.2)", color: variant === "primary" ? "#fff" : "rgba(255,255,255,0.85)", boxShadow: variant === "primary" ? `0 0 30px ${C.purple}44` : "none" }}>{children}</button>;
};

const articles = [
  {
    tag: "Data Architecture", date: "March 6, 2026", readTime: "2 min read",
    title: "If your data is a mess, AI is just a faster way to be wrong.",
    preview: "Everyone is talking about what AI can do. Nobody is talking about what it needs to work. Clean, connected, structured data — the foundation most operations are missing.",
    color: C.purple, id: "data-mess-ai",
  },
  {
    tag: "Technology", date: "Coming Soon", readTime: "",
    title: "AI Stack Navigator: How to evaluate AI tools against your operational readiness.",
    preview: "Before you buy another AI tool, answer this: is your operation ready to use it? Most aren't. Here's how to find out before you spend the money.",
    color: C.amber, id: "ai-stack-navigator", comingSoon: true,
  },
];

export default function VaultPage({ setPage, setArticle }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white }}>

      {/* HERO */}
      <section style={{ padding: "140px clamp(20px,6vw,80px) 80px", textAlign: "center", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.bg} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 400, height: 400, background: C.purple + "0D", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Pill text="The Vault" color={C.teal} />
          <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, margin: "20px 0 20px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Operational intelligence.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Free to use.
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto", fontFamily: "Georgia, serif" }}>
            Tools, frameworks, and thinking for operations leaders who want to understand what's broken before they try to fix it.
          </p>
        </div>
      </section>

      {/* FEATURED: 15-POINT AUDIT */}
      <section style={{ padding: "60px clamp(20px,6vw,80px) 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <Pill text="Featured Resource" color={C.amber} />
          </div>
          <GBox accent={C.amber} style={{ padding: "44px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>📋</span>
                  <span style={{ fontSize: 12, color: C.amber, fontFamily: "'Courier New', monospace", letterSpacing: 2, fontWeight: 700, background: C.amber + "22", border: `1px solid ${C.amber}55`, borderRadius: 4, padding: "3px 12px" }}>FREE DOWNLOAD</span>
                </div>
                <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, color: C.white, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>
                  The 15-Point Operational Friction Audit
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, margin: "0 0 20px", fontFamily: "Georgia, serif", maxWidth: 520 }}>
                  A self-assessment checklist for operations leaders. Fifteen yes/no questions across three pillars — Data Integrity, Workflow Velocity, and Decision Intelligence — that reveal exactly where your operation is leaking time and money.
                </p>
                <div style={{ display: "flex", gap: 32, marginBottom: 28, flexWrap: "wrap" }}>
                  {[["3 Pillars", "Data · Workflow · Decisions"], ["15 Questions", "Yes/No self-assessment"], ["5 Minutes", "Quick diagnostic tool"]].map(([num, label]) => (
                    <div key={num}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: C.amber, fontFamily: "'Courier New', monospace" }}>{num}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "Georgia, serif" }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Btn href="/15-point-friction-audit.pdf">Download Free PDF ↓</Btn>
                  <Btn variant="secondary" onClick={() => setPage("Assessment")}>Take the Full Assessment →</Btn>
                </div>
              </div>
              <div style={{ display: "none" }} />
            </div>
          </GBox>
        </div>
      </section>

      {/* DIAGNOSTIC TOOL */}
      <section style={{ padding: "40px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <Pill text="Diagnostic Tool" color={C.teal} />
          </div>
          <GBox accent={C.teal} style={{ padding: "40px 44px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>⚙️</span>
                  <span style={{ fontSize: 12, color: C.teal, fontFamily: "'Courier New', monospace", letterSpacing: 2, fontWeight: 700, background: C.teal + "22", border: `1px solid ${C.teal}55`, borderRadius: 4, padding: "3px 12px" }}>FREE ASSESSMENT</span>
                </div>
                <h2 style={{ fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 900, color: C.white, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>
                  Operational Readiness Assessment
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, margin: "0 0 20px", fontFamily: "Georgia, serif", maxWidth: 500 }}>
                  20 questions. 4 pillars. A scored, weighted diagnostic that maps exactly where your operation has the highest friction — and what tier you're operating in.
                </p>
                <Btn onClick={() => setPage("Assessment")}>Run the Diagnostic →</Btn>
              </div>
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: C.teal + "55", fontFamily: "'Courier New', monospace", lineHeight: 1 }}>425</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginTop: 4 }}>point system</div>
              </div>
            </div>
          </GBox>
        </div>
      </section>

      {/* VAULT LIBRARY */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", background: C.dark }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <Pill text="The Vault Library" color={C.purple} />
            <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, margin: "16px 0 8px", fontFamily: "Georgia, serif", color: C.white }}>
              Frameworks & Thinking
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
              Operational intelligence concepts for leaders who want to understand the architecture before they change it.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { title: "Clean Room Template", desc: "A structured framework for auditing data quality before connecting systems.", tag: "Data Architecture", color: C.teal },
              { title: "AI Stack Navigator", desc: "How to evaluate AI tools against your operational readiness — before you buy.", tag: "Technology", color: C.amber },
              { title: "Logic Loop Framework", desc: "A decision-making model for operations leaders dealing with recurring system failures.", tag: "Decision Design", color: C.purple },
            ].map(({ title, desc, tag, color }) => (
              <GBox key={title} accent={color} style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <Pill text={tag} color={color} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", letterSpacing: 2 }}>COMING SOON</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: C.white, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0, fontFamily: "Georgia, serif" }}>{desc}</p>
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <Pill text="The Logic Trap" color={C.teal} />
            <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, margin: "16px 0 8px", fontFamily: "Georgia, serif", color: C.white }}>
              Operational Intelligence Writing
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
              Articles and perspectives for leaders building smarter operations.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {articles.map(({ tag, date, readTime, title, preview, color, id, comingSoon }) => (
              <GBox key={id} accent={color} style={{ padding: "32px 36px", cursor: comingSoon ? "default" : "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onClick={() => !comingSoon && setPage && setPage("Article_" + id)}
                onMouseEnter={e => { if (!comingSoon) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <Pill text={tag} color={color} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif" }}>{date}</span>
                  {readTime && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif" }}>· {readTime}</span>}
                  {comingSoon && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", letterSpacing: 2 }}>· COMING SOON</span>}
                </div>
                <h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 900, color: C.white, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>{preview}</p>
                {!comingSoon && <span style={{ fontSize: 12, color, fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>Read article →</span>}
              </GBox>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", background: C.dark, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900, margin: "0 0 16px", fontFamily: "Georgia, serif", color: C.white }}>
            Ready to go deeper than the checklist?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 auto 28px", fontFamily: "Georgia, serif" }}>
            The 20-question Operational Readiness Assessment maps your exact gaps across four weighted pillars and gives you a scored architecture report.
          </p>
          <Btn onClick={() => setPage("Assessment")}>Run Your Free Diagnostic →</Btn>
        </div>
      </section>
    </div>
  );
}
