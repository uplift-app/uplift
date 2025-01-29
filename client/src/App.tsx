import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
