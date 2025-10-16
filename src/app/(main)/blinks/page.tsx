'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, MoreVertical, Music, Camera } from 'lucide-react';

type Blink = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  videoUrl: string; // For now, we'll use an image placeholder
  description: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
};

const blinks: Blink[] = [
  {
    id: '1',
    user: {
      name: '@nawaf_dev',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    videoUrl: 'https://images.pexels.com/videos/3254013/free-video-3254013.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'أجواء خيالية في نيوم! #نيوم #السعودية',
    song: 'Original Sound - nawaf_dev',
    likes: 1250,
    comments: 23,
    shares: 45,
  },
  {
    id: '2',
    user: {
      name: '@travel_lover',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    },
    videoUrl: 'https://images.pexels.com/videos/857100/free-video-857100.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'استكشاف شوارع طوكيو ليلاً 🍜🏮',
    song: 'Tokyo Drift - Teriyaki Boyz',
    likes: 3400,
    comments: 112,
    shares: 250,
  },
    {
    id: '3',
    user: {
      name: '@food_critic',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    },
    videoUrl: 'https://images.pexels.com/videos/3773340/free-video-3773340.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'أسهل طريقة لعمل القهوة المختصة في البيت ☕️',
    song: 'Morning Coffee - Jazzy Tunes',
    likes: 876,
    comments: 55,
    shares: 98,
  },
];


const BlinkItem = ({ blink }: { blink: Blink }) => (
    <div className="relative h-full w-full snap-start flex-shrink-0">
        {/* In a real app, this would be a <video> element */}
        <img src={blink.videoUrl} alt={blink.description} className="h-full w-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end">
                {/* Left side: Video Info */}
                <div className="flex-grow space-y-2 text-white">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10 border-2">
                            <AvatarImage src={blink.user.avatar} alt={blink.user.name} />
                            <AvatarFallback>{blink.user.name.substring(1, 3)}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">{blink.user.name}</p>
                    </div>
                    <p className="text-sm">{blink.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                        <Music className="h-4 w-4" />
                        <p>{blink.song}</p>
                    </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="flex flex-col items-center gap-4 text-white">
                    <Button variant="ghost" size="icon" className="h-auto flex-col gap-1 p-0 text-white hover:bg-white/10 hover:text-white">
                        <Heart className="h-8 w-8" />
                        <span className="text-xs font-bold">{blink.likes > 1000 ? `${(blink.likes/1000).toFixed(1)}k` : blink.likes}</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-auto flex-col gap-1 p-0 text-white hover:bg-white/10 hover:text-white">
                        <MessageCircle className="h-8 w-8" />
                        <span className="text-xs font-bold">{blink.comments}</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-auto flex-col gap-1 p-0 text-white hover:bg-white/10 hover:text-white">
                        <Send className="h-8 w-8" />
                        <span className="text-xs font-bold">{blink.shares}</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-auto p-0 text-white hover:bg-white/10 hover:text-white mt-2">
                        <MoreVertical className="h-8 w-8" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-auto p-0 text-white hover:bg-white/10 hover:text-white mt-2">
                        <Camera className="h-8 w-8" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
);


export default function BlinksPage() {
  return (
    <div className="relative h-full w-full">
        <div className="absolute inset-0 h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {blinks.map((blink) => (
            <BlinkItem key={blink.id} blink={blink} />
            ))}
        </div>
    </div>
  );
}
