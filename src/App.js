import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import Page4 from './components/Page4';
import SubPage31 from './components/SubPage31';
import SubPage32 from './components/SubPage32';
import SubPage33 from './components/SubPage33';
import SubPage34 from './components/SubPage34';
import SubPage35 from './components/SubPage35';
import SubPage51 from './components/SubPage51';
import AgentSelector from './components/AgentSelector';
import Login from './components/Login';
import Signup from './components/Signup';
import SubPage30 from './components/SubPage30';
import SubPage52 from './components/SubPage52';
import SubPage53 from './components/SubPage53';
import SubPage71 from './components/SubPage71';
import SubPage72 from './components/SubPage72';
import UniversityGrid from './components/UniversityGrid';
import Page2 from './components/Page2';
import { Routes, Route } from 'react-router-dom';
import TermsOfUse from './components/TermsOfUse';
import PromocodeModal from './components/PromocodeModal';

function App() {
  const [activeButton, setActiveButton] = useState(2);
  const [activeAgent, setActiveAgent] = useState(1);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPaid, setIsPaid] = useState(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).paid;
      } catch {
        return false;
      }
    }
    return false;
  });
  const [showPromocodeModal, setShowPromocodeModal] = useState(false);

  // Update page title based on active button
  useEffect(() => {
    const getPageTitle = (buttonId) => {
      switch (buttonId) {
        case 1:
          return 'AIbek - AI Assistant';
        case 2:
          return 'IMKON - Dashboard Overview';
        case 4:
          return 'IMKON - Analytics & Reports';
        case 31:
          return 'IMKON - Project Management';
        case 32:
          return 'IMKON - Team Collaboration';
        case 33:
          return 'IMKON - Resource Management';
        case 34:
          return 'IMKON - Documentation';
        case 35:
          return 'IMKON - Settings';
        case 51:
          return 'IMKON - Data Management';
        case 52:
          return 'IMKON - Model Training';
        case 53:
          return 'IMKON - Deployment';
        case 54:
          return 'IMKON - Monitoring';
        case 55:
          return 'IMKON - Security';
        case 56:
          return 'IMKON - Backup & Recovery';
        case 30:
          return 'IMKON - How';
        default:
          return 'IMKON - AI Platform';
      }
    };

    document.title = getPageTitle(activeButton);
  }, [activeButton]);

  useEffect(() => {
    // Check for token in localStorage on mount
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true); // Ensure user stays logged in after refresh
      try {
        const parsedUser = JSON.parse(user);
        setIsPaid(parsedUser.paid);
        if (!parsedUser.paid) {
          setShowPromocodeModal(true);
        }
      } catch {
        setIsPaid(false);
        setShowPromocodeModal(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth <= 768;

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleAgentSelect = (agentNumber) => {
    setActiveAgent(agentNumber);
  };

  const toggleAgentSelector = () => {
    setShowAgentSelector(!showAgentSelector);
  };

  const handleLogin = (response) => {
    setIsLoggedIn(true);
    setIsPaid(response.user.paid);
    if (!response.user.paid) {
      setShowPromocodeModal(true);
    } else {
      setShowPromocodeModal(false);
    }
  };

  const handleSignup = (response) => {
    setIsLoggedIn(true);
    setIsPaid(response.user.paid);
    if (!response.user.paid) {
      setShowPromocodeModal(true);
    } else {
      setShowPromocodeModal(false);
    }
  };

  const switchToSignup = () => {
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowSignup(false); // Ensure login page is shown
  };

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePromocodeSuccess = () => {
    // Update paid status in state and localStorage
    setIsPaid(true);
    setShowPromocodeModal(false);
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        parsedUser.paid = true;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      } catch {}
    }
  };

  const renderRightContent = () => {
    switch (activeButton) {
      case 1:
        // If University Explorer agent is selected, show UniversityGrid instead of Chatbot
        if (activeAgent === 2) {
          return (
            <div className='university-explorer-container'>
              <UniversityGrid 
                activeAgent={activeAgent}
                onToggleAgentSelector={toggleAgentSelector}
                showAgentSelector={showAgentSelector}
              />
              <div className={`agent-selector-container ${showAgentSelector ? 'show' : 'hide'}`}>
                <AgentSelector 
                  activeAgent={activeAgent} 
                  onAgentSelect={handleAgentSelect} 
                  onClose={toggleAgentSelector}
                />
              </div>
            </div>
          );
        }
        return (
          <div className='chatbot-container'>
            <Chatbot 
              activeButton={activeButton} 
              activeAgent={activeAgent} 
              onToggleAgentSelector={toggleAgentSelector}
              showAgentSelector={showAgentSelector}
            />
            <div className={`agent-selector-container ${showAgentSelector ? 'show' : 'hide'}`}>
              <AgentSelector 
                activeAgent={activeAgent} 
                onAgentSelect={handleAgentSelect} 
                onClose={toggleAgentSelector}
              />
            </div>
          </div>
        );
      case 2:
        return <Page2 activeButton={activeButton} />;
      case 4:
        return <Page4 activeButton={activeButton} />;
      case 31:
        return <SubPage31 activeButton={activeButton} />;
      case 32:
        return <SubPage32 activeButton={activeButton} />;
      case 33:
        return <SubPage33 activeButton={activeButton} />;
      case 34:
        return <SubPage34 activeButton={activeButton} />;
      case 35:
        return <SubPage35 activeButton={activeButton} />;
      case 51:
        return <SubPage51 activeButton={activeButton} />;
      case 52:
        return <SubPage52 activeButton={activeButton} />;
      case 53:
        return <SubPage53 activeButton={activeButton} />;
      case 54:
        return (
          <div className="generic-page">
            <div className="page-header">
              <h2>Monitoring</h2>
            </div>
            <div className="page-content">
              <div className="content-section">
                <h3>System Monitoring</h3>
                <p>Monitor system health, performance metrics, and alert management.</p>
              </div>
            </div>
          </div>
        );
      case 55:
        return (
          <div className="generic-page">
            <div className="page-header">
              <h2>Security</h2>
            </div>
            <div className="page-content">
              <div className="content-section">
                <h3>Security Management</h3>
                <p>Manage security policies, access controls, and threat detection.</p>
              </div>
            </div>
          </div>
        );
      case 56:
        return (
          <div className="generic-page">
            <div className="page-header">
              <h2>Backup & Recovery</h2>
            </div>
            <div className="page-content">
              <div className="content-section">
                <h3>Data Backup</h3>
                <p>Configure automated backups and disaster recovery procedures.</p>
              </div>
            </div>
          </div>
        );
      case 30:
        return <SubPage30 />;
      case 71:
        return <SubPage71 activeButton={activeButton} />;
      case 72:
        return <SubPage72 activeButton={activeButton} />;
      default:
        return (
          <div className='chatbot-container'>
            <Chatbot 
              activeButton={activeButton} 
              activeAgent={activeAgent} 
              onToggleAgentSelector={toggleAgentSelector}
              showAgentSelector={showAgentSelector}
            />
            <div className={`agent-selector-container ${showAgentSelector ? 'show' : 'hide'}`}>
              <AgentSelector 
                activeAgent={activeAgent} 
                onAgentSelect={handleAgentSelect} 
                onClose={toggleAgentSelector}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="app-mobile-container">
          {/* Mobile Header */}
          <div className="mobile-header">
            <button className="hamburger-btn" onClick={handleHamburgerClick}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <div className="mobile-logo">IMKON</div>
            <button className="mobile-aibek-btn" onClick={() => handleButtonClick(1)}>
              <span role="img" aria-label="Aibek">🤖</span> AIbek
            </button>
          </div>
          {/* Sidebar (mobile overlay) */}
          <Sidebar
            activeButton={activeButton}
            onButtonClick={handleButtonClick}
            onLogout={handleLogout}
            isMobileOpen={isSidebarOpen}
            onCloseMobileSidebar={() => setIsSidebarOpen(false)}
          />
          {/* Main Content: use main-content class for mobile too */}
          <div className="main-content">
            <Routes>
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="*" element={
                !isLoggedIn ? (
        showSignup ? (
          <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
        )
                ) : (
                  renderRightContent()
                )
              } />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="container">
          <Sidebar 
            activeButton={activeButton} 
            onButtonClick={handleButtonClick} 
            onLogout={handleLogout}
          />
          <div className="main-content">
            <Routes>
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="*" element={
                !isLoggedIn ? (
                  showSignup ? (
                    <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
                  ) : (
                    <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
                  )
                ) : (
                  renderRightContent()
                )
              } />
            </Routes>
          </div>
        </div>
      )}
      {isLoggedIn && !isPaid && showPromocodeModal && (
        <PromocodeModal onSuccess={handlePromocodeSuccess} />
      )}
    </>
  );
}

export default App;
