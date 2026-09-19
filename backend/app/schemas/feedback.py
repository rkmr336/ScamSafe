from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FeedbackCreate(BaseModel):
    feedback_type: str
    message: str
    rating: int

class FeedbackResponse(FeedbackCreate):
    id: int
    user_id: Optional[int]
    is_resolved: bool
    created_at: datetime

    class Config:
        from_attributes = True
