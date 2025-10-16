import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="bg-muted">
        <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-2xl">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
