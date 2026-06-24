import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiUsers, FiLock } from 'react-icons/fi';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BookSlotPage.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const BookSlotPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [toast, setToast] = useState(null);
  const [myBookings, setMyBookings] = useState([]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSlots = async (day) => {
    setLoading(true);
    try {
      const res = await bookingService.getSlots(day);
      setSlots(res.data.slots);
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBookings = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await bookingService.getMyBookings();
      setMyBookings(res.data);
    } catch { /* silent */ }
  };

  useEffect(() => { fetchSlots(selectedDay); }, [selectedDay]);
  useEffect(() => { fetchMyBookings(); }, [isAuthenticated]);

  const handleBook = async (slot) => {
    if (!isAuthenticated) { navigate('/login', { state: { from: '/book-slot' } }); return; }
    if (slot.booked || slot.userBooked) return;
    setBooking(slot.time);
    try {
      await bookingService.book({ day: selectedDay, timeSlot: slot.time });
      showToast(`✅ Booked ${slot.time} on ${selectedDay}!`);
      fetchSlots(selectedDay);
      fetchMyBookings();
    } catch (err) {
      showToast(err.response?.data?.message || 'Booking failed', 'error');
    } finally {
      setBooking(null);
    }
  };

  const handleCancel = async (id) => {
    try {
      await bookingService.cancel(id);
      showToast('Booking cancelled successfully');
      fetchSlots(selectedDay);
      fetchMyBookings();
    } catch {
      showToast('Cancel failed', 'error');
    }
  };

  const availableCount = slots.filter(s => !s.booked).length;

  return (
    <div className="bsp-page">
      <div className="bsp-hero">
        <div className="bsp-hero-bg" />
        <div className="container">
          <span className="section-tag"><FiCalendar /> Book a Slot</span>
          <h1 className="bsp-title">Reserve Your <span className="gradient-text">Training Session</span></h1>
          <p className="bsp-sub">Choose your preferred day and time. Real-time availability — book in seconds.</p>
        </div>
      </div>

      <div className="container bsp-body">
        {/* Day Selector */}
        <div className="bsp-days">
          {DAYS.map(day => (
            <button
              key={day}
              className={`bsp-day-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className="day-short">{day.slice(0, 3)}</span>
              <span className="day-full">{day}</span>
            </button>
          ))}
        </div>

        <div className="bsp-meta">
          <span><FiClock /> {selectedDay}</span>
          <span className="bsp-avail">{availableCount} slots available</span>
        </div>

        {/* Slots Grid */}
        {loading ? (
          <div className="bsp-loading">
            {[...Array(12)].map((_, i) => <div key={i} className="slot-skeleton" />)}
          </div>
        ) : (
          <div className="bsp-slots">
            {slots.map(slot => (
              <button
                key={slot.time}
                className={`slot-card ${slot.userBooked ? 'user-booked' : ''} ${slot.booked && !slot.userBooked ? 'full' : ''} ${!slot.booked && !slot.userBooked ? 'available' : ''}`}
                onClick={() => handleBook(slot)}
                disabled={booking === slot.time || slot.booked}
                title={slot.booked ? 'Slot full' : slot.userBooked ? 'Your booking' : 'Click to book'}
              >
                <div className="slot-time">{slot.time}</div>
                <div className="slot-bar">
                  <div className="slot-fill" style={{ width: `${(slot.count / slot.capacity) * 100}%` }} />
                </div>
                <div className="slot-status">
                  {slot.userBooked ? (
                    <><FiCheckCircle /> Booked</>
                  ) : slot.booked ? (
                    <><FiXCircle /> Full</>
                  ) : booking === slot.time ? (
                    <span className="spinner-sm" />
                  ) : (
                    <><FiUsers /> {slot.capacity - slot.count} left</>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {!isAuthenticated && (
          <div className="bsp-lock-notice">
            <FiLock />
            <span><strong>Sign in</strong> to book a slot</span>
            <button className="btn btn-primary" onClick={() => navigate('/login', { state: { from: '/book-slot' } })}>
              Sign In
            </button>
          </div>
        )}

        {/* My Bookings */}
        {isAuthenticated && myBookings.length > 0 && (
          <div className="bsp-mybookings">
            <h3>Your Upcoming Bookings</h3>
            <div className="mybookings-list">
              {myBookings.map(b => (
                <div key={b._id} className="my-booking-card">
                  <div className="mb-info">
                    <span className="mb-day">{b.day}</span>
                    <span className="mb-time"><FiClock /> {b.timeSlot}</span>
                  </div>
                  <span className={`mb-status ${b.status}`}>{b.status}</span>
                  {b.status === 'confirmed' && (
                    <button className="mb-cancel" onClick={() => handleCancel(b._id)}>Cancel</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
};

export default BookSlotPage;
