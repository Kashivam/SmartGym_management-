import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await authService.login(form);
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-sub">Sign in to continue your fitness journey</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <FiMail className="field-icon" />
            <input
              type="email" name="email" placeholder="Email address"
              value={form.email} onChange={handleChange} autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <FiLock className="field-icon" />
            <input
              type={showPass ? 'text' : 'password'} name="password"
              placeholder="Password" value={form.password} onChange={handleChange}
              autoComplete="current-password"
            />
            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner-sm" /> : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Join Now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
