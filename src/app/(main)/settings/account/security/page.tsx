
'use client';

import { ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const SecuritySetting = ({ icon: Icon, title, description, control }: { icon: React.ElementType, title: string, description: string, control?: React.ReactNode }) => {
    return (
        <div className="flex items-start gap-6 p-4">
            <Icon className="h-6 w-6 text-muted-foreground mt-1" />
            <div className="flex-grow">
                <p className="text-lg">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {control && <div className="flex-shrink-0">{control}</div>}
        </div>
    );
}

export default function SecurityPage() {
    const router = useRouter();
    const [showSecurityNotifications, setShowSecurityNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">الأمان</h1>
        </header>
        
        <div className="flex-grow">
            <div className="p-4">
                 <p className="text-sm text-muted-foreground">
                    يقوم Zoli بتأمين محادثاتك ومعلوماتك.
                 </p>
            </div>
            <Separator />
            <SecuritySetting 
                icon={ShieldCheck}
                title="إظهار إشعارات الأمان"
                description="احصل على إشعار عند تغيير رمز الأمان الخاص بجهة اتصال."
                control={
                    <Switch
                        checked={showSecurityNotifications}
                        onCheckedChange={setShowSecurityNotifications}
                        aria-label="Toggle security notifications"
                    />
                }
            />
            <Separator />
            <div className="p-4 space-y-4">
                 <div className="flex items-center gap-4">
                    <KeyRound className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-primary">التحقق بخطوتين</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    لمزيد من الحماية، قم بتمكين التحقق بخطوتين، والذي سيتطلب رقمًا تعريفيًا عند تسجيل رقم هاتفك مع Zoli مرة أخرى.
                </p>
                <Button className="w-full">
                    تمكين
                </Button>
            </div>
        </div>
    </div>
  );
}
