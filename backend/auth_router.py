from fastapi import APIRouter, Depends, HTTPException, status, Request, Body
from fastapi.security import OAuth2PasswordRequestForm, HTTPBearer
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from database import get_db
from user_models import User
from auth_schemas import UserCreate, UserLogin, UserResponse, Token
from auth_utils import Hash, create_access_token, verify_token
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
import jwt
import config as app_config

router = APIRouter(
    prefix="/auth",
    tags=['Authentication']
)

# OAuth2 scheme for Bearer tokens
oauth2_scheme = HTTPBearer()

# OAuth setup
starlette_config = Config()  # No need to pass environ
oauth = OAuth(starlette_config)
oauth.register(
    name='google',
    client_id=app_config.GOOGLE_CLIENT_ID,
    client_secret=app_config.GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# New function for Bearer token authentication
def get_current_user_bearer(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token.credentials, credentials_exception)
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=UserResponse)
def get_current_user(current_user: User = Depends(get_current_user_bearer)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        created_at=current_user.created_at,
        paid=current_user.paid
)

@router.post("/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash the password
    hashed_password = Hash.bcrypt(user.password)
    
    # Create new user
    db_user = User(
        email=user.email,
        password=hashed_password,
        paid=False
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    
    # Create user response
    user_response = UserResponse(
        id=db_user.id,
        email=db_user.email,
        created_at=db_user.created_at,
        paid=db_user.paid
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response
    }

@router.post("/login", response_model=Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(User).filter(User.email == user_credentials.username).first()
    
    # Verify user exists and password is correct
    if not user or not Hash.verify(user.password, user_credentials.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    
    # Create user response
    user_response = UserResponse(
        id=user.id,
        email=user.email,
        created_at=user.created_at,
        paid=user.paid
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response
    }

@router.get('/google/login')
async def google_login(request: Request):
    redirect_uri = 'http://localhost:8000/auth/google/callback' # Replace with your actual redirect URI
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/google/callback')
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
        print("Google token:", token)
        user_info = token.get('userinfo')
        if not user_info:
            print("No userinfo in token:", token)
            raise HTTPException(status_code=400, detail='Google login failed: No userinfo in token')
        print("Google user_info:", user_info)
    except Exception as e:
        print("Google OAuth callback error:", e)
        raise HTTPException(status_code=400, detail=f'Google login failed: {e}')
    email = user_info.get('email')
    name = user_info.get('name')
    picture = user_info.get('picture')
    if not email:
        raise HTTPException(status_code=400, detail='No email from Google')
    # Check if user exists, else create
    user = db.query(User).filter(User.email == email).first()
    if not user:
        # Google users don't have a password, set a dummy one
        user = User(email=email, password='google_oauth_no_password', paid=False)
        db.add(user)
        db.commit()
        db.refresh(user)
    # Create or update user profile
    from user_models import UserProfile
    profile = db.query(UserProfile).filter(UserProfile.user_id == user.id).first()
    if not profile:
        profile = UserProfile(user_id=user.id)
        db.add(profile)
    profile.name = name
    profile.telephone = ''
    profile.address = ''
    profile.city = ''
    profile.gpa = ''
    profile.ielts = ''
    profile.sat = ''
    profile.interests = ''
    # Save Google picture as avatar if you want
    profile.picture = picture if hasattr(profile, 'picture') else ''
    db.commit()
    # Issue JWT
    from auth_utils import create_access_token
    access_token = create_access_token(data={"sub": email})
    # Redirect to frontend with token
    redirect_url = f"http://localhost:3000/login?token={access_token}"
    return RedirectResponse(redirect_url) 

@router.post("/promocode")
def apply_promocode(
    promocode: str = Body(..., embed=True),
    current_user: User = Depends(get_current_user_bearer),
    db: Session = Depends(get_db)
):
    print(f"[DEBUG] Received promocode: {promocode}")
    if promocode != "TESTING2025":
        raise HTTPException(status_code=400, detail="Invalid promocode")
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.paid:
        return {"success": True, "message": "Promocode already applied"}
    user.paid = True
    db.commit()
    return {"success": True, "message": "Promocode applied successfully"} 