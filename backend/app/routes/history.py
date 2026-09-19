from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.user import User
from app.models.analysis import AnalysisHistory
from app.schemas.analysis import AnalysisHistoryResponse
from app.routes.auth import get_current_user

router = APIRouter()

@router.get("")
def get_history(
    limit: int = Query(10, ge=1, le=100), 
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history_query = db.query(AnalysisHistory).filter(AnalysisHistory.user_id == current_user.id).order_by(AnalysisHistory.created_at.desc())
    total = history_query.count()
    items = history_query.offset(offset).limit(limit).all()
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Analysis history retrieved",
        "data": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "items": [AnalysisHistoryResponse.from_orm(item).dict() for item in items]
        },
        "error": None
    }

@router.post("/")
def save_history(
    analysis_type: str,
    input_data: str,
    risk_score: float,
    verdict: str,
    details: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_history = AnalysisHistory(
        user_id=current_user.id,
        analysis_type=analysis_type,
        input_data=input_data,
        risk_score=risk_score,
        verdict=verdict,
        details=details
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    
    return {
        "success": True,
        "status_code": 201,
        "message": "History saved",
        "data": AnalysisHistoryResponse.from_orm(db_history).dict(),
        "error": None
    }

@router.delete("/{id}")
def delete_history(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(AnalysisHistory).filter(AnalysisHistory.id == id, AnalysisHistory.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="History not found")
        
    db.delete(item)
    db.commit()
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Analysis deleted",
        "data": {},
        "error": None
    }
