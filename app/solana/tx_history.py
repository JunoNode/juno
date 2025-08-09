# tx_history.py

from solana.rpc.api import Client
from typing import List, Dict, Any, Optional
from solana.rpc.types import MemcmpOpts
import time

SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

LAMPORTS_PER_SOL = 1_000_000_000


def get_transaction_history(
    address: str,
    limit: int = 20,
    before: Optional[str] = None,
    tx_type_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Fetches parsed transaction history for a given Solana address.

    Args:
        address: Wallet or program address to fetch history for.
        limit: Number of transactions to return (max 1,000 with pagination).
        before: Signature to start before (for pagination).
        tx_type_filter: Optional string to only include transactions of a given type.

    Returns:
        List of transaction metadata dictionaries.
    """
    try:
        sig_resp = client.get_signatures_for_address(
            address, limit=limit, before=before
        )
        signatures = sig_resp.get("result", [])
    except Exception as e:
        print(f"[juno:tx] error fetching signatures for {address} → {e}")
        return []

    transactions: List[Dict[str, Any]] = []

    for sig_info in signatures:
        signature = sig_info.get("signature")
        if not signature:
            continue

        try:
            tx_resp = client.get_parsed_transaction(signature)
            tx = tx_resp.get("result")
        except Exception as e:
            print(f"[juno:tx] error parsing transaction {signature} → {e}")
            continue

        if not tx:
            continue

        block_time = tx.get("blockTime")
        instructions = tx.get("transaction", {}).get("message", {}).get("instructions", [])
        meta = tx.get("meta", {})

        for ix in instructions:
            parsed = ix.get("parsed")
            if not parsed:
                continue

            tx_type = parsed.get("type")
            if tx_type_filter and tx_type != tx_type_filter:
                continue

            info = parsed.get("info", {})

            transactions.append({
                "signature": signature,
                "blockTime": block_time,
                "type": tx_type,
                "amountSOL": (
                    int(info.get("lamports", 0)) / LAMPORTS_PER_SOL
                    if info.get("lamports") else None
                ),
                "source": info.get("source"),
                "destination": info.get("destination"),
                "status": meta.get("err") is None,
            })

    return transactions


if __name__ == "__main__":
    # Example usage
    addr = "YourWalletAddressHere"
    txs = get_transaction_history(addr, limit=5)
    for t in txs:
        print(t)
