import React, { useState, useEffect } from 'react';
import './Page2.css';
import ApiService from '../services/api';

const Page2 = ({ activeButton }) => {
  const [profile, setProfile] = useState({
    name: '',
    telephone: '',
    address: '',
    city: '',
    gpa: '',
    ielts: '',
    sat: '',
    interests: '',
  });
  const [message, setMessage] = useState('');
  const [originalProfile, setOriginalProfile] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const data = await ApiService.getUserProfile(token);
        setProfile(data);
        setOriginalProfile(data);
      } catch (err) {
        setMessage('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not authenticated');
      return;
    }
    try {
      await ApiService.updateUserProfile(profile, token);
      setOriginalProfile(profile);
      setMessage('Profile saved!');
    } catch (err) {
      setMessage('Failed to save profile');
    }
  };

  return (
    <div className="page-2">
      <div className="page-header">
        <h2>Welcome to IMKON</h2>
        <p>Your personal study abroad assistant</p>
      </div>
      <div className="page-content">
        <div className="profile-card glass-card">
          <h3>Student Profile</h3>
          {message && <div className="profile-message">{message}</div>}
          <form className="profile-form" onSubmit={handleSave} autoComplete="off">
            <div className="profile-fields">
              <label>Name
                <input name="name" value={profile.name} onChange={handleChange} className="profile-input" />
              </label>
              <label>Telephone
                <input name="telephone" value={profile.telephone} onChange={handleChange} className="profile-input" />
              </label>
              <label>Address
                <input name="address" value={profile.address} onChange={handleChange} className="profile-input" />
              </label>
              <label>City
                <input name="city" value={profile.city} onChange={handleChange} className="profile-input" />
              </label>
              <label>GPA
                <input name="gpa" value={profile.gpa} onChange={handleChange} className="profile-input" />
              </label>
              <label>IELTS
                <input name="ielts" value={profile.ielts} onChange={handleChange} className="profile-input" />
              </label>
              <label>SAT
                <input name="sat" value={profile.sat} onChange={handleChange} className="profile-input" />
              </label>
              <label>Interests
                <input name="interests" value={profile.interests} onChange={handleChange} className="profile-input" />
              </label>
            </div>
            <div className="profile-actions">
              <button type="submit" className="profile-btn save">Save</button>
            </div>
          </form>
        </div>
        <div className="content-section">
          <h3>Welcome</h3>
          <p>
            Hello World! This is your gateway to studying abroad from Uzbekistan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2; 