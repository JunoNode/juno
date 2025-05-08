import Head from "next/head";
import SettingsPanel from "@/features/settings/SettingsPanel";
import Layout from "@/components/Layout";

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings — Juno</title>
        <meta name="description" content="Adjust your preferences inside the jungle." />
      </Head>
      <Layout>
        <main className="min-h-screen px-4 py-10 bg-jungle text-white">
          <div className="max-w-4xl mx-auto">
            <SettingsPanel />
          </div>
        </main>
      </Layout>
    </>
  );
}
