import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity, ArrowUpRight, Wallet, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ----------------------------------------------------------------------
// 1. تعریف کامپوننت StatCard (برای رفع ارور is not defined)
// ----------------------------------------------------------------------

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: React.ReactNode;
}

function StatCard({ title, value, subtext, icon }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {subtext}
                </p>
            </CardContent>
        </Card>
    )
}

// ----------------------------------------------------------------------
// 2. صفحه اصلی داشبورد (Server Component)
// ----------------------------------------------------------------------

export default async function DashboardPage() {
    // داده‌های ماک (در آینده از API پایتون می‌آید)
    const mockStats = {
        walletBalance: 2500000, // موجودی کیف پول
        totalUsers: 120,
        activeConfigs: 340,
        monthlyRevenue: "45,000,000",
    };

    return (
        <div className="flex flex-col gap-6 w-full"> 
            
            {/* هدر صفحه */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">داشبورد مدیریت</h1>
                <div className="flex items-center gap-2">
                     <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-3 py-1">
                        طرح نمایندگی: ترافیکی (پس‌پرداخت)
                     </Badge>
                </div>
            </div>

            {/* کارت‌های آماری - گرید ریسپانسیو */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
                
                {/* کارت ۱: کیف پول (ویژه) */}
                <Card className="bg-primary text-primary-foreground shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary-foreground/90">موجودی کیف پول</CardTitle>
                        <Wallet className="h-4 w-4 text-primary-foreground/80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockStats.walletBalance.toLocaleString()} <span className="text-sm font-normal opacity-80">تومان</span>
                        </div>
                        <div className="mt-3">
                            <Button size="sm" variant="secondary" className="w-full h-8 text-xs gap-1 hover:bg-secondary/90">
                                <PlusCircle className="h-3 w-3" />
                                افزایش اعتبار
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* کارت ۲: کل مشتریان */}
                <StatCard 
                    title="کل مشتریان" 
                    value={String(mockStats.totalUsers)} 
                    subtext="+12 نسبت به ماه قبل"
                    icon={<Users className="h-4 w-4" />}
                />

                {/* کارت ۳: کانفیگ‌های فعال */}
                <StatCard 
                    title="کانفیگ‌های فعال" 
                    value={String(mockStats.activeConfigs)} 
                    subtext="85% ظرفیت سرور"
                    icon={<Activity className="h-4 w-4" />}
                />

                {/* کارت ۴: درآمد یا سود */}
                <StatCard 
                    title="سود خالص شما" 
                    value={mockStats.monthlyRevenue} 
                    subtext="+20% افزایش فروش"
                    icon={<DollarSign className="h-4 w-4" />}
                />
            </div>

            {/* بخش لیست‌های اخیر - گرید نامتقارن (4 به 3) */}
            <div className="grid gap-4 md:gap-8 lg:grid-cols-7 w-full h-full">
                
                {/* کارت بزرگتر (تراکنش‌ها) */}
                <Card className="col-span-1 lg:col-span-4 h-full min-h-[300px]">
                    <CardHeader>
                        <CardTitle>تراکنش‌های اخیر</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md border border-dashed py-10">
                             <p className="text-muted-foreground">نمودار فروش ماهانه اینجا قرار می‌گیرد</p>
                        </div>
                    </CardContent>
                </Card>
                
                {/* کارت کوچکتر (فروشندگان برتر) */}
                <Card className="col-span-1 lg:col-span-3 h-full min-h-[300px]">
                    <CardHeader>
                        <CardTitle>فروشندگان برتر</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md border border-dashed py-10">
                            <p className="text-muted-foreground">لیست رتبه‌بندی فروشندگان</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}