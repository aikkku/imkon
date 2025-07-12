import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import Page2 from './components/Page2';
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

function App() {
  const [activeButton, setActiveButton] = useState(2);
  const [activeAgent, setActiveAgent] = useState(1);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
    console.log('Login successful:', response);
    setIsLoggedIn(true);
  };

  const handleSignup = (response) => {
    console.log('Signup successful:', response);
    setIsLoggedIn(true);
  };

  const switchToSignup = () => {
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };

  const renderRightContent = () => {
    switch (activeButton) {
      case 1:
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
    <div className="App">
      {!isLoggedIn ? (
        showSignup ? (
          <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
        )
      ) : (
        <div className="container">
          <Sidebar 
            activeButton={activeButton} 
            onButtonClick={handleButtonClick} 
          />
          {renderRightContent()}
        </div>
      )}
    </div>
  );
}

export default App;
