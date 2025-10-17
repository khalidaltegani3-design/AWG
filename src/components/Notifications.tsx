'use client';

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mockNotifications = [
    { type: 'like', user: { name: 'فاطمة', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' }, time: 'منذ 5 دقائق', postThumbnail: 'https://videos.pexels.com/video-files/3254013/3254013-thumb.jpg', href: '/blinks' },
    { type: 'comment', user: { name: 'محمد', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' }, time: 'منذ 15 دقيقة', comment: 'فيديو رائع!', postThumbnail: 'https://videos.pexels.com/video-files/3254013/3254013-thumb.jpg', href: '/blinks' },
    { type: 'follow', user: { name: 'سارة', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' }, time: 'منذ ساعة', href: '/profile' },
    { type: 'like', user: { name: 'علي', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' }, time: 'منذ 3 ساعات', postThumbnail: 'https://videos.pexels.com/video-files/857100/857100-thumb.jpg', href: '/blinks' },
];

const NotificationItem = ({ notification, onSelect }: { notification: typeof mockNotifications[0], onSelect: () => void }) => {
    let message = '';
    if (notification.type === 'like') {
        message = `أعجب ${notification.user.name} بالفيديو الخاص بك.`;
    } else if (notification.type === 'comment') {
        message = `${notification.user.name} علّق: "${notification.comment}"`;
    } else if (notification.type === 'follow') {
        message = `بدأ ${notification.user.name} بمتابعتك.`;
    }

    return (
        <DropdownMenuItem asChild>
            <Link href={notification.href} className="w-full" onClick={onSelect}>
                <div className="flex items-center gap-3 p-3">
                    <Avatar className="h-11 w-11">
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="text-sm text-white">{message}</p>
                        <p className="text-xs text-neutral-300">{notification.time}</p>
                    </div>
                    {notification.postThumbnail && (
                        <img src={notification.postThumbnail} alt="Post thumbnail" className="h-12 w-12 object-cover rounded-md" />
                    )}
                    {notification.type === 'follow' && (
                        <Button size="sm">متابعة</Button>
                    )}
                </div>
            </Link>
        </DropdownMenuItem>
    );
};


export function Notifications() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-black/20">
                    <Bell className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-[calc(100vw-32px)] max-w-sm p-2 bg-black/70 backdrop-blur-md border-white/20 text-white rounded-xl"
              align="end"
            >
                <div className="px-3 py-2">
                    <h3 className="text-lg font-semibold">الإشعارات</h3>
                </div>
                <ScrollArea className="h-[400px]">
                    <div className="divide-y divide-white/10">
                        {mockNotifications.map((notif, index) => (
                            <NotificationItem key={index} notification={notif} onSelect={() => setIsOpen(false)} />
                        ))}
                    </div>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
