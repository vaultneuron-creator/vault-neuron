import { C } from "./tokens";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 19, fontWeight: 900, color: C.white, margin: "0 0 16px", fontFamily: "Georgia, serif", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>{title}</h2>
    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.95, fontFamily: "Georgia, serif" }}>{children}</div>
  </div>
);

const Li = ({ children }) => (
  <li style={{ marginBottom: 10 }}>{children}</li>
);

export function TermsPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, paddingTop: 70 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px clamp(20px,4vw,60px)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif", color: C.white }}>Terms and Conditions</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 48px", fontFamily: "Georgia, serif" }}>Effective Date: March 1, 2026 · Last Updated: March 2026</p>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.95, fontFamily: "Georgia, serif", marginBottom: 40 }}>
          Welcome to <strong style={{ color: C.white }}>Vault Neuron</strong>, a trade name (DBA) of <strong style={{ color: C.white }}>Lynen Iron Legacy, LLC</strong>, an Ohio Limited Liability Company. By accessing vaultneuron.com or engaging our services, you accept these terms in full. If you do not agree to these terms, do not use this website or engage our services.
        </p>

        <Section title="1. Entity Disclosure">
          <p>Vault Neuron is a trade name (DBA) of <strong style={{ color: C.white }}>Lynen Iron Legacy, LLC</strong>, an Ohio Limited Liability Company. Throughout these terms, "we," "us," and "our" refers to Lynen Iron Legacy, LLC, operating as Vault Neuron.</p>
        </Section>

        <Section title="2. Intellectual Property Ownership">
          <p style={{ marginBottom: 12 }}>All frameworks, methodologies, diagnostic tools, deliverables, reports, templates, and proprietary systems created by Vault Neuron — including but not limited to The Blueprint, The Ops Engine, The Architecture, The 15-Point Friction Audit, and the Operational Readiness Assessment — remain the exclusive intellectual property of Lynen Iron Legacy, LLC unless explicitly transferred in a signed written agreement.</p>
          <p style={{ marginBottom: 12 }}>Client-specific deliverables (reports, architecture plans) are licensed to the client for internal use. The underlying frameworks, methodologies, and tools used to create those deliverables are not transferred and remain the property of Vault Neuron.</p>
          <p>You must not copy, republish, redistribute, sell, sublicense, or reproduce any material from this website or from Vault Neuron engagements without explicit written consent.</p>
        </Section>

        <Section title="3. No Guarantee of Results">
          <p style={{ marginBottom: 12 }}>Vault Neuron provides operational intelligence consulting, diagnostic, and implementation services. The quality of outcomes depends substantially on the accuracy of information provided by the Client, the Client's willingness to implement recommendations, and factors outside Vault Neuron's control.</p>
          <ul style={{ paddingLeft: 20 }}>
            <Li><strong style={{ color: C.white }}>No Warranty of Outcomes:</strong> We do not guarantee specific business results, revenue improvements, cost reductions, or operational metrics from our engagements.</Li>
            <Li><strong style={{ color: C.white }}>Simulation & Assessment Disclaimer:</strong> Assessments, audits, and diagnostic tools provide analytical frameworks based on self-reported information. Results are directional, not absolute.</Li>
            <Li><strong style={{ color: C.white }}>Implementation Dependency:</strong> Architecture plans and recommendations require client-side execution. Vault Neuron is not responsible for outcomes resulting from partial or modified implementation of its recommendations.</Li>
          </ul>
        </Section>

        <Section title="4. Payment Terms">
          <ul style={{ paddingLeft: 20 }}>
            <Li><strong style={{ color: C.white }}>Engagement Deposits:</strong> All project engagements require a deposit (typically 50%) before work begins. Specific payment schedules are outlined in individual Scope of Work agreements.</Li>
            <Li><strong style={{ color: C.white }}>Late Payments:</strong> Invoices unpaid after 15 days of the due date are subject to a late fee of 1.5% per month on the outstanding balance.</Li>
            <Li><strong style={{ color: C.white }}>Work Suspension:</strong> Vault Neuron reserves the right to suspend work on any engagement where payment is more than 30 days overdue, without liability for project delays resulting from the suspension.</Li>
            <Li><strong style={{ color: C.white }}>Refunds:</strong> Deposits are non-refundable once project work has commenced. Unused retainer amounts may be refunded at Vault Neuron's discretion with 30 days written notice.</Li>
          </ul>
        </Section>

        <Section title="5. Confidentiality">
          <p style={{ marginBottom: 12 }}>Vault Neuron understands that engagements involve access to sensitive operational, financial, and strategic information. We treat all client information as strictly confidential.</p>
          <ul style={{ paddingLeft: 20 }}>
            <Li><strong style={{ color: C.white }}>Non-Disclosure:</strong> We will not disclose client-specific operational details, data, or business information to any third party without explicit written consent, except as required by law.</Li>
            <Li><strong style={{ color: C.white }}>AI & Third-Party Tools:</strong> Any client data processed through AI or third-party tools is done through enterprise-grade API environments. Client data is never used to train public AI models.</Li>
            <Li><strong style={{ color: C.white }}>Aggregate Insights:</strong> We reserve the right to use anonymized, aggregated insights from engagements to improve our frameworks and methodologies, provided no client-identifying information is included.</Li>
            <Li><strong style={{ color: C.white }}>Mutual Obligation:</strong> Clients agree to keep Vault Neuron's proprietary frameworks, pricing, and methodologies confidential and not to share them with third parties or competitors.</Li>
          </ul>
        </Section>

        <Section title="6. Limitation of Liability">
          <p style={{ marginBottom: 12 }}>To the maximum extent permitted by applicable law:</p>
          <ul style={{ paddingLeft: 20 }}>
            <Li>Vault Neuron's total liability to any client for claims arising from an engagement shall not exceed the total fees paid by that client in the 12 months preceding the claim.</Li>
            <Li>Vault Neuron shall not be liable for any indirect, incidental, consequential, or punitive damages, including lost profits or lost business opportunity, even if advised of the possibility of such damages.</Li>
            <Li>We are not liable for system failures, data loss, or operational disruptions caused by third-party software, the client's failure to maintain their own technology subscriptions, or events outside our reasonable control.</Li>
          </ul>
        </Section>

        <Section title="7. Operational Ecosystem & Subscriptions">
          <p style={{ marginBottom: 12 }}>Vault Neuron builds within the Client's existing software ecosystem. We do not hold, manage, or pay for third-party software subscriptions on behalf of clients. Clients are responsible for maintaining their own software licenses, API access, and technology subscriptions necessary for the continued operation of any systems we build.</p>
        </Section>

        <Section title="8. Governing Law">
          <p>These terms are governed by and construed in accordance with the laws of the <strong style={{ color: C.white }}>State of Ohio</strong>. Any disputes arising under these terms shall be resolved in the courts of the State of Ohio, and you irrevocably submit to the exclusive jurisdiction of those courts.</p>
        </Section>

        <Section title="9. Contact">
          <p>Questions regarding these terms: <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal }}>connect@vaultneuron.com</a></p>
        </Section>

        <button onClick={() => setPage("Home")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "10px 20px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>← Back to Home</button>
      </div>
    </div>
  );
}

