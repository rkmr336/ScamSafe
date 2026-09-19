from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    analysis_type = Column(String) # URL, MESSAGE, PHONE
    input_data = Column(String)
    risk_score = Column(Float)
    verdict = Column(String) # SAFE, SUSPICIOUS, DANGEROUS
    details = Column(JSON)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="analysis_history")

class URLAnalysis(Base):
    __tablename__ = "url_analysis"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    domain = Column(String)
    verdict = Column(String)
    risk_score = Column(Float)
    phishing_probability = Column(Float)
    legitimate_probability = Column(Float)
    suspicious_probability = Column(Float)
    domain_age_days = Column(Integer, nullable=True)
    has_https = Column(Boolean)
    is_known_phishing = Column(Boolean, default=False)
    suspicious_keywords = Column(JSON) # Store as JSON list
    details = Column(JSON)
    last_checked = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class MessageAnalysis(Base):
    __tablename__ = "message_analysis"

    id = Column(Integer, primary_key=True, index=True)
    message_text = Column(String)
    message_language = Column(String, default="en")
    verdict = Column(String)
    spam_score = Column(Float)
    phishing_score = Column(Float)
    suspicious_score = Column(Float)
    risk_level = Column(String) # LOW, MEDIUM, HIGH, CRITICAL
    detected_keywords = Column(JSON)
    suspicious_patterns = Column(JSON)
    contains_link = Column(Boolean)
    contains_numbers = Column(Boolean)
    contains_currency = Column(Boolean)
    details = Column(JSON)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class PhoneAnalysis(Base):
    __tablename__ = "phone_analysis"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, index=True)
    country_code = Column(String)
    verdict = Column(String)
    country_name = Column(String)
    carrier_name = Column(String, nullable=True)
    carrier_type = Column(String) # MOBILE, LANDLINE, VOIP
    is_valid = Column(Boolean)
    risk_level = Column(String)
    reported_count = Column(Integer, default=0)
    is_voip = Column(Boolean, default=False)
    is_spam_reported = Column(Boolean, default=False)
    spam_likelihood = Column(Float)
    details = Column(JSON)
    last_checked = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
