import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiClock, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import './ContactPage.css';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  return (
    <div className="cp-page">
      <div className="cp-hero">
        <div className="cp-hero-bg" />
        <div className="container">
          <span className="section-tag"><FiMessageCircle /> Contact Us</span>
          <h1 className="cp-title">Let's <span className="gradient-text">Connect</span></h1>
          <p className="cp-sub">Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.</p>
        </div>
      </div>

      <div className="container cp-body">
        <div className="cp-grid">
          {/* Info */}
          <div className="cp-info">
            <h2>Get In Touch</h2>
            <p className="cp-info-sub">Visit us, call us, or drop a message. Our team is always ready to assist.</p>

            <div className="cp-contact-items">
              <div className="cp-contact-item">
                <div className="cp-contact-icon"><FiMapPin /></div>
                <div>
                  <div className="cp-contact-label">Address</div>
                  <div className="cp-contact-val">42, Fitness Hub, MG Road<br />Bangalore — 560001</div>
                </div>
              </div>
              <div className="cp-contact-item">
                <div className="cp-contact-icon"><FiPhone /></div>
                <div>
                  <div className="cp-contact-label">Phone</div>
                  <div className="cp-contact-val">+91 98765 43210</div>
                </div>
              </div>
              <div className="cp-contact-item">
                <div className="cp-contact-icon"><FiMail /></div>
                <div>
                  <div className="cp-contact-label">Email</div>
                  <div className="cp-contact-val">hello@apexgym.in</div>
                </div>
              </div>
              <div className="cp-contact-item">
                <div className="cp-contact-icon"><FiClock /></div>
                <div>
                  <div className="cp-contact-label">Hours</div>
                  <div className="cp-contact-val">Mon–Fri: 5 AM – 11 PM<br />Sat–Sun: 6 AM – 10 PM</div>
                </div>
              </div>
            </div>

            <div className="cp-socials">
              <a href="#" aria-label="Instagram" className="cp-social"><FiInstagram /></a>
              <a href="#" aria-label="Twitter" className="cp-social"><FiTwitter /></a>
              <a href="#" aria-label="YouTube" className="cp-social"><FiYoutube /></a>
            </div>
          </div>

          {/* Form */}
          <div className="cp-form-wrap">
            {sent ? (
              <div className="cp-success">
                <div className="cp-success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="cp-form" onSubmit={handleSubmit}>
                <h2>Send a Message</h2>
                <div className="cp-row">
                  <div className="cp-field">
                    <label>Your Name</label>
                    <input type="text" name="name" placeholder="Rahul Sharma"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="cp-field">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="rahul@email.com"
                      value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="cp-field">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Membership inquiry…"
                    value={form.subject} onChange={handleChange} required />
                </div>
                <div className="cp-field">
                  <label>Message</label>
                  <textarea name="message" rows={5} placeholder="Tell us how we can help…"
                    value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary cp-submit" disabled={sending}>
                  {sending ? <span className="spinner-sm" /> : <><FiSend /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
