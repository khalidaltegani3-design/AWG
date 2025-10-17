
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

type Contact = {
    name: string[];
    tel: string[];
    avatar?: string; // Assuming we might get an avatar URL in the future
}

export default function NewChatPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'unsupported'>('prompt');
    const [isLoading, setIsLoading] = useState(false);

    const fetchContacts = async () => {
        // @ts-ignore
        if (!('contacts' in navigator && 'select' in navigator.contacts)) {
            setPermissionStatus('unsupported');
            return;
        }

        setIsLoading(true);
        try {
            const props = ['name', 'tel', 'icon'];
            const opts = { multiple: true };
            // @ts-ignore
            const userContacts = await navigator.contacts.select(props, opts);

            if (userContacts.length > 0) {
                 const contactsWithAvatars = userContacts.map((contact: any) => {
                    let avatar;
                    if (contact.icon && contact.icon.length > 0) {
                        avatar = URL.createObjectURL(contact.icon[0]);
                    }
                    return { ...contact, avatar };
                });
                setContacts(contactsWithAvatars);
                setFilteredContacts(contactsWithAvatars);
                setPermissionStatus('granted');
            } else {
                // User closed the picker without selecting anyone
                if(contacts.length === 0) router.back();
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setPermissionStatus('denied');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filtered = contacts.filter(contact => {
                const nameMatch = contact.name.some(name => name.toLowerCase().includes(lowercasedFilter));
                const telMatch = contact.tel.some(tel => tel.includes(searchTerm));
                return nameMatch || telMatch;
            });
            setFilteredContacts(filtered);
        } else {
            setFilteredContacts(contacts);
        }
    }, [searchTerm, contacts]);

    const startChat = (contact: Contact) => {
        // In a real app, you'd check if this user exists in your backend
        // and then navigate to a chat with their user ID.
        // For now, we'll just navigate back.
        router.push(`/chats/new-chat-with-${contact.tel[0]}`);
    };
    
    const ActionButton = ({ icon: Icon, title, href }: { icon: React.ElementType, title: string, href: string }) => (
      <Link href={href} className="w-full">
        <div className="flex items-center gap-4 p-3 hover:bg-muted cursor-pointer">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <p className="font-semibold text-lg">{title}</p>
        </div>
      </Link>
    );


    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-8 text-muted-foreground">جاري تحميل جهات الاتصال...</div>;
        }

        if (permissionStatus === 'unsupported') {
            return (
                <div className="p-4">
                    <Alert variant="destructive">
                        <AlertTitle>غير مدعوم</AlertTitle>
                        <AlertDescription>متصفحك أو جهازك لا يدعم الوصول إلى جهات الاتصال.</AlertDescription>
                    </Alert>
                </div>
            );
        }
        
        if (permissionStatus === 'denied') {
             return (
                <div className="text-center p-8 text-muted-foreground space-y-4">
                    <Users className="h-12 w-12 mx-auto" />
                    <h3 className="text-lg font-semibold">تم رفض الوصول</h3>
                    <p>يرجى السماح بالوصول إلى جهات الاتصال في إعدادات جهازك لاستخدام هذه الميزة.</p>
                    <Button onClick={fetchContacts}>المحاولة مرة أخرى</Button>
                </div>
            );
        }
        
        if (permissionStatus === 'prompt') {
            return (
                 <div className="text-center p-8 text-muted-foreground space-y-4">
                    <Users className="h-12 w-12 mx-auto" />
                    <h3 className="text-lg font-semibold">البحث عن أصدقائك</h3>
                    <p>اسمح لـ Zoli بالوصول إلى جهات اتصالك للعثور على أصدقائك الذين يستخدمون التطبيق.</p>
                    <Button onClick={fetchContacts}>البحث عن جهات الاتصال</Button>
                </div>
            )
        }

        if (contacts.length === 0) {
            return (
                <div className="text-center p-8 text-muted-foreground">
                    لم يتم اختيار أي جهات اتصال.
                </div>
            );
        }

        return (
            <ScrollArea className="flex-grow">
                <div className="py-2">
                    <ActionButton icon={Users} title="مجموعة جديدة" href="/chats/new/group" />
                    <ActionButton icon={UserPlus} title="جهة اتصال جديدة" href="#" />
                </div>
                <div className="px-3 pt-4 pb-2 text-sm font-semibold text-muted-foreground">
                   جهات الاتصال على Zoli
                </div>
                {filteredContacts.map((contact, index) => (
                    <div key={`${contact.tel[0]}-${index}`} className="flex items-center gap-4 p-3 hover:bg-muted cursor-pointer" onClick={() => startChat(contact)}>
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={contact.avatar} alt={contact.name[0]} />
                            <AvatarFallback>{contact.name[0]?.substring(0, 2).toUpperCase() || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold">{contact.name[0]}</p>
                            <p className="text-sm text-muted-foreground truncate">{contact.tel[0]}</p>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        );
    }


    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div>
                    <h1 className="text-xl font-bold">محادثة جديدة</h1>
                    <p className="text-sm text-primary-foreground/80">{contacts.length > 0 ? `${contacts.length} جهة اتصال` : 'اختيار جهة اتصال'}</p>
                </div>
            </header>

            {permissionStatus === 'granted' && (
                 <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="بحث في جهات الاتصال..."
                            className="w-full rounded-full bg-muted pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            )}
            
            {renderContent()}

        </div>
    );
}
