
'use client';

import { ArrowLeft, MoreVertical, Paperclip, Phone, Send, Video, Image, MapPin, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRef, useEffect } from 'react';


const messages = [
  { id: '1', sender: 'other', text: 'أهلاً بك، كيف يمكنني مساعدتك اليوم؟', timestamp: '10:50 ص' },
  { id: '2', sender: 'me', text: 'أهلاً، أريد الاستفسار عن حالة الطلب رقم 5829', timestamp: '10:51 ص' },
  { id: '3', sender: 'other', text: 'بالتأكيد، لحظة من فضلك للتحقق.', timestamp: '10:51 ص' },
  { id: '4', sender: 'other', text: 'يظهر لدي أن الطلب في مرحلة الشحن حاليًا.', timestamp: '10:52 ص' },
  { id: '5', sender: 'me', text: 'ممتاز! متى من المتوقع أن يصل؟', timestamp: '10:53 ص' },
  { id: '6', sender: 'other', text: 'عادةً خلال 2-3 أيام عمل. سأرسل لك رابط التتبع.', timestamp: '10:53 ص' },
  { id: '7', sender: 'me', text: 'شكرًا جزيلاً لك على المساعدة السريعة! 👍', timestamp: '10:54 ص' },
];

const contact = {
  name: 'أحمد خليل',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  status: 'متصل الآن',
}

const ChatMessage = ({ message }: { message: (typeof messages)[0] }) => {
  const isMe = message.sender === 'me';
  return (
    <div className={cn("flex items-end gap-2", isMe ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        "max-w-xs md:max-w-md p-3 rounded-2xl",
        isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'
      )}>
        <p className="text-sm">{message.text}</p>
        <p className={cn("text-xs mt-1", isMe ? 'text-primary-foreground/70' : 'text-muted-foreground/70', 'text-left')}>{message.timestamp}</p>
      </div>
    </div>
  );
};


export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on initial load
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="flex items-center gap-3 p-3 border-b bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{contact.name}</p>
          <p className="text-xs text-muted-foreground">{contact.status}</p>
        </div>
        <div className="flex items-center">
            <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-grow bg-muted/40" ref={scrollAreaRef} viewportRef={viewportRef}>
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <footer className="flex items-center gap-2 p-3 border-t bg-background">
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-6 w-6 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 mb-2" side="top" align="center">
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-14 w-14 flex-col gap-1">
                        <Image className="h-6 w-6" />
                        <span className="text-xs">صورة</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 flex-col gap-1">
                        <MapPin className="h-6 w-6" />
                        <span className="text-xs">موقع</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 flex-col gap-1">
                        <FileText className="h-6 w-6" />
                        <span className="text-xs">ملف</span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
        
        <Input placeholder="اكتب رسالتك..." className="flex-grow rounded-full bg-muted" />
        <Button size="icon" className="rounded-full">
          <Send className="h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
}
