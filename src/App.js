import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import ReservePage from './pages/ReservePage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const STAR_COUNT = 55;

function App() {
  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      top:      (Math.random() * 62).toFixed(2) + '%',
      left:     (Math.random() * 100).toFixed(2) + '%',
      size:     (Math.random() * 2.5 + 1).toFixed(1) + 'px',
      delay:    (Math.random() * 3).toFixed(2) + 's',
      duration: (Math.random() * 2 + 2).toFixed(2) + 's',
    })),
  []);

  return (
    <BrowserRouter>
      <BookingProvider>
        <div className="app-root">
          {/* Starfield */}
          {stars.map(s => (
            <div
              key={s.id}
              className="star"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                '--delay': s.delay,
                '--dur': s.duration,
              }}
            />
          ))}

          <div className="app-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/reserve" replace />} />
              <Route path="/reserve" element={<ReservePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </div>
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
