import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shamil App',
  description: 'Shamil',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
