import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md border border-line-dark bg-surface p-10">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
          ERROR 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs text-ink-muted leading-relaxed font-sans">
          Dokumen atau halaman yang Anda tuju tidak tersedia atau telah dialihkan ke rute lain.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-ink text-bg font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
