
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Heart, MessageCircle, Send, MoreVertical, Music, Camera, Upload, Video, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Mock data that would normally come from another file or API
const mockChats = [
  {
    id: '1',
    name: 'أحمد خليل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: '2',
    name: 'فاطمة عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
  {
    id: '3',
    name: 'مجموعة العمل',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
  },
];


type Comment = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    likes: number;
    isLiked?: boolean;
}

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
  isLiked?: boolean;
  commentData: Comment[];
};

const initialBlinks: Blink[] = [
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
    isLiked: false,
    commentData: [
        { id: 'c1', user: { name: '@ali_gamer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' }, text: 'لقطة مذهلة!', likes: 5, isLiked: false},
        { id: 'c2', user: { name: '@sara_travels', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' }, text: 'أتمنى أزورها قريبًا', likes: 12, isLiked: true},
    ]
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
    isLiked: true,
    commentData: []
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
    isLiked: false,
    commentData: [
        { id: 'c3', user: { name: '@coffee_addict', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' }, text: 'شكرًا على الطريقة!', likes: 25, isLiked: false},
    ]
  },
];


const BlinkItem = ({ blink, onLike, onCommentClick }: { blink: Blink, onLike: (id: string) => void, onCommentClick: (blink: Blink) => void }) => (
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
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-auto flex-col gap-1 p-0 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => onLike(blink.id)}
                    >
                        <Heart className={cn("h-8 w-8", blink.isLiked && "fill-red-500 text-red-500")} />
                        <span className="text-xs font-bold">{blink.likes > 1000 ? `${(blink.likes/1000).toFixed(1)}k` : blink.likes}</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-auto flex-col gap-1 p-0 text-white hover:bg-white/10 hover:text-white" onClick={() => onCommentClick(blink)}>
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
                    <Link href="/blinks/create">
                        <Button variant="ghost" size="icon" className="h-auto p-0 text-white hover:bg-white/10 hover:text-white mt-2">
                           <Camera className="h-8 w-8" />
                       </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);


export default function BlinksPage() {
  const [blinks, setBlinks] = useState<Blink[]>(initialBlinks);
  const [selectedBlink, setSelectedBlink] = useState<Blink | null>(null);
  const [commentInputValue, setCommentInputValue] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isShareSheetOpen, setShareSheetOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleLike = (id: string) => {
    setBlinks(prevBlinks => 
        prevBlinks.map(blink => {
            if (blink.id === id) {
                const isLiked = !blink.isLiked;
                const likes = isLiked ? blink.likes + 1 : blink.likes - 1;
                return { ...blink, isLiked, likes };
            }
            return blink;
        })
    );
  };
  
  const handleLikeComment = (blinkId: string, commentId: string) => {
    setBlinks(prevBlinks =>
      prevBlinks.map(blink => {
        if (blink.id === blinkId) {
          return {
            ...blink,
            commentData: blink.commentData.map(comment => {
              if (comment.id === commentId) {
                const isLiked = !comment.isLiked;
                const likes = isLiked ? comment.likes + 1 : comment.likes - 1;
                return { ...comment, isLiked, likes };
              }
              return comment;
            }),
          };
        }
        return blink;
      })
    );
  };
  
  const handleCommentClick = (blink: Blink) => {
      setSelectedBlink(blink);
  }

  const handleSheetOpenChange = (open: boolean) => {
      if (!open) {
          setSelectedBlink(null);
          setReplyingTo(null);
      }
  }

  const handleSetReplyingTo = (username: string | null) => {
      setReplyingTo(username);
      if (username) {
          setCommentInputValue(`@${username.split('@')[1]} `);
          inputRef.current?.focus();
      } else {
          setCommentInputValue('');
      }
  }

  useEffect(() => {
    if (replyingTo && inputRef.current) {
        inputRef.current.focus();
    }
  }, [replyingTo])

  const handleShareClick = () => {
    if (!selectedBlink) return;
    setShareSheetOpen(true);
  }

  const handleSendShare = (chatName: string) => {
    toast({
      title: "تمت المشاركة!",
      description: `تم إرسال الفيديو إلى ${chatName}.`,
    });
    setShareSheetOpen(false);
  }


  return (
    <div className="relative h-full w-full">
        <div className="absolute inset-0 h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {blinks.map((blink) => (
                <BlinkItem key={blink.id} blink={blink} onLike={handleLike} onCommentClick={handleCommentClick} />
            ))}
        </div>
        <Sheet open={!!selectedBlink} onOpenChange={handleSheetOpenChange}>
            <SheetContent 
                side="bottom" 
                className="bg-black/80 backdrop-blur-sm text-white border-0 rounded-t-2xl h-[60%]"
                overlayClassName="bg-transparent"
                onInteractOutside={() => handleSetReplyingTo(null)}
                onEscapeKeyDown={() => handleSetReplyingTo(null)}
            >
                 <SheetHeader className="text-center mb-4">
                    <SheetTitle className="text-white mx-auto">{selectedBlink?.comments} تعليقًا</SheetTitle>
                    <button onClick={() => { handleSheetOpenChange(false); handleSetReplyingTo(null); }} className="absolute top-4 right-4 text-white">
                        <X className="h-5 w-5" />
                    </button>
                </SheetHeader>
                <ScrollArea className="h-[calc(100%-120px)] pr-4">
                    <div className="space-y-4">
                        {selectedBlink?.commentData.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={comment.user.avatar} />
                                    <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="text-xs text-neutral-400">{comment.user.name}</p>
                                    <p className="text-sm">{comment.text}</p>
                                     <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs text-neutral-400">منذ 5 ساعات</span>
                                        <button className="text-xs font-semibold text-neutral-300" onClick={() => handleSetReplyingTo(comment.user.name)}>رد</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <button onClick={() => selectedBlink && handleLikeComment(selectedBlink.id, comment.id)}>
                                        <Heart className={cn("h-4 w-4 text-neutral-400", comment.isLiked && "fill-red-500 text-red-500")} />
                                    </button>
                                    <span className="text-xs text-neutral-400">{comment.likes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                           <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                           <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <Input
                            ref={inputRef}
                            value={commentInputValue}
                            onChange={(e) => setCommentInputValue(e.target.value)}
                            placeholder={replyingTo ? `الرد على ${replyingTo}...` : "إضافة تعليق..."} 
                            className="flex-grow rounded-full bg-neutral-800 border-neutral-700 focus:ring-offset-black focus:ring-white" 
                        />
                        <Button size="icon" variant="ghost" className="rounded-full text-white" onClick={handleShareClick}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        
        {/* Share Sheet */}
        <Sheet open={isShareSheetOpen} onOpenChange={setShareSheetOpen}>
            <SheetContent side="bottom" className="bg-background rounded-t-2xl h-auto">
                <SheetHeader className="text-center mb-4">
                    <SheetTitle>مشاركة مع...</SheetTitle>
                     <button onClick={() => setShareSheetOpen(false)} className="absolute top-4 right-4 text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </SheetHeader>
                <ScrollArea className="h-[250px] pr-4">
                     <div className="space-y-2">
                        {mockChats.map(chat => (
                            <div key={chat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={chat.avatar} />
                                    <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <p className="flex-grow font-semibold">{chat.name}</p>
                                <Button size="sm" onClick={() => handleSendShare(chat.name)}>إرسال</Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    </div>
  );
}

    