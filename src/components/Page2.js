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
        <div className="content-section home-info-section">
          <h3>Welcome to IMKON</h3>
          <p><strong>IMKON</strong> is your all-in-one platform for international education opportunities, scholarships, and application support. Our mission is to empower students from Uzbekistan and beyond to achieve their dreams of studying abroad by providing clear, reliable, and up-to-date information.</p>
          <ul>
            <li><strong>Personalized Guidance:</strong> Create your student profile to get tailored advice and track your progress.</li>
            <li><strong>Program Information:</strong> Explore detailed guides on UWC, FLEX, US universities, and more.</li>
            <li><strong>Application Tips:</strong> Access step-by-step instructions, essay writing help, and interview preparation.</li>
            <li><strong>Scholarships & Financial Aid:</strong> Find opportunities and learn how to maximize your chances.</li>
            <li><strong>Community Support:</strong> Connect with alumni, mentors, and fellow applicants.</li>
          </ul>
          <p><strong>Who is IMKON for?</strong><br/>
          - High school students seeking international education<br/>
          - Parents and counselors supporting students<br/>
          - Anyone interested in global study opportunities</p>
          <p><strong>How to Use IMKON:</strong><br/>
          1. Register and complete your student profile.<br/>
          2. Browse program sections for requirements and deadlines.<br/>
          3. Use our resources to prepare your application materials.<br/>
          4. Reach out for help or join our community for support.<br/>
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default Page2; 