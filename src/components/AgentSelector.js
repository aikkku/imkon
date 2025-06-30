import React from 'react';
import './AgentSelector.css';

const AgentSelector = ({ activeAgent, onAgentSelect, onClose }) => {
  const agents = [
    { id: 1, label: 'Agent 1' },
    { id: 2, label: 'Agent 2' },
    { id: 3, label: 'Agent 3' },
    { id: 4, label: 'Agent 4' },
    { id: 5, label: 'Agent 5' }
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
            {agent.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgentSelector; 