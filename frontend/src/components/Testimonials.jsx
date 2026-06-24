import { FiMessageSquare } from 'react-icons/fi';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1, name: 'Aditya Kumar', role: 'Pro Member · 1 year',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    text: 'ApexGym completely transformed my lifestyle. Lost 18kg in 4 months with Arjun\'s training. The slot booking system is seamless!',
  },
  {
    id: 2, name: 'Divya Sharma', role: 'Elite Member · 8 months',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    rating: 5,
    text: 'Best gym in Bangalore, period. Priya\'s yoga classes are pure magic. The app is intuitive and I love the 24/7 access.',
  },
  {
    id: 3, name: 'Rahul Nair', role: 'Pro Member · 6 months',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    rating: 5,
    text: 'Premium equipment, amazing trainers, and the slot booking feature saves me so much time. ApexGym is the future of fitness.',
  },
  {
    id: 4, name: 'Meera Pillai', role: 'Basic Member · 3 months',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 4,
    text: 'Incredible value for money. The Basic plan gives so much access. Upgrading to Pro next month for sure!',
  },
  {
    id: 5, name: 'Vikram Joshi', role: 'Elite Member · 2 years',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
    text: 'Karan\'s boxing sessions are intense and incredibly fun. My fitness levels have skyrocketed since joining ApexGym.',
  },
  {
    id: 6, name: 'Pooja Iyer', role: 'Pro Member · 5 months',
    avatar: 'https://randomuser.me/api/portraits/women/78.jpg',
    rating: 5,
    text: 'The environment here is so motivating. Clean facilities, great trainers, and excellent slot availability. Highly recommend!',
  },
];

const Testimonials = () => (
  <section className={`section ${styles.section}`} id="testimonials">
    <div className="container">
      <div className={styles.header}>
        <span className="section-tag"><FiMessageSquare /> Testimonials</span>
        <h2 className="section-title">What Our <span className="gradient-text">Members Say</span></h2>
        <p className="section-subtitle">Real stories from real people who transformed their lives at ApexGym.</p>
      </div>
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className={styles.quote}>"</div>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
            <div className={styles.user}>
              <img src={t.avatar} alt={t.name} className={styles.avatar} />
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
