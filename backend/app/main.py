from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db.database import engine, Base

# Import ALL models BEFORE create_all so SQLAlchemy registers them
from app.models.user import User
from app.models.analysis import URLAnalysis, MessageAnalysis, PhoneAnalysis, AnalysisHistory
from app.models.feedback import UserFeedback
from app.models.scam_report import ScamReport

# Create database tables (now all models are registered)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Scam Detection System API",
    description="API for detecting scams in URLs, Messages, and Phone Numbers",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Scam Detection System API"}

from app.routes.auth import router as auth_router
from app.routes.analysis import router as analysis_router
from app.routes.history import router as history_router
from app.routes.reports import router as reports_router
from app.routes.feedback import router as feedback_router

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(analysis_router, prefix="/api/analysis", tags=["analysis"])
app.include_router(history_router, prefix="/api/history", tags=["history"])
app.include_router(reports_router, prefix="/api/reports", tags=["reports"])
app.include_router(feedback_router, prefix="/api/feedback", tags=["feedback"])
