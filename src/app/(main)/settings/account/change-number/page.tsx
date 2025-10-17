
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChangeNumberPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">تغيير الرقم</h1>
        </header>
        
        <div className="p-4 flex-grow flex flex-col justify-center">
             <Card className="w-full">
                <CardHeader className="text-center">
                    <CardTitle>تغيير رقم الهاتف</CardTitle>
                    <CardDescription>
                        أدخل رقم هاتفك القديم والجديد للمتابعة.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="old-phone">رقم الهاتف القديم</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm">
                              +974
                            </span>
                            <Input
                              id="old-phone"
                              type="tel"
                              placeholder="55123456"
                              className="rounded-l-md text-left"
                              dir="ltr"
                            />
                          </div>
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="new-phone">رقم الهاتف الجديد</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm">
                              +974
                            </span>
                            <Input
                              id="new-phone"
                              type="tel"
                              placeholder="50123456"
                              className="rounded-l-md text-left"
                              dir="ltr"
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
    </div>
  );
}
