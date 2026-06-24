import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>⚡ Apex<span>Gym</span></div>
            <p>Transform your body. Elevate your mind. ApexGym is where champions are built.</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              {['/', '/membership', '/book-slot', '/trainers', '/contact', '/login'].map((path, i) => (
                <li key={path}>
                  <Link to={path}>
                    {['Home', 'Membership', 'Book Slot', 'Trainers', 'Contact', 'Login'][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4>Contact Us</h4>
            <ul className={styles.contactList}>
              <li><FiMapPin /> 42, Fitness Hub, MG Road, Bangalore</li>
              <li><FiPhone /> +91 98765 43210</li>
              <li><FiMail /> hello@apexgym.in</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
            <h4>Newsletter</h4>
            <p className={styles.newsletterText}>Get fitness tips, offers & updates straight to your inbox.</p>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Your email address" />
              <button className="btn btn-primary" style={{ padding: '12px 18px', borderRadius: 10 }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} ApexGym. All rights reserved.</p>
          <p>Crafted with 💪 for fitness enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
