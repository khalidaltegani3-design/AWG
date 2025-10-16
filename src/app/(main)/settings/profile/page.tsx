'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Heart, MessageCircle, Globe, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const userProfile = {
  name: 'Nawaf Al-Dev',
  username: '@nawaf_dev',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  bio: 'مطور تطبيقات | مهتم بالذكاء الاصطناعي وتقنيات الويب الحديثة. أشارك هنا رحلتي في بناء تطبيقات مبتكرة.',
  followers: '1.2M',
  following: '150',
  blinksCount: '25',
};

const userBlinks = [
  { id: 1, url: 'https://images.pexels.com/videos/3254013/free-video-3254013.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '15.2k', comments: '302', isPublic: true },
  { id: 2, url: 'https://images.pexels.com/videos/857100/free-video-857100.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '2.1k', comments: '88', isPublic: true },
  { id: 3, url: 'https://images.pexels.com/videos/3773340/free-video-3773340.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', likes: '5.6k', comments: '150', isPublic: false },
  // Add more blinks as needed
];

const BlinkCard = ({ blink }: { blink: (typeof userBlinks)[0] }) => (
    <div className="relative group aspect-[9/16] bg-muted rounded-lg overflow-hidden">
        <img src={blink.url} className="w-full h-full object-cover" alt="Blink content"/>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute top-2 right-2 flex items-center gap-2 p-1.5 rounded-full bg-black/40 text-white">
            <Label htmlFor={`privacy-${blink.id}`} className="text-xs cursor-pointer">{blink.isPublic ? 'عام' : 'خاص'}</Label>
            <Switch id={`privacy-${blink.id}`} defaultChecked={blink.isPublic} className="h-4 w-7 [&>span]:h-3 [&>span]:w-3 [&>span[data-state=checked]]:translate-x-3"/>
            {blink.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" /> }
        </div>

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


export default function ProfilePage() {
    const router = useRouter();
  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-background sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">القناة</h1>
        </header>

        <div className="p-6 text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-muted-foreground">{userProfile.username}</p>
            </div>
            <p className="text-sm max-w-md mx-auto">{userProfile.bio}</p>
            <Button variant="outline">
                <Edit className="ml-2 h-4 w-4"/>
                تعديل الملف الشخصي
            </Button>
        </div>

        <div className="flex justify-around p-3 border-y bg-muted/50">
            <div className="text-center">
                <p className="font-bold text-lg">{userProfile.blinksCount}</p>
                <p className="text-sm text-muted-foreground">Blinks</p>
            </div>
             <div className="text-center">
                <p className="font-bold text-lg">{userProfile.followers}</p>
                <p className="text-sm text-muted-foreground">متابعون</p>
            </div>
             <div className="text-center">
                <p className="font-bold text-lg">{userProfile.following}</p>
                <p className="text-sm text-muted-foreground">أتابع</p>
            </div>
        </div>

        <Tabs defaultValue="blinks" className="flex-grow">
            <TabsList className="w-full justify-around rounded-none border-b">
                <TabsTrigger value="blinks" className="flex-1">الفيديوهات</TabsTrigger>
                <TabsTrigger value="private" className="flex-1">الخاصة</TabsTrigger>
            </TabsList>
            <TabsContent value="blinks" className="p-2">
                <div className="grid grid-cols-3 gap-1">
                    {userBlinks.filter(b => b.isPublic).map(blink => <BlinkCard key={blink.id} blink={blink} />)}
                </div>
            </TabsContent>
            <TabsContent value="private" className="p-2">
                <div className="grid grid-cols-3 gap-1">
                    {userBlinks.filter(b => !b.isPublic).map(blink => <BlinkCard key={blink.id} blink={blink} />)}
                </div>
                 <div className="text-center p-8 text-muted-foreground">
                    <Lock className="mx-auto h-8 w-8 mb-2" />
                    <p className="font-bold">الفيديوهات هنا خاصة</p>
                    <p className="text-sm">فقط أنت من يمكنه رؤية هذه الفيديوهات.</p>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
