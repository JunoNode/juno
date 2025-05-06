import Head from "next/head";
import ChatContainer from "@/features/chat/ChatContainer";

export default function Chat() {
  return (
    <>
      <Head>
        <title>Juno — The Grove</title>
      </Head>
      <main className="min-h-screen p-6 text-white bg-jungle">
        <h2 className="text-3xl font-semibold mb-4">Juno’s Grove</h2>
        <p className="opacity-70 mb-4">Ask anything. Juno is listening.</p>
        <ChatContainer />
      </main>
    </>
  );
}
