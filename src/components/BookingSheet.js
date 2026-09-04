import React, { useMemo, useState } from 'react';
import SeatMap from './SeatMap';
import BookingModal from './BookingModal';
import { useBooking } from '../context/BookingContext';
import { BOARDING_POINTS, formatINR } from '../data/trips';
import './BookingSheet.css';

function BookingSheet({ trip, pax, onClose }) {
  const { isBooked } = useBooking();
  const [seats, setSeats] = useState([]);
  const [boardingIdx, setBoardingIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const capacity = Math.max(pax, 1);

  const toggleSeat = (id) => {
    setSeats((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= capacity) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const fare = useMemo(() => {
    const count = seats.length;
    const base = trip.price * count;
    const tax = Math.round(base * 0.05);
    const discount = count ? -Math.round(base * 0.08) : 0;
    return { count, base, tax, discount, total: base + tax + discount };
  }, [seats.length, trip.price]);

  const handleSuccess = () => {
    setConfirmed([...seats]);
    setSeats([]);
    setShowModal(false);
  };

  const boarding = BOARDING_POINTS[boardingIdx];

  return (
    <>
      <div className="sheet-scrim" onClick={onClose} />

      <aside className="sheet" role="dialog" aria-label="Choose your seats">
        <header className="sheet-head">
          <div className="sheet-head-copy">
            <div className="sheet-eyebrow">Choose your seats</div>
            <div className="sheet-operator">{trip.operator}</div>
            <div className="sheet-meta">
              {trip.dep} → {trip.arr} · {trip.duration} · {trip.tag}
            </div>
          </div>
          <button type="button" className="sheet-close" onClick={onClose} title="Close">
            ✕
          </button>
        </header>

        <div className="sheet-body">
          {confirmed && (
            <div className="sheet-success">
              ✅ Seats <strong>{confirmed.join(', ')}</strong> booked — find them under{' '}
              <em>My trips</em>.
            </div>
          )}

          <div className="deck-card">
            <div className="deck-head">
              <span className="deck-label">Lower deck</span>
              <span className="deck-front">
                Front <span className="deck-front-box" />
              </span>
            </div>

            <SeatMap
              selectedSeats={seats}
              onSeatToggle={toggleSeat}
              isSeatBooked={isBooked}
            />

            <div className="seat-legend">
              <span className="legend-item">
                <span className="legend-box legend-free" /> Free
              </span>
              <span className="legend-item">
                <span className="legend-box legend-selected" /> Selected
              </span>
              <span className="legend-item">
                <span className="legend-box legend-taken" /> Taken
              </span>
              <span className="legend-item">
                <span className="legend-box legend-ladies" /> Ladies
              </span>
            </div>
          </div>

          <div className="boarding-card">
            <div className="deck-label boarding-title">Boarding point</div>
            <div className="boarding-list">
              {BOARDING_POINTS.map((b, i) => (
                <button
                  key={b.name}
                  type="button"
                  className={`boarding-btn ${boardingIdx === i ? 'on' : ''}`}
                  onClick={() => setBoardingIdx(i)}
                >
                  <span className="boarding-dot" />
                  <span className="boarding-copy">
                    <span className="boarding-name">{b.name}</span>
                    <span className="boarding-note">{b.note}</span>
                  </span>
                  <span className="boarding-time">{b.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="sheet-foot">
          <div className="fare-row">
            <span>{fare.count ? `Fare × ${fare.count}` : 'Fare'}</span>
            <span>{formatINR(fare.base)}</span>
          </div>
          <div className="fare-row">
            <span>Taxes &amp; terminal fee</span>
            <span>{formatINR(fare.tax)}</span>
          </div>
          <div className="fare-row fare-discount">
            <span>TRIPZO20 discount</span>
            <span>{fare.discount ? '− ' + formatINR(Math.abs(fare.discount)) : '₹0'}</span>
          </div>

          <div className="fare-total-row">
            <div>
              <div className="fare-total-label">Total</div>
              <div className="fare-total-value">{formatINR(fare.total)}</div>
              <div className="fare-total-note">
                {fare.count
                  ? `Seats ${seats.join(', ')} · ${boarding.name.split(' — ')[0]}`
                  : `Select ${capacity} ${capacity > 1 ? 'seats' : 'seat'} to continue`}
              </div>
            </div>
            <button
              type="button"
              className="proceed-btn"
              disabled={!fare.count}
              onClick={() => setShowModal(true)}
            >
              {fare.count
                ? 'Continue to pay'
                : `Pick ${capacity} ${capacity > 1 ? 'seats' : 'seat'}`}
            </button>
          </div>
        </footer>
      </aside>

      {showModal && (
        <BookingModal
          seatNos={seats}
          trip={trip}
          total={fare.total}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}

export default BookingSheet;
