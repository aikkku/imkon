from starlette.middleware.sessions import SessionMiddleware
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
import uuid
from typing import List
import json

from config import Config
from models import ChatRequest, ChatResponse, ChatMessage as ChatMessageModel, ErrorResponse
from openai_service import OpenAIService
from database import engine, SessionLocal
from user_models import User, ChatMessage, UserProfile
from auth_router import router as auth_router, get_current_user_bearer
from auth_schemas import UserProfileSchema, UserProfileUpdateSchema

# Create database tables
from user_models import Base as UserBase
from database import Base

# Initialize FastAPI app
app = FastAPI(
    title="IMKON Chatbot API",
    description="Backend API for IMKON University Applications Chatbot",
    version="1.0.0"
)

# Add SessionMiddleware for OAuth
app.add_middleware(SessionMiddleware, secret_key="super-secret-session-key-1234567890")

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

# Include authentication router
app.include_router(auth_router)

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        UserBase.metadata.create_all(bind=engine)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

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
async def chat(request: ChatRequest, current_user: User = Depends(get_current_user_bearer)):
    """Main chat endpoint with user authentication"""
    try:
        # Validate agent ID (currently only supporting agent 1)
        if request.agent_id != 1:
            raise HTTPException(status_code=400, detail="Only agent 1 is currently supported")
        
        # Fetch user profile
        db = SessionLocal()
        profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
        db.close()
        profile_summary = ""
        if profile:
            profile_summary = f"""
            Student Profile:
            Name: {profile.name or ''}
            Telephone: {profile.telephone or ''}
            Address: {profile.address or ''}
            City: {profile.city or ''}
            GPA: {profile.gpa or ''}
            IELTS: {profile.ielts or ''}
            SAT: {profile.sat or ''}
            Interests: {profile.interests or ''}
            """

        # Prepend profile summary to conversation history
        conversation_history = request.conversation_history or []
        if profile_summary:
            conversation_history = [{
                "role": "system",
                "content": profile_summary
            }] + conversation_history

        # Generate conversation ID if not exists
        conversation_id = str(uuid.uuid4())
        
        # Get AI response
        ai_response = await openai_service.get_chat_response(
            message=request.message,
            conversation_history=conversation_history
        )
        
        # Create response
        response = ChatResponse(
            message=ai_response,
            agent_id=request.agent_id,
            timestamp=datetime.now(),
            conversation_id=conversation_id
        )
        
        # Save messages to database
        try:
            db = SessionLocal()
            
            # Save user message
            user_message = ChatMessage(
                user_id=current_user.id,
                role="user",
                content=request.message
            )
            db.add(user_message)
            
            # Save assistant message
            assistant_message = ChatMessage(
                user_id=current_user.id,
                role="assistant",
                content=ai_response
            )
            db.add(assistant_message)
            
            db.commit()
            print(f"Saved chat messages for user {current_user.email}")
            
        except Exception as db_error:
            print(f"Error saving chat messages: {db_error}")
            # Continue even if database save fails
        finally:
            db.close()
        
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
        # Convert datetime to ISO string for JSON serialization
        error_dict = error_response.dict()
        error_dict["timestamp"] = error_dict["timestamp"].isoformat()
        raise HTTPException(status_code=500, detail=error_dict)

