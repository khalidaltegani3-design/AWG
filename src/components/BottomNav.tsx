'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone, PlaySquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/chats', icon: MessageCircle, label: 'المحادثات' },
  { href: '/calls', icon: Phone, label: 'المكالمات' },
  { href: '/blinks', icon: PlaySquare, label: 'Blinks' },
  { href: '/settings', icon: Settings, label: 'الإعدادات' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
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
