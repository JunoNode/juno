from fastapi import FastAPI
from wallet import router as wallet_router

app = FastAPI(
    title="Juno API",
    description="Solana wallet analytics and tracking service.",
    version="0.1.0"
)

# Include routes from wallet.py
app.include_router(wallet_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Juno API"}
