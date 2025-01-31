import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/Login";
import Dashboard from "./components/pages/DashBoard";
import EntriesPage from "./components/pages/EntriesPage";
import Navbar from "./components/NavBar";
import { SignedOut } from "@clerk/clerk-react";
import { getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";
import DataInsights from "./components/DataInsights";
import PositiveEffects from "./components/PositiveEffects";

function App() {
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        getAnalysis().then((data) => setAnalysisData(data));
      } catch (error) {
        error instanceof Error ? error.message : "An error occurred";
      }
    };
    fetchAnalysis();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/login'
            element={
              <SignedOut>
                <LoginPage />
              </SignedOut>
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/entries' element={<EntriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
