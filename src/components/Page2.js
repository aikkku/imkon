import React, { useState, useEffect } from 'react';
import './Page2.css';
import ApiService from '../services/api';

const Page2 = ({ activeButton, onButtonClick, onTryUniversityExplorer }) => {
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <>
        <div className="page-header">
          <h2>Welcome to <span style={{background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", color: '#ffffff', border: 'none', borderRadius: '15px', padding: '4px 12px'}}> IMKON </span></h2>
          <p>Your AI-powered study abroad companion</p>
        </div>
        <div className="page-content">
          <div className="content-section home-info-section">
            <h3>🚀 Your AI-Powered Gateway to Global Education</h3>
            
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            
              <div
                onClick={() => {
                  const target = document.getElementById('profile-card');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="ai-tools-message"
                style={{
                  background: '#faf5ff',
                  color: '#1e1b4b',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid rgba(124, 58, 237, 0.14)',
                }}
              >
                <span role="img" aria-label="info" style={{ marginRight: 8 }}>
                  ℹ️
                </span>
                Complete your student profile to unlock the full power of our AI tools!
              </div>

            </div>

            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div className="ai-tools-message">More AI tools coming soon!</div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(124, 58, 237, 0.25)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onClick={() => onButtonClick && onButtonClick(1)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(124, 58, 237, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.25)';
                }}
              >
                🤖 Try AIbek
              </button>
              <button
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(124, 58, 237, 0.22)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onClick={onTryUniversityExplorer}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(124, 58, 237, 0.32)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.22)';
                }}
              >
                🏫 Try University Explorer
              </button>
            </div>
          </div>
          <div className="profile-card glass-card" id='profile-card'>
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
      </>
    );
  }

  return (
    <div className="page-2">
      <div className="page-header">
        <h2>Welcome to <span style={{background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", color: '#ffffff', border: 'none', borderRadius: '15px', padding: '4px 12px'}}> IMKON </span></h2>
        <p>Your AI-powered study abroad companion</p>
      </div>
      <div className="page-content">
        <div className="content-section home-info-section">
          <h3>🚀 Your AI-Powered Gateway to Global Education</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div className="ai-tools-message" style={{background: '#faf5ff', color: '#1e1b4b', fontWeight: 700, border: '1px solid rgba(124, 58, 237, 0.14)'}}>
              <span role="img" aria-label="info" style={{marginRight: 8}}>ℹ️</span>
              Complete your student profile to unlock the full power of our AI tools!
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div className="ai-tools-message">More AI tools coming soon!</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button 
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.25)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => onButtonClick && onButtonClick(1)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(124, 58, 237, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.25)';
              }}
            >
              🤖 Try AIbek
            </button>
            <button
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.22)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={onTryUniversityExplorer}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(124, 58, 237, 0.32)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.22)';
              }}
            >
              🏫 Try University Explorer
            </button>
          </div>
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