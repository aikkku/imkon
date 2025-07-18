import React, { useState, useEffect } from 'react';
import './Login.css';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';


const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user info and store in localStorage
      apiService.getCurrentUser(token)
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          if (onLogin) {
            onLogin({ access_token: token, user });
          }
          navigate('/');
        })
        .catch(() => {
          // If user fetch fails, just navigate
          navigate('/');
        });
    }
  }, [navigate, onLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await apiService.login(formData.email, formData.password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      if (onLogin) {
        onLogin(response);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://44.222.208.199/auth/google/login';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">
              <h1>IMKON</h1>
              <p>University Applications</p>
            </div>
          </div>
          <p className="login-subtitle">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Ensure full width for the form and its groups */}
        <div style={{ width: '100%' }}>
          <form className="login-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="form-group" style={{ width: '100%' }}>
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
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "🙉"}
                </button>
              </div>
            </div>

            <div className="form-options" style={{ width: '100%' }}>
              <label className="checkbox-wrapper">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <button
          className="google-login-btn glassy-google-btn"
          onClick={handleGoogleLogin}
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
          Log in with Google
        </button>

        <div className="login-footer">
          <p className="signup-text">
            Don't have an account? <button type="button" className="signup-link" onClick={onSwitchToSignup}>Sign up</button>
          </p>  
        </div>
      </div>
    </div>
  );
};

export default Login; 