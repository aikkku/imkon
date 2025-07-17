import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeButton, onButtonClick, onLogout, isMobileOpen, onCloseMobileSidebar }) => {
  const [expandedDirectory1, setExpandedDirectory1] = useState(false);
  const [expandedDirectory2, setExpandedDirectory2] = useState(false);
  const [expandedDirectory3, setExpandedDirectory3] = useState(false);

  // Determine if mobile (window width <= 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Always render sidebar and overlay on mobile, toggle classes for animation

  // Restore handleDirectoryClick
  const handleDirectoryClick = (directoryNumber) => {
    if (directoryNumber === 1) {
      setExpandedDirectory1(!expandedDirectory1);
    } else if (directoryNumber === 2) {
      setExpandedDirectory2(!expandedDirectory2);
    } else if (directoryNumber === 3) {
      setExpandedDirectory3(!expandedDirectory3);
    }
  };

  return (
    <>
      {isMobile && (
        <div className={`sidebar-overlay${isMobileOpen ? ' open' : ''}`} onClick={onCloseMobileSidebar}></div>
      )}
      <div className={`sidebar${isMobile ? ' mobile' : ''}${isMobile && isMobileOpen ? ' open' : ''}`}>
        {isMobile && (
          <button className="sidebar-close-btn" onClick={onCloseMobileSidebar}>&times;</button>
        )}
      <div className="sidebar-header">
        <div className="header-content">
          <div className="company-name">
            <span className="company-text">IMKON</span>
          </div>
            {/* Only show Aibek button on desktop */}
            {!isMobile && (
          <button 
            className={`aibek-button ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => onButtonClick(1)}
          >
            <span className="ai-part">AI</span><span className="bek-part">BEK</span>
          </button>
            )}
        </div>
      </div>
      
      <div className="sidebar-content">
        <div className="button-group">
          <button 
            className={`sidebar-button ${activeButton === 2 ? 'active' : ''}`}
            onClick={() => onButtonClick(2)}
          >
            <span className="button-icon">🏠</span>
            <span className="button-text">Home</span>
          </button>
        </div>

        <div className="button-group">
          <button 
            className={`sidebar-button directory ${expandedDirectory1 ? 'expanded' : ''}`}
            onClick={() => handleDirectoryClick(1)}
          >
            <span className="button-icon">🏫</span>
            <span className="button-text">US Universities</span>
            <span className="directory-arrow">{expandedDirectory1 ? '▼' : '▶'}</span>
          </button>
          
          <div className={`sub-buttons ${expandedDirectory1 ? 'show' : ''}`}>
            <button 
              className={`sidebar-button sub-button ${activeButton === 30 ? 'active' : ''}`}
              onClick={() => onButtonClick(30)}
            >
              <span className="button-icon">❓</span>
              <span className="button-text">How</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 31 ? 'active' : ''}`}
              onClick={() => onButtonClick(31)}
            >
              <span className="button-icon">🇺🇸</span>
              <span className="button-text">Common App</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 32 ? 'active' : ''}`}
              onClick={() => onButtonClick(32)}
            >
              <span className="button-icon">💰</span>
              <span className="button-text">Scholarships</span>
            </button>
          </div>
        </div>

        <div className="button-group">
          <button 
            className={`sidebar-button directory ${expandedDirectory2 ? 'expanded' : ''}`}
            onClick={() => handleDirectoryClick(2)}
          >
            <span className="button-icon">🎯</span>
            <span className="button-text">Programs</span>
            <span className="directory-arrow">{expandedDirectory2 ? '▼' : '▶'}</span>
          </button>
          
          <div className={`sub-buttons ${expandedDirectory2 ? 'show' : ''}`}>
            <button 
              className={`sidebar-button sub-button ${activeButton === 51 ? 'active' : ''}`}
              onClick={() => onButtonClick(51)}
            >
              <span className="button-icon">🌍</span>
              <span className="button-text">UWC Program</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 52 ? 'active' : ''}`}
              onClick={() => onButtonClick(52)}
            >
              <span className="button-icon">🇺🇸</span>
              <span className="button-text">FLEX Program</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 53 ? 'active' : ''}`}
              onClick={() => onButtonClick(53)}
            >
              <span className="button-icon">🎓</span>
              <span className="button-text">Other Programs</span>
            </button>
          </div>
        </div>

        <div className="button-group">
          <button 
            className={`sidebar-button directory ${expandedDirectory3 ? 'expanded' : ''}`}
            onClick={() => handleDirectoryClick(3)}
          >
            <span className="button-icon">✍️</span>
            <span className="button-text">Essays</span>
            <span className="directory-arrow">{expandedDirectory3 ? '▼' : '▶'}</span>
          </button>
          
          <div className={`sub-buttons ${expandedDirectory3 ? 'show' : ''}`}>
            <button 
              className={`sidebar-button sub-button ${activeButton === 71 ? 'active' : ''}`}
              onClick={() => onButtonClick(71)}
            >
              <span className="button-icon">📝</span>
              <span className="button-text">Personal Statement</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 72 ? 'active' : ''}`}
              onClick={() => onButtonClick(72)}
            >
              <span className="button-icon">❓</span>
              <span className="button-text">Why This University?</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={onLogout}
        >
          <span className="button-icon">🚪</span>
          <span className="button-text">Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar; 