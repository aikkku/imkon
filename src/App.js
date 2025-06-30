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

function App() {
  const [activeButton, setActiveButton] = useState(2);
  const [activeAgent, setActiveAgent] = useState(1);
  const [showAgentSelector, setShowAgentSelector] = useState(false);

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
        return (
          <div className="generic-page">
            <div className="page-header">
              <h2>Model Training</h2>
            </div>
            <div className="page-content">
              <div className="content-section">
                <h3>AI Model Training</h3>
                <p>Train, validate, and deploy machine learning models with advanced tools.</p>
              </div>
            </div>
          </div>
        );
      case 53:
        return (
          <div className="generic-page">
            <div className="page-header">
              <h2>Deployment</h2>
            </div>
            <div className="page-content">
              <div className="content-section">
                <h3>Model Deployment</h3>
                <p>Deploy AI models to production with monitoring and scaling capabilities.</p>
              </div>
            </div>
          </div>
        );
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
      <div className="container">
        <Sidebar 
          activeButton={activeButton} 
          onButtonClick={handleButtonClick} 
        />
        {renderRightContent()}
      </div>
    </div>
  );
}

export default App;
