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

function SeatMap({ onSeatClick, selectedSeats = new Set() }) {
  const { isBooked } = useBooking();

  const lowerRows = buildRows(1, 20);
  const upperRows = buildRows(21, 20);

  const renderSeat = (seatNo, keyPrefix) => {
    if (seatNo === null) return <div className="aisle" key={keyPrefix} />;

    const booked = isBooked(seatNo);
    const selected = selectedSeats.has(seatNo);

    let cls = 'seat';
    if (booked)        cls += ' seat-booked';
    else if (selected) cls += ' seat-selected';
    else               cls += ' seat-available';

    const label = booked
      ? `Seat ${seatNo} — Booked`
      : selected
      ? `Seat ${seatNo} — Selected (click to deselect)`
      : `Seat ${seatNo} — Available`;

    return (
      <button
        key={seatNo}
        className={cls}
        onClick={() => !booked && onSeatClick(seatNo)}
        disabled={booked}
        title={label}
      >
        {seatNo}
      </button>
    );
  };

  return (
    <div className="seatmap-wrapper">
      <div className="legend">
        <span className="legend-item"><span className="dot available" />Available</span>
        <span className="legend-item"><span className="dot selected" />Selected</span>
        <span className="legend-item"><span className="dot booked" />Booked</span>
      </div>

      <div className="bus-shell">
        <div className="deck-section">
          <div className="deck-header">
            <span className="driver-icon">🚌</span>
            <h3>Lower Deck</h3>
          </div>
          <div className="deck-grid">
            {lowerRows.map((row, ri) => (
              <div className="seat-row" key={`lower-${ri}`}>
                {row.map((s, si) =>
                  s === null
                    ? <div className="aisle" key={`aisle-l-${ri}-${si}`} />
                    : renderSeat(s, `l-${ri}-${si}`)
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="deck-divider" />

        <div className="deck-section">
          <div className="deck-header">
            <h3>Upper Deck</h3>
          </div>
          <div className="deck-grid">
            {upperRows.map((row, ri) => (
              <div className="seat-row" key={`upper-${ri}`}>
                {row.map((s, si) =>
                  s === null
                    ? <div className="aisle" key={`aisle-u-${ri}-${si}`} />
                    : renderSeat(s, `u-${ri}-${si}`)
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatMap;
