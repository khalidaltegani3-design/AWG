'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MyStatus = () => (
    <div className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer">
        <div className="relative">
            <Avatar className="h-14 w-14">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="My Avatar" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background">
                <Camera className="h-4 w-4 text-primary-foreground" />
            </div>
        </div>
        <div>
            <p className="font-semibold text-lg">حالتي</p>
            <p className="text-muted-foreground">اضغط لإضافة حالة جديدة</p>
        </div>
    </div>
);

type Status = {
    id: string;
    name: string;
    avatar: string;
    timestamp: string;
    isViewed?: boolean;
};

const recentUpdates: Status[] = [
    { id: '1', name: 'أحمد خليل', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', timestamp: 'منذ 10 دقائق' },
    { id: '2', name: 'فاطمة عبدالله', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', timestamp: 'اليوم، 3:45 م' },
];

const viewedUpdates: Status[] = [
    { id: '3', name: 'محمد علي', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', timestamp: 'أمس، 9:01 م', isViewed: true },
];

const StatusItem = ({ status }: { status: Status }) => (
    <div className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer">
        <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500">
             <Avatar className={`h-14 w-14 border-2 ${status.isViewed ? 'border-muted' : 'border-background'}`}>
                <AvatarImage src={status.avatar} alt={status.name} />
                <AvatarFallback>{status.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
        </div>
       
        <div>
            <p className="font-semibold">{status.name}</p>
            <p className="text-sm text-muted-foreground">{status.timestamp}</p>
        </div>
    </div>
);

export default function StatusPage() {
  return (
    <div className="flex flex-col h-full relative">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
        <h1 className="text-2xl font-bold">الحالة</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <MyStatus />
        <Separator />
        
        <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
          التحديثات الأخيرة
        </div>
        {recentUpdates.map(status => <StatusItem key={status.id} status={status} />)}

        <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
          التحديثات التي تمت مشاهدتها
        </div>
        {viewedUpdates.map(status => <StatusItem key={status.id} status={status} />)}
      </div>

       <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-20">
            <Button size="icon" className="rounded-full h-12 w-12 bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90">
                <Camera className="h-6 w-6" />
            </Button>
      </div>
    </div>
  );
}
