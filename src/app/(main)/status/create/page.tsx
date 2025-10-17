
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { X, Crop, Smile, Type, Pen, Send, Check, Undo2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const EditorToolButton = ({ icon: Icon, onClick, active }: { icon: React.ElementType, onClick?: () => void, active?: boolean }) => (
    <Button variant="ghost" size="icon" className={cn("text-white hover:bg-black/20", active && "bg-black/40")} onClick={onClick}>
        <Icon className="h-6 w-6" />
    </Button>
);

export default function CreateStatusPage() {
  const router = useRouter();
  const [isCropping, setIsCropping] = useState(false);

  const handleToggleCrop = () => setIsCropping(prev => !prev);
  const handleConfirmCrop = () => setIsCropping(false);
  const handleCancelCrop = () => setIsCropping(false);


  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col">
      {/* Top Controls */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/50 to-transparent">
        <EditorToolButton icon={X} onClick={() => !isCropping && router.back()} />
        
        {isCropping ? (
            <div className="flex items-center gap-2">
                <EditorToolButton icon={Undo2} onClick={handleCancelCrop} />
                <Button onClick={handleConfirmCrop} size="sm" className="bg-white text-black hover:bg-neutral-200">
                    <Check className="h-5 w-5 ml-1" />
                    تم
                </Button>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <EditorToolButton icon={Crop} onClick={handleToggleCrop} active={isCropping} />
                <EditorToolButton icon={Smile} />
                <EditorToolButton icon={Type} />
                <EditorToolButton icon={Pen} />
            </div>
        )}
      </header>

      {/* Media View Placeholder */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <Image 
                src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Status media placeholder"
                layout="fill"
                objectFit="contain"
            />
            {isCropping && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full border-4 border-dashed border-white/80 animate-pulse">
                         <div className="absolute -top-1 -left-1 h-3 w-3 bg-white rounded-full" />
                         <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full" />
                         <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-white rounded-full" />
                         <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-white rounded-full" />
                    </div>
                </div>
            )}
          </div>
      </div>

      {/* Bottom Controls */}
       {!isCropping && (
         <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <Input 
                placeholder="إضافة تعليق..." 
                className="flex-grow rounded-full bg-black/50 border-white/30 text-white placeholder:text-neutral-300 focus:ring-offset-black focus:ring-white" 
            />
            <Button size="icon" className="rounded-full bg-secondary h-12 w-12">
            <Send className="h-6 w-6" />
            </Button>
        </footer>
       )}
    </div>
  );
}


    