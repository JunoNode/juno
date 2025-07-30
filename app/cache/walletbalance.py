import redis
import json
import logging
from solana.rpc.api import Client
from solana.rpc.types import RPCResponse

# Solana client setup
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

# Redis connection
r = redis.Redis(host="localhost", port=6379, db=0)

# Logger
logger = logging.getLogger("wallet_balance")
logger.setLevel(logging.INFO)


def get_cached_balance(address: str) -> float:
    cache_key = f"wallet_balance:{address}"
    
    try:
        # Try Redis cache
        cached = r.get(cache_key)
        if cached:
            return float(cached)
    except redis.RedisError as e:
        logger.warning(f"Redis error for {address}: {e}")

    try:
        # Fallback to Solana RPC
        response: RPCResponse = client.get_balance(address)
        lamports = response.get("result", {}).get("value", 0)
        sol_balance = lamports / 1_000_000_000

        # Store in Redis
        try:
            r.setex(cache_key, 60, sol_balance)
        except redis.RedisError as e:
            logger.warning(f"Redis setex error for {address}: {e}")

        return sol_balance
    except Exception as e:
        logger.error(f"Failed to fetch balance for {address}: {e}")
        return 0.0
