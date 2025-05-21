from solana.rpc.api import Client
from typing import List, Dict

SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

def get_transaction_history(address: str, limit: int = 10) -> List[Dict]:
    signatures = client.get_signatures_for_address(address, limit=limit)["result"]

    tx_data = []
    for sig_info in signatures:
        signature = sig_info["signature"]
        tx = client.get_parsed_transaction(signature)["result"]

        if tx:
            tx_data.append({
                "signature": signature,
                "blockTime": tx.get("blockTime"),
                "type": tx["transaction"]["message"]["instructions"][0].get("parsed", {}).get("type"),
                "amount": tx["transaction"]["message"]["instructions"][0].get("parsed", {}).get("info", {}).get("lamports", 0),
                "source": tx["transaction"]["message"]["instructions"][0].get("parsed", {}).get("info", {}).get("source"),
                "destination": tx["transaction"]["message"]["instructions"][0].get("parsed", {}).get("info", {}).get("destination")
            })

    return tx_data
