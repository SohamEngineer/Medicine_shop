# MediShop — AI-Powered Online Medicine Store

A full-stack e-commerce platform for purchasing medicines, now enhanced with **MediBot** — an AI-powered chatbot for medicine recommendations, symptom-based suggestions, and personalised health assistance.

![CI](https://github.com/Hacker-smkg/Medicine_shop/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/Node.js-20-green)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-AI_Service-009688)

---

## Features

### Core E-Commerce
- JWT-based authentication (signup / login / protected routes)
- Product catalogue with search and category filtering
- Cart management and order processing
- Responsive UI built with React

### MediBot — AI Chatbot (New)
- Symptom-based medicine suggestions
- Medicine information (dosage, side effects, alternatives)
- User health profile (age, allergies, conditions) for personalised responses
- Quick-prompt shortcuts for common queries
- Powered by OpenAI GPT-3.5 via a dedicated FastAPI microservice

---

## Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React 18, Vite, CSS                  |
| Backend      | Node.js, Express.js, JWT, Mongoose   |
| Database     | MongoDB                              |
| AI Service   | Python, FastAPI, OpenAI API          |
| DevOps       | Docker, Docker Compose, GitHub Actions |

---

## Project Structure

```
Medicine_shop/
├── Client/               # React frontend
│   └── src/
│       └── components/
│           └── Chatbot/  # MediBot UI
├── Server/               # Express backend
│   └── routes/
│       └── chat.js       # AI proxy route
├── ai-service/           # FastAPI AI microservice
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── .github/workflows/ci.yml
```

---

## Getting Started

### 1. Clone and configure

```bash
git clone https://github.com/Hacker-smkg/Medicine_shop.git
cd Medicine_shop
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY and other values
```

### 2. Run with Docker (recommended)

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000  
- AI Service + Swagger docs: http://localhost:8000/docs

### 3. Run manually

```bash
# Terminal 1 — MongoDB
mongod

# Terminal 2 — Server
cd Server && npm install && npm start

# Terminal 3 — AI Service
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 4 — Client
cd Client && npm install && npm run dev
```

---

## API Endpoints

### Express Server (port 5000)
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | /api/auth/register  | User registration    |
| POST   | /api/auth/login     | User login           |
| GET    | /api/products       | Get all products     |
| POST   | /api/cart           | Add to cart          |
| POST   | /api/orders         | Place order          |
| POST   | /api/chat           | AI chat proxy        |

### FastAPI AI Service (port 8000)
| Method | Endpoint     | Description                   |
|--------|--------------|-------------------------------|
| POST   | /chat        | Multi-turn medicine chatbot   |
| POST   | /suggest     | Quick symptom → medicine list |
| GET    | /health      | Service health check          |
| GET    | /docs        | Swagger UI                    |

---

## Adding MediBot to Existing App

In your `App.jsx` (or root component):

```jsx
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  return (
    <div>
      {/* your existing routes */}
      <Chatbot />   {/* add this — renders as floating button */}
    </div>
  );
}
```

In your Express `server.js` / `index.js`:

```js
const chatRoute = require("./routes/chat");
app.use("/api/chat", chatRoute);
```

---

## Environment Variables

See `.env.example` for all required variables. Key ones:

| Variable       | Description                    |
|----------------|--------------------------------|
| MONGO_URI       | MongoDB connection string      |
| JWT_SECRET      | Secret key for JWT tokens      |
| OPENAI_API_KEY  | OpenAI API key for MediBot     |
| AI_SERVICE_URL  | FastAPI service URL            |

---

## Author

**Soumya Ganguly**  
[GitHub](https://github.com/Hacker-smkg) · [LinkedIn](https://linkedin.com/in/soumya-ganguly-799676249)

> This project is for educational purposes. MediBot provides general information only — always consult a licensed doctor for medical advice.
