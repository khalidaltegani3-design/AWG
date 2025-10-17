
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const publicProfile = {
  name: 'Nawaf Al-Dev',
  username: '@nawaf_dev',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  bio: 'مطور تطبيقات | مهتم بالذكاء الاصطناعي وتقنيات الويب الحديثة. أشارك هنا رحلتي في بناء تطبيقات مبتكرة.',
  followers: '1.2M',
  following: '150',
  blinksCount: '25',
};

const userBlinks = [
  { id: 1, url: 'https://images.pexels.com/videos/3254013/free-video-3254013.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '15.2k', comments: '302' },
  { id: 2, url: 'https://images.pexels.com/videos/857100/free-video-857100.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '2.1k', comments: '88' },
  { id: 3, url: 'https://images.pexels.com/videos/3773340/free-video-3773340.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '5.6k', comments: '150' },
   { id: 4, url: 'https://images.pexels.com/videos/857100/free-video-857100.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '2.1k', comments: '88' },
];

const BlinkCard = ({ blink }: { blink: (typeof userBlinks)[0] }) => (
    <div className="relative group aspect-[9/16] bg-muted rounded-lg overflow-hidden">
        <img src={blink.url} className="w-full h-full object-cover" alt="Blink content"/>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-around">
                <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs font-bold">{blink.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-bold">{blink.comments}</span>
                </div>
            </div>
        </div>
    </div>
);


export default function PublicProfilePage() {
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(prev => !prev);
    }
  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center justify-between gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">{publicProfile.username}</h1>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-black/20">
                <MoreVertical className="h-6 w-6" />
            </Button>
        </header>

        <div className="p-6 text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                <AvatarImage src={publicProfile.avatar} alt={publicProfile.name} />
                <AvatarFallback>{publicProfile.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold">{publicProfile.name}</h2>
            </div>
            <p className="text-sm max-w-md mx-auto text-muted-foreground">{publicProfile.bio}</p>
        </div>

        <div className="flex justify-around p-3 border-y bg-muted/50">
            <div className="text-center">
                <p className="font-bold text-lg">{publicProfile.blinksCount}</p>
                <p className="text-sm text-muted-foreground">Blinks</p>
            </div>
             <div className="text-center">
                <p className="font-bold text-lg">{publicProfile.followers}</p>
                <p className="text-sm text-muted-foreground">متابعون</p>
            </div>
             <div className="text-center">
                <p className="font-bold text-lg">{publicProfile.following}</p>
                <p className="text-sm text-muted-foreground">أتابع</p>
            </div>
        </div>

        <div className="p-4">
            <Button 
              className="w-full" 
              variant={isFollowing ? 'secondary' : 'default'}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'إلغاء المتابعة' : 'متابعة'}
            </Button>
        </div>


        <Tabs defaultValue="blinks" className="flex-grow">
            <TabsList className="w-full justify-around rounded-none border-b">
                <TabsTrigger value="blinks" className="flex-1">الفيديوهات</TabsTrigger>
                <TabsTrigger value="liked" className="flex-1">أعجبني</TabsTrigger>
            </TabsList>
            <TabsContent value="blinks" className="p-2">
                <div className="grid grid-cols-3 gap-1">
                    {userBlinks.map(blink => <BlinkCard key={blink.id} blink={blink} />)}
                </div>
            </TabsContent>
            <TabsContent value="liked" className="p-2">
                 <div className="grid grid-cols-3 gap-1">
                    {userBlinks.slice(0, 2).map(blink => <BlinkCard key={blink.id} blink={blink} />)}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}

    