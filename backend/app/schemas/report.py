from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ScamReportCreate(BaseModel):
    report_type: str
    report_content: str
    description: str
    risk_level: str

class ScamReportResponse(ScamReportCreate):
    id: int
    user_id: int
    is_verified: bool
    verification_count: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
