import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheck, FiZap } from 'react-icons/fi';
import { membershipService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './MembershipCards.module.css';

const MembershipCards = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [toast, setToast] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    membershipService.getPlans()
      .then(res => setPlans(res.data))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePurchase = async (planName) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setPurchasing(planName);
    try {
      await membershipService.purchase(planName);
      showToast(`${planName} plan activated! Welcome to ApexGym! 🎉`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Purchase failed', 'error');
    } finally {
      setPurchasing(null);
    }
  };

  const popular = ['Basic', 'Pro', 'Elite'];

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
    </div>
  );

  return (
    <section className={`section ${styles.section}`} id="membership">
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag"><FiZap /> Membership Plans</span>
          <h2 className="section-title">Choose Your <span className="gradient-text">Power Plan</span></h2>
          <p className="section-subtitle">Flexible plans designed to match your fitness goals and budget. No hidden charges.</p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.name === 'Pro' ? styles.popular : ''}`}
            >
              {plan.name === 'Pro' && (
                <div className={styles.badge}>⭐ Most Popular</div>
              )}
              <div className={styles.cardTop}>
                <span className={styles.planName}>{plan.name}</span>
                <div className={styles.price}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{plan.price.toLocaleString()}</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}>
                    <FiCheck className={styles.checkIcon} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${plan.name === 'Pro' ? 'btn-primary' : 'btn-outline'} ${styles.cta}`}
                onClick={() => handlePurchase(plan.name)}
                disabled={purchasing === plan.name}
              >
                {purchasing === plan.name ? 'Processing...' : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </section>
  );
};

export default MembershipCards;
