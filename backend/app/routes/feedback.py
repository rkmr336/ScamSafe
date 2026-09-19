from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.user import User
from app.models.feedback import UserFeedback
from app.schemas.feedback import FeedbackCreate, FeedbackResponse
from app.routes.auth import get_current_user

router = APIRouter()

@router.post("")
def submit_feedback(
    feedback_in: FeedbackCreate,
    # Optional user, since feedback can be anonymous sometimes, but let's make it optional if possible.
    # To keep simple, we'll try to get user if token provided, else None.
    # We will just depend on it or allow it as nullable.
    db: Session = Depends(get_db)
):
    # Here we should optionally get user, but for now we just allow anonymous if no token logic is complex
    db_feedback = UserFeedback(
        feedback_type=feedback_in.feedback_type,
        message=feedback_in.message,
        rating=feedback_in.rating
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    
    return {
        "success": True,
        "status_code": 201,
        "message": "Feedback submitted successfully",
        "data": FeedbackResponse.from_orm(db_feedback).dict(),
        "error": None
    }
