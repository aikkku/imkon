import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeButton, onButtonClick }) => {
  const [expandedDirectory1, setExpandedDirectory1] = useState(false);
  const [expandedDirectory2, setExpandedDirectory2] = useState(false);
  const [expandedDirectory3, setExpandedDirectory3] = useState(false);

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
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <div className="company-name">
            <span className="company-text">IMKON</span>
            <span className="company-subtitle">University Applications</span>
          </div>
          <button 
            className={`aibek-button ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => onButtonClick(1)}
          >
            <span className="aibek-icon">🤖</span>
            <span className="aibek-text">AIbek</span>
          </button>
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
            <span className="button-text">Universities</span>
            <span className="directory-arrow">{expandedDirectory1 ? '▼' : '▶'}</span>
          </button>
          
          <div className={`sub-buttons ${expandedDirectory1 ? 'show' : ''}`}>
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
              <span className="button-text">Full Financial Aid</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 33 ? 'active' : ''}`}
              onClick={() => onButtonClick(33)}
            >
              <span className="button-icon">🇬🇧</span>
              <span className="button-text">UK Universities</span>
            </button>
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 34 ? 'active' : ''}`}
              onClick={() => onButtonClick(34)}
            >
              <span className="button-icon">🇪🇺</span>
              <span className="button-text">European Universities</span>
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
            
            <button 
              className={`sidebar-button sub-button ${activeButton === 73 ? 'active' : ''}`}
              onClick={() => onButtonClick(73)}
            >
              <span className="button-icon">📚</span>
              <span className="button-text">Essay Examples</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 