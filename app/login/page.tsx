import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, LockKeyhole, User } from "lucide-react";
import ParticlesBackground from "@/components/ui/particles-background";
import { ModeToggle } from "@/components/mode-toggle"; // اضافه کردن دکمه تم به صفحه لاگین

export default function LoginPage() {
  return (
    // استفاده از bg-background به جای رنگ ثابت
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background transition-colors duration-300" dir="rtl">
      
      {/* دکمه تغییر تم گوشه بالا چپ */}
      <div className="absolute top-4 left-4 z-50">
        <ModeToggle />
      </div>

      {/* ذرات پس‌زمینه */}
      <ParticlesBackground />

      {/* کارت لاگین با bg-card و backdrop-blur */}
      <Card className="z-10 w-full max-w-sm bg-card/80 backdrop-blur-sm shadow-xl border-border">
        <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
            </div>
          <CardTitle className="text-2xl font-bold text-foreground">V2Flow Panel</CardTitle>
          <CardDescription className="text-muted-foreground">
            ورود به سیستم مدیریت
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-foreground">نام کاربری</Label>
            <div className="relative">
                <Input 
                    id="username" 
                    type="text" 
                    placeholder="admin" 
                    className="pl-10 bg-background" // اینپوت با رنگ پس‌زمینه تم
                />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-foreground">رمز عبور</Label>
            <div className="relative">
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-background"
                />
                <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-bold shadow-md">
            ورود به حساب
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            نسخه 1.0.0
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}