import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/DashBoard";
import EntriesPage from "./components/pages/EntriesPage";
import Navbar from "./components/NavBar";
import { SignedOut, useUser } from "@clerk/clerk-react";
import { errorHandler, getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  const { isSignedIn } = useUser();
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        getAnalysis().then((data) => setAnalysisData(data));
      } catch (error) {
        errorHandler(error);
      }
    };
    if (isSignedIn) fetchAnalysis();
  }, [isSignedIn]);

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
                <Login />
              </SignedOut>
            }
          />
          <Route
            path="/register"
            element={
              <SignedOut>
                <Register />
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
