
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { X, Crop, Smile, Type, Pen, Send } from 'lucide-react';
import Image from 'next/image';

const EditorToolButton = ({ icon: Icon, onClick }: { icon: React.ElementType, onClick?: () => void }) => (
    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={onClick}>
        <Icon className="h-6 w-6" />
    </Button>
);

export default function CreateStatusPage() {
  const router = useRouter();

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col">
      {/* Top Controls */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/50 to-transparent">
        <EditorToolButton icon={X} onClick={() => router.back()} />
        <div className="flex items-center gap-2">
            <EditorToolButton icon={Crop} />
            <EditorToolButton icon={Smile} />
            <EditorToolButton icon={Type} />
            <EditorToolButton icon={Pen} />
        </div>
      </header>

      {/* Media View Placeholder */}
      <div className="flex-grow flex items-center justify-center">
          <Image 
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Status media placeholder"
            layout="fill"
            objectFit="contain"
          />
      </div>

      {/* Bottom Controls */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <Input 
            placeholder="إضافة تعليق..." 
            className="flex-grow rounded-full bg-black/50 border-white/30 text-white placeholder:text-neutral-300 focus:ring-offset-black focus:ring-white" 
        />
        <Button size="icon" className="rounded-full bg-secondary h-12 w-12">
          <Send className="h-6 w-6" />
        </Button>
      </footer>
    </div>
  );
}
