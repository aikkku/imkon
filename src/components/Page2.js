import React, { useState, useEffect } from 'react';
import './Page2.css';
import ApiService from '../services/api';

const Page2 = ({ activeButton, onButtonClick }) => {
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
          <h2>Welcome to IMKON</h2>
          <p>Your AI-powered study abroad companion</p>
        </div>
        <div className="page-content">
          <div className="content-section home-info-section">
            <h3>🚀 Your AI-Powered Gateway to Global Education</h3>
            
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onClick={() => onButtonClick && onButtonClick(1)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                }}
              >
                🤖 Try AIbek Now
              </button>
            </div>
            
            <p><strong>IMKON</strong> revolutionizes your international education journey with cutting-edge AI technology. Our intelligent platform combines the power of artificial intelligence with comprehensive resources to transform how students from Uzbekistan and beyond discover, apply to, and succeed in global education opportunities.</p>
            <ul>
              <li><strong>🤖 AI-Powered Personalization:</strong> Our advanced AI analyzes your profile and preferences to deliver hyper-personalized university recommendations, scholarship matches, and application strategies.</li>
              <li><strong>💬 Intelligent Chat Assistant:</strong> Meet <strong>AIbek</strong>, your 24/7 AI companion who answers questions, provides instant guidance, and helps you navigate complex application processes.</li>
              <li><strong>🎯 Smart Program Matching:</strong> AI algorithms match you with the perfect UWC, FLEX, and university programs based on your academic profile and career goals.</li>
              <li><strong>✍️ AI-Enhanced Essay Support:</strong> Get intelligent feedback on your personal statements and essays with our AI-powered writing assistant.</li>
              <li><strong>💰 Intelligent Scholarship Discovery:</strong> Our AI scans thousands of opportunities to find scholarships that match your unique profile and background.</li>
            </ul>
            <p><strong>🎓 Who is IMKON for?</strong><br/>
            - Ambitious high school students ready to conquer global education<br/>
            - Forward-thinking parents and counselors embracing AI-powered guidance<br/>
            - Anyone seeking a smarter, more efficient path to international education</p>
            <p><strong>🚀 How to Harness IMKON's AI Power:</strong><br/>
            1. Create your smart profile and let our AI understand your goals.<br/>
            2. Chat with <strong>AIbek</strong> for instant, intelligent guidance on any topic.<br/>
            3. Explore AI-curated university and program recommendations.<br/>
            4. Use our AI tools to perfect your applications and essays.<br/>
            5. Connect with our community and share your success story.<br/>
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
      </>
    );
  }

  return (
    <div className="page-2">
      <div className="page-header">
        <h2>Welcome to IMKON</h2>
        <p>Your AI-powered study abroad companion</p>
      </div>
      <div className="page-content">
        <div className="content-section home-info-section">
          <h3>🚀 Your AI-Powered Gateway to Global Education</h3>
          
          <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
            <button 
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => onButtonClick && onButtonClick(1)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              🤖 Try AIbek Now
            </button>
          </div>
          
          <p><strong>IMKON</strong> revolutionizes your international education journey with cutting-edge AI technology. Our intelligent platform combines the power of artificial intelligence with comprehensive resources to transform how students from Uzbekistan and beyond discover, apply to, and succeed in global education opportunities.</p>
          <ul>
            <li><strong>🤖 AI-Powered Personalization:</strong> Our advanced AI analyzes your profile and preferences to deliver hyper-personalized university recommendations, scholarship matches, and application strategies.</li>
            <li><strong>💬 Intelligent Chat Assistant:</strong> Meet <strong>AIbek</strong>, your 24/7 AI companion who answers questions, provides instant guidance, and helps you navigate complex application processes.</li>
            <li><strong>🎯 Smart Program Matching:</strong> AI algorithms match you with the perfect UWC, FLEX, and university programs based on your academic profile and career goals.</li>
            <li><strong>✍️ AI-Enhanced Essay Support:</strong> Get intelligent feedback on your personal statements and essays with our AI-powered writing assistant.</li>
            <li><strong>💰 Intelligent Scholarship Discovery:</strong> Our AI scans thousands of opportunities to find scholarships that match your unique profile and background.</li>
          </ul>
          <p><strong>🎓 Who is IMKON for?</strong><br/>
          - Ambitious high school students ready to conquer global education<br/>
          - Forward-thinking parents and counselors embracing AI-powered guidance<br/>
          - Anyone seeking a smarter, more efficient path to international education</p>
          <p><strong>🚀 How to Harness IMKON's AI Power:</strong><br/>
          1. Create your smart profile and let our AI understand your goals.<br/>
          2. Chat with <strong>AIbek</strong> for instant, intelligent guidance on any topic.<br/>
          3. Explore AI-curated university and program recommendations.<br/>
          4. Use our AI tools to perfect your applications and essays.<br/>
          5. Connect with our community and share your success story.<br/>
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