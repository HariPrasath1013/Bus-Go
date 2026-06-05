import React, { useState } from 'react';
import './BookingModal.css';
import { useBooking } from '../context/BookingContext';

function BookingModal({ seatNos, onClose, onSuccess }) {
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
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      addBookings(seatNos.map(seatNo => ({ ...form, seatNo })));
      setSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="seat-badges">
            {seatNos.map(n => (
              <span className="seat-badge" key={n}>Seat {n}</span>
            ))}
          </div>
          <h2>Confirm Your Booking</h2>
          <p>
            {seatNos.length === 1
              ? 'Fill in your details to reserve this seat'
              : `Fill in your details to reserve ${seatNos.length} seats`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="form-row">
            <div className="field-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. Hari"
                className={errors.firstName ? 'error' : ''}
                autoFocus
              />
              {errors.firstName && <span className="err-msg">{errors.firstName}</span>}
            </div>

            <div className="field-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="e.g. Prasath"
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="err-msg">{errors.lastName}</span>}
            </div>
          </div>

          <div className="field-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="err-msg">{errors.email}</span>}
          </div>

          <button type="submit" className="btn-confirm" disabled={submitting}>
            {submitting
              ? 'Booking...'
              : `Confirm ${seatNos.length > 1 ? `${seatNos.length} Seats` : 'Booking'}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
