'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { X, Music, FlipHorizontal, Gauge, Timer, Sparkles, GalleryVertical, UserSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


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

    // Cleanup function to stop the camera stream when the component unmounts
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [facingMode, toast]);

  const handleFlipCamera = () => {
      setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col">
      {/* Camera View */}
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

      {/* Top Controls */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="bg-black/30 hover:bg-black/50 rounded-full">
            <X className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="bg-black/30 hover:bg-black/50 rounded-full text-sm font-semibold h-10 px-4">
            <Music className="h-5 w-5 mr-2" />
            إضافة صوت
        </Button>
      </header>

      {/* Right Side Controls */}
      <aside className="absolute top-1/2 right-4 -translate-y-1/2 z-10 flex flex-col gap-4 bg-black/20 p-2 rounded-full">
        <CameraToolButton icon={FlipHorizontal} label="قلب" onClick={handleFlipCamera} />
        <SpeedControl onSelect={setSpeed} currentSpeed={speed} />
        <TimerControl onSelect={setTimer} currentTimer={timer} />
        <FilterControl onSelect={setActiveFilter} currentFilter={activeFilter} />
        <CameraToolButton icon={UserSquare} label="خلفية AI" onClick={() => setIsAiBackgroundActive(prev => !prev)} active={isAiBackgroundActive} />
      </aside>

      {/* Bottom Controls */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center p-6">
        <div className="flex items-center gap-16 w-full justify-center">
            <Button variant="outline" className="h-16 w-16 bg-black/30 border-white/50 hover:bg-black/50 p-0">
                <GalleryVertical className="h-8 w-8" />
            </Button>

            {/* Record Button */}
            <div className="relative flex items-center justify-center h-24 w-24">
                <button className="absolute h-20 w-20 bg-red-600 rounded-full border-4 border-white shadow-lg transition-transform active:scale-95" />
            </div>

            <div className="h-16 w-16" /> {/* Spacer to balance layout */}
        </div>
      </footer>
    </div>
  );
}
