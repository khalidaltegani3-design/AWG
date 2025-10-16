
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit, Plus } from 'lucide-react';

type Blink = {
  id: string;
  name: string;
  avatar: string;
  timestamp: string;
  seen: boolean;
};

const blinks: Blink[] = [
  {
    id: '1',
    name: 'أحمد خليل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: 'منذ 23 دقيقة',
    seen: false,
  },
  {
    id: '2',
    name: 'فاطمة عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    timestamp: 'منذ ساعة',
    seen: false,
  },
    {
    id: '3',
    name: 'محمد علي',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    timestamp: 'منذ 5 ساعات',
    seen: true,
  },
    {
    id: '4',
    name: 'سارة يوسف',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    timestamp: 'أمس',
    seen: true,
  },
];


const BlinkItem = ({ blink }: { blink: Blink }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-muted transition-colors rounded-lg cursor-pointer">
        <div className="relative">
             <Avatar className={`h-12 w-12 border-2 ${blink.seen ? 'border-muted' : 'border-secondary'}`}>
                <AvatarImage src={blink.avatar} alt={blink.name} />
                <AvatarFallback>{blink.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
        </div>
      <div className="flex-grow">
        <p className="font-semibold">{blink.name}</p>
        <p className="text-sm text-muted-foreground">{blink.timestamp}</p>
      </div>
    </div>
);


const MyBlink = () => (
     <div className="flex items-center gap-4 p-3 hover:bg-muted transition-colors rounded-lg cursor-pointer">
        <div className="relative">
             <Avatar className="h-12 w-12">
                <AvatarImage src="https://i.pravatar.cc/150?u=me" alt="My Blink" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
             <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-primary rounded-full border-2 border-background">
                <Plus className="h-4 w-4 text-primary-foreground" />
             </div>
        </div>
      <div className="flex-grow">
        <p className="font-semibold">حالتي</p>
        <p className="text-sm text-muted-foreground">إضافة إلى حالتي</p>
      </div>
    </div>
)


export default function BlinksPage() {
  const recentBlinks = blinks.filter(b => !b.seen);
  const viewedBlinks = blinks.filter(b => b.seen);

  return (
    <div className="flex flex-col h-full relative">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Blinks</h1>
      </header>

       <div className="flex-grow">
            <div className="p-2">
                <MyBlink />
            </div>

            {recentBlinks.length > 0 && (
                <div>
                    <h2 className="px-5 py-2 text-sm font-semibold text-muted-foreground">التحديثات الأخيرة</h2>
                    <div className="px-2">
                    {recentBlinks.map((blink) => (
                        <BlinkItem key={blink.id} blink={blink} />
                    ))}
                    </div>
                </div>
            )}

            {viewedBlinks.length > 0 && (
                 <div>
                    <h2 className="px-5 py-2 text-sm font-semibold text-muted-foreground">التحديثات التي تمت مشاهدتها</h2>
                    <div className="px-2">
                    {viewedBlinks.map((blink) => (
                        <BlinkItem key={blink.id} blink={blink} />
                    ))}
                    </div>
                </div>
            )}
       </div>

        <div className="absolute bottom-20 right-4 flex flex-col gap-3">
             <Button variant="secondary" size="icon" className="h-12 w-12 rounded-2xl shadow-lg">
                <Edit className="h-6 w-6" />
            </Button>
            <Button size="icon" className="h-14 w-14 rounded-2xl shadow-lg">
                <Camera className="h-7 w-7" />
            </Button>
        </div>
    </div>
  );
}
