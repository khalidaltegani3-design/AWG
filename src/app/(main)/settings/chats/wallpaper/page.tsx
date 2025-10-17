'use client';

import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const defaultWallpapers = [
    '/wallpapers/1.jpg',
    '/wallpapers/2.jpg',
    '/wallpapers/3.jpg',
    '/wallpapers/4.jpg',
    '/wallpapers/5.jpg',
    '/wallpapers/6.jpg',
    '/wallpapers/7.jpg',
    '/wallpapers/8.jpg',
];

export default function WallpaperPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [currentWallpaper, setCurrentWallpaper] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedWallpaper = localStorage.getItem('chatWallpaper');
        if (savedWallpaper) {
            setCurrentWallpaper(savedWallpaper);
        }
    }, []);

    const handleSetWallpaper = (url: string) => {
        localStorage.setItem('chatWallpaper', url);
        setCurrentWallpaper(url);
        toast({
            title: "تم تغيير الخلفية",
            description: "تم تحديث خلفية المحادثات بنجاح.",
        });
        // We use window.dispatchEvent to notify other tabs/windows if any
        window.dispatchEvent(new Event('storage'));
    };
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                handleSetWallpaper(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChooseFromGallery = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">خلفية المحادثة</h1>
            </header>

            <div className="flex-grow p-4 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-3">المعاينة</h2>
                    <div className="relative aspect-[9/16] w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-muted border">
                        {currentWallpaper && (
                            <Image
                                src={currentWallpaper}
                                alt="Current wallpaper preview"
                                layout="fill"
                                objectFit="cover"
                            />
                        )}
                         <div className="absolute inset-0 flex flex-col p-4">
                            <div className="p-3 rounded-xl bg-muted w-fit self-start shadow-md">
                                <p className="text-sm">أهلاً بك</p>
                            </div>
                             <div className="p-3 rounded-xl bg-green-200 dark:bg-green-900 w-fit self-end mt-2 shadow-md">
                                <p className="text-sm">مرحباً! كيف حالك؟</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Button className="w-full" onClick={handleChooseFromGallery}>
                        <ImageIcon className="ml-2 h-5 w-5" />
                        تغيير من المعرض
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3">الخلفيات الافتراضية</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {defaultWallpapers.map((url) => (
                            <button key={url} onClick={() => handleSetWallpaper(url)} className="aspect-square rounded-md overflow-hidden relative border-2 border-transparent focus:border-primary focus:ring-2 focus:ring-primary outline-none">
                                <Image
                                    src={url}
                                    alt={`Wallpaper option`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
