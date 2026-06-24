import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiStar, FiAward, FiCalendar } from 'react-icons/fi';
import { trainerService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './TrainersPage.css';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    trainerService.getAll()
      .then(res => setTrainers(res.data))
      .catch(() => setTrainers([]))
      .finally(() => setLoading(false));
  }, []);

  const specializations = ['All', ...new Set(trainers.map(t => t.specialization))];
  const filtered = filter === 'All' ? trainers : trainers.filter(t => t.specialization === filter);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '');
  };

  return (
    <div className="tp-page">
      <div className="tp-hero">
        <div className="tp-hero-bg" />
        <div className="container">
          <span className="section-tag"><FiUsers /> Our Trainers</span>
          <h1 className="tp-title">Meet Your <span className="gradient-text">Champions</span></h1>
          <p className="tp-sub">World-class trainers dedicated to pushing your limits and helping you reach your goals.</p>
        </div>
      </div>

      <div className="container tp-body">
        {/* Filter tabs */}
        <div className="tp-filters">
          {specializations.map(s => (
            <button key={s} className={`tp-filter ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="tp-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="tp-skeleton" />)}
          </div>
        ) : (
          <div className="tp-grid">
            {filtered.map(t => (
              <div key={t._id} className="tp-card">
                <div className="tp-img-wrap">
                  <img src={t.image} alt={t.name} className="tp-img" loading="lazy" />
                  <div className="tp-exp-badge">{t.experience}y exp</div>
                  <div className="tp-overlay" />
                </div>
                <div className="tp-info">
                  <h3 className="tp-name">{t.name}</h3>
                  <p className="tp-spec">{t.specialization}</p>
                  <div className="tp-rating">
                    <span className="tp-stars">{renderStars(t.rating)}</span>
                    <span className="tp-rating-num">{t.rating}</span>
                  </div>
                  <p className="tp-bio">{t.bio}</p>
                  <div className="tp-certs">
                    {t.certifications?.map(c => (
                      <span key={c} className="tp-cert"><FiAward /> {c}</span>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary tp-btn"
                    onClick={() => navigate(isAuthenticated ? '/book-slot' : '/login', {
                      state: { from: '/book-slot' }
                    })}
                  >
                    <FiCalendar /> Book a Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainersPage;
