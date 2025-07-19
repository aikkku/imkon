const API_BASE_URL = 'https://backend-for-lazy-people-2dbb64065880.herokuapp.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(url, config);
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = await response.text();
      }
      if (!response.ok) {
        // Detect token expiry or unauthorized
        if (
          response.status === 401 ||
          response.status === 403 ||
          (typeof data === 'object' && (data.detail || data.error || data.message || '').toLowerCase().includes('token'))
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.reload();
        }
        throw new Error(data.detail || data.error || data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const formData = new FormData();
    formData.append('username', email); // OAuth2 expects 'username' field
    formData.append('password', password);

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    return await response.json();
  }

  async signup(email, password) {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser(token) {
    const formData = new FormData();
    formData.append('access_token', token);

    const response = await fetch(`${this.baseURL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user data');
    }

    return await response.json();
  }

  // Chat methods (existing functionality)
  async sendChatMessage(message, conversationHistory = [], agentId = 1, token) {
    return this.makeRequest('/api/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
        agent_id: agentId,
      }),
    });
  }

  async getAvailableAgents() {
    return this.makeRequest('/api/agents');
  }

  async getChatHistory(token, agentId = 1) {
    try {
      const data = await this.makeRequest('/api/chat/history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // If the response is an object with chat_history, extract it
      const history = Array.isArray(data) ? data : (Array.isArray(data.chat_history) ? data.chat_history : []);
      if (!Array.isArray(history)) {
        console.error('Chat history response is not an array:', data);
        return [];
      }
      return history;
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
      return [];
    }
  }

  async getUserProfile(token) {
    return this.makeRequest('/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUserProfile(profile, token) {
    return this.makeRequest('/api/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
  }

  async applyPromocode(promocode, token) {
    return this.makeRequest('/auth/promocode', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ promocode }),
    });
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance; 