import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the hero headline and search action', () => {
  render(<App />);
  expect(screen.getByText(/anywhere/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search buses/i })).toBeInTheDocument();
});

test('lists the overnight departures', () => {
  render(<App />);
  expect(screen.getByText(/Tripzo Nightliner/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /pick seats/i }).length).toBeGreaterThan(0);
});

test('routes page filters corridors by region', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('link', { name: /routes/i }));
  expect(await screen.findByText('9 corridors')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'North' }));
  expect(await screen.findByText('2 corridors in North')).toBeInTheDocument();
  expect(screen.getByText(/Delhi → Manali/)).toBeInTheDocument();
  expect(screen.queryByText(/Mumbai → Pune/)).not.toBeInTheDocument();
});

test('"See departures" carries the corridor into the search bar', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('link', { name: /routes/i }));
  userEvent.click(await screen.findByRole('button', { name: 'West' }));

  const [firstCta] = await screen.findAllByRole('button', { name: /see departures/i });
  userEvent.click(firstCta);

  expect(await screen.findByDisplayValue('Mumbai')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Pune')).toBeInTheDocument();
});
