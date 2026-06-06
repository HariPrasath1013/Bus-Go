import React, { useState } from 'react';
import SeatMap from '../components/SeatMap';
import BookingModal from '../components/BookingModal';
import { useBooking } from '../context/BookingContext';
import './ReservePage.css';

const PRICE_PER_SEAT = 450;

function ReservePage() {
  const { bookings } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [successSeats, setSuccessSeats] = useState([]);

  const handleSeatClick = (seatNo) => {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      next.has(seatNo) ? next.delete(seatNo) : next.add(seatNo);
      return next;
    });
    setSuccessSeats([]);
  };

  const handleSuccess = () => {
    setSuccessSeats([...selectedSeats].sort((a, b) => a - b));
    setSelectedSeats(new Set());
    setShowModal(false);
  };

  const booked       = bookings.length;
  const selected     = selectedSeats.size;
  const available    = 40 - booked - selected;
  const total        = (selected * PRICE_PER_SEAT).toLocaleString('en-IN');
  const selectedArr  = [...selectedSeats].sort((a, b) => a - b);

  return (
    <div className="reserve-page">
      {/* Hero */}
      <div className="hero">
        <div className="live-badge">
          <span className="live-dot" />
          Live Seat Availability
        </div>

        <h1 className="hero-title">
          Reserve Your <span className="accent">Seat</span>
        </h1>
        <p className="hero-quote">"Every journey begins with a single seat — make it yours."</p>

        <div className="stat-pills">
          <div className="stat-pill available-pill">{available} Available</div>
          <div className="stat-pill selected-pill">{selected} Selected</div>
          <div className="stat-pill booked-pill">{booked} Booked</div>
          <div className="stat-total">40 Total</div>
        </div>

        <div className="legend">
          <span className="legend-item"><span className="dot dot-available" />Available</span>
          <span className="legend-item"><span className="dot dot-selected" />Selected</span>
          <span className="legend-item"><span className="dot dot-booked" />Booked</span>
        </div>
      </div>

      {successSeats.length > 0 && (
        <div className="success-banner">
          ✅ Seats <strong>{successSeats.join(', ')}</strong> successfully booked!
        </div>
      )}

      {/* Bus card */}
      <div className="bus-card">
        <SeatMap onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />

        {/* Confirm section */}
        <div className="confirm-section">
          <div className="confirm-info">
            <span className="confirm-label">
              Seats selected: <strong>{selected}</strong>
            </span>
            <span className="price-display">
              ₹{total} <small>total</small>
            </span>
          </div>
          <button
            className="btn-confirm-seats"
            disabled={selected === 0}
            onClick={() => selected > 0 && setShowModal(true)}
          >
            {selected > 0
              ? `Confirm ${selected} Seat${selected > 1 ? 's' : ''} — ₹${total} →`
              : 'Select seats to continue →'}
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal
          seatNos={selectedArr}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default ReservePage;
