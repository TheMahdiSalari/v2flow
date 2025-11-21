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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save, Shield, User, Server } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      
      {/* هدر صفحه */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">تنظیمات</h1>
          <p className="text-muted-foreground">مدیریت حساب کاربری و تنظیمات سیستم</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full" dir="rtl">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">پروفایل</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="system">سیستم</TabsTrigger>
        </TabsList>

        {/* --- تب پروفایل --- */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                اطلاعات حساب
              </CardTitle>
              <CardDescription>
                اطلاعات عمومی پنل و نام نمایشی شما در لینک‌ها.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">نام نمایشی (فارسی)</Label>
                <Input id="name" defaultValue="تیم فروش رادیکس" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">نام برند (در remark کانفیگ)</Label>
                <Input id="brand" defaultValue="REdiX" disabled className="bg-muted" />
                <p className="text-[11px] text-muted-foreground">
                  این نام پیش‌فرض کانفیگ‌های شماست و قابل تغییر نیست.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">پیام خوش‌آمدگویی (تلگرام)</Label>
                <Textarea 
                  id="bio" 
                  placeholder="متنی که برای مشتری ارسال می‌شود..." 
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* --- تب امنیت --- */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                رمز عبور و ورود
              </CardTitle>
              <CardDescription>
                تغییر رمز عبور ورود به پنل مدیریت.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current">رمز فعلی</Label>
                <Input id="current" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new">رمز جدید</Label>
                <Input id="new" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">تکرار رمز جدید</Label>
                <Input id="confirm" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">تغییر رمز عبور</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* --- تب سیستم --- */}
        <TabsContent value="system" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                کانفیگ پیش‌فرض
              </CardTitle>
              <CardDescription>
                تنظیمات پیش‌فرض هنگام ساخت اکانت جدید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 pl-2">
                  <Label className="text-base">حالت Reality</Label>
                  <p className="text-sm text-muted-foreground">
                    استفاده از پروتکل Reality به عنوان پیش‌فرض
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 pl-2">
                  <Label className="text-base">تولید لینک سابسکریپشن</Label>
                  <p className="text-sm text-muted-foreground">
                    تولید خودکار لینک Subscription برای هر کاربر
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>حجم پیش‌فرض (GB)</Label>
                    <Input type="number" defaultValue={30} />
                </div>
                <div className="grid gap-2">
                    <Label>مدت پیش‌فرض (روز)</Label>
                    <Input type="number" defaultValue={30} />
                </div>
              </div>

            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full sm:w-auto">بروزرسانی تنظیمات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}