'use client';

import { ArrowLeft, ChevronLeft, ShieldCheck, KeyRound, Phone, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type AccountSettingItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
};

const AccountSettingItem = ({ icon: Icon, title, description, href }: AccountSettingItemProps) => (
  <Link href={href} className="w-full">
    <div className="flex items-center gap-6 p-4 hover:bg-muted cursor-pointer">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div className="flex-grow">
        <p className="text-lg">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronLeft className="h-5 w-5 text-muted-foreground" />
    </div>
  </Link>
);


export default function AccountSettingsPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">الحساب</h1>
        </header>
        
        <div className="py-2">
            <AccountSettingItem 
                icon={ShieldCheck}
                title="الخصوصية"
                description="من يمكنه رؤية معلوماتك الشخصية"
                href="/settings/account/privacy"
            />
             <AccountSettingItem 
                icon={KeyRound}
                title="الأمان"
                description="التحقق بخطوتين، إشعارات الأمان"
                href="/settings/account/security"
            />
            <Separator />
             <AccountSettingItem 
                icon={Phone}
                title="تغيير الرقم"
                description="نقل معلومات الحساب إلى رقم جديد"
                href="/settings/account/change-number"
            />
             <AccountSettingItem 
                icon={FileText}
                title="طلب معلومات الحساب"
                description="احصل على تقرير بمعلومات حسابك"
                href="/settings/account/request-info"
            />
        </div>
    </div>
  );
}
