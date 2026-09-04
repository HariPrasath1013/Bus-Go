import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ROUTES,
  REGIONS,
  BAR_MAX_HEIGHT,
  PEAK_THRESHOLD,
  tagVariant,
} from '../data/routes';
import { formatINR } from '../data/trips';
import './RoutesPage.css';

function RoutesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROUTES.filter(
      (r) =>
        (region === 'All' || r.region === region) &&
        (!q || `${r.from} ${r.to} ${r.corridor}`.toLowerCase().includes(q))
    );
  }, [query, region]);

  const reset = () => {
    setQuery('');
    setRegion('All');
  };

  const seeDepartures = (r) =>
    navigate(`/reserve?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`);

  const heading =
    `${visible.length} ${visible.length === 1 ? 'corridor' : 'corridors'}` +
    (region === 'All' ? '' : ` in ${region}`);

  return (
    <div className="routes-page">
      {/* ---------------- hero ---------------- */}
      <section className="routes-hero">
        <div className="routes-hero-glow" />
        <div className="wrap routes-hero-inner">
          <div>
            <div className="eyebrow">The network</div>
            <h1 className="routes-title">
              214 routes.
              <br />
              <em>38 cities.</em>
            </h1>
            <p className="routes-lede">
              Every Tripzo corridor with live frequency, typical run time and the cheapest fare
              seen in the last 7 days.
            </p>
          </div>

          <div className="hero-tools">
            <label className="route-search">
              <span>Find a route</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City, terminal or corridor"
                autoComplete="off"
              />
            </label>

            <div className="regions">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className="region"
                  aria-pressed={region === r}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- corridor list ---------------- */}
      <main className="routes-body">
        <div className="wrap">
          <div className="list-head">
            <h2 className="list-heading">{heading}</h2>
            <span className="list-note">Fares are per seat, incl. taxes</span>
          </div>

          {visible.length === 0 ? (
            <div className="routes-empty">
              <h3>No corridor matches that search</h3>
              <p>Try a city name like Chennai, Pune or Kochi.</p>
              <button type="button" className="ghost" onClick={reset}>
                Show all routes
              </button>
            </div>
          ) : (
            <div className="route-list">
              {visible.map((r) => (
                <article className="route-card" key={`${r.from}-${r.to}`}>
                  <div>
                    <div className="pair">
                      <h3 className="pair-title">
                        {r.from} → {r.to}
                      </h3>
                      <span className={`tag ${tagVariant(r.tag)}`}>{r.tag}</span>
                    </div>
                    <div className="corridor">{r.corridor}</div>
                  </div>

                  <div>
                    <div className="label">Run time</div>
                    <div className="stat">{r.duration}</div>
                    <div className="sub">{r.km}</div>
                  </div>

                  <div>
                    <div className="label">Departures</div>
                    <div className="bars">
                      {r.load.map((v, i) => (
                        <i
                          key={i}
                          className={v >= PEAK_THRESHOLD ? 'peak' : ''}
                          style={{ height: `${Math.round((v / 9) * BAR_MAX_HEIGHT)}px` }}
                        />
                      ))}
                    </div>
                    <div className="sub">{r.perDay}/day</div>
                  </div>

                  <div>
                    <div className="label">From</div>
                    <div className="fare">{formatINR(r.price)}</div>
                  </div>

                  <button type="button" className="cta" onClick={() => seeDepartures(r)}>
                    See departures
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RoutesPage;
