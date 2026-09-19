from urllib.parse import urlparse
import whois
from datetime import datetime, timezone
import requests
from typing import Dict, Any, List

def analyze_url(url: str) -> Dict[str, Any]:
    parsed_url = urlparse(url)
    domain = parsed_url.netloc if parsed_url.netloc else parsed_url.path
    
    # Check HTTPS
    has_https = url.startswith("https://")
    
    # Basic keyword check for phishing
    suspicious_keywords_list = ["login", "verify", "account", "update", "secure", "banking", "paypal", "admin", "free"]
    found_keywords = [kw for kw in suspicious_keywords_list if kw in url.lower()]
    
    # Calculate risks (heuristic based)
    risk_score = 0.0
    phishing_probability = 0.0
    
    if not has_https:
        risk_score += 20.0
    
    if len(found_keywords) > 0:
        risk_score += 15.0 * len(found_keywords)
        phishing_probability += 10.0 * len(found_keywords)
        
    domain_age_days = None
    try:
        domain_info = whois.whois(domain)
        creation_date = domain_info.creation_date
        if type(creation_date) is list:
            creation_date = creation_date[0]
            
        if creation_date:
            if not creation_date.tzinfo:
                creation_date = creation_date.replace(tzinfo=timezone.utc)
            delta = datetime.now(timezone.utc) - creation_date
            domain_age_days = delta.days
            if domain_age_days < 180: # Less than 6 months
                risk_score += 30.0
                phishing_probability += 30.0
    except Exception:
        pass # WHOIS failed
        
    # Cap scores
    risk_score = min(risk_score, 100.0)
    phishing_probability = min(phishing_probability, 100.0)
    
    verdict = "SAFE"
    if risk_score > 70:
        verdict = "DANGEROUS"
    elif risk_score > 30:
        verdict = "SUSPICIOUS"
        
    details = {
        "domain_age_risk": f"High - Domain only {domain_age_days} days old" if domain_age_days and domain_age_days < 180 else "Normal",
        "has_https": has_https,
        "recommendation": "This URL looks suspicious. Do not click." if verdict != "SAFE" else "This URL appears safe."
    }

    return {
        "url": url,
        "domain": domain,
        "risk_score": risk_score,
        "verdict": verdict,
        "phishing_probability": phishing_probability,
        "legitimate_probability": 100.0 - phishing_probability,
        "suspicious_probability": min(100.0, phishing_probability / 2),
        "has_https": has_https,
        "is_known_phishing": False,
        "domain_age_days": domain_age_days,
        "suspicious_keywords": found_keywords,
        "details": details
    }
