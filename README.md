# SAHAYAK-KAVACH

## Project structure

```
sahayak-kavach/
├── frontend/                 # React.js SPA (Vite + Tailwind CSS + Recharts)
├── backend/                  # FastAPI web server
├── ai_engine/                # Adaptive sentiment, STT & acoustic analysis
├── database/                 # Alembic migrations & TimescaleDB init scripts
├── render.yaml               # Render IaC blueprint
└── README.md
```

## Quickstart

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
