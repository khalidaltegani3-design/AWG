import { BottomNav } from '@/components/BottomNav';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
