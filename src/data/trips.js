// Static catalogue backing the search results, filter rail and seat sheet.

export const TRIPS = [
  {
    id: 't1',
    operator: 'Tripzo Nightliner',
    tag: 'Sleeper AC',
    rating: 4.8,
    reviews: 1204,
    dep: '21:45',
    arr: '06:10',
    depStop: 'Central Terminal, Bay 4',
    arrStop: 'Kempegowda Stand',
    duration: '8h 25m',
    stops: 'Direct · 1 rest stop',
    price: 1249,
    was: 1560,
    left: 6,
    sleeper: true,
    ac: true,
    amenities: ['🛏 Flat bed', '⚡ USB + socket', '📶 Wi-Fi', '🚻 Onboard restroom'],
  },
  {
    id: 't2',
    operator: 'Tripzo Express 210',
    tag: 'Semi-sleeper',
    rating: 4.6,
    reviews: 862,
    dep: '22:30',
    arr: '05:40',
    depStop: 'Central Terminal, Bay 1',
    arrStop: 'Satellite Hub',
    duration: '7h 10m',
    stops: 'Fastest tonight',
    price: 989,
    was: 1150,
    left: 3,
    sleeper: false,
    ac: true,
    amenities: ['💺 Recliner 150°', '⚡ USB', '🎬 Screen', '🧊 A/C'],
  },
  {
    id: 't3',
    operator: 'Highland Coach',
    tag: 'Sleeper AC',
    rating: 4.4,
    reviews: 415,
    dep: '19:15',
    arr: '04:05',
    depStop: 'North Gate, Bay 9',
    arrStop: 'Kempegowda Stand',
    duration: '8h 50m',
    stops: '2 stops',
    price: 899,
    was: 1040,
    left: 12,
    sleeper: true,
    ac: true,
    amenities: ['🛏 Bunk', '🧊 A/C', '🧳 2 bags', '☕ Snack box'],
  },
  {
    id: 't4',
    operator: 'Ridge Motors',
    tag: 'Non-AC seater',
    rating: 4.1,
    reviews: 233,
    dep: '14:20',
    arr: '23:30',
    depStop: 'Central Terminal, Bay 7',
    arrStop: 'City Bus Stand',
    duration: '9h 10m',
    stops: '4 stops',
    price: 649,
    was: 720,
    left: 21,
    sleeper: false,
    ac: false,
    amenities: ['💺 Push-back', '🪟 Window vents', '🧳 1 bag'],
  },
];

/** Seats already sold on the coach (demo inventory). */
export const TAKEN_SEATS = ['L2', 'R1', 'L5', 'R6', 'R7', 'L8', 'R3', 'L11'];

/** Seats reserved for female passengers. */
export const LADIES_SEATS = ['L3', 'L4'];

export const SEAT_ROW_COUNT = 11;

export const BOARDING_POINTS = [
  { name: 'Central Terminal — Bay 4', note: 'Waiting lounge, water, charging', time: '21:45' },
  { name: 'Guindy Metro Gate 2', note: 'Curbside pickup', time: '22:05' },
  { name: 'Perungalathur Toll', note: 'Last pickup point', time: '22:35' },
];

export const DATE_LABELS = ['Tonight', 'Sat 12', 'Sun 13'];

export const DEPARTURE_WINDOWS = [
  { label: 'Morning', icon: '🌅', range: '05–11' },
  { label: 'Midday', icon: '☀️', range: '11–16' },
  { label: 'Evening', icon: '🌇', range: '16–20' },
  { label: 'Night', icon: '🌙', range: '20–05' },
];

export const BUS_TYPES = [
  { label: 'Sleeper', count: TRIPS.filter((t) => t.sleeper).length },
  { label: 'AC', count: TRIPS.filter((t) => t.ac).length },
  { label: 'Seater', count: TRIPS.filter((t) => !t.sleeper).length },
];

export const SORT_MODES = ['Departure', 'Cheapest', 'Rating'];

export const formatINR = (n) => '₹' + Number(n).toLocaleString('en-IN');

/** Which departure-window bucket an "HH:MM" time falls into. */
export function departureBucket(time) {
  const h = parseInt(time, 10);
  if (h < 11) return 'Morning';
  if (h < 16) return 'Midday';
  if (h < 20) return 'Evening';
  return 'Night';
}

/** Rows of [L, LB, aisle, R, RB] seat ids — aisle is null. */
export function buildSeatRows(rowCount = SEAT_ROW_COUNT) {
  const rows = [];
  for (let r = 1; r <= rowCount; r++) {
    rows.push({
      key: `row-${r}`,
      cells: [`L${r}`, `L${r}B`, null, `R${r}`, `R${r}B`],
    });
  }
  return rows;
}
