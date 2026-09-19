from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.user import User
from app.models.scam_report import ScamReport
from app.schemas.report import ScamReportCreate, ScamReportResponse
from app.routes.auth import get_current_user

router = APIRouter()

@router.post("/create")
def create_report(
    report_in: ScamReportCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_report = ScamReport(
        user_id=current_user.id,
        report_type=report_in.report_type,
        report_content=report_in.report_content,
        description=report_in.description,
        risk_level=report_in.risk_level
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    return {
        "success": True,
        "status_code": 201,
        "message": "Report submitted successfully",
        "data": ScamReportResponse.from_orm(db_report).dict(),
        "error": None
    }

@router.get("/list")
def list_reports(
    limit: int = Query(10, ge=1, le=100), 
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ScamReport)
    if status:
        query = query.filter(ScamReport.status == status)
        
    total = query.count()
    items = query.order_by(ScamReport.created_at.desc()).limit(limit).all()
    
    return {
        "success": True,
        "status_code": 200,
        "message": "Reports retrieved",
        "data": {
            "total": total,
            "items": [ScamReportResponse.from_orm(item).dict() for item in items]
        },
        "error": None
    }
