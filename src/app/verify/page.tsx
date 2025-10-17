'use client';

import { useState, Suspense, useEffect } from 'react';
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

  useEffect(() => {
    // For development, automatically "verify" and redirect.
    console.log(`Auto-verifying for phone number: ${phoneNumber}`);
    // Redirect to onboarding for new users
    router.replace('/onboarding');
  }, [router, phoneNumber]);


  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // This part is now handled by the useEffect for auto-redirection.
    console.log(`Verifying code ${verificationCode} for ${phoneNumber}`);
    router.replace('/onboarding');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">التحقق من رقمك</CardTitle>
          <CardDescription>
            جاري التحقق التلقائي... سيتم توجيهك الآن.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground">
                <p>
                    تم الدخول برقم الهاتف:
                    <span dir="ltr" className="font-semibold inline-block mx-1">
                      +974 {phoneNumber}
                    </span>
                </p>
            </div>
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
