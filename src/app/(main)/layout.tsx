import { BottomNav } from '@/components/BottomNav';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex-grow pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
