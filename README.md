# Scam Detection System

A full-stack web application designed to help elderly people (and the general public) identify whether URLs, messages, and phone numbers are genuine or fraudulent.

## Features
- **URL Scanning**: Checks domain age, HTTPS validity, and scam keywords.
- **Message Analysis**: NLP-lite keyword and pattern matching for SMS scams.
- **Phone Verification**: Parses and evaluates phone numbers for VoIP and known spam likelihood.
- **Elderly-Friendly UI**: High-contrast, large text, and simple navigation (React + Tailwind).
- **Backend API**: FastAPI with a SQLite (or PostgreSQL) database.

## Prerequisites
- Python 3.10+
- Node.js 18+

## Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment: 
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run server: `uvicorn app.main:app --reload`
   - API runs at `http://localhost:8000`

## Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
   - App runs at `http://localhost:5173`

## Disclaimer
The ML components (scikit-learn, spacy) were replaced with lightweight rule-based heuristics in this version to keep the overall file size and memory footprint minimal, as explicitly requested during generation.
