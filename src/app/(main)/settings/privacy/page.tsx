
'use client';

import { ArrowLeft, ChevronLeft, UserX, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type PrivacyItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  value?: string;
};

const PrivacyItem = ({ icon: Icon, title, description, href, value }: PrivacyItemProps) => (
  <Link href={href} className="w-full">
    <div className="flex items-center gap-6 p-4 hover:bg-muted cursor-pointer">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div className="flex-grow">
        <p className="text-lg">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-muted-foreground">{value}</span>}
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  </Link>
);


export default function GeneralPrivacyPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">الخصوصية</h1>
        </header>
        
        <div className="py-2">
            <div className="p-4">
                <h3 className="text-lg font-semibold">من يمكنه رؤية معلوماتي الشخصية</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    يمكنك التحكم في من يرى معلوماتك في <Link href="/settings/account/privacy" className="text-primary underline">إعدادات خصوصية الحساب</Link>.
                </p>
            </div>
            <Separator />
             <PrivacyItem 
                icon={UserX}
                title="جهات الاتصال المحظورة"
                description="لن يتمكنوا من الاتصال بك أو إرسال رسائل إليك"
                href="#"
                value="3"
            />
             <PrivacyItem 
                icon={Timer}
                title="مؤقت الرسائل التلقائي"
                description="عيّن مدة زمنية لاختفاء الرسائل الجديدة"
                href="#"
                value="إيقاف"
            />
        </div>
    </div>
  );
}

