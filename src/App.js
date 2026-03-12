import { useState, useEffect } from "react";
import { Nav, Footer } from "./Nav";
import HomePage from "./HomePage";
import SolutionsPage from "./SolutionsPage";
import VaultPage from "./VaultPage";
import AboutPage from "./AboutPage";
import AssessmentPage from "./AssessmentPage";
import SystemInitializedPage from "./SystemInitializedPage";
import { TermsPage, PrivacyPage } from "./LegalPages";

export default function App() {
  const [page, setPage] = useState("Home");
  const [results, setResults] = useState(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const go = (p) => {
    if (p !== "Results") setResults(null);
    setPage(p);
  };

  const handleAssessmentComplete = (r) => {
    setResults(r);
    setPage("Results");
  };

  const isFullscreen = page === "Assessment" || page === "Results";

  const body = () => {
    switch (page) {
      case "Home":       return <HomePage setPage={go} />;
      case "Solutions":  return <SolutionsPage setPage={go} />;
      case "The Vault":  return <VaultPage setPage={go} />;
      case "About":      return <AboutPage setPage={go} />;
      case "Assessment": return <AssessmentPage setPage={go} onComplete={handleAssessmentComplete} />;
      case "Results":    return <SystemInitializedPage results={results} setPage={go} />;
      case "Terms":      return <TermsPage setPage={go} />;
      case "Privacy":    return <PrivacyPage setPage={go} />;
      default:           return <HomePage setPage={go} />;
    }
  };

  return (
    <div style={{ background: "#07070F", minHeight: "100vh" }}>
      <Nav page={page} setPage={go} />
      {body()}
      {!isFullscreen && <Footer setPage={go} />}
    </div>
  );
}
