# tx_history.py

from solana.rpc.api import Client
from typing import List, Dict, Any, Optional

SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

def get_transaction_history(address: str, limit: int = 10) -> List[Dict[str, Any]]:
    try:
        signature_response = client.get_signatures_for_address(address, limit=limit)
        signatures = signature_response.get("result", [])
    except Exception as e:
        print(f"[juno:tx] error fetching signatures for {address} → {e}")
        return []

    transactions = []

    for sig in signatures:
        signature = sig.get("signature")
        if not signature:
            continue

        try:
            tx = client.get_parsed_transaction(signature).get("result")
        except Exception as e:
            print(f"[juno:tx] error parsing transaction {signature} → {e}")
            continue

        if not tx:
            continue

        instructions = tx.get("transaction", {}).get("message", {}).get("instructions", [])
        parsed = instructions[0].get("parsed", {}) if instructions else {}

        transactions.append({
            "signature": signature,
            "blockTime": tx.get("blockTime"),
            "type": parsed.get("type"),
            "amount": parsed.get("info", {}).get("lamports"),
            "source": parsed.get("info", {}).get("source"),
            "destination": parsed.get("info", {}).get("destination")
        })

    return transactions

