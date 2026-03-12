import { C } from "./tokens";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontSize: 20, fontWeight: 900, color: C.white, margin: "0 0 16px", fontFamily: "Georgia, serif", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>{title}</h2>
    <div style={{ fontSize: 15, color: C.light, lineHeight: 1.9, fontFamily: "Georgia, serif" }}>{children}</div>
  </div>
);

export function TermsPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, paddingTop: 70 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px clamp(20px,4vw,60px)" }}>
        <p style={{ fontSize: 11, color: C.slate, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Terms and Conditions</h1>
        <p style={{ fontSize: 13, color: C.slate, margin: "0 0 48px", fontFamily: "Georgia, serif" }}>Effective Date: March 1, 2026</p>

        <p style={{ fontSize: 15, color: C.light, lineHeight: 1.9, fontFamily: "Georgia, serif", marginBottom: 40 }}>
          Welcome to <strong style={{ color: C.white }}>Vault Neuron</strong>. These Terms and Conditions outline the rules and regulations for the use of the Vault Neuron website, located at <a href="https://vaultneuron.com" style={{ color: C.teal }}>vaultneuron.com</a>. By accessing this website, you accept these terms and conditions in full.
        </p>

        <Section title="1. Definitions and Entity Disclosure">
          <p>Vault Neuron is a trade name (DBA) of <strong style={{ color: C.white }}>Lynen Iron Legacy, LLC</strong>, an Ohio Limited Liability Company. Throughout these terms, "we," "us," and "our" refers to Lynen Iron Legacy, LLC.</p>
        </Section>

        <Section title="2. Intellectual Property Rights">
          <p style={{ marginBottom: 12 }}>Unless otherwise stated, Vault Neuron and/or its licensors own the intellectual property rights for all material on this site, including but not limited to the "Sandbox" simulations, architectural frameworks, and proprietary logic. All intellectual property rights are reserved.</p>
          <p>You must not: copy, republish, or redistribute material from Vault Neuron; sell, rent, or sub-license material from Vault Neuron; reproduce, duplicate, or "scrape" data from our reference architectures.</p>
        </Section>

        <Section title="3. The 'Sandbox' & Performance Disclaimer">
          <p style={{ marginBottom: 12 }}>The "Sandbox" section of this website contains high-fidelity synthetic simulations.</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Simulated Data:</strong> All data, dashboards, and results shown are generated for demonstration purposes. They do not represent real-time financial results or the data of actual past clients.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>No Guarantee:</strong> These simulations do not guarantee specific outcomes for your business.</li>
          </ul>
        </Section>

        <Section title="4. Operational Ecosystem & Subscription Policy">
          <p style={{ marginBottom: 12 }}>Vault Neuron operates as a technical architect and consultant. Our engagement model is built on Client Ownership:</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Environment:</strong> All development is performed within the Client's own software ecosystem.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Third-Party Subscriptions:</strong> Vault Neuron does not hold, manage, or pay for third-party software subscriptions on behalf of the Client.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Liability:</strong> We are not responsible for system failures caused by the Client's failure to maintain their third-party subscriptions or API access.</li>
          </ul>
        </Section>

        <Section title="5. Limitation of Liability & Disclaimers">
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>We exclude all representations, warranties, and conditions relating to our website and the use of this website.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Consulting Nature:</strong> The "Friction Audit" and "Blueprint" are strategic recommendations. Vault Neuron is not liable for business losses or damages resulting from the implementation of these recommendations by the Client or third parties.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Availability:</strong> We do not warrant that the website will be constantly available or that the material on the website is kept perfectly up-to-date.</li>
          </ul>
        </Section>

        <Section title="6. Governing Law">
          <p>These terms and conditions are governed by and construed in accordance with the laws of the <strong style={{ color: C.white }}>State of Ohio</strong>, and you irrevocably submit to the exclusive jurisdiction of the courts in that state.</p>
        </Section>

        <Section title="7. Contact Information">
          <p>If you have any questions regarding these terms, please contact us at <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal }}>connect@vaultneuron.com</a>.</p>
        </Section>

        <button onClick={() => setPage("Home")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 20px", color: C.slate, cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>← Back to Home</button>
      </div>
    </div>
  );
}

export function PrivacyPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, paddingTop: 70 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px clamp(20px,4vw,60px)" }}>
        <p style={{ fontSize: 11, color: C.slate, letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: C.slate, margin: "0 0 48px", fontFamily: "Georgia, serif" }}>Effective Date: March 1, 2026</p>

        <p style={{ fontSize: 15, color: C.light, lineHeight: 1.9, fontFamily: "Georgia, serif", marginBottom: 40 }}>
          <strong style={{ color: C.white }}>Vault Neuron</strong> ("we," "our," or "us") is a trade name of <strong style={{ color: C.white }}>Lynen Iron Legacy, LLC</strong>. We take the security of your operational data as seriously as the systems we build to manage it. This Privacy Policy outlines how we handle the information you provide during our "Friction Audit," "Blueprint," and "Ops Engine" phases.
        </p>

        <Section title="1. Data Collection & Use">
          <p>We collect business-related information (such as name, email, and high-level operational workflows) solely for the purpose of providing architectural consulting and automation services.</p>
        </Section>

        <Section title="2. The 'Vault' Security Standard">
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>No Data Sales:</strong> We do not sell, trade, or rent your business data to third parties.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>AI Processing:</strong> Any data processed via AI (e.g., Gemini, OpenAI) is done through Enterprise-grade API environments. Your proprietary data is never used to train public models.</li>
            <li style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Confidentiality:</strong> All "Friction Audits" are conducted under strict professional confidentiality.</li>
          </ul>
        </Section>

        <Section title="3. Third-Party Tools">
          <p>Our website may use cookies to improve your experience. You can opt-out of these at any time via your browser settings.</p>
        </Section>

        <Section title="4. Contact & Data Deletion">
          <p>You may request the full deletion of your contact information from our "Vault" at any time by contacting <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal }}>connect@vaultneuron.com</a>.</p>
        </Section>

        <button onClick={() => setPage("Home")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 20px", color: C.slate, cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>← Back to Home</button>
      </div>
    </div>
  );
}
