from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.user import User
from app.models.analysis import URLAnalysis, MessageAnalysis, PhoneAnalysis, AnalysisHistory
from app.schemas.analysis import (
    URLAnalysisRequest, URLAnalysisResponse,
    MessageAnalysisRequest, MessageAnalysisResponse,
    PhoneAnalysisRequest, PhoneAnalysisResponse
)
from app.services.url_scanner import analyze_url
from app.services.message_analyzer import analyze_message
from app.services.phone_analyzer import analyze_phone
from app.routes.auth import get_current_user

router = APIRouter()

# Optional user dependency to allow anonymous scans or save history if logged in
def get_optional_user(db: Session = Depends(get_db)):
    # Simple dependency - in a real app you might extract token from header manually
    # For now, we will rely on frontend passing token if available, but FastAPI Depends(get_current_user) throws 401.
    # To keep it simple, we just won't enforce history saving strictly tied to auth token in this endpoint,
    # or we create a custom optional auth dependency.
    pass

@router.post("/url")
def scan_url(request: URLAnalysisRequest, db: Session = Depends(get_db)):
    result_data = analyze_url(request.url)
    
    # Save to db
    db_analysis = URLAnalysis(**result_data)
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return {
        "success": True,
        "status_code": 200,
        "message": "URL analysis completed",
        "data": URLAnalysisResponse.from_orm(db_analysis).dict(),
        "error": None
    }

@router.post("/message")
def scan_message(request: MessageAnalysisRequest, db: Session = Depends(get_db)):
    result_data = analyze_message(request.message_text, request.message_language)
    
    db_analysis = MessageAnalysis(
        message_text=request.message_text,
        message_language=request.message_language,
        **result_data
    )
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Message analysis completed",
        "data": MessageAnalysisResponse.from_orm(db_analysis).dict(),
        "error": None
    }

@router.post("/phone")
def scan_phone(request: PhoneAnalysisRequest, db: Session = Depends(get_db)):
    result_data = analyze_phone(request.phone_number)
    
    db_analysis = PhoneAnalysis(**result_data)
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Phone analysis completed",
        "data": PhoneAnalysisResponse.from_orm(db_analysis).dict(),
        "error": None
    }
