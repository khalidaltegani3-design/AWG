'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // For now, we'll redirect to the main chat interface.
    // In the future, this would be protected by authentication.
    router.replace('/login');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">مرحبًا بك في تطبيق شامل</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        جاري التحويل...
      </p>
    </main>
  );
}
