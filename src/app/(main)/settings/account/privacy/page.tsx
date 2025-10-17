
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type PrivacyOption = "all" | "contacts" | "none";

const PrivacySetting = ({ title, description, value, onValueChange }: { title: string, description: string, value: PrivacyOption, onValueChange: (value: PrivacyOption) => void }) => {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <RadioGroup defaultValue={value} onValueChange={(v: PrivacyOption) => onValueChange(v)} className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="all" id={`${title}-all`} />
                    <Label htmlFor={`${title}-all`}>الجميع</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="contacts" id={`${title}-contacts`} />
                    <Label htmlFor={`${title}-contacts`}>جهات اتصالي</Label>
                </div>
                 <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="none" id={`${title}-none`} />
                    <Label htmlFor={`${title}-none`}>لا أحد</Label>
                </div>
            </RadioGroup>
        </div>
    );
}

export default function PrivacyPage() {
    const router = useRouter();
    const [lastSeen, setLastSeen] = useState<PrivacyOption>('contacts');
    const [profilePhoto, setProfilePhoto] = useState<PrivacyOption>('all');
    const [about, setAbout] = useState<PrivacyOption>('all');

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">الخصوصية</h1>
        </header>
        
        <div className="flex-grow divide-y">
            <PrivacySetting 
                title="آخر ظهور ومتصل الآن"
                description="من يمكنه رؤية آخر ظهور لك"
                value={lastSeen}
                onValueChange={setLastSeen}
            />
            <PrivacySetting 
                title="صورة الملف الشخصي"
                description="من يمكنه رؤية صورة ملفك الشخصي"
                value={profilePhoto}
                onValueChange={setProfilePhoto}
            />
            <PrivacySetting 
                title="الأخبار"
                description="من يمكنه رؤية أخبارك"
                value={about}
                onValueChange={setAbout}
            />
        </div>
    </div>
  );
}
