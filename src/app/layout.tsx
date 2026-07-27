import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tracker',
  description: 'Gestor de issues multi-tenant — Next.js + Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
