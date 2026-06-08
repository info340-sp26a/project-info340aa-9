import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import NutritionForm from "./components/NutritionForm.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import LogPage from "./pages/LogPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/nutrition" element={<NutritionForm />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>

        <footer>
          <p>&copy; 2026 FitHea Team. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="mailto:support@fithea.uw.edu">Contact</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
