from openai import OpenAI
from typing import List, Dict, Any
from datetime import datetime
from config import Config
from models import ChatMessage

class OpenAIService:
    def __init__(self):
        self.client = OpenAI(
            api_key=Config.OPENAI_API_KEY,
            base_url=Config.OPENAI_BASE_URL
        )
        self.model = Config.MODEL
        self.max_tokens = Config.MAX_TOKENS
        self.temperature = Config.TEMPERATURE
        
        # System prompts for different agents
        self.agent_prompts = {
            1: """You are AIbek, a specialized AI assistant for university applications, particularly focused on helping students from Uzbekistan apply to universities abroad. 

Your expertise includes:

🎓 **US Universities:**
- Common Application process and requirements
- SAT/ACT preparation and testing
- TOEFL/IELTS English proficiency requirements
- Application deadlines and timelines
            - Financial aid and scholarship opportunities
- Visa application process (F-1 student visa)

🇬🇧 **UK Universities:**
- UCAS application system
- Personal statement writing
- A-level requirements and equivalencies
- UK student visa (Tier 4) process
- University rankings and selection

🇪🇺 **European Universities:**
- Country-specific application processes
- Language requirements
- Erasmus+ programs
- European university networks

💰 **Financial Aid & Scholarships:**
- Merit-based scholarships
- Need-based financial aid
- Country-specific scholarships for Uzbek students
- UWC (United World Colleges) programs
- FLEX (Future Leaders Exchange) program
- Other exchange programs

✍️ **Application Materials:**
- Personal statement/essay writing
- Letter of motivation
- CV/Resume preparation
- Recommendation letters
- Portfolio development (for arts/design programs)

📋 **General Guidance:**
- University selection criteria
- Application timeline planning
- Document preparation and translation
- Cultural adjustment advice
- Pre-departure preparation

**Communication Style:**
- Be encouraging and supportive
- Provide specific, actionable advice
- Ask follow-up questions to better understand the student's situation
- Share relevant examples and success stories
- Be culturally sensitive to Uzbek students' context
- Respond in a friendly, professional manner
- Always provide practical next steps

**Important Notes:**
- Emphasize the importance of early preparation (12-18 months before intended start)
- Highlight the value of English language proficiency
- Discuss the benefits of studying abroad for career development
- Address common concerns about cultural adaptation and homesickness

Remember: You're here to make the university application process less overwhelming and more achievable for students from Uzbekistan!"""
        }
    
    def _format_conversation_history(self, history: List[Any]) -> List[Dict[str, str]]:
        """Format conversation history for OpenAI API"""
        formatted_history = []
        
        # Add system message
        system_prompt = self.agent_prompts.get(1, self.agent_prompts[1])
        formatted_history.append({"role": "system", "content": system_prompt})
        
        # Add conversation history
        for msg in history[-10:]:  # Keep last 10 messages for context
            # Support both dict and object
            if isinstance(msg, dict):
                role = msg.get("role", "user")
                content = msg.get("content", "")
            else:
                role = getattr(msg, "role", "user")
                content = getattr(msg, "content", "")
            formatted_history.append({
                "role": role,
                "content": content
            })
        
        return formatted_history
    
    async def get_chat_response(self, message: str, conversation_history: List[Any] = None) -> str:
        """Get response from ChatGPT"""
        try:
            if conversation_history is None:
                conversation_history = []
            
            # Format messages for OpenAI
            messages = self._format_conversation_history(conversation_history)
            messages.append({"role": "user", "content": message})
            
            print(f"Debug: Sending request to OpenAI with model: {self.model}")
            print(f"Debug: API Key starts with: {Config.OPENAI_API_KEY[:10]}...")
            
            # Try to call OpenAI API
            try:
                response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                    stream=False,
                    store=True
            )
            
            # Extract response
            ai_response = response.choices[0].message.content.strip()
            return ai_response
            
            except Exception as api_error:
                print(f"Debug: OpenAI API error: {str(api_error)}")
                raise api_error
            
        except Exception as e:
            print(f"Debug: Error in get_chat_response: {str(e)}")
            raise Exception(f"OpenAI API error: {str(e)}")
    
    def validate_api_key(self) -> bool:
        """Validate OpenAI API key"""
        try:
            self.client.models.list()
            return True
        except:
            return False 