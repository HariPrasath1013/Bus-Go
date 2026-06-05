import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('busBookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('busBookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    const newEntry = {
      ...booking,
      id: Date.now(),
      bookedAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newEntry]);
    return newEntry;
  };

  const addBookings = (bookingList) => {
    const now = new Date().toISOString();
    const entries = bookingList.map((b, i) => ({
      ...b,
      id: Date.now() + i,
      bookedAt: now,
    }));
    setBookings(prev => [...prev, ...entries]);
    return entries;
  };

  const updateBooking = (id, updated) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const isBooked = (seatNo) => bookings.some(b => b.seatNo === seatNo);

  const getBookingBySeat = (seatNo) => bookings.find(b => b.seatNo === seatNo);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, addBookings, updateBooking, deleteBooking, isBooked, getBookingBySeat }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
