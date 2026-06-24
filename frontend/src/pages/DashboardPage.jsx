import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiUser, FiCalendar, FiCreditCard, FiClock,
  FiCheckCircle, FiXCircle, FiZap, FiTrendingUp, FiLogOut
} from 'react-icons/fi';
import { userService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    userService.getDashboard()
      .then(res => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleCancel = async (id) => {
    try {
      await bookingService.cancel(id);
      showToast('Booking cancelled');
      const res = await userService.getDashboard();
      setData(res.data);
    } catch { showToast('Failed to cancel', 'error'); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  if (loading) return (
    <div className="db-loading">
      <div className="db-spinner" />
      <p>Loading your dashboard…</p>
    </div>
  );

  const { membership, bookings } = data || {};
  const memberDays = membership
    ? Math.max(0, Math.ceil((new Date(membership.endDate) - new Date()) / 86400000))
    : 0;

  return (
    <div className="db-page">
      <div className="db-hero">
        <div className="db-hero-bg" />
        <div className="container db-hero-inner">
          <div className="db-welcome">
            <div className="db-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <div>
              <h1 className="db-title">Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>!</h1>
              <p className="db-email">{user?.email}</p>
            </div>
          </div>
          <button className="db-logout" onClick={handleLogout}><FiLogOut /> Logout</button>
        </div>
      </div>

      <div className="container db-body">
        {/* Stats cards */}
        <div className="db-stats">
          <div className="db-stat-card">
            <div className="db-stat-icon membership"><FiCreditCard /></div>
            <div>
              <div className="db-stat-label">Plan</div>
              <div className="db-stat-val">{membership?.plan || 'None'}</div>
            </div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon days"><FiClock /></div>
            <div>
              <div className="db-stat-label">Days Remaining</div>
              <div className="db-stat-val">{membership ? memberDays : '—'}</div>
            </div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon bookings"><FiCalendar /></div>
            <div>
              <div className="db-stat-label">Total Bookings</div>
              <div className="db-stat-val">{bookings?.length || 0}</div>
            </div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon active"><FiTrendingUp /></div>
            <div>
              <div className="db-stat-label">Active Slots</div>
              <div className="db-stat-val">{bookings?.filter(b => b.status === 'confirmed').length || 0}</div>
            </div>
          </div>
        </div>

        <div className="db-cols">
          {/* Membership Panel */}
          <div className="db-panel">
            <h2 className="db-panel-title"><FiCreditCard /> Membership</h2>
            {membership ? (
              <div className="db-membership">
                <div className="db-plan-badge">{membership.plan}</div>
                <div className="db-plan-price">₹{membership.price?.toLocaleString()}<span>/month</span></div>
                <div className="db-plan-exp">
                  Expires: {new Date(membership.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="db-plan-days">
                  <div className="db-days-bar">
                    <div className="db-days-fill" style={{ width: `${Math.min(100, (memberDays / 30) * 100)}%` }} />
                  </div>
                  <span>{memberDays} days left</span>
                </div>
                <ul className="db-features">
                  {membership.features?.map(f => (
                    <li key={f}><FiCheckCircle className="db-check" /> {f}</li>
                  ))}
                </ul>
                <Link to="/membership" className="btn btn-outline db-upgrade-btn">Upgrade Plan</Link>
              </div>
            ) : (
              <div className="db-no-membership">
                <FiZap className="db-no-icon" />
                <p>No active membership</p>
                <Link to="/membership" className="btn btn-primary">Get a Plan</Link>
              </div>
            )}
          </div>

          {/* Bookings Panel */}
          <div className="db-panel">
            <h2 className="db-panel-title"><FiCalendar /> My Bookings</h2>
            {bookings && bookings.length > 0 ? (
              <div className="db-bookings-list">
                {bookings.map(b => (
                  <div key={b._id} className={`db-booking-row ${b.status}`}>
                    <div className="db-booking-info">
                      <span className="db-bk-day">{b.day}</span>
                      <span className="db-bk-time"><FiClock size={12} /> {b.timeSlot}</span>
                    </div>
                    <div className="db-booking-right">
                      <span className={`db-bk-status ${b.status}`}>
                        {b.status === 'confirmed' ? <FiCheckCircle /> : <FiXCircle />} {b.status}
                      </span>
                      {b.status === 'confirmed' && (
                        <button className="db-cancel-btn" onClick={() => handleCancel(b._id)}>Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="db-no-bookings">
                <FiCalendar className="db-no-icon" />
                <p>No bookings yet</p>
                <Link to="/book-slot" className="btn btn-primary">Book a Slot</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
};

export default DashboardPage;
