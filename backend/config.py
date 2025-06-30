import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # OpenAI Configuration
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Server Configuration
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # CORS Configuration
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    
    # Chat Configuration
    MAX_TOKENS = 1000
    TEMPERATURE = 0.7
    MODEL = "gpt-3.5-turbo"
    
    # Rate Limiting
    MAX_REQUESTS_PER_MINUTE = 60 