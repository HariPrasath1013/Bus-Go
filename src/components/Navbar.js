import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function BusSVG() {
  return (
    <svg viewBox="0 0 52 30" width="52" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4" width="46" height="22" rx="4" fill="white" fillOpacity="0.95"/>
      <rect x="3" y="6" width="10" height="8" rx="1.5" fill="#ef4444"/>
      <rect x="15" y="6" width="7" height="6" rx="1" fill="#ef4444"/>
      <rect x="24" y="6" width="7" height="6" rx="1" fill="#ef4444"/>
      <rect x="33" y="6" width="7" height="6" rx="1" fill="#ef4444"/>
      <rect x="43" y="8" width="4" height="10" rx="1" fill="#fca5a5"/>
      <rect x="1" y="22" width="46" height="3" rx="1" fill="rgba(0,0,0,0.12)"/>
      <circle cx="10" cy="27" r="3" fill="#1f2937"/>
      <circle cx="10" cy="27" r="1.2" fill="#9ca3af"/>
      <circle cx="38" cy="27" r="3" fill="#1f2937"/>
      <circle cx="38" cy="27" r="1.2" fill="#9ca3af"/>
      <rect x="47" y="12" width="4" height="4" rx="1" fill="#fbbf24"/>
    </svg>
  );
}

function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    setDropOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => handleNav('/reserve')}>
        <div className="logo-box">
          <div className="logo-text-wrap">
            <span className="logo-bus">BUS</span>
            <span className="logo-go">GO</span>
          </div>
          <BusSVG />
        </div>
        <span className="nav-tagline">BOOK · RIDE · ARRIVE</span>
      </div>

      <div className="nav-links">
        <NavLink to="/reserve" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Reserve
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </NavLink>
      </div>

      <div className="nav-dropdown-wrap">
        <button className="nav-menu-btn" onClick={() => setDropOpen(o => !o)}>☰</button>
        {dropOpen && (
          <div className="nav-dropdown">
            <button onClick={() => handleNav('/reserve')}>Reserve</button>
            <button onClick={() => handleNav('/dashboard')}>Dashboard</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
