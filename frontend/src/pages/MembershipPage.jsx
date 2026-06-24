import MembershipCards from '../components/MembershipCards';
import { FiZap, FiCheck } from 'react-icons/fi';
import './MembershipPage.css';

const PERKS = [
  { icon: '🏋️', title: 'State-of-the-art Equipment', desc: 'Latest machines and free weights from top brands.' },
  { icon: '🧑‍🏫', title: 'Expert Trainers', desc: 'Certified coaches to guide your fitness journey.' },
  { icon: '⏰', title: '24/7 Access', desc: 'Elite members get round-the-clock gym access.' },
  { icon: '🥗', title: 'Nutrition Guidance', desc: 'Personalized diet plans and consultations.' },
  { icon: '📱', title: 'Slot Booking App', desc: 'Book sessions instantly from the app.' },
  { icon: '🧖', title: 'Wellness Facilities', desc: 'Sauna, locker rooms, and recovery zones.' },
];

const FAQ = [
  { q: 'Can I switch plans?', a: 'Yes! Upgrading to a higher plan immediately activates the new benefits and replaces your current membership.' },
  { q: 'Is there a joining fee?', a: 'No hidden charges. You pay only the monthly plan price.' },
  { q: 'Can I cancel anytime?', a: 'Memberships are monthly. Your plan stays active until the end of the current billing period.' },
  { q: 'Do you offer a free trial?', a: 'We offer a 1-day free pass — visit the gym and talk to our staff to claim it.' },
];

const MembershipPage = () => (
  <div className="mp-page">
    {/* Header */}
    <div className="mp-hero">
      <div className="mp-hero-bg" />
      <div className="container">
        <span className="section-tag"><FiZap /> Membership Plans</span>
        <h1 className="mp-title">Invest In Your <span className="gradient-text">Best Self</span></h1>
        <p className="mp-sub">Flexible, transparent pricing with zero hidden fees. Pick the plan that fits your goals.</p>
      </div>
    </div>

    {/* Plans */}
    <MembershipCards />

    {/* Perks */}
    <section className="mp-perks">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
          Everything You <span className="gradient-text">Get</span>
        </h2>
        <div className="mp-perks-grid">
          {PERKS.map(p => (
            <div key={p.title} className="mp-perk-card">
              <span className="mp-perk-icon">{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="mp-faq">
      <div className="container mp-faq-inner">
        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <div className="mp-faq-list">
          {FAQ.map(f => (
            <div key={f.q} className="mp-faq-item">
              <div className="mp-faq-q"><FiCheck className="faq-icon" /> {f.q}</div>
              <p className="mp-faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default MembershipPage;
