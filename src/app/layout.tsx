import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import BottomNavbar from '@/components/bottom-navbar';

export const metadata: Metadata = {
  title: 'Zoliapp Lite',
  description: 'An intuitive chat interface for seamless messaging.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex h-screen w-full max-w-md mx-auto flex-col relative">
          <main className="flex-1 overflow-y-auto pb-16">{children}</main>
          <BottomNavbar />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
