from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from openai import OpenAI

app = FastAPI(title="MediChat AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY", "skprojdAJ9c5bEdjHBn1eqQd1Frh8T4HMLk1jpF1vSeiOpUUe5j7bAnT3RbQmBTjKX-MsH8lvJk9awTT3BlbkFJNxpzM0dPTDaqBZuGf1fAmlrKbrRTdLvSmER33c9q1RfeCHCIvoneCgUPEUHwqTV6tMcJkVfkwA"),
    http_client=None  # Explicitly disable custom http client to avoid proxy conflicts
)

SYSTEM_PROMPT = """You are MediBot, a helpful assistant for an online medicine shop.
You help users:
- Find medicines based on symptoms or conditions
- Understand medicine usage, dosage, and side effects
- Suggest alternatives when a medicine is unavailable
- Answer general health queries (always advise consulting a doctor for serious issues)

Rules:
- Always recommend consulting a licensed doctor for diagnosis
- Never suggest prescription medicines without mentioning a prescription is required
- Be concise, friendly, and clear
- If asked about a specific medicine, mention: uses, common dosage, side effects briefly
- For symptoms, suggest OTC medicines and always say "consult a doctor if symptoms persist"
- Format responses cleanly — use bullet points where helpful"""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    user_preferences: Optional[dict] = None


class ChatResponse(BaseModel):
    reply: str
    suggested_medicines: Optional[List[str]] = []


@app.get("/health")
def health():
    return {"status": "ok", "service": "MediChat AI"}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if req.user_preferences:
            pref_str = f"\nUser profile: Age={req.user_preferences.get('age', 'unknown')}, " \
                       f"Allergies={req.user_preferences.get('allergies', 'none')}, " \
                       f"Conditions={req.user_preferences.get('conditions', 'none')}"
            messages[0]["content"] += pref_str

        for m in req.messages[-10:]:
            messages.append({"role": m.role, "content": m.content})

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7,
        )

        reply = response.choices[0].message.content

        # Extract medicine names mentioned (basic extraction)
        common_medicines = [
            "paracetamol", "ibuprofen", "aspirin", "cetirizine", "omeprazole",
            "amoxicillin", "metformin", "atorvastatin", "pantoprazole", "azithromycin",
            "dolo", "crocin", "combiflam", "allegra", "digene"
        ]
        suggested = [m for m in common_medicines if m in reply.lower()]

        return ChatResponse(reply=reply, suggested_medicines=suggested[:3])

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/suggest")
async def suggest_medicine(data: dict):
    """Quick symptom → medicine suggestion endpoint"""
    symptom = data.get("symptom", "")
    if not symptom:
        raise HTTPException(status_code=400, detail="symptom is required")

    prompt = f"Suggest 2-3 common OTC medicines for: {symptom}. " \
             f"Return JSON: {{\"medicines\": [{{\"name\": str, \"use\": str, \"note\": str}}]}}"

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a pharmacist assistant. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.3,
        )
        import json
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
