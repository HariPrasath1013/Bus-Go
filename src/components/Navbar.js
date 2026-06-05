import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function BusLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bus body */}
      <rect x="3" y="8" width="30" height="18" rx="4" fill="white" fillOpacity="0.95"/>
      {/* Windshield */}
      <rect x="5" y="10" width="8" height="7" rx="1.5" fill="#60a5fa"/>
      {/* Side windows */}
      <rect x="15" y="10" width="5" height="5" rx="1" fill="#93c5fd"/>
      <rect x="22" y="10" width="5" height="5" rx="1" fill="#93c5fd"/>
      {/* Door */}
      <rect x="28" y="12" width="3" height="8" rx="1" fill="#bfdbfe"/>
      {/* Bottom stripe */}
      <rect x="3" y="22" width="30" height="3" rx="1" fill="#3b82f6" fillOpacity="0.4"/>
      {/* Wheels */}
      <circle cx="10" cy="27" r="3.5" fill="#1e3a5f"/>
      <circle cx="10" cy="27" r="1.5" fill="#94a3b8"/>
      <circle cx="26" cy="27" r="3.5" fill="#1e3a5f"/>
      <circle cx="26" cy="27" r="1.5" fill="#94a3b8"/>
      {/* Undercarriage */}
      <rect x="5" y="25" width="26" height="2" rx="1" fill="#1e3a5f" fillOpacity="0.3"/>
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
      <div className="nav-brand" onClick={() => handleNav('/reserve')}>
        <BusLogo />
        <span className="brand-name">BusGo</span>
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
        <button className="nav-menu-btn" onClick={() => setDropOpen(o => !o)}>
          ☰ Menu
        </button>
        {dropOpen && (
          <div className="nav-dropdown">
            <button onClick={() => handleNav('/reserve')}>🗺 Seat Map</button>
            <button onClick={() => handleNav('/dashboard')}>📋 Bookings</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
