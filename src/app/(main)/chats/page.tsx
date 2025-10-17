
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { Notifications } from '@/components/Notifications';

const chats = [
  {
    id: '1',
    name: 'أحمد خليل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    lastMessage: 'تمام، سأكون هناك في الوقت المحدد.',
    timestamp: '10:48 ص',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'فاطمة عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    lastMessage: 'شكرًا جزيلاً على المساعدة!',
    timestamp: '9:15 ص',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'مجموعة العمل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    lastMessage: 'نورة: لا تنسوا اجتماع الغد.',
    timestamp: 'أمس',
    unreadCount: 5,
  },
  {
    id: '4',
    name: 'محمد علي',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    lastMessage: 'أرسلت لك الملفات على البريد.',
    timestamp: 'أمس',
    unreadCount: 0,
  },
    {
    id: '5',
    name: 'سارة يوسف',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    lastMessage: 'عيد ميلاد سعيد! 🎂',
    timestamp: '15/07/2024',
    unreadCount: 0,
  },
];

const ChatItem = ({ chat }: { chat: (typeof chats)[0] }) => (
  <Link href={`/chats/${chat.id}`} className="w-full">
    <div className="flex items-center gap-4 p-3 hover:bg-muted transition-colors rounded-lg cursor-pointer">
      <Avatar className="h-12 w-12">
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{chat.name}</p>
        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
      </div>
      <div className="flex flex-col items-end text-xs text-muted-foreground gap-1">
        <p className={chat.unreadCount > 0 ? 'text-primary font-bold' : ''}>
          {chat.timestamp}
        </p>
        {chat.unreadCount > 0 && (
          <div className="flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold">
            {chat.unreadCount}
          </div>
        )}
      </div>
    </div>
  </Link>
);


export default function ChatsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
        <h1 className="text-2xl font-bold">المحادثات</h1>
        <div className="flex items-center gap-2">
            <Link href="/chats/new">
                <Button variant="ghost" size="icon" className="hover:bg-black/20">
                    <Plus className="h-6 w-6" />
                </Button>
            </Link>
            <Notifications />
        </div>
      </header>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="بحث..." className="w-full rounded-full bg-muted pl-10" />
        </div>
      </div>

      <div className="flex-grow px-2">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
