import Head from "next/head";

export default function Watchtower() {
  return (
    <>
      <Head>
        <title>Juno — The Watchtower</title>
      </Head>
      <main className="min-h-screen p-6 text-white bg-jungle">
        <h2 className="text-3xl font-semibold mb-4">Watchtower</h2>
        <p className="opacity-75">Track wallets, whales, and real-time movements across the chain.</p>
        {/* Wallet monitor UI goes here */}
      </main>
    </>
  );
}
