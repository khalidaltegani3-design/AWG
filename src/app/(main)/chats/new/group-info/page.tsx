
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Contact = {
    id: string;
    name: string[];
    tel: string[];
    avatar?: string; 
}

export default function NewGroupInfoPage() {
    const router = useRouter();
    const [members, setMembers] = useState<Contact[]>([]);
    const [groupName, setGroupName] = useState('');
    const [groupIcon, setGroupIcon] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const storedMembers = sessionStorage.getItem('newGroupMembers');
        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        } else {
            // If no members, go back to selection
            router.replace('/chats/new/group');
        }
    }, [router]);
    
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setGroupIcon(URL.createObjectURL(file));
        }
    };

    const handleCreateGroup = () => {
        if (!groupName.trim()) return;
        
        // In a real app, you would send this data to your backend
        console.log("Creating group:", {
            name: groupName,
            icon: groupIcon,
            members: members,
        });

        // Clean up sessionStorage
        sessionStorage.removeItem('newGroupMembers');

        // Navigate to the newly created group chat (mocked)
        router.replace(`/chats/group-${Date.now()}`);
    };


    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div>
                    <h1 className="text-xl font-bold">معلومات المجموعة</h1>
                    <p className="text-sm text-primary-foreground/80">{members.length} أعضاء</p>
                </div>
            </header>

            <div className="p-6 flex flex-col items-center gap-4 border-b">
                 <div className="relative">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src={groupIcon || undefined} />
                        <AvatarFallback className="text-4xl bg-muted">
                            <Camera className="h-12 w-12 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                     <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera className="h-5 w-5" />
                    </Button>
                     <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleIconChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                 <Input
                    placeholder="اكتب اسم المجموعة هنا..."
                    className="text-center text-lg h-12 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            
             <div className="p-3 text-sm font-semibold text-muted-foreground">
                المشاركون: {members.length}
             </div>

            <ScrollArea className="flex-grow">
                <div className="grid grid-cols-3 gap-4 p-4">
                    {members.map(member => (
                        <div key={member.id} className="flex flex-col items-center gap-1">
                             <Avatar className="h-16 w-16">
                                <AvatarImage src={member.avatar} alt={member.name[0]} />
                                <AvatarFallback>{member.name[0]?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <p className="text-xs text-center truncate w-full font-semibold">{member.name[0]}</p>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            
            <div className="fixed bottom-6 right-6 z-20">
                <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-green-600 hover:bg-green-700" onClick={handleCreateGroup} disabled={!groupName.trim()}>
                    <Check className="h-7 w-7" />
                </Button>
            </div>
        </div>
    );
}

