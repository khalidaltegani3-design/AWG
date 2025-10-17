
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronLeft,
  KeyRound,
  Lock,
  MessageCircle,
  Bell,
  HelpCircle,
  Users,
  QrCode,
} from 'lucide-react';
import Link from 'next/link';

type SettingsItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
};

const SettingsItem = ({ icon: Icon, title, description, href }: SettingsItemProps) => (
  <Link href={href}>
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

const UserProfileLink = () => (
    <Link href="/settings/profile">
        <div className="flex items-center justify-between p-4 border-b hover:bg-muted cursor-pointer">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@nawaf_dev" />
                    <AvatarFallback>ND</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-xl font-semibold">Nawaf Al-Dev</p>
                    <p className="text-muted-foreground">Hey there! I am using Shamil.</p>
                </div>
            </div>
            <QrCode className="h-6 w-6 text-primary" />
        </div>
    </Link>
);


export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </header>
      <UserProfileLink />
      <div className="flex-grow py-2">
        <SettingsItem icon={KeyRound} title="الحساب" description="خصوصية، أمان، تغيير الرقم" href="#" />
        <SettingsItem icon={Users} title="القناة" description="إدارة ملفك الشخصي ومحتواك" href="/settings/profile" />
        <SettingsItem icon={Lock} title="الخصوصية" description="حظر جهات الاتصال، الرسائل المؤقتة" href="#" />
        <SettingsItem icon={MessageCircle} title="المحادثات" description="السمات، الخلفيات، سجل المحادثات" href="#" />
        <SettingsItem icon={Bell} title="الإشعارات" description="نغمات الرسائل والمجموعات والمكالمات" href="#" />
        <SettingsItem icon={HelpCircle} title="المساعدة" description="مركز المساعدة، اتصل بنا، سياسة الخصوصية" href="#" />
      </div>
    </div>
  );
}
