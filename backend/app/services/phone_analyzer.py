import phonenumbers
from phonenumbers import geocoder, carrier
from typing import Dict, Any

def analyze_phone(phone_str: str) -> Dict[str, Any]:
    risk_level = "LOW"
    verdict = "SAFE"
    is_valid = False
    country_code = ""
    country_name = ""
    carrier_name = ""
    carrier_type = "UNKNOWN"
    is_voip = False
    reported_count = 0
    spam_likelihood = 0.0
    
    # We will simulate a local "known spam" database check using some simple rules
    # In a real system, this would query a database of user reports
    
    try:
        parsed_number = phonenumbers.parse(phone_str)
        is_valid = phonenumbers.is_valid_number(parsed_number)
        
        if is_valid:
            country_code = f"+{parsed_number.country_code}"
            country_name = geocoder.description_for_number(parsed_number, "en")
            carrier_name = carrier.name_for_number(parsed_number, "en")
            
            # Very basic carrier check (simulate VoIP or unknown carrier risk)
            if not carrier_name:
                risk_level = "MEDIUM"
                verdict = "SUSPICIOUS"
                spam_likelihood += 30.0
                
            # Simulate checking known spam patterns
            str_num = str(parsed_number.national_number)
            if "0000" in str_num or str_num.startswith("900") or str_num.startswith("800"):
                reported_count = 5
                is_voip = True
                spam_likelihood += 50.0
                risk_level = "HIGH"
                verdict = "DANGEROUS"
        else:
            # The number is syntactically parsable but not a valid real-world number
            risk_level = "MEDIUM"
            verdict = "SUSPICIOUS"
            spam_likelihood = 60.0
            
    except phonenumbers.NumberParseException:
        is_valid = False
        risk_level = "CRITICAL"
        verdict = "DANGEROUS"
        spam_likelihood = 100.0

    if spam_likelihood > 100:
        spam_likelihood = 100.0

    details = {
        "carrier_info": carrier_name if carrier_name else "Unknown carrier",
        "spam_reports": f"{reported_count} people reported this number as spam" if reported_count > 0 else "No spam reports",
        "recommendation": "Be cautious with calls from this number" if verdict != "SAFE" else "This number appears safe"
    }

    return {
        "phone_number": phone_str,
        "country_code": country_code,
        "country_name": country_name,
        "carrier_name": carrier_name,
        "carrier_type": carrier_type,
        "is_valid": is_valid,
        "risk_level": risk_level,
        "verdict": verdict,
        "reported_count": reported_count,
        "is_voip": is_voip,
        "is_spam_reported": reported_count > 0,
        "spam_likelihood": spam_likelihood,
        "details": details
    }
