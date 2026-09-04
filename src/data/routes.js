// Network corridors shown on the Routes page.
// `load` is an 8-slot departure-frequency sparkline (0–9); 7+ renders as a peak bar.

export const ROUTES = [
  { from: 'Chennai',   to: 'Bengaluru',  region: 'South',   corridor: 'via Vellore · NH48',      duration: '7h 10m',  km: '348 km', perDay: 26, price: 649,  tag: 'Most booked',  load: [3, 2, 4, 6, 5, 8, 9, 7] },
  { from: 'Bengaluru', to: 'Hyderabad',  region: 'South',   corridor: 'via Anantapur · NH44',    duration: '9h 40m',  km: '575 km', perDay: 18, price: 899,  tag: 'Overnight',    load: [2, 1, 2, 3, 5, 8, 9, 8] },
  { from: 'Chennai',   to: 'Coimbatore', region: 'South',   corridor: 'via Salem · NH48',        duration: '8h 05m',  km: '505 km', perDay: 21, price: 749,  tag: 'Sleeper',      load: [2, 2, 3, 4, 6, 9, 8, 6] },
  { from: 'Mumbai',    to: 'Pune',       region: 'West',    corridor: 'via Expressway',          duration: '3h 25m',  km: '148 km', perDay: 42, price: 399,  tag: 'Every 30 min', load: [6, 7, 8, 9, 8, 7, 6, 5] },
  { from: 'Mumbai',    to: 'Goa',        region: 'Coastal', corridor: 'via Ratnagiri · NH66',    duration: '11h 50m', km: '590 km', perDay: 12, price: 1099, tag: 'Overnight',    load: [1, 1, 2, 2, 4, 8, 9, 7] },
  { from: 'Bengaluru', to: 'Kochi',      region: 'Coastal', corridor: 'via Salem · Thrissur',    duration: '10h 25m', km: '545 km', perDay: 14, price: 1049, tag: 'Sleeper',      load: [2, 1, 3, 3, 5, 9, 8, 6] },
  { from: 'Delhi',     to: 'Jaipur',     region: 'North',   corridor: 'via Gurugram · NH48',     duration: '5h 30m',  km: '281 km', perDay: 24, price: 549,  tag: 'Day coach',    load: [5, 8, 9, 7, 6, 5, 4, 3] },
  { from: 'Delhi',     to: 'Manali',     region: 'North',   corridor: 'via Chandigarh · Mandi',  duration: '12h 40m', km: '535 km', perDay: 9,  price: 1349, tag: 'Overnight',    load: [1, 1, 1, 2, 3, 9, 9, 6] },
  { from: 'Pune',      to: 'Hyderabad',  region: 'West',    corridor: 'via Solapur · NH65',      duration: '10h 15m', km: '560 km', perDay: 11, price: 949,  tag: 'Sleeper',      load: [1, 2, 2, 3, 4, 8, 9, 7] },
];

export const REGIONS = ['All', 'South', 'West', 'North', 'Coastal'];

export const BAR_MAX_HEIGHT = 26;
export const PEAK_THRESHOLD = 7;

/** Accent treatment for a corridor's badge. */
export function tagVariant(tag) {
  if (tag === 'Most booked') return 'hot';
  if (tag === 'Overnight' || tag === 'Every 30 min') return 'night';
  return '';
}
