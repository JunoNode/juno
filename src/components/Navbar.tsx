import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-glass backdrop-blur-sm shadow-md">
      <Link href="/" className="text-2xl font-bold text-jungle-glow">
        Juno
      </Link>
      <div className="space-x-4">
        <Link href="/portfolio" className="hover:underline">Treasure Map</Link>
        <Link href="/watchtower" className="hover:underline">Watchtower</Link>
        <Link href="/chat" className="hover:underline">Grove</Link>
      </div>
    </nav>
  );
}
