
'use client';

import { ArrowLeft, MoreVertical, Paperclip, Phone, Send, Video, Image as ImageIcon, MapPin, FileText, PlaySquare, Mic, Trash2, Play, Pause, Square } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRef, useEffect, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


const initialMessages = [
  { id: '1', sender: 'other', type: 'text', text: 'أهلاً بك، كيف يمكنني مساعدتك اليوم؟', timestamp: '10:50 ص' },
  { id: '2', sender: 'me', type: 'text', text: 'أهلاً، أريد الاستفسار عن حالة الطلب رقم 5829', timestamp: '10:51 ص' },
  { 
    id: 'shared-blink', 
    sender: 'me', 
    type: 'sharedBlink',
    timestamp: '10:52 ص',
    blink: {
        videoUrl: 'https://images.pexels.com/videos/3254013/free-video-3254013.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        user: {
            name: '@nawaf_dev',
        }
    }
  },
  { id: '3', sender: 'other', type: 'text', text: 'بالتأكيد، لحظة من فضلك للتحقق.', timestamp: '10:51 ص' },
  { id: '4', sender: 'other', type: 'text', text: 'يظهر لدي أن الطلب في مرحلة الشحن حاليًا.', timestamp: '10:52 ص' },
  { id: '5', sender: 'me', type: 'text', text: 'ممتاز! متى من المتوقع أن يصل؟', timestamp: '10:53 ص' },
  { id: '6', sender: 'other', type: 'text', text: 'عادةً خلال 2-3 أيام عمل. سأرسل لك رابط التتبع.', timestamp: '10:53 ص' },
  { id: '7', sender: 'me', type: 'text', text: 'شكرًا جزيلاً لك على المساعدة السريعة! 👍', timestamp: '10:54 ص' },
];

const contact = {
  name: 'أحمد خليل',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  status: 'متصل الآن',
}

const SharedBlinkMessage = ({ message }: { message: any }) => (
    <div className="relative w-48 h-64 rounded-lg overflow-hidden group">
        <Link href="/blinks" className="absolute inset-0">
            <NextImage 
                src={message.blink.videoUrl}
                alt="Shared Blink"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col justify-between p-2 text-white">
                <p className="text-xs font-bold">{message.blink.user.name}</p>
                 <div className="self-center">
                    <PlaySquare className="h-8 w-8 text-white/80" />
                </div>
                <p className="text-xs">مشاركة من رمشات</p>
            </div>
        </Link>
    </div>
);

const AudioMessage = ({ message, isMe }: { message: any, isMe: boolean }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio.duration > 0) {
              setProgress((audio.currentTime / audio.duration) * 100);
            }
        };
        const handleDurationChange = () => {
            if (audio.duration !== Infinity) {
              setDuration(audio.duration);
            }
        };
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        }

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        
        // Sometimes durationchange doesn't fire, especially for blob URLs.
        if (audio.readyState > 0 && audio.duration !== Infinity) {
           setDuration(audio.duration);
        }


        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
        }
    }, [audioRef.current?.src]) // Re-run when src changes

    const formatTime = (time: number) => {
        if (isNaN(time) || time === Infinity) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <div className="flex items-center gap-3 w-60">
            <audio ref={audioRef} src={message.audioUrl} preload="metadata" />
            <Button onClick={togglePlay} size="icon" variant="ghost" className={cn("rounded-full flex-shrink-0 h-10 w-10", isMe ? 'text-primary-foreground hover:bg-white/20' : 'text-foreground')}>
                {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5" />}
            </Button>
            <div className="flex-grow flex items-center gap-2">
                 <div className={cn("w-full h-1 rounded-full", isMe ? 'bg-primary-foreground/30' : 'bg-muted-foreground/30')}>
                    <div className={cn("h-1 rounded-full", isMe ? 'bg-white' : 'bg-primary')} style={{ width: `${progress}%` }}></div>
                </div>
                <span className={cn("text-xs", isMe ? 'text-primary-foreground/70' : 'text-muted-foreground/70')}>{formatTime(duration)}</span>
            </div>
        </div>
    )
}


const ChatMessage = ({ message }: { message: any }) => {
  const isMe = message.sender === 'me';

  const renderContent = () => {
      switch (message.type) {
          case 'text':
              return <p className="text-sm">{message.text}</p>;
          case 'sharedBlink':
              return <SharedBlinkMessage message={message} />;
          case 'audio':
              return <AudioMessage message={message} isMe={isMe} />
          default:
              return null;
      }
  }

  return (
    <div className={cn("flex items-end gap-2", isMe ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        "max-w-xs md:max-w-md rounded-2xl",
        isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm',
        message.type === 'text' ? 'p-3' : 'p-1'
      )}>
        <div className={cn(message.type === 'text' ? '' : 'pb-1')}>
          {renderContent()}
        </div>
        <p className={cn(
            "text-xs mt-1", 
            isMe ? 'text-primary-foreground/70' : 'text-muted-foreground/70', 
            'text-left px-2'
        )}>
            {message.timestamp}
        </p>
      </div>
    </div>
  );
};

