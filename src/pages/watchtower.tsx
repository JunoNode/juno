import Head from "next/head";

export default function Watchtower() {
  return (
    <>
      <Head>
        <title>Juno — Watchtower</title>
        <meta name="description" content="Monitor high-value wallets and live signal events in real-time." />
      </Head>

      <main className="min-h-screen px-6 py-12 bg-jungle text-white">
        <section className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Watchtower</h1>
            <p className="mt-2 text-base opacity-70">
              Follow wallet activity, trace liquidity, and detect early signal patterns across the chain.
            </p>
          </header>

          <div className="bg-glass rounded-xl p-6 border border-glass-dark shadow-sm">
            {/* Placeholder for future wallet tracking interface */}
            <div className="text-sm opacity-50 italic text-center py-12">
              Watchtower UI coming soon. Real-time tracking logic in progress.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}