import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, TrendingDown, History, CreditCard } from "lucide-react";

// شبیه‌سازی داده‌های مالی (SSR)
async function getFinancialData() {
  return {
    summary: {
      totalSales: 15400000,    // کل فروش (تومان)
      adminShare: 10400000,    // سهم سوپر ادمین
      sellerProfit: 5000000,   // سود فروشنده
      debt: 1200000,           // مبلغ بدهی تصفیه نشده
    },
    transactions: [
      { id: 1, type: 'sale', desc: 'خرید کانفیگ (REdiX-donya)', amount: 150000, date: '1403/09/01', status: 'success' },
      { id: 2, type: 'sale', desc: 'خرید کانفیگ (REdiX-ali)', amount: 200000, date: '1403/09/01', status: 'success' },
      { id: 3, type: 'settlement', desc: 'تسویه حساب با ادمین', amount: -5000000, date: '1403/08/30', status: 'pending' }, // منفی یعنی پرداخت شده
      { id: 4, type: 'renew', desc: 'تمدید (REdiX-sara)', amount: 120000, date: '1403/08/29', status: 'success' },
    ]
  };
}

export default async function AccountingPage() {
  const data = await getFinancialData();

  // فرمت کردن پول به تومان
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(Math.abs(amount)) + ' تومان';
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* هدر بخش مالی */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">امور مالی و حسابداری</h1>
          <p className="text-muted-foreground">مدیریت درآمدها، بدهی‌ها و صورت‌حساب‌ها</p>
        </div>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <CreditCard className="h-4 w-4" />
            پرداخت بدهی
        </Button>
      </div>

      {/* کارت‌های خلاصه وضعیت */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* کارت ۱: بدهی فعلی (مهمترین کارت) */}
        <Card className="border-l-4 border-l-red-500 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">بدهی قابل پرداخت</CardTitle>
            <Wallet className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mt-2">
                {formatMoney(data.summary.debt)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              مبلغی که باید به سوپر ادمین بپردازید
            </p>
          </CardContent>
        </Card>

        {/* کارت ۲: کل فروش */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل گردش حساب</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mt-2">
                {formatMoney(data.summary.totalSales)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              مجموع تمام فاکتورهای صادر شده
            </p>
          </CardContent>
        </Card>

        {/* کارت ۳: سود خالص شما */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">سود خالص شما</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mt-2">
                {formatMoney(data.summary.sellerProfit)}
            </div>
            <p className="text-xs text-primary/70 mt-1">
              درآمد نهایی شما پس از کسر هزینه سرور
            </p>
          </CardContent>
        </Card>

        {/* کارت ۴: سهم ادمین */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">هزینه زیرساخت</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mt-2">
                {formatMoney(data.summary.adminShare)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              مجموع سهم سوپر ادمین از فروش‌ها
            </p>
          </CardContent>
        </Card>
      </div>

      {/* جدول ریز تراکنش‌ها */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
                <CardTitle>ریز تراکنش‌ها</CardTitle>
                <CardDescription>تاریخچه فروش، تمدید و تسویه حساب‌ها</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="mr-auto">
                <History className="h-4 w-4" />
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-right">نوع</TableHead>
                <TableHead className="text-right">شرح تراکنش</TableHead>
                <TableHead className="text-center">تاریخ</TableHead>
                <TableHead className="text-center">مبلغ</TableHead>
                <TableHead className="text-left">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">
                    {tx.type === 'sale' && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">فروش</Badge>}
                    {tx.type === 'renew' && <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">تمدید</Badge>}
                    {tx.type === 'settlement' && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">تسویه</Badge>}
                  </TableCell>
                  <TableCell>{tx.desc}</TableCell>
                  <TableCell className="text-center dir-ltr text-muted-foreground font-mono text-sm">{tx.date}</TableCell>
                  <TableCell className={`text-center font-bold ${tx.type === 'settlement' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'settlement' ? '-' : ''} {formatMoney(tx.amount)}
                  </TableCell>
                  <TableCell className="text-left">
                    {tx.status === 'success' && <span className="flex items-center gap-1 text-green-600 text-xs"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>موفق</span>}
                    {tx.status === 'pending' && <span className="flex items-center gap-1 text-yellow-600 text-xs"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>در انتظار تایید</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground w-full flex justify-between">
                <span>نمایش ۱۰ تراکنش آخر</span>
                <span className="cursor-pointer hover:text-primary transition-colors">مشاهده همه تراکنش‌ها &rarr;</span>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}