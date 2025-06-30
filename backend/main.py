from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
import uuid
from typing import List

from config import Config
from models import ChatRequest, ChatResponse, ChatMessage, ErrorResponse
from openai_service import OpenAIService

# Initialize FastAPI app
app = FastAPI(
    title="IMKON Chatbot API",
    description="Backend API for IMKON University Applications Chatbot",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI service
openai_service = OpenAIService()

# In-memory storage for conversations (replace with database in production)
conversations = {}

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "IMKON Chatbot API is running",
        "status": "healthy",
        "timestamp": datetime.now()
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    try:
        # Check OpenAI API key
        api_key_valid = openai_service.validate_api_key()
        
        return {
            "status": "healthy" if api_key_valid else "degraded",
            "openai_api": "connected" if api_key_valid else "disconnected",
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now()
        }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint"""
    try:
        # Validate agent ID (currently only supporting agent 1)
        if request.agent_id != 1:
            raise HTTPException(status_code=400, detail="Only agent 1 is currently supported")
        
        # Generate conversation ID if not exists
        conversation_id = str(uuid.uuid4())
        
        # Get AI response
        ai_response = await openai_service.get_chat_response(
            message=request.message,
            conversation_history=request.conversation_history
        )
        
        # Create response
        response = ChatResponse(
            message=ai_response,
            agent_id=request.agent_id,
            timestamp=datetime.now(),
            conversation_id=conversation_id
        )
        
        # Store conversation (in production, save to database)
        conversations[conversation_id] = {
            "user_message": request.message,
            "ai_response": ai_response,
            "timestamp": datetime.now(),
            "agent_id": request.agent_id
        }
        
        return response
        
    except Exception as e:
        error_response = ErrorResponse(
            error="chat_error",
            message=str(e),
            timestamp=datetime.now()
        )
        raise HTTPException(status_code=500, detail=error_response.dict())

@app.get("/api/chat/history/{conversation_id}")
async def get_conversation_history(conversation_id: str):
    """Get conversation history"""
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return conversations[conversation_id]

@app.get("/api/agents")
async def get_available_agents():
    """Get available chatbot agents"""
    return {
        "agents": [
            {
                "id": 1,
                "name": "AIbek",
                "description": "University application specialist for students from Uzbekistan",
                "capabilities": [
                    "Common Application guidance",
                    "UK university applications",
                    "European university applications",
                    "Essay writing help",
                    "Financial aid advice",
                    "UWC and FLEX programs"
                ]
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=Config.HOST,
        port=Config.PORT,
        reload=True
    ) 