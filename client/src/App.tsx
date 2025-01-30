import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/Login";
import ChartViewer from "./components/ChartViewer";
import Dashboard from "./components/pages/DashBoard";
import Navbar from "./components/NavBar";
import { SignedOut } from "@clerk/clerk-react";
import { getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";

function App() {
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    getAnalysis().then((data) => setAnalysisData(data));
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
