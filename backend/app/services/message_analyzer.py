import re
from typing import Dict, Any, List

def analyze_message(message_text: str, language: str = "en") -> Dict[str, Any]:
    text_lower = message_text.lower()
    
    # Keyword sets
    scam_keywords = ["prize", "winner", "claim", "verify", "confirm", "click", "link", "urgent", "act now", "otp", "password", "bank", "account", "update", "confirm identity", "immediate action"]
    urgency_words = ["urgent", "immediately", "now", "quick"]
    
    found_keywords = [kw for kw in scam_keywords if kw in text_lower]
    suspicious_patterns = []
    
    # Check for all caps
    if message_text.isupper() and len(message_text) > 10:
        suspicious_patterns.append("ALL_CAPS")
        
    # Check for links
    urls = re.findall(r'(https?://[^\s]+)', message_text)
    contains_link = len(urls) > 0
    
    if contains_link:
        for url in urls:
            if "bit.ly" in url or "tinyurl" in url:
                suspicious_patterns.append("shortened_url")
                
    # Urgency check
    has_urgency = any(word in text_lower for word in urgency_words)
    if has_urgency:
        suspicious_patterns.append("urgency_words")
        
    contains_numbers = bool(re.search(r'\d', message_text))
    contains_currency = bool(re.search(r'[\$£€₹]', message_text))
    
    # Score calculation
    spam_score = 0.0
    phishing_score = 0.0
    
    spam_score += len(found_keywords) * 10
    if contains_link:
        spam_score += 20
        phishing_score += 30
    if has_urgency:
        spam_score += 15
        phishing_score += 15
    if contains_currency and contains_link:
        phishing_score += 25
        
    spam_score = min(spam_score, 100.0)
    phishing_score = min(phishing_score, 100.0)
    
    risk_level = "LOW"
    verdict = "SAFE"
    
    max_score = max(spam_score, phishing_score)
    if max_score > 75:
        risk_level = "CRITICAL"
        verdict = "DANGEROUS"
    elif max_score > 50:
        risk_level = "HIGH"
        verdict = "DANGEROUS"
    elif max_score > 25:
        risk_level = "MEDIUM"
        verdict = "SUSPICIOUS"

    details = {
        "urgency_indicators": "Multiple urgency words detected" if has_urgency else "None",
        "link_analysis": "Shortened URL detected - suspicious" if "shortened_url" in suspicious_patterns else ("Link detected" if contains_link else "None"),
        "keyword_match": f"{len(found_keywords)} scam-related keywords found",
        "recommendation": "This is likely a phishing/scam message. Do not click links." if verdict != "SAFE" else "Message appears safe."
    }

    return {
        "spam_score": spam_score,
        "phishing_score": phishing_score,
        "risk_level": risk_level,
        "verdict": verdict,
        "detected_keywords": found_keywords,
        "suspicious_patterns": suspicious_patterns,
        "contains_link": contains_link,
        "contains_numbers": contains_numbers,
        "contains_currency": contains_currency,
        "details": details
    }
