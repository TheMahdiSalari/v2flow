import { AddConfigDialog } from "@/components/customers/add-config-dialog";
import { RenewDialog } from "@/components/customers/renew-dialog"; // ایمپورت مودال تمدید
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Trash2, 
  Link as LinkIcon, 
  Search, 
  Filter 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// شبیه‌سازی داده‌های دریافتی از سرور (SSR Data)
async function getCustomers() {
    // این داده‌ها در آینده از دیتابیس واقعی خوانده می‌شوند
    return [
        { id: "1", remark: "REdiX-donya", traffic: 50, used: 12.5, expiry: "1403/10/01", status: "active", protocol: "vless" },
        { id: "2", remark: "REdiX-ali", traffic: 30, used: 28.5, expiry: "1403/09/25", status: "warning", protocol: "vmess" },
        { id: "3", remark: "REdiX-sara", traffic: 20, used: 0, expiry: "1403/09/30", status: "inactive", protocol: "vless" },
        { id: "4", remark: "REdiX-company", traffic: 100, used: 45, expiry: "1403/11/15", status: "active", protocol: "trojan" },
        { id: "5", remark: "REdiX-test", traffic: 5, used: 5, expiry: "1403/08/10", status: "expired", protocol: "vless" },
    ];
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* هدر صفحه و دکمه‌ها */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">مدیریت مشتریان</h1>
            <p className="text-muted-foreground">لیست کانفیگ‌های فعال و مدیریت سرویس‌ها</p>
        </div>
        
        {/* دکمه افزودن (کامپوننت کلاینت) */}
        <AddConfigDialog />
      </div>

      {/* نوار ابزار جستجو و فیلتر */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجو بر اساس نام یا UUID..." className="pr-9" />
        </div>
        <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* جدول مشتریان */}
      <Card>
        <CardHeader>
          <CardTitle>لیست کانفیگ‌ها</CardTitle>
          <CardDescription>
            شما مجموعاً {customers.length} کانفیگ در سیستم دارید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-right">نام کانفیگ (Remark)</TableHead>
                <TableHead className="text-center">وضعیت</TableHead>
                <TableHead className="text-center">مصرف / کل</TableHead>
                <TableHead className="text-center">تاریخ انقضا</TableHead>
                <TableHead className="text-center">پروتکل</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  
                  {/* نام کانفیگ */}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                        <span className="font-bold text-base">{customer.remark}</span>
                        <span className="text-xs text-muted-foreground font-mono dir-ltr text-right">uuid: ...a1b2</span>
                    </div>
                  </TableCell>

                  {/* وضعیت با Badge */}
                  <TableCell className="text-center">
                    {customer.status === 'active' && <Badge className="bg-green-500 hover:bg-green-600">فعال</Badge>}
                    {customer.status === 'warning' && <Badge className="bg-yellow-500 hover:bg-yellow-600">کم حجم</Badge>}
                    {customer.status === 'inactive' && <Badge variant="secondary">غیرفعال</Badge>}
                    {customer.status === 'expired' && <Badge variant="destructive">منقضی</Badge>}
                  </TableCell>

                  {/* مصرف (Progress Bar) */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1 w-[120px] mx-auto">
                        <div className="flex justify-between w-full text-[10px] text-muted-foreground">
                           <span>{customer.used} GB</span>
                           <span>{customer.traffic} GB</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    customer.used >= customer.traffic ? 'bg-red-500' : 
                                    (customer.used / customer.traffic > 0.8) ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} 
                                style={{ width: `${Math.min((customer.used / customer.traffic) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                  </TableCell>

                  {/* تاریخ انقضا */}
                  <TableCell className="text-center">
                      <span className="font-mono text-sm dir-ltr">{customer.expiry}</span>
                  </TableCell>

                  {/* پروتکل */}
                  <TableCell className="text-center">
                    <Badge variant="outline" className="uppercase font-mono text-[10px]">
                        {customer.protocol}
                    </Badge>
                  </TableCell>
                  
                  {/* منوی عملیات (سه نقطه) */}
                  <TableCell className="text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>عملیات کانفیگ</DropdownMenuLabel>
                        
                        <DropdownMenuItem className="cursor-pointer gap-2">
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            کپی لینک
                        </DropdownMenuItem>
                        
                        {/* 👇👇👇 مودال تمدید سرویس 👇👇👇 */}
                        <RenewDialog />
                        {/* 👆👆👆 جایگذاری شده در منو 👆👆👆 */}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            حذف کانفیگ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}