import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import './DashboardPage.css';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function DashboardPage() {
  const { bookings, updateBooking, deleteBooking } = useBooking();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const startEdit = (b) => {
    setEditingId(b.id);
    setEditForm({ firstName: b.firstName, lastName: b.lastName, email: b.email });
    setEditErrors({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
    if (editErrors[name]) setEditErrors(er => ({ ...er, [name]: '' }));
  };

  const validateEdit = () => {
    const errs = {};
    if (!editForm.firstName.trim()) errs.firstName = 'Required';
    if (!editForm.lastName.trim()) errs.lastName = 'Required';
    if (!editForm.email.trim()) {
      errs.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      errs.email = 'Invalid email';
    }
    return errs;
  };

  const saveEdit = () => {
    const errs = validateEdit();
    if (Object.keys(errs).length > 0) { setEditErrors(errs); return; }
    updateBooking(editingId, editForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteBooking(id);
    setConfirmDelete(null);
  };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (
      b.firstName.toLowerCase().includes(q) ||
      b.lastName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      String(b.seatNo).toLowerCase().includes(q) ||
      String(b.operator || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">My trips</div>
          <h1>Passenger manifest</h1>
          <p>{bookings.length} reservation{bookings.length !== 1 ? 's' : ''} found</p>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, seat…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎟️</div>
          <h3>No trips booked yet</h3>
          <p>Search a route and pick your seats to get started.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching with different keywords.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Seat</th>
                <th>Bus</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Booked On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr key={b.id} className={editingId === b.id ? 'editing-row' : ''}>
                  <td className="td-num">{idx + 1}</td>
                  <td><span className="seat-chip">{b.seatNo}</span></td>
                  <td className="td-operator">{b.operator || '—'}</td>

                  {editingId === b.id ? (
                    <>
                      <td>
                        <input
                          name="firstName"
                          value={editForm.firstName}
                          onChange={handleEditChange}
                          className={`edit-input ${editErrors.firstName ? 'err' : ''}`}
                          placeholder="First name"
                        />
                        {editErrors.firstName && <div className="field-err">{editErrors.firstName}</div>}
                      </td>
                      <td>
                        <input
                          name="lastName"
                          value={editForm.lastName}
                          onChange={handleEditChange}
                          className={`edit-input ${editErrors.lastName ? 'err' : ''}`}
                          placeholder="Last name"
                        />
                        {editErrors.lastName && <div className="field-err">{editErrors.lastName}</div>}
                      </td>
                      <td>
                        <input
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className={`edit-input ${editErrors.email ? 'err' : ''}`}
                          placeholder="Email"
                        />
                        {editErrors.email && <div className="field-err">{editErrors.email}</div>}
                      </td>
                      <td className="td-date">{formatDate(b.bookedAt)}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-save" onClick={saveEdit}>Save</button>
                          <button className="btn-cancel-edit" onClick={cancelEdit}>Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{b.firstName}</td>
                      <td>{b.lastName}</td>
                      <td className="td-email">{b.email}</td>
                      <td className="td-date">{formatDate(b.bookedAt)}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-edit" onClick={() => startEdit(b)}>Edit</button>
                          <button className="btn-delete" onClick={() => setConfirmDelete(b.id)}>Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDelete && (
        <div className="confirm-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <h3>Delete Reservation?</h3>
            <p>This will permanently remove the booking and free up the seat.</p>
            <div className="confirm-actions">
              <button className="btn-confirm-del" onClick={() => handleDelete(confirmDelete)}>Yes, Delete</button>
              <button className="btn-cancel-del" onClick={() => setConfirmDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
