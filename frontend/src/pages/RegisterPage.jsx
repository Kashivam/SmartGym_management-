import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill all required fields'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await authService.register({
        name: form.name, email: form.email,
        password: form.password, phone: form.phone,
      });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb1" />
        <div className="auth-orb2" />
      </div>
      <div className="auth-card">
        <div className="auth-logo"><FiZap /> Apex<span>Gym</span></div>
        <h1 className="auth-title">Join ApexGym</h1>
        <p className="auth-sub">Create your account and start your transformation</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <FiUser className="field-icon" />
            <input type="text" name="name" placeholder="Full name *"
              value={form.name} onChange={handleChange} />
          </div>
          <div className="auth-field">
            <FiMail className="field-icon" />
            <input type="email" name="email" placeholder="Email address *"
              value={form.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div className="auth-field">
            <FiPhone className="field-icon" />
            <input type="tel" name="phone" placeholder="Phone number (optional)"
              value={form.phone} onChange={handleChange} />
          </div>
          <div className="auth-field">
            <FiLock className="field-icon" />
            <input type={showPass ? 'text' : 'password'} name="password"
              placeholder="Password * (min 6 chars)" value={form.password} onChange={handleChange} />
            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="auth-field">
            <FiLock className="field-icon" />
            <input type={showPass ? 'text' : 'password'} name="confirm"
              placeholder="Confirm password *" value={form.confirm} onChange={handleChange} />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner-sm" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
