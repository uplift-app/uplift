import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Login";
import Dashboard from "./components/DashBoard";
import Navbar from "./components/NavBar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route
          path='/dashboard'
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route path='*' element={<RedirectToSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
