import React, { useState } from 'react';
import SeatMap from '../components/SeatMap';
import BookingModal from '../components/BookingModal';
import { useBooking } from '../context/BookingContext';
import './ReservePage.css';

function ReservePage() {
  const { bookings } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [successSeats, setSuccessSeats] = useState([]);

  const handleSeatClick = (seatNo) => {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatNo)) next.delete(seatNo);
      else next.add(seatNo);
      return next;
    });
    setSuccessSeats([]);
  };

  const handleClearSelection = () => setSelectedSeats(new Set());

  const handleSuccess = () => {
    setSuccessSeats([...selectedSeats].sort((a, b) => a - b));
    setSelectedSeats(new Set());
    setShowModal(false);
  };

  const booked = bookings.length;
  const available = 40 - booked;
  const selectedArr = [...selectedSeats].sort((a, b) => a - b);

  return (
    <div className="reserve-page">
      <div className="reserve-header">
        <h1>Reserve Your Seat</h1>
        <p>Click seats to select, then confirm your booking below</p>
        <div className="stats-row">
          <div className="stat-chip available-chip">{available} Available</div>
          <div className="stat-chip selected-chip">{selectedSeats.size} Selected</div>
          <div className="stat-chip booked-chip">{booked} Booked</div>
          <div className="stat-chip total-chip">40 Total</div>
        </div>
      </div>

      {successSeats.length > 0 && (
        <div className="success-banner">
          ✅ Seats <strong>{successSeats.join(', ')}</strong> successfully booked!
        </div>
      )}

      <SeatMap onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />

      {selectedSeats.size > 0 && (
        <div className="booking-bar">
          <div className="booking-bar-seats">
            <span className="booking-bar-label">Selected:</span>
            {selectedArr.map(n => (
              <span className="bar-seat-chip" key={n}>
                Seat {n}
                <button
                  className="chip-remove"
                  onClick={() => handleSeatClick(n)}
                  title="Remove"
                >×</button>
              </span>
            ))}
          </div>
          <div className="booking-bar-actions">
            <button className="btn-clear" onClick={handleClearSelection}>
              Clear All
            </button>
            <button className="btn-book-now" onClick={() => setShowModal(true)}>
              Book {selectedSeats.size} Seat{selectedSeats.size > 1 ? 's' : ''} →
            </button>
          </div>
        </div>
      )}

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
