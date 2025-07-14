import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # OpenAI Configuration
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "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")
    
    # OpenAI Configuration
    OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    
    # Server Configuration
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # CORS Configuration
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    
    # Chat Configuration
    MAX_TOKENS = 1000
    TEMPERATURE = 0.7
    MODEL = "gpt-4o-mini"
    
    # Rate Limiting
    MAX_REQUESTS_PER_MINUTE = 60 