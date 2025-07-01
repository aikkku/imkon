
"""
Startup script for IMKON Chatbot Backend
"""

import uvicorn
from config import Config

if __name__ == "__main__":
    print("🚀 Starting IMKON Chatbot Backend...")
    print(f"📍 Server will run on http://{Config.HOST}:{Config.PORT}")
    print("📖 API documentation will be available at http://localhost:8000/docs")
    print("🔧 Health check at http://localhost:8000/health")
    print("\n" + "="*50)
    
    uvicorn.run(
        "main:app",
        host=Config.HOST,
        port=Config.PORT,
        reload=True,
        log_level="info"
    ) 