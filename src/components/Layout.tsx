import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-jungle text-white flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-8 w-full max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
