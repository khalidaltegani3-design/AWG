
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

const emojis = ['😀', '😂', '😍', '🤔', '🎉', '🔥', '👍', '🙏', '😎', '😢', '❤️', '💯'];
const colors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

export default function CreateStatusPage() {
  const router = useRouter();
  const [isCropping, setIsCropping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [drawingColor, setDrawingColor] = useState('#FFFFFF');
  const [stickers, setStickers] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const handleToggleCrop = () => setIsCropping(prev => !prev);
  const handleConfirmCrop = () => setIsCropping(false);
  const handleCancelCrop = () => setIsCropping(false);

  const handleToggleTyping = () => {
    setIsTyping(prev => !prev);
    if(isDrawing) setIsDrawing(false);
  }

  const handleToggleDrawing = () => {
    setIsDrawing(prev => !prev);
    if(isTyping) setIsTyping(false);
  }

  const addSticker = (emoji: string) => {
    setStickers(prev => [...prev, { id: Date.now(), emoji, x: 50, y: 50 }]);
  };


  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col overflow-hidden">
      {/* Top Controls */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/50 to-transparent">
        <EditorToolButton icon={X} onClick={() => router.back()} />
        
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
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                            <Smile className="h-6 w-6" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-auto bg-black/50 border-white/20 p-2 flex flex-wrap gap-2 max-w-[200px]">
                        {emojis.map(emoji => (
                            <button key={emoji} onClick={() => addSticker(emoji)} className="text-3xl hover:scale-110 transition-transform">
                                {emoji}
                            </button>
                        ))}
                    </PopoverContent>
                </Popover>
                <EditorToolButton icon={Type} onClick={handleToggleTyping} active={isTyping} />
                <EditorToolButton icon={Pen} onClick={handleToggleDrawing} active={isDrawing} />
            </div>
        )}
      </header>

      {isDrawing && (
        <div className="absolute top-16 right-4 z-20 flex flex-col gap-2 p-2 bg-black/50 rounded-lg">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setDrawingColor(color)}
              className={cn("w-6 h-6 rounded-full border-2 transition-transform", drawingColor === color ? 'border-white scale-110' : 'border-transparent')}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}


      {/* Media View Placeholder */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <Image 
                src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Status media placeholder"
                fill
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
            {/* Draggable stickers would go here */}
            {stickers.map(sticker => (
              <div key={sticker.id} className="absolute text-5xl" style={{ left: `${sticker.x}%`, top: `${sticker.y}%`, transform: 'translate(-50%, -50%)', cursor: 'move' }}>
                {sticker.emoji}
              </div>
            ))}

            {isTyping && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20" onClick={() => setIsTyping(false)}>
                  <textarea
                    className="bg-transparent text-center text-4xl font-bold w-full p-4 outline-none resize-none"
                    placeholder="اكتب شيئاً..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: textColor }}
                    autoFocus
                   />
              </div>
            )}
             {text && !isTyping && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center pointer-events-none" style={{ color: textColor }}>
                    {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
            )}
          </div>
      </div>

      {/* Bottom Controls */}
       {!isCropping && !isTyping && (
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
