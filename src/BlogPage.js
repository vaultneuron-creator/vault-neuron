import { C } from "./tokens";

const Pill = ({ text, color = C.purple }) => (
  <span style={{ background: color + "22", border: `1px solid ${color}55`, borderRadius: 4, padding: "4px 14px", fontSize: 11, color, fontFamily: "'Courier New', monospace", letterSpacing: 2.5, textTransform: "uppercase", display: "inline-block", fontWeight: 600 }}>{text}</span>
);

const ARTICLES = {
  "data-mess-ai": {
    tag: "Data Architecture", date: "March 6, 2026", readTime: "2 min read", color: C.purple,
    title: "If your data is a mess, AI is just a faster way to be wrong.",
    body: [
      "Everyone is talking about what AI can do. The demos are impressive. The promises are bigger. And companies are spending money — fast.",
      "But here's what nobody is talking about: AI doesn't fix broken data. It amplifies it.",
      "When you run a large language model or any AI system on top of fragmented, inconsistent, or manually managed data, you don't get intelligence. You get confident-sounding garbage. Faster than ever before.",
      "The problem isn't the AI tool. The problem is the foundation it's sitting on.",
      "Most operations that come to us have the same pattern: data living in three different spreadsheets that haven't been reconciled in six months. Pricing information that only one person knows how to update. Customer records duplicated across two systems with different information in each. Reports that take hours to produce because someone has to manually pull from four sources and hope they match.",
      "That is not a foundation you can build AI on. It's a foundation that AI will make worse.",
      "Before you buy another tool — before you integrate another platform — ask yourself one question: if I gave this data to a brilliant analyst, would they be able to make a confident decision from it in the next five minutes?",
      "If the answer is no, AI isn't your next step. Architecture is.",
      "The path to operational intelligence is not: buy AI tool, plug it in, hope it works. The path is: clean the foundation, connect the systems, define what good data looks like, and then — and only then — introduce tools that can actually use it.",
      "That's what The Blueprint is. That's what we build. And that's why it comes before anything else.",
    ],
    cta: "If you're not sure whether your operation is ready, the 15-Point Friction Audit is a good place to start. It takes five minutes and it tells you exactly where the gaps are.",
  },
};

export default function BlogPage({ articleId, setPage }) {
  const article = ARTICLES[articleId];

  if (!article) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif", fontSize: 16, marginBottom: 24 }}>Article not found.</p>
        <button onClick={() => setPage("The Vault")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "10px 20px", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>← Back to The Vault</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white }}>
      {/* HERO */}
      <section style={{ padding: "140px clamp(20px,6vw,80px) 60px", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.bg} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "30%", width: 500, height: 300, background: article.color + "0C", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button onClick={() => setPage("The Vault")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "'Courier New', monospace", letterSpacing: 1, padding: 0, marginBottom: 32, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to The Vault
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            <Pill text={article.tag} color={article.color} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif" }}>{article.date}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif" }}>· {article.readTime}</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, margin: "0 0 0", fontFamily: "Georgia, serif", lineHeight: 1.2, color: C.white }}>
            {article.title}
          </h1>
        </div>
      </section>

      {/* BODY */}
      <section style={{ padding: "60px clamp(20px,6vw,80px) 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ borderLeft: `3px solid ${article.color}`, paddingLeft: 32, marginBottom: 48 }}>
            {article.body.map((para, i) => (
              <p key={i} style={{ fontSize: i === 0 ? 20 : 17, color: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 0 24px", fontFamily: "Georgia, serif", fontWeight: i === 0 ? 600 : 400 }}>
                {para}
              </p>
            ))}
          </div>

          {/* CTA BLOCK */}
          <div style={{ background: C.panel, border: `1px solid ${article.color}44`, borderRadius: 12, padding: "32px 36px", marginBottom: 48 }}>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 1.8, margin: "0 0 24px", fontFamily: "Georgia, serif" }}>
              {article.cta}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/15-point-friction-audit.pdf" download style={{
                background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
                border: "none", borderRadius: 8, padding: "12px 24px", color: "#fff",
                fontSize: 12, cursor: "pointer", fontFamily: "'Courier New', monospace",
                fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                textDecoration: "none", display: "inline-block",
                boxShadow: `0 0 24px ${C.purple}44`,
              }}>Download the 15-Point Audit ↓</a>
              <button onClick={() => setPage("Assessment")} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8, padding: "12px 24px", color: "rgba(255,255,255,0.82)",
                fontSize: 12, cursor: "pointer", fontFamily: "'Courier New', monospace",
                letterSpacing: 1.5, textTransform: "uppercase",
              }}>Run the Full Assessment →</button>
            </div>
          </div>

          <button onClick={() => setPage("The Vault")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "10px 20px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>
            ← Back to The Vault
          </button>
        </div>
      </section>
    </div>
  );
}
