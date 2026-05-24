import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PlanPage from './pages/PlanPage.jsx';
import NutritionForm from './components/NutritionForm.jsx';
import CommunityPage from './components/CommunityPage.jsx';
import LogPage from './pages/LogPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="nav-header">
          <div className="nav-header-container">
            <div className="nav-logo">
              <Link to="/" className="nav-home-button">FitHea</Link>
            </div>
            <nav className="nav-links">
              <ul>
                <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
                <li><Link to="/log" className="nav-button">Activity Log</Link></li>
                <li><Link to="/plan" className="nav-button">Fitness Plan</Link></li>
                <li><Link to="/community" className="nav-button">Community</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          {/* <Route path="/dashboard" element={< />} /> */}
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