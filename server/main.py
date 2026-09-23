import os
import json
import logging
from pathlib import Path
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import urllib.request
import urllib.error

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vgurukool-backend")

app = FastAPI(
    title="Vgurukool — Sovereign Vedic Learning & Intelligence Platform",
    description="Backend API and SPA server for Vgurukool",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"

LITELLM_URL = os.getenv("LITELLM_BASE_URL", "http://litellm.litellm.svc.cluster.local:4000/v1/chat/completions")
LITELLM_API_KEY = os.getenv("LITELLM_API_KEY", "")
LITELLM_MODEL = os.getenv("LITELLM_MODEL", "gemini-2.5-flash")


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timezone
import re

CONTACT_RECIPIENT_EMAIL = os.getenv("CONTACT_RECIPIENT_EMAIL", "ayush.o.singhaniya@gmail.com")
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() in ("true", "1", "yes")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", "contact@vgurukool.com")

DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
CONTACT_STORE_FILE = DATA_DIR / "contact_messages.json"


class ContactSubmission(BaseModel):
    name: str
    email: str
    category: Optional[str] = "General Inquiry"
    subject: str
    message: str


class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    agentId: str
    systemPrompt: str
    message: str
    history: Optional[List[ChatMessage]] = None


def dispatch_contact_email(sub: ContactSubmission) -> Dict[str, Any]:
    """Persist contact submission to disk store and attempt email delivery via SMTP."""
    record = {
        "id": f"msg_{int(datetime.now(timezone.utc).timestamp()*1000)}",
        "name": sub.name.strip(),
        "email": sub.email.strip(),
        "category": sub.category.strip() if sub.category else "General Inquiry",
        "subject": sub.subject.strip(),
        "message": sub.message.strip(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "received"
    }

    # 1. Always persist to disk inbox store
    try:
        messages = []
        if CONTACT_STORE_FILE.exists():
            with open(CONTACT_STORE_FILE, "r", encoding="utf-8") as f:
                messages = json.load(f)
        messages.append(record)
        with open(CONTACT_STORE_FILE, "w", encoding="utf-8") as f:
            json.dump(messages, f, indent=2)
    except Exception as e:
        logger.warning(f"Failed to persist contact message to disk: {e}")

    # 2. If SMTP is configured, attempt sending email
    if SMTP_HOST:
        try:
            msg = MIMEMultipart("alternative")
            email_subject = f"[Vgurukool Contact] {sub.category}: {sub.subject}"
            msg["Subject"] = email_subject
            msg["From"] = f"Vgurukool Contact <{SMTP_FROM_EMAIL}>"
            msg["To"] = CONTACT_RECIPIENT_EMAIL
            msg["Reply-To"] = sub.email.strip()

            text_content = f"""New Contact Form Submission from Vgurukool Portal:

Name: {sub.name}
Email: {sub.email}
Category: {sub.category}
Subject: {sub.subject}
Date: {record['timestamp']}

Message:
{sub.message}
"""
            html_content = f"""<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    <div style="background: linear-gradient(135deg, #d97706, #b45309); padding: 20px 24px;">
      <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">Vgurukool Portal • Contact Inquiry</h2>
      <p style="margin: 4px 0 0 0; color: #fef3c7; font-size: 13px;">Ancient Wisdom &amp; Modern Sovereign Intelligence</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 100px;"><strong>Sender:</strong></td>
          <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">{sub.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;"><a href="mailto:{sub.email}" style="color: #38bdf8; text-decoration: none;">{sub.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;"><strong>Category:</strong></td>
          <td style="padding: 8px 0; color: #fbbf24; font-size: 13px; font-weight: 600;">{sub.category}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;"><strong>Subject:</strong></td>
          <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;">{sub.subject}</td>
        </tr>
      </table>
      <div style="background: #1e293b; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-top: 12px;">
        <h4 style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message:</h4>
        <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{sub.message}</p>
      </div>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center;">
        Hit "Reply" in your email client to respond directly to <strong>{sub.email}</strong>.
      </div>
    </div>
  </div>
</body>
</html>"""

            part1 = MIMEText(text_content, "plain")
            part2 = MIMEText(html_content, "html")
            msg.attach(part1)
            msg.attach(part2)

            if SMTP_PORT == 465:
                server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=10)
            else:
                server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)
                if SMTP_USE_TLS:
                    server.starttls()

            if SMTP_USER and SMTP_PASSWORD:
                server.login(SMTP_USER, SMTP_PASSWORD)

            server.sendmail(SMTP_FROM_EMAIL, [CONTACT_RECIPIENT_EMAIL], msg.as_string())
            server.quit()
            logger.info(f"Dispatched contact email from {sub.email} to recipient.")
            return {"sent": True, "method": "smtp"}
        except Exception as e:
            logger.error(f"Failed to send email via SMTP: {e}")
            return {"sent": False, "method": "stored", "error": str(e)}

    logger.info(f"Contact submission received from {sub.email} (persisted to inbox store).")
    return {"sent": False, "method": "stored"}

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "vgurukool",
        "port": 3000
    }

