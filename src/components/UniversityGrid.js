import React, { useState, useEffect } from 'react';
import './UniversityGrid.css';

const UniversityGrid = ({ activeAgent, onToggleAgentSelector, showAgentSelector }) => {
  console.log('UniversityGrid component rendered with activeAgent:', activeAgent);
  
  const API_BASE_URL = 'http://localhost:8000';
  
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: "#2 in National Universities",
      acceptanceRate: "4.6%",
      description: "Ivy League institution known for excellence in liberal arts, sciences, and professional studies.",
      personalizedDescription: "Based on your interests in liberal arts and research, this is an excellent choice for your academic goals."
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: "#3 in National Universities",
      acceptanceRate: "4.3%",
      description: "Leading research university with strong programs in technology, engineering, and entrepreneurship.",
      personalizedDescription: "Perfect match for your interest in technology and innovation - Silicon Valley connections will boost your career."
    },
    {
      id: 3,
      name: "MIT",
      location: "Cambridge, MA, USA",
      ranking: "#1 in National Universities",
      acceptanceRate: "6.7%",
      description: "World-renowned for science, technology, engineering, and mathematics education.",
      personalizedDescription: "Your strong STEM background makes MIT an ideal fit for cutting-edge research and innovation."
    },
    {
      id: 4,
      name: "University of Oxford",
      location: "Oxford, England",
      ranking: "#1 in World University Rankings",
      acceptanceRate: "17.5%",
      description: "One of the oldest and most prestigious universities in the world.",
      personalizedDescription: "Your academic excellence and research interests align perfectly with Oxford's rigorous academic environment."
    },
    {
      id: 5,
      name: "University of Cambridge",
      location: "Cambridge, England",
      ranking: "#2 in World University Rankings",
      acceptanceRate: "21%",
      description: "Historic university known for academic excellence and research innovation.",
      personalizedDescription: "Cambridge's interdisciplinary approach matches your diverse academic interests perfectly."
    },
    {
      id: 6,
      name: "ETH Zurich",
      location: "Zurich, Switzerland",
      ranking: "#7 in World University Rankings",
      acceptanceRate: "27%",
      description: "Leading university for science, technology, engineering, and mathematics in Europe.",
      personalizedDescription: "Your engineering background and interest in European education make ETH Zurich an excellent choice."
    }
  ]);

  const [userPreferences, setUserPreferences] = useState({
    interests: [],
    academicLevel: "",
    budget: "",
    location: "",
    field: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Function to extract user preferences from chat conversations
  const extractUserPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No authentication token found');
        return;
      }

      console.log('Extracting preferences from database chat history');

      // Create a prompt to analyze user preferences
      const analysisPrompt = `
        Analyze the following chat conversation and extract user preferences for university applications.
        Focus on:
        - Academic interests and field of study (e.g., computer science, engineering, business, arts)
        - Preferred countries or regions (e.g., USA, UK, Canada, Europe, Asia)
        - Budget considerations (low, medium, high)
        - Academic level (undergraduate, graduate, PhD)
        - Any specific requirements or preferences mentioned
        
        Return ONLY a valid JSON object with the following structure:
        {
          "interests": ["interest1", "interest2"],
          "academicLevel": "undergraduate/graduate/phd",
          "budget": "low/medium/high",
          "location": "preferred countries/regions",
          "field": "field of study"
        }
        
        If no specific information is found, use reasonable defaults but mark them as inferred.
      `;

      console.log('Sending preferences analysis request...');
      const response = await fetch(`${API_BASE_URL}/api/analyze-preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: analysisPrompt
        })
      });

      console.log('Preferences analysis response status:', response.status);
      
      if (response.ok) {
        const preferences = await response.json();
        console.log('Extracted preferences from database:', preferences);
        setUserPreferences(preferences);
      } else {
        const errorText = await response.text();
        console.error('Failed to analyze preferences:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error extracting user preferences:', error);
    }
  };

  // Extract preferences when component mounts
  useEffect(() => {
    console.log('UniversityGrid mounted, extracting preferences...');
    extractUserPreferences();
  }, []);

  // Also extract preferences when activeAgent changes to 2 (University Explorer)
  useEffect(() => {
    if (activeAgent === 2) {
      console.log('Agent 2 (University Explorer) activated, extracting preferences...');
      extractUserPreferences();
    }
  }, [activeAgent]);

  // Manual trigger for testing
  const handleManualPreferencesExtraction = () => {
    console.log('Manual preferences extraction triggered');
    extractUserPreferences();
  };

  // Function to handle like/dislike actions
  const handleUniversityAction = async (universityId, action) => {
    console.log(`University action: ${action} for university ID: ${universityId}`);
    const university = universities.find(u => u.id === universityId);
    
    if (action === 'dislike') {
      // Remove the disliked university
      setUniversities(prev => prev.filter(u => u.id !== universityId));
      
      // Request a new university suggestion
      await requestNewUniversity(university, 'disliked');
    } else if (action === 'like') {
      // Mark as liked (could save to user preferences)
      console.log(`Liked: ${university.name}`);
      // You could add a visual indicator or save to user preferences here
    }
  };

  // Function to request new university from ChatGPT
  const requestNewUniversity = async (dislikedUniversity, reason) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        addFallbackUniversity();
        return;
      }

      console.log('Requesting new university with preferences:', userPreferences);
      console.log('Disliked university:', dislikedUniversity.name);
      
      const response = await fetch(`${API_BASE_URL}/api/university-suggestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dislikedUniversity: dislikedUniversity,
          reason: reason,
          userPreferences: userPreferences,
          currentUniversities: universities.map(u => u.name)
        })
      });

      if (response.ok) {
        const newUniversity = await response.json();
        console.log('Received new university suggestion:', newUniversity);
        
        // Add the new university to the list
        setUniversities(prev => [...prev, {
          ...newUniversity,
          id: Math.max(...prev.map(u => u.id)) + 1
        }]);
      } else {
        console.error('Failed to get new university suggestion');
        // Fallback: add a generic university
        addFallbackUniversity();
      }
    } catch (error) {
      console.error('Error requesting new university:', error);
      addFallbackUniversity();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback function to add a generic university
  const addFallbackUniversity = () => {
    const fallbackUniversities = [
      {
        name: "University of Toronto",
        location: "Toronto, Canada",
        ranking: "#18 in World University Rankings",
        acceptanceRate: "43%",
        description: "Leading Canadian university with strong international student support.",
        personalizedDescription: "Canada's welcoming environment and strong academic programs make this a great alternative choice."
      },
      {
        name: "University of Melbourne",
        location: "Melbourne, Australia",
        ranking: "#14 in World University Rankings",
        acceptanceRate: "70%",
        description: "Australia's top-ranked university with excellent research opportunities.",
        personalizedDescription: "Australia's quality education and multicultural environment offer great opportunities for international students."
      },
      {
        name: "National University of Singapore",
        location: "Singapore",
        ranking: "#8 in World University Rankings",
        acceptanceRate: "5%",
        description: "Asia's leading university with strong global connections.",
        personalizedDescription: "Singapore's strategic location and world-class education provide excellent career opportunities in Asia."
      }
    ];

    const randomUniversity = fallbackUniversities[Math.floor(Math.random() * fallbackUniversities.length)];
    setUniversities(prev => [...prev, {
      ...randomUniversity,
      id: Math.max(...prev.map(u => u.id)) + 1
    }]);
  };

  return (
    <div className="university-grid-container">
      <div className="university-header">
        <div className="header-content">
          <div className="header-text">
            <h2>🏫 Personalized University Recommendations</h2>
            <p>Based on your interests and preferences - like or dislike to refine suggestions</p>
            {userPreferences.field && (
              <div className="preferences-display">
                <span className="preference-tag">Field: {userPreferences.field}</span>
                {userPreferences.location && <span className="preference-tag">Location: {userPreferences.location}</span>}
                {userPreferences.budget && <span className="preference-tag">Budget: {userPreferences.budget}</span>}
              </div>
            )}
            <button 
              className="manual-trigger-btn"
              onClick={handleManualPreferencesExtraction}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Refresh Preferences
            </button>
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
      
      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Finding a better university match for you...</p>
        </div>
      )}
      
      <div className="university-grid">
        {universities.map((university) => (
          <div key={university.id} className="university-card">
            <div className="university-content">
              <h3 className="university-name">{university.name}</h3>
              <p className="university-location">📍 {university.location}</p>
              <div className="university-stats">
                <div className="stat">
                  <span className="stat-label">Ranking:</span>
                  <span className="stat-value">{university.ranking}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Acceptance:</span>
                  <span className="stat-value">{university.acceptanceRate}</span>
                </div>
              </div>
              <p className="university-description">{university.description}</p>
              <p className="personalized-description">{university.personalizedDescription}</p>
              
              <div className="university-actions">
                <button 
                  className="action-btn like-btn"
                  onClick={() => handleUniversityAction(university.id, 'like')}
                >
                  👍
                </button>
                <button 
                  className="action-btn dislike-btn"
                  onClick={() => handleUniversityAction(university.id, 'dislike')}
                >
                  👎
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityGrid;