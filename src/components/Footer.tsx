export default function Footer() {
  return (
    <footer className="w-full px-6 py-4 text-sm text-center bg-glass backdrop-blur-sm">
      <p className="opacity-60">
        &copy; {new Date().getFullYear()} Juno. Built in the jungle.
      </p>
    </footer>
  );
}
