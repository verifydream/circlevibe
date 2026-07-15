export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭕</span>
            <span className="font-bold text-purple-600">CircleVibe</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bikin lingkaran kecil buat hobi yang cocok vibe-nya
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/about" className="hover:text-gray-600">Tentang</a>
            <a href="/safety" className="hover:text-gray-600">Keselamatan</a>
            <a href="/privacy" className="hover:text-gray-600">Privasi</a>
            <a href="/terms" className="hover:text-gray-600">Syarat</a>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CircleVibe.id — Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}