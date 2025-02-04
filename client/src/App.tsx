import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/Login";
import Dashboard from "./components/pages/DashBoard";
import EntriesPage from "./components/pages/EntriesPage";
import Navbar from "./components/NavBar";
import { SignedOut, useAuth } from "@clerk/clerk-react";
import { getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";

function App() {
  const { getToken } = useAuth();
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = await getToken({ template: "default" });
        if (token) getAnalysis(token).then((data) => setAnalysisData(data));
      } catch (error) {
        error instanceof Error ? error.message : "An error occurred";
      }
    };
    fetchAnalysis();
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#DEF3FF] to-[#fef9c3] text-fontColor py-4 px-[4%] md:px-[12%] font-nunito">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <SignedOut>
                <LoginPage />
              </SignedOut>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entries" element={<EntriesPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