const Recorder = ({ onRecordingComplete, onCancel }: { onRecordingComplete: (blob: Blob) => void, onCancel: () => void }) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const startRecording = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    onRecordingComplete(audioBlob);
                    stream.getTracks().forEach(track => track.stop()); // Stop the stream
                };

                mediaRecorderRef.current.start();
                
                timerIntervalRef.current = setInterval(() => {
                    setRecordingTime(prevTime => prevTime + 1);
                }, 1000);

            } catch (error) {
                console.error("Error accessing microphone:", error);
                toast({
                    variant: 'destructive',
                    title: "خطأ في الوصول للميكروفون",
                    description: "الرجاء السماح بالوصول إلى الميكروفون في إعدادات المتصفح."
                });
                onCancel();
            }
        };
        startRecording();

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
                mediaRecorderRef.current.stop();
            }
        };
    }, [onCancel, onRecordingComplete, toast]);

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
             if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            setRecordingTime(0);
        }
    };
    
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-grow flex items-center justify-between h-10 rounded-full bg-muted px-3 gap-2">
            <Mic className="text-destructive animate-pulse h-5 w-5" />
            <span className="text-sm font-mono text-muted-foreground">{formatTime(recordingTime)}</span>
            <Button variant="ghost" size="icon" onClick={stopRecording}>
                <Send className="h-5 w-5 text-primary" />
            </Button>
        </div>
    );
};


export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [mode, setMode] = useState<'text' | 'recording'>('text');
  const [audioPreview, setAudioPreview] = useState<Blob | null>(null);
  
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  const addAudioMessage = (blob: Blob) => {
    if (blob.size > 0) {
      setAudioPreview(blob);
    }
    setMode('text');
  };

  const sendAudioMessage = () => {
    if (!audioPreview) return;
    const url = URL.createObjectURL(audioPreview);
    const newMessage = {
        id: `audio-${Date.now()}`,
        sender: 'me',
        type: 'audio',
        audioUrl: url,
        timestamp: new Intl.DateTimeFormat('ar', { hour: 'numeric', minute: 'numeric' }).format(new Date()),
    };
    setMessages(prev => [...prev, newMessage]);
    setAudioPreview(null);
  }

  const handleSendMessage = () => {
    if (message.trim()) {
        const newMessage = {
            id: `text-${Date.now()}`,
            sender: 'me',
            type: 'text',
            text: message,
            timestamp: new Intl.DateTimeFormat('ar', { hour: 'numeric', minute: 'numeric' }).format(new Date()),
        };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };
  
  useEffect(() => {
      const storedWallpaper = sessionStorage.getItem('chat-wallpaper');
      if (storedWallpaper) {
          setWallpaper(storedWallpaper);
      }
  }, []);

  const handleMicClick = () => {
    if (mode === 'text' && !message.trim()) {
      setMode('recording');
    } else {
      handleSendMessage();
    }
  }

  const renderFooterContent = () => {
    if (mode === 'recording') {
        return (
            <>
                <Recorder onRecordingComplete={addAudioMessage} onCancel={() => setMode('text')} />
                <Button variant="ghost" size="icon" onClick={() => setMode('text')}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
            </>
        );
    }

    if (audioPreview) {
        return (
            <>
                <Button variant="ghost" size="icon" onClick={() => setAudioPreview(null)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
                 <div className="flex-grow">
                     <AudioMessage message={{ audioUrl: URL.createObjectURL(audioPreview) }} isMe={true} />
                 </div>
                 <Button size="icon" className="rounded-full flex-shrink-0" onClick={sendAudioMessage}>
                    <Send className="h-5 w-5" />
                </Button>
            </>
        );
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 mb-2" side="top" align="center">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 flex-col gap-1">
                            <ImageIcon className="h-6 w-6" />
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
            
            <div className="flex-grow flex items-center h-10 rounded-full bg-muted px-3">
                <Input 
                    placeholder="اكتب رسالتك..." 
                    className="flex-grow rounded-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full p-0"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
            </div>

            <Button 
                size="icon" 
                className="rounded-full flex-shrink-0" 
                onClick={handleMicClick}
            >
                {message.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
        </>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-3 p-3 border-b bg-primary text-primary-foreground sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{contact.name}</p>
          <p className="text-xs text-primary-foreground/80">{contact.status}</p>
        </div>
        <div className="flex items-center">
            <Button variant="ghost" size="icon" className="hover:bg-black/20">
                <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-black/20">
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-black/20">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </header>

        <div className="flex-grow relative">
            {wallpaper && (
                <NextImage
                    src={wallpaper}
                    alt="Chat background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20 dark:opacity-10"
                />
            )}
            <ScrollArea className="absolute inset-0" viewportRef={viewportRef}>
                <div className="p-4 space-y-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                </div>
            </ScrollArea>
        </div>

      <footer className="flex items-center gap-2 p-3 border-t bg-background">
        {renderFooterContent()}
      </footer>
    </div>
  );
}
