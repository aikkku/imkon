import openai
from typing import List, Dict, Any
from datetime import datetime
from config import Config
from models import ChatMessage

class OpenAIService:
    def __init__(self):
        openai.api_key = Config.OPENAI_API_KEY
        self.model = Config.MODEL
        self.max_tokens = Config.MAX_TOKENS
        self.temperature = Config.TEMPERATURE
        
        # System prompts for different agents
        self.agent_prompts = {
            1: """You are AIbek, a helpful AI assistant specializing in university applications for students from Uzbekistan. 
            You provide guidance on:
            - Common Application process for US universities
            - UK university applications
            - European university applications
            - Essay writing and personal statements
            - Financial aid and scholarship opportunities
            - UWC and FLEX programs
            - General study abroad advice
            
            Always be encouraging, informative, and provide practical advice. 
            Respond in a friendly, professional manner and ask follow-up questions when needed."""
        }
    
    def _format_conversation_history(self, history: List[ChatMessage]) -> List[Dict[str, str]]:
        """Format conversation history for OpenAI API"""
        formatted_history = []
        
        # Add system message
        system_prompt = self.agent_prompts.get(1, self.agent_prompts[1])
        formatted_history.append({"role": "system", "content": system_prompt})
        
        # Add conversation history
        for msg in history[-10:]:  # Keep last 10 messages for context
            formatted_history.append({
                "role": msg.role,
                "content": msg.content
            })
        
        return formatted_history
    
    async def get_chat_response(self, message: str, conversation_history: List[ChatMessage] = None) -> str:
        """Get response from ChatGPT"""
        try:
            if conversation_history is None:
                conversation_history = []
            
            # Format messages for OpenAI
            messages = self._format_conversation_history(conversation_history)
            messages.append({"role": "user", "content": message})
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                stream=False
            )
            
            # Extract response
            ai_response = response.choices[0].message.content.strip()
            return ai_response
            
        except openai.error.OpenAIError as e:
            raise Exception(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise Exception(f"Unexpected error: {str(e)}")
    
    def validate_api_key(self) -> bool:
        """Validate OpenAI API key"""
        try:
            openai.Model.list()
            return True
        except:
            return False 