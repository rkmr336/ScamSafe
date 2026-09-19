from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from jose import JWTError, jwt
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, Token
from app.services.auth_service import get_password_hash, verify_password, create_access_token
from app.config import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register")
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter((User.email == user_in.email) | (User.username == user_in.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    hashed_password = get_password_hash(user_in.password)
    new_user = User(
        email=user_in.email,
        username=user_in.username,
        password_hash=hashed_password,
        full_name=user_in.full_name,
        age_group=user_in.age_group,
        is_elderly=user_in.is_elderly,
        phone_number=user_in.phone_number
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "success": True,
        "status_code": 201,
        "message": "User registered successfully",
        "data": UserResponse.from_orm(new_user).dict(),
        "error": None
    }

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"email": user.email, "sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Login successful",
        "data": {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse.from_orm(user).dict()
        },
        "error": None
    }

@router.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {
        "success": True,
        "status_code": 200,
        "message": "User details retrieved",
        "data": UserResponse.from_orm(current_user).dict(),
        "error": None
    }