@app.post("/api/ai/chat")
def ai_chat(req: ChatRequest):
    messages = [{"role": "system", "content": req.systemPrompt}]
    
    if req.history:
        for m in req.history[-6:]:
            role = "user" if m.sender == "user" else "assistant"
            messages.append({"role": role, "content": m.text})
            
    messages.append({"role": "user", "content": req.message})

    payload = {
        "model": LITELLM_MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 600
    }

    try:
        req_data = json.dumps(payload).encode("utf-8")
        api_req = urllib.request.Request(
            LITELLM_URL,
            data=req_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {LITELLM_API_KEY}"
            },
            method="POST"
        )
        with urllib.request.urlopen(api_req, timeout=12) as resp:
            resp_body = resp.read().decode("utf-8")
            data = json.loads(resp_body)
            reply = data["choices"][0]["message"]["content"]
            return {"reply": reply}
    except Exception as e:
        logger.warning(f"LiteLLM call failed or unavailable ({e}), returning persona guidance.")
        # Graceful Vedic fallback
        if req.agentId == "kubera":
            reply = "In Vedic thought, wealth (Artha) is an instrument of universal harmony when governed by Dharma. Focus on creating enduring societal value with integrity, and sustainable abundance will naturally follow."
        elif req.agentId == "dhanvantari":
            reply = "Ayurveda teaches that vitality (Ojas) thrives when we live in harmony with natural cycles. Nurture your daily Dinacharya: honor quiet mornings, balance digestive Agni, and allow regular restorative rest."
        elif req.agentId == "brihaspati":
            reply = "Higher wisdom (Paravidya) begins with self-inquiry (Atma Vichara). Do not be discouraged by external uncertainties; cultivate discerning intellect (Buddhi) grounded in universal truth."
        else:
            reply = "The sacred Bhagavad Gita teaches intentional action without attachment to outcomes: 'Karmanye vadhikaraste ma phaleshu kadachana'. Dedicate your focused effort to the highest good with devotion."
        return {"reply": reply}

@app.post("/api/contact")
def handle_contact(sub: ContactSubmission):
    name = (sub.name or "").strip()
    email = (sub.email or "").strip()
    subject = (sub.subject or "").strip()
    message = (sub.message or "").strip()

    if not name or len(name) < 2:
        raise HTTPException(status_code=400, detail="Please provide a valid name (at least 2 characters).")

    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        raise HTTPException(status_code=400, detail="Please provide a valid email address.")

    if not subject:
        sub.subject = "Inquiry from Vgurukool Visitor"

    if not message or len(message) < 5:
        raise HTTPException(status_code=400, detail="Please enter a message with at least 5 characters.")

    if len(message) > 5000:
        raise HTTPException(status_code=400, detail="Message exceeds maximum allowed length of 5000 characters.")

    result = dispatch_contact_email(sub)
    return {
        "success": True,
        "message": "Thank you for reaching out! Your message has been received, and our team will get back to you shortly."
    }

# Mount assets directory if present
if (DIST_DIR / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(DIST_DIR / "assets")), name="assets")

# SPA catch-all fallback
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    target_file = DIST_DIR / full_path
    if full_path and target_file.is_file():
        return FileResponse(target_file)
    index_file = DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return JSONResponse({"status": "app_initializing", "message": "Vgurukool building assets"}, status_code=200)
