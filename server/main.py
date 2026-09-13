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
LITELLM_API_KEY = os.getenv("LITELLM_API_KEY", "sk-litellm-vgurukool-master-2026")
LITELLM_MODEL = os.getenv("LITELLM_MODEL", "gemini-2.5-flash")

class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    agentId: str
    systemPrompt: str
    message: str
    history: Optional[List[ChatMessage]] = None

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
