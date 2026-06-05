import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import ReservePage from './pages/ReservePage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/reserve" replace />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
