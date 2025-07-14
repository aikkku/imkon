import React from 'react';
import './AgentSelector.css';

const AgentSelector = ({ activeAgent, onAgentSelect, onClose }) => {
  const agents = [
    { id: 1, label: 'AIbek Chatbot', description: 'AI assistant for university applications' },
    { id: 2, label: 'University Explorer', description: 'Browse top universities worldwide' },
    { id: 3, label: 'Agent 3', description: 'Coming soon' },
    { id: 4, label: 'Agent 4', description: 'Coming soon' },
    { id: 5, label: 'Agent 5', description: 'Coming soon' }
  ];

  return (
    <div className="agent-selector">
      <div className="agent-header">
        <h2>Select Agent</h2>
        <button className="close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="agent-content">
        {agents.map((agent) => (
          <button
            key={agent.id}
            className={`glass-button ${activeAgent === agent.id ? 'active' : ''}`}
            onClick={() => onAgentSelect(agent.id)}
          >
            <div className="agent-info">
              <div className="agent-label">{agent.label}</div>
              <div className="agent-description">{agent.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgentSelector; 