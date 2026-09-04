import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { formatINR } from '../data/trips';
import './BookingModal.css';

function BookingModal({ seatNos, trip, total, onClose, onSuccess }) {
  const { addBookings } = useBooking();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addBookings(
        seatNos.map((seatNo) => ({
          ...form,
          seatNo,
          operator: trip ? trip.operator : '',
          departure: trip ? trip.dep : '',
        }))
      );
      setSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-head">
          <div className="modal-eyebrow">Passenger details</div>
          <h2 className="modal-title">Confirm your booking</h2>
          {trip && (
            <p className="modal-meta">
              {trip.operator} · {trip.dep} → {trip.arr}
            </p>
          )}
          <div className="modal-seats">
            {seatNos.map((n) => (
              <span className="modal-seat" key={n}>
                Seat {n}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. Hari"
                className={errors.firstName ? 'err' : ''}
                autoFocus
              />
              {errors.firstName && <span className="field-err">{errors.firstName}</span>}
            </div>

            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="e.g. Prasath"
                className={errors.lastName ? 'err' : ''}
              />
              {errors.lastName && <span className="field-err">{errors.lastName}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? 'err' : ''}
            />
            {errors.email && <span className="field-err">{errors.email}</span>}
          </div>

          <button type="submit" className="modal-submit" disabled={submitting}>
            {submitting
              ? 'Confirming…'
              : `Pay ${typeof total === 'number' ? formatINR(total) : ''}`.trim()}
          </button>
          <p className="modal-fineprint">
            Free cancellation up to 2 hours before departure.
          </p>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
