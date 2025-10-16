'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/chats');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">مرحبًا بك في تطبيق شامل</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        جاري التحويل إلى واجهة المحادثات...
      </p>
    </main>
  );
}
