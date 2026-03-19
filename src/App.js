import { useState, useEffect } from "react";
import { Nav, Footer } from "./Nav";
import HomePage from "./HomePage";
import SolutionsPage from "./SolutionsPage";
import VaultPage from "./VaultPage";
import AboutPage from "./AboutPage";
import AssessmentPage from "./AssessmentPage";
import SystemInitializedPage from "./SystemInitializedPage";
import BlogPage from "./BlogPage";
import { TermsPage, PrivacyPage } from "./LegalPages";
import LeadershipDiagnosticPage from "./LeadershipDiagnosticPage";
import TeamDiagnosticPage from "./TeamDiagnosticPage";

export default function App() {
  const [page, setPage] = useState("Home");
  const [results, setResults] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [diagnosticToken, setDiagnosticToken] = useState(null);

  // On load, check URL params for diagnostic page routing
  // Token email links use: ?page=leadership&token=VN-26-COMPANY-L-XXXX
  //                    or: ?page=team&token=VN-26-COMPANY-T-XXXX
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    const tokenParam = params.get("token");

    if (pageParam === "leadership") {
      setDiagnosticToken(tokenParam || "");
      setPage("LeadershipDiagnostic");
    } else if (pageParam === "team") {
      setDiagnosticToken(tokenParam || "");
      setPage("TeamDiagnostic");
    }
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const go = (p) => {
    if (p.startsWith("Article_")) {
      setArticleId(p.replace("Article_", ""));
      setPage("Article");
    } else {
      if (p !== "Results") setResults(null);
      setPage(p);
    }
  };

  const handleAssessmentComplete = (r) => {
    setResults(r);
    setPage("Results");
  };

  const isFullscreen = page === "Assessment" || page === "Results" || page === "LeadershipDiagnostic" || page === "TeamDiagnostic";

  const body = () => {
    switch (page) {
      case "Home":                 return <HomePage setPage={go} />;
      case "Solutions":            return <SolutionsPage setPage={go} />;
      case "The Vault":            return <VaultPage setPage={go} />;
      case "About":                return <AboutPage setPage={go} />;
      case "Assessment":           return <AssessmentPage setPage={go} onComplete={handleAssessmentComplete} />;
      case "Results":              return <SystemInitializedPage results={results} setPage={go} />;
      case "Article":              return <BlogPage articleId={articleId} setPage={go} />;
      case "Terms":                return <TermsPage setPage={go} />;
      case "Privacy":              return <PrivacyPage setPage={go} />;
      case "LeadershipDiagnostic": return <LeadershipDiagnosticPage token={diagnosticToken} />;
      case "TeamDiagnostic":       return <TeamDiagnosticPage token={diagnosticToken} />;
      default:                     return <HomePage setPage={go} />;
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