export function PrivacyPage({ setPage }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, paddingTop: 70 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px clamp(20px,4vw,60px)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3, fontFamily: "'Courier New', monospace", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif", color: C.white }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 48px", fontFamily: "Georgia, serif" }}>Effective Date: March 1, 2026 · Last Updated: March 2026</p>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.95, fontFamily: "Georgia, serif", marginBottom: 40 }}>
          <strong style={{ color: C.white }}>Vault Neuron</strong> (a trade name of <strong style={{ color: C.white }}>Lynen Iron Legacy, LLC</strong>) takes the privacy and security of your information as seriously as the systems we build to protect it. This policy explains how we collect, use, and protect the information you share with us.
        </p>

        <Section title="1. Information We Collect">
          <p style={{ marginBottom: 12 }}>We collect information you voluntarily provide, including:</p>
          <ul style={{ paddingLeft: 20 }}>
            <Li>Contact information (name, email address, company name) submitted through our assessment, contact forms, or consultations</Li>
            <Li>Assessment responses submitted through our Operational Readiness Assessment</Li>
            <Li>Information shared during consulting engagements, including operational data, workflow details, and business processes</Li>
          </ul>
          <p style={{ marginTop: 12 }}>We do not collect payment information directly — all payment processing is handled by third-party providers.</p>
        </Section>

        <Section title="2. The Vault Security Standard">
          <ul style={{ paddingLeft: 20 }}>
            <Li><strong style={{ color: C.white }}>No Data Sales:</strong> We do not sell, trade, rent, or share your personal or business information with third parties for commercial purposes. Ever.</Li>
            <Li><strong style={{ color: C.white }}>AI Processing:</strong> Any data processed via AI tools (e.g., Gemini, OpenAI, Claude) is done exclusively through enterprise-grade API environments. Your proprietary data is never used to train public AI models.</Li>
            <Li><strong style={{ color: C.white }}>Confidentiality:</strong> All client engagements are conducted under professional confidentiality. Operational details, business data, and strategic information shared with Vault Neuron are not disclosed to any third party without your explicit written consent.</Li>
            <Li><strong style={{ color: C.white }}>Assessment Data:</strong> Responses submitted through our Operational Readiness Assessment are stored securely and used solely to generate your diagnostic report and to inform how we might serve you. Your responses are not shared externally.</Li>
          </ul>
        </Section>

        <Section title="3. Confidentiality in Engagements">
          <p>During consulting engagements, we may access sensitive operational information including pricing, workflows, vendor relationships, and business processes. All such information is treated as strictly confidential. We will not disclose client-specific information to any third party without your written consent, except as required by applicable law.</p>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul style={{ paddingLeft: 20 }}>
            <Li>To provide and improve our consulting and diagnostic services</Li>
            <Li>To respond to your inquiries and schedule consultations</Li>
            <Li>To generate and deliver your assessment results</Li>
            <Li>To communicate about your engagement, updates, or relevant resources</Li>
            <Li>To improve our frameworks and methodologies using anonymized, aggregated insights</Li>
          </ul>
        </Section>

        <Section title="5. Third-Party Tools & Cookies">
          <p style={{ marginBottom: 12 }}>Our website may use standard web analytics tools and cookies to improve your experience. You can opt out via your browser settings at any time.</p>
          <p>We use select third-party tools (scheduling, email, document management) to operate our business. These tools have their own privacy policies and data practices. We only work with providers who maintain strong data security standards.</p>
        </Section>

        <Section title="6. Data Retention & Deletion">
          <p>We retain client information for as long as necessary to fulfill the purposes described in this policy and to comply with legal obligations. You may request the deletion of your information at any time by contacting <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal }}>connect@vaultneuron.com</a>. We will process deletion requests within 30 days.</p>
        </Section>

        <Section title="7. Contact">
          <p>Questions about this Privacy Policy or how we handle your data: <a href="mailto:connect@vaultneuron.com" style={{ color: C.teal }}>connect@vaultneuron.com</a></p>
        </Section>

        <button onClick={() => setPage("Home")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "10px 20px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>← Back to Home</button>
      </div>
    </div>
  );
}
