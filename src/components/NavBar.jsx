import React from "react";
import { NavLink } from "react-router";

function NavBar(props) {
  return (
    <header class="nav-header">
      <div class="nav-header-container">
        <div class="nav-logo">
          <a href="../../index.html" class="nav-home-button">
            FitHea
          </a>
        </div>
        <nav aria-label="Main Navigation">
          <ul>
            <li>
              <NavLink to="/dashboard" className="active nav-button">
                Dashboard
              </NavLink>
            </li>
            <li>
              <a href="log.html" class="nav-button">
                Activity Log
              </a>
            </li>
            <li>
              <a href="plan.html" class="nav-button">
                Fitness Plan
              </a>
            </li>
            <li>
              <a href="community.html" class="nav-button">
                Community
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
