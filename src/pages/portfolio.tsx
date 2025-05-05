import Head from "next/head";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Juno — Treasure Map</title>
      </Head>
      <main className="min-h-screen p-6 text-white bg-jungle">
        <h2 className="text-3xl font-semibold mb-4">Your Treasure Map</h2>
        <p className="opacity-75">View your wallet’s live portfolio and token details.</p>
        {/* Portfolio UI components will go here */}
      </main>
    </>
  );
}
