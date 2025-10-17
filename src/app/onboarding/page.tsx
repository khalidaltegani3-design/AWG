'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 1, title: 'الصورة الشخصية', description: 'اختر صورة تعبر عنك.' },
  { id: 2, title: 'الاسم', description: 'كيف سيظهر اسمك في المحادثات.' },
  { id: 3, title: 'اسم المستخدم', description: 'هذا الاسم سيكون معرف قناتك العام.' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step, process data and navigate
      console.log({ profileImage, name, username });
      // In a real app, you would save this data to your backend
      router.replace('/chats');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setProfileImage(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentStepInfo = steps[step - 1];

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
       <header className="flex items-center justify-between mb-8">
            {step > 1 ? (
                 <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            ) : <div className="w-10 h-10" /> }
            <div className="flex-grow text-center">
                 <Image
                    src="/zoli-logo.png"
                    alt="Zoli Logo"
                    width={50}
                    height={50}
                    className="mx-auto rounded-full"
                />
            </div>
             <div className="w-10 h-10" />
      </header>

      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-sm border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{currentStepInfo.title}</CardTitle>
            <CardDescription>{currentStepInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {step === 1 && (
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={profileImage || undefined} alt="Profile" />
                            <AvatarFallback className="text-4xl">
                               {name ? name.substring(0,2) : <Camera className="h-12 w-12 text-muted-foreground" />}
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
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    placeholder="مثال: أحمد خليل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <div className="relative" dir="ltr">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                     <Input
                        id="username"
                        placeholder="ahmed_khalil"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-7 text-left"
                        required
                    />
                  </div>
                </div>
              )}
              
              <Button onClick={handleNext} className="w-full" disabled={
                  (step === 2 && !name.trim()) ||
                  (step === 3 && !username.trim())
              }>
                {step === 3 ? 'إنهاء' : 'التالي'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="flex justify-center items-center gap-2 p-4">
            {steps.map((s) => (
                <div key={s.id} className={`h-2 w-2 rounded-full transition-all ${step >= s.id ? 'bg-primary w-4' : 'bg-muted'}`} />
            ))}
      </div>
    </div>
  );
}
