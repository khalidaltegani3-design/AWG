'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { X, Music, FlipHorizontal, Gauge, Timer, Sparkles, UserSquare, Search, Play, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const mockSounds = [
    { id: 1, title: "الصوت الأصلي", artist: "nawaf_dev", duration: "0:15", cover: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { id: 2, title: "Tokyo Drift", artist: "Teriyaki Boyz", duration: "2:05", cover: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { id: 3, title: "Morning Coffee", artist: "Jazzy Tunes", duration: "3:10", cover: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
    { id: 4, title: "Desert Dreams", artist: "Oasis Vibes", duration: "1:45", cover: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
];


const CameraToolButton = ({ icon: Icon, label, onClick, active }: { icon: React.ElementType, label: string, onClick?: () => void, active?: boolean }) => (
    <Button variant="ghost" className={cn("flex flex-col items-center h-auto text-white hover:bg-black/20 p-2", active && "text-secondary")} onClick={onClick}>
        <Icon className="h-7 w-7" />
        <span className="text-xs mt-1">{label}</span>
    </Button>
);

const SpeedControl = ({ onSelect, currentSpeed }: { onSelect: (speed: number) => void, currentSpeed: number }) => {
    const speeds = [0.5, 1, 2];
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className={cn("flex flex-col items-center h-auto text-white hover:bg-black/20 p-2", currentSpeed !== 1 && 'text-secondary')}>
                    <Gauge className="h-7 w-7" />
                    <span className="text-xs mt-1">السرعة</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-auto p-2 bg-black/50 border-white/20 text-white flex flex-col gap-2">
                {speeds.map(speed => (
                    <Button key={speed} variant={currentSpeed === speed ? 'secondary' : 'ghost'} onClick={() => onSelect(speed)}>
                        {speed}x
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    )
};

const TimerControl = ({ onSelect, currentTimer }: { onSelect: (timer: number) => void, currentTimer: number }) => {
    const timers = [3, 10];
    return (
        <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" className={cn("flex flex-col items-center h-auto text-white hover:bg-black/20 p-2", currentTimer > 0 && 'text-secondary')}>
                    <Timer className="h-7 w-7" />
                    <span className="text-xs mt-1">المؤقت</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-auto p-2 bg-black/50 border-white/20 text-white flex flex-col gap-2">
                 <Button variant={currentTimer === 0 ? 'secondary' : 'ghost'} onClick={() => onSelect(0)}>إيقاف</Button>
                {timers.map(time => (
                    <Button key={time} variant={currentTimer === time ? 'secondary' : 'ghost'} onClick={() => onSelect(time)}>
                        {time} ثانية
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    )
};

const filters = [
    { name: 'بدون', class: 'filter-none' },
    { name: 'أبيض وأسود', class: 'filter-grayscale' },
    { name: 'بني داكن', class: 'filter-sepia' },
    { name: 'مُشبَّع', class: 'filter-saturate' },
    { name: 'عتيق', class: 'filter-vintage' },
    { name: 'معكوس', class: 'filter-invert' },
];

const FilterControl = ({ onSelect, currentFilter }: { onSelect: (filterClass: string) => void, currentFilter: string }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className={cn("flex flex-col items-center h-auto text-white hover:bg-black/20 p-2", currentFilter !== 'filter-none' && 'text-secondary')}>
                    <Sparkles className="h-7 w-7" />
                    <span className="text-xs mt-1">المؤثرات</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-auto p-2 bg-black/50 border-white/20 text-white grid grid-cols-3 gap-2">
                {filters.map(filter => (
                    <Button 
                        key={filter.class} 
                        variant={currentFilter === filter.class ? 'secondary' : 'ghost'} 
                        onClick={() => onSelect(filter.class)}
                        className="flex flex-col h-auto text-xs p-2"
                    >
                         <div className={cn("w-12 h-12 rounded-md mb-1", filter.class)} style={{ backgroundImage: 'url(https://i.pravatar.cc/150?u=a042581f4e29026704d)', backgroundSize: 'cover' }}></div>
                        {filter.name}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    )
}

export default function CreateBlinkPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [speed, setSpeed] = useState(1);
  const [timer, setTimer] = useState(0);
  const [activeFilter, setActiveFilter] = useState('filter-none');
  const [isAiBackgroundActive, setIsAiBackgroundActive] = useState(false);
  const [selectedSound, setSelectedSound] = useState<typeof mockSounds[0] | null>(null);
  const [isSoundPopoverOpen, setIsSoundPopoverOpen] = useState(false);
  const { toast } = useToast();

    useEffect(() => {
    let stream: MediaStream;
    
    const getCameraPermission = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'لم يتم العثور على كاميرا',
          description: 'الرجاء تمكين أذونات الكاميرا في متصفحك لاستخدام هذه الميزة.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [facingMode, toast]);

  const handleFlipCamera = () => {
      setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }

  const handleSelectSound = (sound: typeof mockSounds[0]) => {
      setSelectedSound(sound);
      setIsSoundPopoverOpen(false);
      toast({
          title: "تم اختيار الصوت",
          description: `تم اختيار "${sound.title}"`,
      });
  }

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col">
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            <video ref={videoRef} className={cn("w-full h-full object-cover", activeFilter)} autoPlay muted playsInline />
            {!hasCameraPermission && (
                 <div className="absolute z-20 p-4">
                    <Alert variant="destructive">
                      <AlertTitle>الكاميرا غير متاحة</AlertTitle>
                      <AlertDescription>
                        يرجى السماح بالوصول إلى الكاميرا في إعدادات المتصفح.
                      </AlertDescription>
                    </Alert>
                </div>
            )}
      </div>

      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="bg-black/30 hover:bg-black/50 rounded-full">
            <X className="h-6 w-6" />
        </Button>
        <Popover open={isSoundPopoverOpen} onOpenChange={setIsSoundPopoverOpen}>
            <PopoverTrigger asChild>
                 <Button variant="ghost" className="bg-black/30 hover:bg-black/50 rounded-full text-sm font-semibold h-10 px-4 max-w-[200px] truncate">
                    <Music className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="truncate">{selectedSound?.title || 'إضافة صوت'}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="center" className="w-[calc(100vw-32px)] max-w-sm p-2 bg-black/70 backdrop-blur-md border-white/20 text-white rounded-xl">
                <div className="relative my-2">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <Input placeholder="البحث في SoundCloud..." className="bg-neutral-800 border-neutral-700 rounded-full pl-4 pr-10 focus:ring-offset-black focus:ring-white" />
                </div>
                <div className="max-h-[300px] overflow-y-auto space-y-1">
                    {mockSounds.map(sound => (
                        <div key={sound.id} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg">
                            <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                <Image src={sound.cover} alt={sound.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white rounded-full bg-black/40 hover:bg-black/60">
                                        <Play className="h-4 w-4 fill-white"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-semibold text-sm truncate">{sound.title}</p>
                                <p className="text-xs text-neutral-400 truncate">{sound.artist}</p>
                            </div>
                            <Button size="sm" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs px-3" onClick={() => handleSelectSound(sound)}>
                                <Check className="h-4 w-4 ml-1" />
                                اختيار
                            </Button>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
      </header>

      <aside className="absolute top-1/2 right-4 -translate-y-1/2 z-10 flex flex-col gap-4 bg-black/20 p-2 rounded-full">
        <CameraToolButton icon={FlipHorizontal} label="قلب" onClick={handleFlipCamera} />
        <SpeedControl onSelect={setSpeed} currentSpeed={speed} />
        <TimerControl onSelect={setTimer} currentTimer={timer} />
        <FilterControl onSelect={setActiveFilter} currentFilter={activeFilter} />
        <CameraToolButton icon={UserSquare} label="خلفية AI" onClick={() => setIsAiBackgroundActive(prev => !prev)} active={isAiBackgroundActive} />
      </aside>

      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center p-6">
        <div className="flex items-center gap-16 w-full justify-center">
            <Button variant="outline" className="h-16 w-16 bg-black/30 border-white/50 hover:bg-black/50 p-0">
                GalleryVertical className="h-8 w-8" />
            </Button>

            <div className="relative flex items-center justify-center h-24 w-24">
                <button className="absolute h-20 w-20 bg-red-600 rounded-full border-4 border-white shadow-lg transition-transform active:scale-95" />
            </div>

            <div className="h-16 w-16" />
        </div>
      </footer>
    </div>
  );
}
