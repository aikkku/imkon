from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: Optional[datetime] = None

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []
    agent_id: Optional[int] = 1  # Default to agent 1

class ChatResponse(BaseModel):
    message: str
    agent_id: int
    timestamp: datetime
    conversation_id: Optional[str] = None

class ErrorResponse(BaseModel):
    error: str
    message: str
    timestamp: datetime 