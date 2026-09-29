from fastapi import FastAPI

app = FastAPI(title="SAHAYAK-KAVACH API")


@app.get("/health")
async def health():
    return {"status": "ok"}
