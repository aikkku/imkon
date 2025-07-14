import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import ReactMarkdown from 'react-markdown';

const Chatbot = ({ activeButton, activeAgent, onToggleAgentSelector, showAgentSelector }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m AIbek, your university application specialist. How can I help you today?', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8000';

  // Load chat history from database on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No authentication token found');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/chat/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.chat_history && data.chat_history.length > 0) {
            // Convert database format to component format
            const convertedMessages = data.chat_history.map((msg, index) => ({
              id: index + 1,
              text: msg.content,
              sender: msg.role === 'user' ? 'user' : 'bot',
              timestamp: msg.timestamp
            }));
            
            // Add initial greeting if no messages exist
            if (convertedMessages.length === 0) {
              convertedMessages.unshift({
                id: 1,
                text: 'Hello! I\'m AIbek, your university application specialist. How can I help you today?',
                sender: 'bot'
              });
            }
            
            setMessages(convertedMessages);
            console.log('Loaded chat history from database:', convertedMessages.length, 'messages');
          }
        } else {
          console.error('Failed to load chat history');
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        // Prepare conversation history for the API
        const conversationHistory = messages
          .filter(msg => msg.sender !== 'bot' || msg.id !== 1) // Exclude initial greeting
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
            timestamp: msg.timestamp || new Date().toISOString()
          }));

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: inputMessage,
            conversation_history: conversationHistory,
            agent_id: activeAgent
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const botResponse = {
          id: messages.length + 2,
          text: data.message,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error sending message:', error);
        
        const errorResponse = {
          id: messages.length + 2,
          text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot ${showAgentSelector ? 'compact' : ''}`}>
      <div className="chatbot-header">
        <h2><span className="ai-box">AI</span>bek - Agent {activeAgent}</h2>
        <div className="header-controls">
          <div className="status-indicator">
            <span className={`status-dot ${isLoading ? 'loading' : ''}`}></span>
            {isLoading ? 'Typing...' : 'Online'}
          </div>
          <button 
            className={`toggle-agent-button ${showAgentSelector ? 'active' : ''}`}
            onClick={onToggleAgentSelector}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.sender === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? "AIbek is typing..." : "Type your message here..."}
          className="message-input"
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage} 
          className={`send-button ${isLoading ? 'disabled' : ''}`}
          disabled={isLoading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 