@app.post("/api/university-suggestion")
async def get_university_suggestion(request: dict, current_user: User = Depends(get_current_user_bearer)):
    """Get personalized university suggestion based on user preferences from database"""
    try:
        disliked_university = request.get("dislikedUniversity", {})
        reason = request.get("reason", "")
        user_preferences = request.get("userPreferences", {})
        current_universities = request.get("currentUniversities", [])

        # Get chat history from database
        db = SessionLocal()
        messages = db.query(ChatMessage).filter(
            ChatMessage.user_id == current_user.id
        ).order_by(ChatMessage.timestamp.desc()).limit(20).all()  # Get last 20 messages
        profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
        db.close()

        # Convert to list format
        chat_history = [
            {
                "role": msg.role,
                "content": msg.content,
                "timestamp": msg.timestamp.isoformat()
            }
            for msg in reversed(messages)  # Reverse to get chronological order
        ]

        profile_summary = ""
        if profile:
            profile_summary = f"""
            Student Profile:
            Name: {profile.name or ''}
            Telephone: {profile.telephone or ''}
            Address: {profile.address or ''}
            City: {profile.city or ''}
            GPA: {profile.gpa or ''}
            IELTS: {profile.ielts or ''}
            SAT: {profile.sat or ''}
            Interests: {profile.interests or ''}
            """

        print(f"University suggestion request for user {current_user.email}:")
        print(f"User preferences: {user_preferences}")
        print(f"Disliked university: {disliked_university.get('name', 'Unknown')}")
        print(f"Reason: {reason}")
        print(f"Database chat history length: {len(chat_history)}")

        # Create a comprehensive prompt for ChatGPT
        chat_context = ""
        if chat_history:
            chat_context = f"""
            Recent conversation context from database:
            {chr(10).join([f"{msg.get('role', 'user')}: {msg.get('content', '')}" for msg in chat_history[-10:]])}
            """

        prompt = f"""
        Based on the following comprehensive information, suggest a new university that would be a better fit:

        {profile_summary}
        {chat_context}
        
        User Preferences: {json.dumps(user_preferences, indent=2)}
        
        Disliked University: {disliked_university.get('name', 'Unknown')}
        Reason for Dislike: {reason}
        
        Current Universities in List: {', '.join(current_universities)}
        
        Please suggest a new university that:
        1. Is different from the disliked university
        2. Matches the user's specific preferences (field, location, budget, academic level)
        3. Is not already in the current list
        4. Would be appealing to international students from Uzbekistan
        5. Takes into account the conversation context above
        
        IMPORTANT: Use the user's actual preferences from the database chat history and the student profile above. If they mentioned specific interests, countries, or budget constraints, prioritize those.
        
        Return your response as a JSON object with the following structure:
        {{
            "name": "University Name",
            "location": "City, Country",
            "ranking": "Ranking information",
            "acceptanceRate": "Acceptance rate",
            "description": "Brief description of the university (max 200 characters)",
            "personalizedDescription": "Why this university specifically matches the user's interests and preferences from the conversation (max 200 characters)"
        }}
        
        Make sure the response is valid JSON and includes all required fields.
        Limit the description and personalizedDescription fields to a maximum of 200 characters each.
        """
        
        # Get suggestion from ChatGPT
        ai_response = await openai_service.get_chat_response(
            message=prompt,
            conversation_history=[]
        )
        
        print(f"AI response: {ai_response}")
        
        # Try to parse the JSON response
        try:
            # Extract JSON from the response (in case there's extra text)
            json_start = ai_response.find('{')
            json_end = ai_response.rfind('}') + 1
            json_str = ai_response[json_start:json_end]
            
            university_data = json.loads(json_str)
            
            # Validate required fields
            required_fields = ["name", "location", "ranking", "acceptanceRate", "description", "personalizedDescription"]
            for field in required_fields:
                if field not in university_data:
                    university_data[field] = "Information not available"

            print(f"Parsed university data: {university_data}")
            return university_data
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            # Fallback response if JSON parsing fails
            return {
                "name": "University of British Columbia",
                "location": "Vancouver, Canada",
                "ranking": "#34 in World University Rankings",
                "acceptanceRate": "52%",
                "description": "Leading Canadian university with excellent international student support and research opportunities.",
                "personalizedDescription": "Canada's welcoming environment and strong academic programs make this a great alternative choice for international students."
            }
        
    except Exception as e:
        print(f"Error in university suggestion: {str(e)}")
        # Return a fallback university
        return {
            "name": "University of Amsterdam",
            "location": "Amsterdam, Netherlands",
            "ranking": "#58 in World University Rankings",
            "acceptanceRate": "60%",
            "description": "Historic university in the heart of Europe with strong international programs.",
            "personalizedDescription": "The Netherlands offers excellent education quality and a welcoming environment for international students."
        }

