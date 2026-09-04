import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand" onClick={() => navigate('/reserve')}>
          <span className="brand-mark">
            <span className="brand-mark-bar" />
          </span>
          <span className="brand-name">TRIPZO</span>
          <span className="brand-sub">Coach</span>
        </div>

        <nav className="main-nav">
          <NavLink
            to="/reserve"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Book
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            My trips
          </NavLink>
          <NavLink
            to="/routes"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Routes
          </NavLink>
          <span className="nav-link">Help</span>
        </nav>

        <div className="header-right">
          <span className="support-line">
            Support&nbsp; <strong>1800 233 900</strong>
          </span>
          <span className="avatar">AR</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
