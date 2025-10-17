'use client';

import { ArrowLeft, Sun, Moon, Laptop, Wallpaper, Download, Archive, Eraser, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const SettingsActionItem = ({ icon: Icon, title, description, actionText, href }: { icon: React.ElementType; title: string; description?: string; actionText: string; href?: string; }) => (
    <div className="flex items-center gap-6 p-4">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div className="flex-grow">
        <p className="text-lg">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {href ? (
          <Link href={href}>
             <Button variant="ghost">{actionText}</Button>
          </Link>
      ) : (
        <Button variant="ghost">{actionText}</Button>
      )}
    </div>
);

const SettingsToggleItem = ({ title, description, checked, onCheckedChange }: { title: string; description: string; checked: boolean; onCheckedChange: (checked: boolean) => void; }) => (
    <div className="flex items-center justify-between p-4">
        <div>
            <p className="text-lg">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
);


export default function ChatSettingsPage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [enterIsSend, setEnterIsSend] = useState(true);
    const [mediaVisibility, setMediaVisibility] = useState(true);

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">المحادثات</h1>
        </header>
        
        <div className="flex-grow divide-y overflow-y-auto">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-4">العرض</h3>
                <div className="space-y-4">
                    <RadioGroup value={theme} onValueChange={(v) => setTheme(v)}>
                        <Label className="text-base">السمة</Label>
                        <div className="flex justify-around pt-2">
                             <Label htmlFor="theme-light" className="flex flex-col items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                                <div className="p-2 border-2 rounded-lg data-[state=checked]:border-primary">
                                    <Sun className="h-8 w-8" />
                                </div>
                                <span>فاتح</span>
                            </Label>
                             <Label htmlFor="theme-dark" className="flex flex-col items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                                <div className="p-2 border-2 rounded-lg data-[state=checked]:border-primary">
                                    <Moon className="h-8 w-8" />
                                </div>
                                <span>داكن</span>
                            </Label>
                             <Label htmlFor="theme-system" className="flex flex-col items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                                <div className="p-2 border-2 rounded-lg data-[state=checked]:border-primary">
                                    <Laptop className="h-8 w-8" />
                                </div>
                                <span>النظام</span>
                            </Label>
                        </div>
                    </RadioGroup>
                    <Separator />
                    <SettingsActionItem icon={Wallpaper} title="الخلفية" actionText="تغيير" href="/settings/chats/wallpaper" />
                </div>
            </div>
            
            <div className="p-4">
                 <h3 className="text-lg font-semibold text-primary mb-2">إعدادات المحادثة</h3>
                 <SettingsToggleItem 
                    title="مفتاح الإدخال للإرسال"
                    description="سيقوم مفتاح الإدخال بإرسال رسالتك"
                    checked={enterIsSend}
                    onCheckedChange={setEnterIsSend}
                 />
                  <SettingsToggleItem 
                    title="عرض الوسائط"
                    description="إظهار الوسائط التي تم تنزيلها حديثًا في معرض الصور بهاتفك"
                    checked={mediaVisibility}
                    onCheckedChange={setMediaVisibility}
                 />
            </div>

             <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-2">سجل المحادثات</h3>
                <div className="divide-y">
                     <SettingsActionItem icon={Download} title="تصدير المحادثة" actionText="تصدير" />
                     <SettingsActionItem icon={Archive} title="أرشفة كل المحادثات" actionText="أرشفة" />
                     <SettingsActionItem icon={Eraser} title="مسح محتوى كل المحادثات" actionText="مسح" />
                     <SettingsActionItem icon={Trash2} title="حذف كل المحادثات" actionText="حذف" />
                </div>
            </div>
        </div>
    </div>
  );
}
