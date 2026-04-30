import express from "express";

const router = express.Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

// POST /api/chat  — proxy to FastAPI AI service
router.post("/", async (req, res) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI service responded with ${response.status}: ${errText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("[Chat Route Error]", {
      message: err.message,
      target: `${AI_SERVICE_URL}/chat`,
      cause: err.cause?.message || "Unknown cause"
    });
    res.status(500).json({
      error: "AI service unavailable. Please check server logs.",
      details: err.message
    });
  }
});

// POST /api/chat/suggest  — quick symptom suggestion
router.post("/suggest", async (req, res) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`AI service responded with ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("[Suggest Route Error]", err.message);
    res.status(500).json({ error: "Could not fetch suggestions" });
  }
});

// GET /api/chat/health  — check AI service status
router.get("/health", async (req, res) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/health`, {
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    res.json({ ai_service: "online", ...data });
  } catch {
    res.json({ ai_service: "offline" });
  }
});

export default router;