@app.post("/api/analyze-preferences")
async def analyze_user_preferences(request: dict, current_user: User = Depends(get_current_user_bearer)):
    """Analyze chat history from database to extract user preferences"""
    try:
        print(f"Preferences analysis request received for user: {current_user.email}")
        
        # Get chat history from database
        db = SessionLocal()
        messages = db.query(ChatMessage).filter(
            ChatMessage.user_id == current_user.id
        ).order_by(ChatMessage.timestamp.desc()).limit(50).all()  # Get last 50 messages
        
        print(f"Found {len(messages)} messages in database for user {current_user.email}")
        
        # Convert to list format
        chat_history = [
            {
                "role": msg.role,
                "content": msg.content,
                "timestamp": msg.timestamp.isoformat()
            }
            for msg in reversed(messages)  # Reverse to get chronological order
        ]
        db.close()
        
        prompt = request.get("prompt", "")
        print(f"Analysis prompt: {prompt[:100]}...")  # Log first 100 chars
        
        if not chat_history:
            print(f"No chat history found for user {current_user.email}")
            return {
                "interests": [],
                "academicLevel": "",
                "budget": "",
                "location": "",
                "field": ""
            }
        
        print(f"Analyzing preferences from {len(chat_history)} chat messages for user {current_user.email}")
        
        # Get analysis from ChatGPT
        ai_response = await openai_service.get_chat_response(
            message=prompt,
            conversation_history=[]
        )
        
        print(f"Preference analysis response: {ai_response}")
        
        # Try to parse the JSON response
        try:
            # Extract JSON from the response (in case there's extra text)
            json_start = ai_response.find('{')
            json_end = ai_response.rfind('}') + 1
            json_str = ai_response[json_start:json_end]
            
            preferences = json.loads(json_str)
            
            # Validate and set default values for missing fields
            default_preferences = {
                "interests": [],
                "academicLevel": "",
                "budget": "",
                "location": "",
                "field": ""
            }
            
            for key, default_value in default_preferences.items():
                if key not in preferences or not preferences[key]:
                    preferences[key] = default_value
            
            print(f"Extracted preferences for user {current_user.email}: {preferences}")
            return preferences
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error in preference analysis: {e}")
            # Fallback response if JSON parsing fails
            return {
                "interests": ["general studies"],
                "academicLevel": "undergraduate",
                "budget": "medium",
                "location": "international",
                "field": "general"
            }
        
    except Exception as e:
        print(f"Error analyzing user preferences: {str(e)}")
        # Return default preferences
        return {
            "interests": ["general studies"],
            "academicLevel": "undergraduate",
            "budget": "medium",
            "location": "international",
            "field": "general"
        }

@app.get("/api/chat/history/{conversation_id}")
async def get_conversation_history(conversation_id: str):
    """Get conversation history"""
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return conversations[conversation_id]

@app.get("/api/chat/history")
async def get_user_chat_history(current_user: User = Depends(get_current_user_bearer)):
    """Get chat history for the current user"""
    try:
        db = SessionLocal()
        
        # Get all chat messages for the user, ordered by timestamp
        messages = db.query(ChatMessage).filter(
            ChatMessage.user_id == current_user.id
        ).order_by(ChatMessage.timestamp.asc()).all()
        
        # Convert to the format expected by the frontend
        chat_history = [
            {
                "role": msg.role,
                "content": msg.content,
                "timestamp": msg.timestamp.isoformat()
            }
            for msg in messages
        ]
        
        db.close()
        
        return {
            "chat_history": chat_history,
            "user_id": current_user.id,
            "email": current_user.email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving chat history: {str(e)}")

@app.post("/api/chat/history/clear")
async def clear_user_chat_history(current_user: User = Depends(get_current_user_bearer)):
    """Clear chat history for the current user"""
    try:
        db = SessionLocal()
        
        # Delete all chat messages for the user
        deleted_count = db.query(ChatMessage).filter(
            ChatMessage.user_id == current_user.id
        ).delete()
        
        db.commit()
        db.close()
        
        return {
            "message": f"Chat history cleared successfully. Deleted {deleted_count} messages."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing chat history: {str(e)}")

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

@app.get("/api/profile", response_model=UserProfileSchema)
async def get_user_profile(current_user: User = Depends(get_current_user_bearer)):
    db = SessionLocal()
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    db.close()
    if not profile:
        return UserProfileSchema()
    return UserProfileSchema(
        name=profile.name or "",
        telephone=profile.telephone or "",
        address=profile.address or "",
        city=profile.city or "",
        gpa=profile.gpa or "",
        ielts=profile.ielts or "",
        sat=profile.sat or "",
        interests=profile.interests or ""
    )

@app.post("/api/profile", response_model=UserProfileSchema)
async def update_user_profile(update: UserProfileUpdateSchema, current_user: User = Depends(get_current_user_bearer)):
    db = SessionLocal()
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
    for field, value in update.dict().items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(profile)
    db.close()
    return UserProfileSchema(
        name=profile.name or "",
        telephone=profile.telephone or "",
        address=profile.address or "",
        city=profile.city or "",
        gpa=profile.gpa or "",
        ielts=profile.ielts or "",
        sat=profile.sat or "",
        interests=profile.interests or ""
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=Config.HOST,
        port=Config.PORT,
        reload=True
    ) 