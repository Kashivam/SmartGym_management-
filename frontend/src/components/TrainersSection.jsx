import { useState, useEffect } from 'react';
import { FiStar, FiUsers } from 'react-icons/fi';
import { trainerService } from '../services/api';
import styles from './TrainersSection.module.css';

const TrainersSection = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trainerService.getAll()
      .then(res => setTrainers(res.data))
      .catch(() => setTrainers([]))
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
  };

  return (
    <section className={`section ${styles.section}`} id="trainers">
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag"><FiUsers /> Our Trainers</span>
          <h2 className="section-title">Meet Your <span className="gradient-text">Champions</span></h2>
          <p className="section-subtitle">World-class trainers dedicated to pushing your limits and helping you achieve your goals.</p>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(6)].map((_, i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <div className={styles.grid}>
            {trainers.map((t) => (
              <div key={t._id} className={styles.card}>
                <div className={styles.imgWrapper}>
                  <img src={t.image} alt={t.name} className={styles.img} />
                  <div className={styles.imgOverlay} />
                  <div className={styles.exp}>{t.experience}y exp</div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{t.name}</h3>
                  <p className={styles.spec}>{t.specialization}</p>
                  <div className={styles.rating}>
                    <span className={styles.stars}>{renderStars(t.rating)}</span>
                    <span className={styles.ratingNum}>{t.rating}</span>
                  </div>
                  <div className={styles.certs}>
                    {t.certifications?.slice(0, 2).map((c) => (
                      <span key={c} className={styles.cert}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainersSection;
