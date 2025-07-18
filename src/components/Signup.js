import React, { useState, useEffect } from 'react';
import './Signup.css';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiService.signup(formData.email, formData.password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      if (onSignup) {
        onSignup(response);
      }
    } catch (error) {
      // Handle specific error cases
      if (error.message.includes('already registered')) {
        setErrors({ email: 'Email already registered' });
      } else {
        setErrors({ general: error.message || 'Signup failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignup = () => {
    window.location.href = 'https://backend-for-lazy-people-2dbb64065880.herokuapp.com/auth/google/login';
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-section">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">
              <h1>IMKON</h1>
              <p>University Applications</p>
            </div>
          </div>
          <p className="signup-subtitle">Create your account to get started.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
                className={`form-input ${errors.password ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "🙉"}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" required />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            className={`signup-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="terms-link-container" style={{ marginTop: '16px', textAlign: 'center' }}>
          <a href="/terms" style={{ color: '#667eea', textDecoration: 'underline', fontSize: '14px', opacity: 0.85 }}>
            By signing up, you agree to our Terms of Use
          </a>
        </div>

        <div className="signup-footer">
          <p className="login-text">
            Already have an account? <button type="button" className="login-link" onClick={onSwitchToLogin}>Sign in</button>
          </p>
        </div>
        <button
          className="google-login-btn glassy-google-btn"
          onClick={handleGoogleSignup}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '18px',
            width: '100%',
            padding: '10px 0',
            border: 'none',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.15)',
            boxShadow: '0 4px 16px rgba(102,126,234,0.08)',
            color: '#222',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s',
            backdropFilter: 'blur(8px)'
          }}
        >
          <svg width="22" height="22" viewBox="0 0 48 48" style={{display:'inline'}}><g><path fill="#FBBC05" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#EA4335" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.5 5.1 29.5 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#34A853" d="M24 43c5.4 0 10.4-1.8 14.3-4.9l-6.6-5.4C29.6 34.7 26.9 36 24 36c-5.5 0-10.1-3.7-11.7-8.7l-6.5 5C7.9 39.7 15.4 43 24 43z"/><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.6 5.2-6.3 6.5l6.6 5.4C39.7 41.1 44 37.1 44 32c0-1.3-.1-2.7-.4-4z"/></g></svg>
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup; 