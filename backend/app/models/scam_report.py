from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class ScamReport(Base):
    __tablename__ = "scam_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    report_type = Column(String) # URL, PHONE, MESSAGE, OTHER
    report_content = Column(String)
    description = Column(String)
    risk_level = Column(String) # LOW, MEDIUM, HIGH, CRITICAL
    is_verified = Column(Boolean, default=False)
    verification_count = Column(Integer, default=0)
    status = Column(String, default="PENDING") # PENDING, VERIFIED, DISMISSED
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="scam_reports")
