'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function VerifyPageContent() {
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phone');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the code with your auth service.
    console.log(`Verifying code ${verificationCode} for ${phoneNumber}`);
    // For now, we'll just navigate to the main chats page on success.
    router.replace('/chats');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">التحقق من رقمك</CardTitle>
          <CardDescription>
            أدخل الرمز المكون من 6 أرقام الذي أرسلناه إلى رقم الهاتف
            <span dir="ltr" className="font-semibold inline-block mx-1">
              +974 {phoneNumber}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">رمز التحقق</Label>
              <Input
                id="code"
                type="text"
                placeholder="------"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center tracking-[1.5rem]"
                dir="ltr"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              تحقق
            </Button>
            <div className="text-center">
              <Button variant="link" type="button">
                لم تستلم الرمز؟ إعادة الإرسال
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyPageContent />
        </Suspense>
    )
}
