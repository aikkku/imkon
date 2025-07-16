from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    paid: bool
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None 

class UserProfileSchema(BaseModel):
    name: str = ""
    telephone: str = ""
    address: str = ""
    city: str = ""
    gpa: str = ""
    ielts: str = ""
    sat: str = ""
    interests: str = ""

class UserProfileUpdateSchema(BaseModel):
    name: str = ""
    telephone: str = ""
    address: str = ""
    city: str = ""
    gpa: str = ""
    ielts: str = ""
    sat: str = ""
    interests: str = "" 