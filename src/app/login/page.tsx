'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a service like Firebase Auth
    // to send a verification code.
    console.log('Requesting verification for:', phoneNumber);
    // For now, we'll just navigate to the verification page.
    router.push(`/verify?phone=${encodeURIComponent(phoneNumber)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <Image
            src="/zoli-logo.png"
            alt="Zoli Logo"
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full"
          />
          <CardTitle className="text-2xl">أدخل رقم هاتفك</CardTitle>
          <CardDescription>
            سوف نرسل لك رمز تحقق عبر رسالة نصية قصيرة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm">
                  +974
                </span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="55123456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-l-md text-left"
                  dir="ltr"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              التالي
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
