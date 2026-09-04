import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingSheet from '../components/BookingSheet';
import {
  TRIPS,
  DATE_LABELS,
  DEPARTURE_WINDOWS,
  BUS_TYPES,
  SORT_MODES,
  formatINR,
  departureBucket,
} from '../data/trips';
import './ReservePage.css';

const DEFAULT_PASSENGERS = 2;

function ReservePage() {
  const [params] = useSearchParams();
  const [from, setFrom] = useState(() => params.get('from') || 'Chennai');
  const [to, setTo] = useState(() => params.get('to') || 'Bengaluru');
  const [pax, setPax] = useState(DEFAULT_PASSENGERS);
  const [dateIdx, setDateIdx] = useState(1);
  const [sort, setSort] = useState('Departure');
  const [windows, setWindows] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);

  // Arriving from the Routes page with ?from=&to= — adopt that corridor.
  useEffect(() => {
    const f = params.get('from');
    const t = params.get('to');
    if (f) setFrom(f);
    if (t) setTo(t);
  }, [params]);

  const toggle = (setter) => (value) =>
    setter((list) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]));

  const toggleWindow = toggle(setWindows);
  const toggleType = toggle(setTypes);

  const visibleTrips = useMemo(() => {
    let list = TRIPS.filter((t) => {
      if (types.length) {
        const ok = types.some(
          (ty) =>
            (ty === 'Sleeper' && t.sleeper) ||
            (ty === 'AC' && t.ac) ||
            (ty === 'Seater' && !t.sleeper)
        );
        if (!ok) return false;
      }
      if (windows.length && !windows.includes(departureBucket(t.dep))) return false;
      return true;
    });

    if (sort === 'Cheapest') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [types, windows, sort]);

  const selectedTrip = TRIPS.find((t) => t.id === selectedTripId) || null;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const clearFilters = () => {
    setWindows([]);
    setTypes([]);
  };

  return (
    <div className="reserve-page">
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="live-badge">
              <span className="live-dot" />
              Live tracking on 214 routes tonight
            </div>
            <h1 className="hero-title">
              Overnight to
              <br />
              <span className="hero-em">anywhere</span> comfortable.
            </h1>
            <p className="hero-sub">
              Reclining sleepers, live seat maps, and a real human on the phone. Pick your seat
              before you pay — no surprises at the door.
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">4.8</div>
              <div className="hero-stat-label">Rider score</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">92%</div>
              <div className="hero-stat-label">On time</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">₹0</div>
              <div className="hero-stat-label">Change fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- search bar ---------------- */}
      <div className="searchbar-wrap">
        <div className="searchbar">
          <div className="search-group search-places">
            <label className="search-field">
              <span className="field-label">From</span>
              <input
                className="field-input"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Origin city"
              />
              <span className="field-hint">Central Bus Terminal</span>
            </label>

            <button className="swap-btn" onClick={swap} title="Swap" type="button">
              ⇄
            </button>

            <label className="search-field">
              <span className="field-label">To</span>
              <input
                className="field-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination city"
              />
              <span className="field-hint">Kempegowda Stand</span>
            </label>
          </div>

          <div className="search-group search-meta">
            <span className="search-divider" />

            <div className="search-dates">
              <span className="field-label">Travel date</span>
              <div className="date-chips">
                {DATE_LABELS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    className={`chip ${dateIdx === i ? 'chip-on' : ''}`}
                    onClick={() => setDateIdx(i)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <span className="search-divider" />

            <div className="search-seats">
              <span className="field-label">Seats</span>
              <div className="stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setPax((p) => Math.max(1, p - 1))}
                >
                  −
                </button>
                <span className="step-value">{pax}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setPax((p) => Math.min(6, p + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="search-submit"
              onClick={() => setSelectedTripId(null)}
            >
              Search buses
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- results ---------------- */}
      <main className="results-layout">
        <aside className="filter-rail">
          <div className="filter-card">
            <div className="filter-head">
              <span className="filter-title">Filters</span>
              <button type="button" className="filter-reset" onClick={clearFilters}>
                Reset
              </button>
            </div>

            <div className="filter-label">Departure</div>
            <div className="window-grid">
              {DEPARTURE_WINDOWS.map((w) => (
                <button
                  key={w.label}
                  type="button"
                  className={`window-btn ${windows.includes(w.label) ? 'on' : ''}`}
                  onClick={() => toggleWindow(w.label)}
                >
                  <span className="window-icon">{w.icon}</span>
                  <span className="window-name">{w.label}</span>
                  <span className="window-range">{w.range}</span>
                </button>
              ))}
            </div>

            <div className="filter-label">Bus type</div>
            <div className="type-list">
              {BUS_TYPES.map((t) => {
                const on = types.includes(t.label);
                return (
                  <button
                    key={t.label}
                    type="button"
                    className={`type-btn ${on ? 'on' : ''}`}
                    onClick={() => toggleType(t.label)}
                  >
                    <span className="type-box">{on ? '✓' : ''}</span>
                    <span className="type-name">{t.label}</span>
                    <span className="type-count">{t.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-glow" />
            <div className="promo-inner">
              <div className="promo-label">Flexible fare</div>
              <p className="promo-text">
                Cancel up to 2 hours before departure and get 100% back to your wallet.
              </p>
              <span className="promo-link">How it works →</span>
            </div>
          </div>
        </aside>

        <section className="results">
          <div className="results-head">
            <div>
              <h2 className="results-title">
                {from} → {to}
              </h2>
              <p className="results-sub">
                {DATE_LABELS[dateIdx]} · {visibleTrips.length} of {TRIPS.length} buses · {pax}{' '}
                {pax > 1 ? 'seats' : 'seat'}
              </p>
            </div>
            <div className="sort-tabs">
              {SORT_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`sort-tab ${sort === mode ? 'on' : ''}`}
                  onClick={() => setSort(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="trip-list">
            {visibleTrips.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🚏</div>
                <h3>No buses match those filters</h3>
                <p>Try clearing a filter or widening your departure window.</p>
                <button type="button" className="filter-reset" onClick={clearFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              visibleTrips.map((trip) => {
                const active = selectedTripId === trip.id;
                const scarce = trip.left <= 5;
                return (
                  <article key={trip.id} className={`trip-card ${active ? 'active' : ''}`}>
                    <div className="trip-main">
                      <div className="trip-head">
                        <span className="trip-operator">{trip.operator}</span>
                        <span className={`trip-tag ${trip.ac ? 'tag-ac' : 'tag-nonac'}`}>
                          {trip.tag}
                        </span>
                        <span className="trip-rating">★ {trip.rating.toFixed(1)}</span>
                        <span className="trip-reviews">{trip.reviews} reviews</span>
                      </div>

                      <div className="trip-times">
                        <div>
                          <div className="trip-time">{trip.dep}</div>
                          <div className="trip-stop">{trip.depStop}</div>
                        </div>

                        <div className="trip-route">
                          <div className="trip-duration">{trip.duration}</div>
                          <div className="route-line">
                            <span className="route-dot route-dot-start" />
                            <span className="route-dot route-dot-end" />
                          </div>
                          <div className="trip-stops">{trip.stops}</div>
                        </div>

                        <div>
                          <div className="trip-time">{trip.arr}</div>
                          <div className="trip-stop">{trip.arrStop}</div>
                        </div>
                      </div>

                      <div className="amenities">
                        {trip.amenities.map((a) => (
                          <span className="amenity" key={a}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="trip-aside">
                      <div className="trip-price-block">
                        <div className="price-was">{formatINR(trip.was)}</div>
                        <div className="price-now">{formatINR(trip.price)}</div>
                        <div className="price-note">per seat · incl. taxes</div>
                        <div className={`seats-left ${scarce ? 'scarce' : ''}`}>
                          {trip.left} seats left
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`pick-btn ${active ? 'on' : ''}`}
                        onClick={() => setSelectedTripId(trip.id)}
                      >
                        {active ? 'Selected' : 'Pick seats'}
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {visibleTrips.length > 0 && (
            <div className="results-foot">
              Showing the {visibleTrips.length} best matches ·{' '}
              <a href="#all-departures" onClick={(e) => e.preventDefault()}>
                see all 31 departures
              </a>
            </div>
          )}
        </section>
      </main>

      {selectedTrip && (
        <BookingSheet
          trip={selectedTrip}
          pax={pax}
          onClose={() => setSelectedTripId(null)}
        />
      )}
    </div>
  );
}

export default ReservePage;
