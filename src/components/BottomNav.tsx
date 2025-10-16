'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone, PlaySquare, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navItems = [
  { href: '/chats', icon: MessageCircle, label: 'المحادثات' },
  { href: '/calls', icon: Phone, label: 'المكالمات' },
  null, // Placeholder for the Plus button
  { href: '/blinks', icon: PlaySquare, label: 'Blinks' },
  { href: '/settings', icon: Settings, label: 'الإعدادات' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 max-w-md w-full h-16 bg-background border-t">
      <div className="grid grid-cols-5 items-center h-full mx-auto">
        {navItems.map((item, index) => {
          if (item === null) {
            return (
              <div key={index} className="flex justify-center items-center">
                 <Button size="lg" className="rounded-full w-14 h-14 -translate-y-4 shadow-lg">
                    <Plus className="w-6 h-6" />
                </Button>
              </div>
            )
          }

          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="flex justify-center">
              <div
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
