import React, { useState } from 'react';
import './Login.css';
import apiService from '../services/api';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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

        <form className="login-form" onSubmit={handleSubmit}>
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
                className="form-input"
              />
            </div>
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

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">Remember me</span>
            </label>
            <button type="button" className="forgot-password">Forgot password?</button>
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