import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import styles from './Hero.module.css';

const Hero = () => {
  const counterRefs = useRef([]);

  useEffect(() => {
    const animate = (el, target, suffix = '') => {
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, 20);
    };
    const targets = [5000, 50, 24];
    const suffixes = ['+', '+', '/7'];
    counterRefs.current.forEach((el, i) => {
      if (el) animate(el, targets[i], suffixes[i]);
    });
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.bgOverlay} />
        <div className={styles.bgGrid} />
      </div>

      {/* Floating orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Now Open 24 Hours · 7 Days a Week
        </div>

        <h1 className={styles.heading}>
          Train Hard.<br />
          <span className="gradient-text">Book Smart.</span>
        </h1>

        <p className={styles.sub}>
          India's most premium gym experience. State-of-the-art equipment,
          expert trainers and a real-time slot booking system — all in one place.
        </p>

        <div className={styles.ctas}>
          <Link to="/register" className="btn btn-primary">
            Join Now <FiArrowRight />
          </Link>
          <Link to="/book-slot" className="btn btn-outline">
            <FiCalendar /> Book a Slot
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { label: 'Active Members', suffix: '' },
            { label: 'Expert Trainers', suffix: '' },
            { label: 'Hours Access', suffix: '' },
          ].map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statNum} ref={(el) => (counterRefs.current[i] = el)}>0</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
};

export default Hero;
