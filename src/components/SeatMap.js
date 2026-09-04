import React from 'react';
import { buildSeatRows, TAKEN_SEATS, LADIES_SEATS } from '../data/trips';
import './SeatMap.css';

const TAKEN = new Set(TAKEN_SEATS);
const LADIES = new Set(LADIES_SEATS);

/**
 * Coach layout: two seats each side of a centre aisle, 11 rows deep.
 * A seat counts as taken if it is demo inventory or already reserved
 * through the booking context.
 */
function SeatMap({ selectedSeats = [], onSeatToggle, isSeatBooked }) {
  const rows = buildSeatRows();
  const selected = new Set(selectedSeats);

  return (
    <div className="seat-grid">
      {rows.map((row) => (
        <div className="seat-row" key={row.key}>
          {row.cells.map((seatId, i) => {
            if (seatId === null) {
              return <span className="seat-aisle" key={`${row.key}-aisle-${i}`} />;
            }

            const taken = TAKEN.has(seatId) || (isSeatBooked ? isSeatBooked(seatId) : false);
            const ladies = LADIES.has(seatId);
            const isSelected = selected.has(seatId);

            const classes = ['seat'];
            if (taken) classes.push('seat-taken');
            else if (isSelected) classes.push('seat-selected');
            else if (ladies) classes.push('seat-ladies');

            const title = taken
              ? `${seatId} — taken`
              : `${seatId}${ladies ? ' — ladies only' : ''}`;

            return (
              <button
                type="button"
                key={seatId}
                className={classes.join(' ')}
                title={title}
                disabled={taken}
                onClick={() => onSeatToggle(seatId)}
              >
                {taken ? '' : isSelected ? '✓' : seatId}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatMap;
