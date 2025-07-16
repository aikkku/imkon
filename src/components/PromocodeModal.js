import React, { useState } from 'react';
import apiService from '../services/api';
import './PromocodeModal.css';

const PromocodeModal = ({ onSuccess }) => {
  const [promocode, setPromocode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPromocode(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      await apiService.applyPromocode(promocode, token);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Invalid promocode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="promocode-modal-overlay">
      <div className="promocode-modal">
        <h2>Enter Promocode</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={promocode}
            onChange={handleChange}
            placeholder="Enter your promocode"
            required
            className="promocode-input"
            autoFocus
          />
          <button type="submit" className="promocode-submit" disabled={loading}>
            {loading ? 'Checking...' : 'Submit'}
          </button>
        </form>
        {error && <div className="promocode-error">{error}</div>}
        <div className="promocode-info">Access to the app requires a valid promocode.</div>
      </div>
    </div>
  );
};

export default PromocodeModal; 