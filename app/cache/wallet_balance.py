import redis
import json
from solana.rpc.api import Client

SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

r = redis.Redis(host='localhost', port=6379, db=0)

def get_cached_balance(address: str) -> float:
    cache_key = f"wallet_balance:{address}"
    cached = r.get(cache_key)

    if cached:
        return float(cached)

    # Fetch fresh balance
    response = client.get_balance(address)
    lamports = response.get("result", {}).get("value", 0)
    sol_balance = lamports / 1_000_000_000

    # Cache result for 60 seconds
    r.setex(cache_key, 60, sol_balance)
    return sol_balance
 





