'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { X, Music, FlipHorizontal, Gauge, Timer, Sparkles, GalleryVertical } from 'lucide-react';

const CameraToolButton = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <Button variant="ghost" className="flex flex-col items-center h-auto text-white hover:bg-black/20 p-2">
        <Icon className="h-7 w-7" />
        <span className="text-xs mt-1">{label}</span>
    </Button>
);

export default function CreateBlinkPage() {
  const router = useRouter();

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col">
      {/* Camera View Placeholder */}
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          <p className="text-neutral-600">Camera View</p>
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
        <CameraToolButton icon={FlipHorizontal} label="قلب" />
        <CameraToolButton icon={Gauge} label="السرعة" />
        <CameraToolButton icon={Timer} label="المؤقت" />
        <CameraToolButton icon={Sparkles} label="المؤثرات" />
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
