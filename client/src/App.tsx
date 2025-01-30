import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/Login";
import Dashboard from "./components/pages/DashBoard";
import Navbar from "./components/NavBar";
import { SignedOut } from "@clerk/clerk-react";

function App() {
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
