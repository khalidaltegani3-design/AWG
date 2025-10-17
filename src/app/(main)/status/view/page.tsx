
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreVertical, Send, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const users = {
  ahmed: {
    id: '1',
    name: 'أحمد خليل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    statuses: [
      { id: 's1', type: 'image', url: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg', duration: 5, timestamp: 'منذ 10 دقائق' },
      { id: 's2', type: 'image', url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg', duration: 5, timestamp: 'منذ 8 دقائق' },
    ],
  },
  fatima: {
    id: '2',
    name: 'فاطمة عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    statuses: [{ id: 's3', type: 'image', url: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg', duration: 5, timestamp: 'اليوم، 3:45 م' }],
  },
  mohammed: {
      id: '4',
      name: 'محمد علي',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
      statuses: [{ id: 's4', type: 'image', url: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg', duration: 5, timestamp: 'أمس، 9:01 م' }],
  }
};

function StatusViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userIdQuery = searchParams.get('user') as keyof typeof users;
  
  const [currentUser, setCurrentUser] = useState(users[userIdQuery] || Object.values(users)[0]);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reply, setReply] = useState('');

  const currentStatus = currentUser.statuses[currentStatusIndex];

  useEffect(() => {
    // Reset progress when status changes
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Go to next status or exit
          if (currentStatusIndex < currentUser.statuses.length - 1) {
            setCurrentStatusIndex(i => i + 1);
          } else {
            router.back();
          }
          return 100;
        }
        return prev + (100 / (currentStatus.duration * 10)); // Update every 100ms
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStatusIndex, currentUser, router, currentStatus.duration]);
  
  useEffect(() => {
      const user = users[userIdQuery];
      if (user) {
          setCurrentUser(user);
          setCurrentStatusIndex(0);
      } else {
          router.back();
      }
  }, [userIdQuery, router]);


  const goToNext = () => {
    if (currentStatusIndex < currentUser.statuses.length - 1) {
      setCurrentStatusIndex(prev => prev + 1);
    } else {
        router.back();
    }
  };

  const goToPrevious = () => {
    if (currentStatusIndex > 0) {
      setCurrentStatusIndex(prev => prev - 1);
    }
  };

  const handleReply = () => {
    if (!reply.trim()) return;

    // In a real app, this would send the reply to a server.
    // For now, we simulate it by navigating to the chat.
    router.push(`/chats/${currentUser.id}`);
    setReply('');
  }
  
  if (!currentUser || !currentStatus) {
    // Or a loading spinner
    return null;
  }

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col overflow-hidden">
        {/* Click handlers for next/prev */}
        <div className="absolute left-0 top-0 h-full w-1/3 z-20" onClick={goToPrevious}></div>
        <div className="absolute right-0 top-0 h-full w-1/3 z-20" onClick={goToNext}></div>

      {/* Media */}
      <div className="relative flex-grow">
        {currentStatus.type === 'image' && (
          <Image
            src={currentStatus.url}
            alt="Status"
            fill
            className="object-contain"
            priority
          />
        )}
        {/* Video type would be handled here */}
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/60 to-transparent">
        {/* Progress Bars */}
        <div className="flex gap-1 mb-3">
          {currentUser.statuses.map((status, index) => (
            <div key={status.id} className="relative w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{ width: `${index < currentStatusIndex ? 100 : (index === currentStatusIndex ? progress : 0)}%`}}
                />
            </div>
          ))}
        </div>
        
        {/* User Info */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-neutral-300">{currentStatus.timestamp}</p>
                </div>
            </div>

             <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <MoreVertical />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => router.back()}>
                    <X />
                </Button>
            </div>
        </div>
      </div>
      
      {/* Footer Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <Input 
                placeholder={`الرد على ${currentUser.name}...`}
                className="flex-grow rounded-full bg-black/50 border-white/30 text-white placeholder:text-neutral-300 focus:ring-offset-black focus:ring-white"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleReply() }}
            />
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={handleReply}>
              <Send />
            </Button>
        </div>
      </div>
    </div>
  );
}


export default function StatusViewPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
            <StatusViewContent />
        </Suspense>
    )
}
