
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowDownLeft, ArrowUpRight, Link2, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

type Call = {
  id: string;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  timestamp: string;
};

const calls: Call[] = [
  {
    id: '1',
    name: 'فاطمة عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    type: 'missed',
    callType: 'voice',
    timestamp: 'منذ 15 دقيقة',
  },
  {
    id: '2',
    name: 'أحمد خليل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    type: 'outgoing',
    callType: 'video',
    timestamp: 'منذ 4 ساعات',
  },
  {
    id: '3',
    name: 'محمد علي',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    type: 'incoming',
    callType: 'voice',
    timestamp: 'أمس، 8:22 م',
  },
  {
    id: '4',
    name: 'محمد علي',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    type: 'missed',
    callType: 'voice',
    timestamp: 'أمس، 6:01 م',
  },
    {
    id: '5',
    name: 'سارة يوسف',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    type: 'incoming',
    callType: 'video',
    timestamp: '15/07/2024',
  },
];

const CallStatusIcon = ({ type }: { type: Call['type'] }) => {
  const isMissed = type === 'missed';
  const Icon = type === 'outgoing' ? ArrowUpRight : ArrowDownLeft;
  return (
    <div className="flex items-center gap-1">
      <Icon className={cn('h-4 w-4', isMissed ? 'text-destructive' : 'text-muted-foreground')} />
      <span className={cn('text-sm', isMissed ? 'text-destructive' : 'text-muted-foreground')}>
        {type === 'incoming' && 'واردة'}
        {type === 'outgoing' && 'صادرة'}
        {type === 'missed' && 'لم يرد عليها'}
      </span>
    </div>
  );
};


const CallItem = ({ call }: { call: Call }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-muted transition-colors rounded-lg cursor-pointer">
      <Avatar className="h-12 w-12">
        <AvatarImage src={call.avatar} alt={call.name} />
        <AvatarFallback>{call.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className={cn("font-semibold", call.type === 'missed' && 'text-destructive')}>{call.name}</p>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <CallStatusIcon type={call.type} />
            <span>•</span>
            <span>{call.timestamp}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        {call.callType === 'voice' ? <Phone className="h-5 w-5 text-primary" /> : <Video className="h-5 w-5 text-primary" />}
      </Button>
    </div>
);


export default function CallsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold">المكالمات</h1>
        <Button variant="ghost" size="icon">
            <Phone className="h-6 w-6" />
        </Button>
      </header>
      
      <div className="p-2">
         <div className="flex items-center gap-4 p-3 hover:bg-muted transition-colors rounded-lg cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary">
                <Link2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-primary">إنشاء رابط مكالمة</p>
                <p className="text-sm text-muted-foreground">مشاركة رابط للانضمام إلى مكالمة</p>
            </div>
         </div>
      </div>

      <div className="flex-grow px-2">
        <h2 className="px-3 py-2 text-sm font-semibold text-muted-foreground">الأخيرة</h2>
        {calls.map((call) => (
          <CallItem key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
