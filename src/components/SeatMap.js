import React from 'react';
import './SeatMap.css';
import { useBooking } from '../context/BookingContext';

function buildRows(startSeat, count) {
  const rows = [];
  for (let i = 0; i < count; i += 5) {
    rows.push([
      startSeat + i,
      startSeat + i + 1,
      null,
      startSeat + i + 2,
      startSeat + i + 3,
      startSeat + i + 4,
    ]);
  }
  return rows;
}

function LowerDeckSVG() {
  return (
    <svg viewBox="0 0 90 38" width="90" height="38" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="78" height="26" rx="5" fill="#1e40af"/>
      <rect x="4" y="8" width="14" height="10" rx="2" fill="#60a5fa" fillOpacity="0.8"/>
      <rect x="20" y="8" width="10" height="8" rx="1.5" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="32" y="8" width="10" height="8" rx="1.5" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="44" y="8" width="10" height="8" rx="1.5" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="56" y="8" width="10" height="8" rx="1.5" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="68" y="10" width="8" height="12" rx="1.5" fill="#93c5fd" fillOpacity="0.5"/>
      <rect x="80" y="10" width="8" height="8" rx="2" fill="#fbbf24"/>
      <rect x="2" y="28" width="78" height="4" rx="1" fill="#1e3a8a"/>
      <circle cx="16" cy="34" r="4" fill="#0f172a"/>
      <circle cx="16" cy="34" r="1.5" fill="#475569"/>
      <circle cx="64" cy="34" r="4" fill="#0f172a"/>
      <circle cx="64" cy="34" r="1.5" fill="#475569"/>
    </svg>
  );
}

function UpperDeckSVG() {
  return (
    <svg viewBox="0 0 90 48" width="90" height="48" xmlns="http://www.w3.org/2000/svg">
      {/* Upper storey */}
      <rect x="6" y="2" width="70" height="18" rx="4" fill="#92400e"/>
      <rect x="8" y="4" width="9" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.7"/>
      <rect x="19" y="4" width="9" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.7"/>
      <rect x="30" y="4" width="9" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.7"/>
      <rect x="41" y="4" width="9" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.7"/>
      <rect x="52" y="4" width="9" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.7"/>
      {/* Lower storey */}
      <rect x="2" y="18" width="80" height="22" rx="5" fill="#78350f"/>
      <rect x="4" y="20" width="14" height="10" rx="2" fill="#fbbf24" fillOpacity="0.6"/>
      <rect x="20" y="20" width="10" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.5"/>
      <rect x="32" y="20" width="10" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.5"/>
      <rect x="44" y="20" width="10" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.5"/>
      <rect x="56" y="20" width="10" height="8" rx="1.5" fill="#fbbf24" fillOpacity="0.5"/>
      <rect x="70" y="22" width="8" height="12" rx="1.5" fill="#d97706" fillOpacity="0.5"/>
      <rect x="80" y="22" width="8" height="8" rx="2" fill="#fbbf24"/>
      <rect x="2" y="36" width="80" height="3" rx="1" fill="#451a03"/>
      <circle cx="16" cy="43" r="4" fill="#0f172a"/>
      <circle cx="16" cy="43" r="1.5" fill="#475569"/>
      <circle cx="66" cy="43" r="4" fill="#0f172a"/>
      <circle cx="66" cy="43" r="1.5" fill="#475569"/>
    </svg>
  );
}

function SeatMap({ onSeatClick, selectedSeats = new Set() }) {
  const { isBooked } = useBooking();

  const lowerRows = buildRows(1, 20);
  const upperRows = buildRows(21, 20);

  const renderSeat = (seatNo) => {
    const booked   = isBooked(seatNo);
    const selected = selectedSeats.has(seatNo);

    let cls = 'seat';
    if (booked)        cls += ' seat-booked';
    else if (selected) cls += ' seat-selected';
    else               cls += ' seat-available';

    return (
      <button
        key={seatNo}
        className={cls}
        onClick={() => !booked && onSeatClick(seatNo)}
        disabled={booked}
        title={booked ? `Seat ${seatNo} — Booked` : selected ? `Seat ${seatNo} — Selected` : `Seat ${seatNo} — Available`}
      >
        {booked ? '✕' : seatNo}
      </button>
    );
  };

  return (
    <div className="seatmap-inner">
      {/* Lower Deck */}
      <div className="deck-section">
        <div className="deck-header">
          <div className="deck-header-left">
            <span className="deck-badge lower-badge">LOWER DECK</span>
            <span className="deck-seats-label">Seats 1–20</span>
          </div>
          <LowerDeckSVG />
        </div>
        <div className="deck-grid">
          {lowerRows.map((row, ri) => (
            <div className="seat-row" key={`lower-${ri}`}>
              {row.map((s, si) =>
                s === null
                  ? <div className="aisle" key={`al-${ri}-${si}`} />
                  : renderSeat(s)
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="deck-divider" />

      {/* Upper Deck */}
      <div className="deck-section">
        <div className="deck-header">
          <div className="deck-header-left">
            <span className="deck-badge upper-badge">UPPER DECK</span>
            <span className="deck-seats-label">Seats 21–40</span>
          </div>
          <UpperDeckSVG />
        </div>
        <div className="deck-grid">
          {upperRows.map((row, ri) => (
            <div className="seat-row" key={`upper-${ri}`}>
              {row.map((s, si) =>
                s === null
                  ? <div className="aisle" key={`au-${ri}-${si}`} />
                  : renderSeat(s)
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeatMap;
