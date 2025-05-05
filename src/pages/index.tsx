import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Juno — The Jungle Watches</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-jungle">
        <h1 className="text-4xl font-bold mb-4">Welcome to Juno</h1>
        <p className="text-lg opacity-70">Step into the jungle — where signal lives.</p>
      </main>
    </>
  );
}
