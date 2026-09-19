from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime

class URLAnalysisRequest(BaseModel):
    url: str

class URLAnalysisResponse(BaseModel):
    id: int
    url: str
    domain: str
    risk_score: float
    verdict: str
    phishing_probability: float
    legitimate_probability: float
    suspicious_probability: float
    has_https: bool
    is_known_phishing: bool
    domain_age_days: Optional[int]
    suspicious_keywords: List[str]
    details: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class MessageAnalysisRequest(BaseModel):
    message_text: str
    message_language: str = "en"

class MessageAnalysisResponse(BaseModel):
    id: int
    spam_score: float
    phishing_score: float
    risk_level: str
    verdict: str
    detected_keywords: List[str]
    suspicious_patterns: List[str]
    contains_link: bool
    contains_numbers: bool
    contains_currency: bool
    details: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class PhoneAnalysisRequest(BaseModel):
    phone_number: str

class PhoneAnalysisResponse(BaseModel):
    id: int
    phone_number: str
    country_code: str
    country_name: str
    carrier_name: Optional[str]
    carrier_type: str
    is_valid: bool
    risk_level: str
    verdict: str
    reported_count: int
    is_voip: bool
    is_spam_reported: bool
    spam_likelihood: float
    details: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class AnalysisHistoryResponse(BaseModel):
    id: int
    analysis_type: str
    input_data: str
    risk_score: float
    verdict: str
    details: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True
