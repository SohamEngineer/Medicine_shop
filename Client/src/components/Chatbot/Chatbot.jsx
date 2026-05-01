import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const AI_SERVICE_URL = import.meta.env.VITE_API_BASE_URL || "https://medicine-shop-backend-r1ai.onrender.com";


const QUICK_PROMPTS = [
  "I have a headache",
  "Suggest fever medicines",
  "Medicine for cold & cough",
  "Acidity relief options",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm MediBot 👋 I can help you find the right medicines, explain dosages, or suggest remedies for common symptoms. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [showPrefForm, setShowPrefForm] = useState(false);
  const [prefData, setPrefData] = useState({ age: "", allergies: "", conditions: "" });
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${AI_SERVICE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          user_preferences: preferences,
        }),
      });

      if (!res.ok) throw new Error("AI service error");
      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply,
          suggested: data.suggested_medicines,
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = () => {
    setPreferences(prefData);
    setShowPrefForm(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Got it! I've saved your profile (Age: ${prefData.age || "not set"}, Allergies: ${prefData.allergies || "none"}, Conditions: ${prefData.conditions || "none"}). I'll personalise my suggestions for you.`,
      },
    ]);
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/• /g, "• ")
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-fab ${open ? "chat-fab--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open MediBot chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {!open && <span className="chat-fab__label">Ask MediBot</span>}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header__avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div>
              <div className="chat-header__name">MediBot</div>
              <div className="chat-header__status">
                <span className="chat-header__dot" />
                AI Medicine Assistant
              </div>
            </div>
            <button
              className="chat-header__pref"
              onClick={() => setShowPrefForm((p) => !p)}
              title="Set health preferences"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
              {preferences && <span className="chat-header__pref-dot" />}
            </button>
          </div>

          {/* Pref form */}
          {showPrefForm && (
            <div className="pref-form">
              <p className="pref-form__title">Your health profile (optional)</p>
              <input
                placeholder="Age (e.g. 24)"
                value={prefData.age}
                onChange={(e) => setPrefData({ ...prefData, age: e.target.value })}
              />
              <input
                placeholder="Allergies (e.g. penicillin, aspirin)"
                value={prefData.allergies}
                onChange={(e) => setPrefData({ ...prefData, allergies: e.target.value })}
              />
              <input
                placeholder="Existing conditions (e.g. diabetes)"
                value={prefData.conditions}
                onChange={(e) => setPrefData({ ...prefData, conditions: e.target.value })}
              />
              <button className="pref-form__save" onClick={savePreferences}>
                Save Profile
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                {msg.role === "assistant" && (
                  <div className="chat-msg__avatar">M</div>
                )}
                <div className="chat-msg__bubble">
                  <p
                    className="chat-msg__text"
                    dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                  />
                  {msg.suggested && msg.suggested.length > 0 && (
                    <div className="chat-msg__tags">
                      {msg.suggested.map((s) => (
                        <span key={s} className="chat-msg__tag">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg chat-msg--assistant">
                <div className="chat-msg__avatar">M</div>
                <div className="chat-msg__bubble chat-msg__bubble--typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 2 && (
            <div className="chat-quick">
              {QUICK_PROMPTS.map((q) => (
                <button key={q} className="chat-quick__btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about medicines or symptoms..."
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <p className="chat-disclaimer">
            MediBot provides general information only. Always consult a doctor for medical advice.
          </p>
        </div>
      )}
    </>
  );
}
