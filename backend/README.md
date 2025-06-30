# IMKON Chatbot Backend

Backend API for the IMKON University Applications Chatbot, powered by OpenAI ChatGPT.

## Features

- 🤖 OpenAI ChatGPT integration for AIbek assistant
- 🎯 Specialized in university applications for students from Uzbekistan
- 💬 Conversation history management
- 🔒 CORS enabled for frontend integration
- 📊 Health check endpoints
- ⚡ FastAPI for high performance

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
HOST=0.0.0.0
PORT=8000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

## Running the Server

### Development Mode

```bash
python main.py
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check with OpenAI API status

### Chat
- `POST /api/chat` - Send message to AIbek assistant
- `GET /api/chat/history/{conversation_id}` - Get conversation history

### Agents
- `GET /api/agents` - Get available chatbot agents

## API Usage

### Send a Message

```bash
curl -X POST "http://localhost:8000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I apply to US universities?",
    "agent_id": 1
  }'
```

### Response Format

```json
{
  "message": "AI response here...",
  "agent_id": 1,
  "timestamp": "2024-01-01T12:00:00",
  "conversation_id": "uuid-here"
}
```

## AIbek Assistant Capabilities

AIbek is specialized in:

- 🏫 Common Application process for US universities
- 🇬🇧 UK university applications  
- 🇪🇺 European university applications
- 📝 Essay writing and personal statements
- 💰 Financial aid and scholarship opportunities
- 🌍 UWC and FLEX programs
- 📚 General study abroad advice

## Development

### Project Structure

```
backend/
├── main.py              # FastAPI application
├── config.py            # Configuration settings
├── models.py            # Pydantic models
├── openai_service.py    # OpenAI API integration
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

### Adding New Agents

1. Add agent prompt in `openai_service.py`
2. Update agent validation in `main.py`
3. Add agent info in `/api/agents` endpoint

## Production Considerations

- Replace in-memory storage with database
- Add authentication and rate limiting
- Implement proper error handling
- Add logging and monitoring
- Use environment-specific configurations

## Troubleshooting

### OpenAI API Issues
- Verify your API key is correct
- Check OpenAI API status
- Ensure you have sufficient credits

### CORS Issues
- Update `ALLOWED_ORIGINS` in `.env`
- Check frontend URL matches allowed origins

### Port Issues
- Change `PORT` in `.env` if 8000 is occupied
- Ensure firewall allows the port 