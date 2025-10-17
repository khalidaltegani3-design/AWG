'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';

const mockNotifications = [
    { type: 'like', user: { name: 'فاطمة', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' }, time: 'منذ 5 دقائق', postThumbnail: 'https://videos.pexels.com/video-files/3254013/3254013-thumb.jpg', href: '/blinks' },
    { type: 'comment', user: { name: 'محمد', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' }, time: 'منذ 15 دقيقة', comment: 'فيديو رائع!', postThumbnail: 'https://videos.pexels.com/video-files/3254013/3254013-thumb.jpg', href: '/blinks' },
    { type: 'follow', user: { name: 'سارة', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' }, time: 'منذ ساعة', href: '/profile' },
    { type: 'like', user: { name: 'علي', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' }, time: 'منذ 3 ساعات', postThumbnail: 'https://videos.pexels.com/video-files/857100/857100-thumb.jpg', href: '/blinks' },
];

const NotificationItem = ({ notification }: { notification: typeof mockNotifications[0] }) => {
    let message = '';
    if (notification.type === 'like') {
        message = `أعجب ${notification.user.name} بالفيديو الخاص بك.`;
    } else if (notification.type === 'comment') {
        message = `${notification.user.name} علّق: "${notification.comment}"`;
    } else if (notification.type === 'follow') {
        message = `بدأ ${notification.user.name} بمتابعتك.`;
    }

    return (
        <Link href={notification.href} className="w-full">
            <div className="flex items-center gap-3 p-3 hover:bg-muted">
                <Avatar className="h-11 w-11">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <p className="text-sm">{message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                {notification.postThumbnail && (
                    <img src={notification.postThumbnail} alt="Post thumbnail" className="h-12 w-12 object-cover rounded-md" />
                )}
                {notification.type === 'follow' && (
                    <Button size="sm">متابعة</Button>
                )}
            </div>
        </Link>
    );
};


export function Notifications() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Bell className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>الإشعارات</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100%-4rem)] -mx-6">
                    <div className="divide-y">
                        {mockNotifications.map((notif, index) => (
                            <NotificationItem key={index} notification={notif} />
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
