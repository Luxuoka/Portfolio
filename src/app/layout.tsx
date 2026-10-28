import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  adjustFontFallback: false,
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio & Layanan Pengembangan Web',
  description: 'Arsitektur website terstruktur, performa tinggi, dan mudah dikelola.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${newsreader.variable} ${sans.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased min-h-screen selection:bg-ink selection:text-bg">
        {children}
      </body>
    </html>
  );
}
