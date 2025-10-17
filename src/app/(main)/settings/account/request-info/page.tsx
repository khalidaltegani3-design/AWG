
'use client';

import { ArrowLeft, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function RequestInfoPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleRequestReport = () => {
        toast({
            title: "تم استلام طلبك",
            description: "يجري إعداد تقريرك. سيستغرق هذا الأمر بضعة أيام. سيتم إعلامك عندما يكون تقريرك جاهزًا للتنزيل.",
        });
    };

  return (
    <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b bg-primary text-primary-foreground sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">طلب معلومات الحساب</h1>
        </header>
        
        <div className="p-4 flex-grow flex flex-col justify-center">
             <Card className="w-full shadow-none border-0">
                <CardHeader className="text-center items-center">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <FileText className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>طلب تقرير الحساب</CardTitle>
                    <CardDescription className="max-w-md mx-auto">
                       اطلب تقريرًا بمعلومات حسابك في Zoli وإعداداته، والذي يمكنك نقله إلى تطبيق آخر. لا يتضمن هذا التقرير رسائلك.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleRequestReport} className="w-full">
                      طلب التقرير
                    </Button>
                </CardContent>
             </Card>
        </div>
    </div>
  );
}
