
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Search, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Contact = {
    id: string;
    name: string[];
    tel: string[];
    avatar?: string; 
}

const mockContacts: Contact[] = [
  { id: '1', name: ['أحمد خليل'], tel: ['+97455123456'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: '2', name: ['فاطمة عبدالله'], tel: ['+97450123456'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: '3', name: ['محمد علي'], tel: ['+97455654321'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
  { id: '5', name: ['سارة يوسف'], tel: ['+97450987654'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
];

export default function NewGroupPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mockContacts);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = contacts.filter(contact => 
            contact.name[0].toLowerCase().includes(lowercasedFilter)
        );
        setFilteredContacts(filtered);
    }, [searchTerm, contacts]);

    const handleSelectContact = (contact: Contact, isSelected: boolean) => {
        if (isSelected) {
            setSelectedContacts(prev => [...prev, contact]);
        } else {
            setSelectedContacts(prev => prev.filter(c => c.id !== contact.id));
        }
    };
    
    const handleNext = () => {
        if (selectedContacts.length === 0) return;
        sessionStorage.setItem('newGroupMembers', JSON.stringify(selectedContacts));
        router.push('/chats/new/group-info');
    }

    return (
        <div className="flex flex-col h-full">
            <header className="flex flex-col border-b bg-primary text-primary-foreground sticky top-0 z-10">
                <div className="flex items-center gap-4 p-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">مجموعة جديدة</h1>
                        <p className="text-sm text-primary-foreground/80">
                            {selectedContacts.length > 0 ? `تم اختيار ${selectedContacts.length}` : 'اختيار المشاركين'}
                        </p>
                    </div>
                </div>
                {selectedContacts.length > 0 && (
                    <ScrollArea className="h-24 p-2" orientation="horizontal">
                         <div className="flex items-center gap-3">
                            {selectedContacts.map(contact => (
                                <div key={contact.id} className="flex flex-col items-center gap-1 w-20">
                                    <div className="relative">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={contact.avatar} alt={contact.name[0]} />
                                            <AvatarFallback>{contact.name[0]?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <button 
                                            onClick={() => handleSelectContact(contact, false)}
                                            className="absolute -top-1 -left-1 bg-muted text-muted-foreground rounded-full h-5 w-5 flex items-center justify-center"
                                        >
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </div>
                                    <p className="text-xs text-center truncate w-full">{contact.name[0]}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </header>

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

            <ScrollArea className="flex-grow">
                {filteredContacts.map((contact) => {
                    const isSelected = selectedContacts.some(c => c.id === contact.id);
                    return (
                        <Label key={contact.id} htmlFor={`contact-${contact.id}`} className="flex items-center gap-4 p-3 hover:bg-muted cursor-pointer">
                            <Checkbox 
                                id={`contact-${contact.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => handleSelectContact(contact, checked as boolean)}
                            />
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={contact.avatar} alt={contact.name[0]} />
                                <AvatarFallback>{contact.name[0]?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{contact.name[0]}</p>
                                <p className="text-sm text-muted-foreground truncate">{contact.tel[0]}</p>
                            </div>
                        </Label>
                    )
                })}
            </ScrollArea>
            
             {selectedContacts.length > 0 && (
                <div className="fixed bottom-6 right-6 z-20">
                    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg" onClick={handleNext}>
                        <ArrowRight className="h-7 w-7" />
                    </Button>
                </div>
            )}
        </div>
    );
}
