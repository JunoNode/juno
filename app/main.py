from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from wallet import router as wallet_router

app = FastAPI(
    title="Juno API",
    description="Solana wallet analytics and tracking service powered by AI and real-time signal analysis.",
    version="0.1.0",
    contact={
        "name": "Juno Team",
        "url": "https://github.com/your-org/juno",
        "email": "support@junowallet.ai",
    }
)

# CORS config for frontend access (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Consider locking this down for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register wallet-related routes
app.include_router(wallet_router, prefix="/wallet", tags=["wallet"])

@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint for Juno API
    """
    return {"message": "Welcome to the Juno API"}

@app.get("/health", tags=["status"])
async def health_check():
    """
    Basic service health check
    """
    return {"status": "ok"}