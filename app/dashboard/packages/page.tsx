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
import { Plus, Package as PackageIcon, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// این دایالوگ افزودن پکیج باید کلاینت کامپوننت باشد (در فایلی جداگانه)،
// اما برای خلاصه شدن اینجا دکمه‌اش را می‌گذاریم.
import { AddPackageDialog } from "@/components/packages/add-package-dialog"; // در گام بعد می‌سازیم

// شبیه‌سازی داده‌ها (SSR)
async function getPackages() {
  return [
    { id: 1, name: "برنزی - اقتصادی", traffic: 20, days: 30, price: 120000, active: true },
    { id: 2, name: "نقره‌ای - استاندارد", traffic: 50, days: 30, price: 250000, active: true },
    { id: 3, name: "طلایی - نامحدود", traffic: 100, days: 60, price: 480000, active: true },
    { id: 4, name: "تستی", traffic: 1, days: 3, price: 0, active: false },
  ];
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">مدیریت پکیج‌ها</h1>
          <p className="text-muted-foreground">تعریف بسته‌های فروش برای دسترسی سریع</p>
        </div>
        {/* کامپوننت دیالوگ افزودن پکیج */}
        <AddPackageDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>پکیج‌های تعریف شده</CardTitle>
          <CardDescription>
            این پکیج‌ها در لیست "افزودن کاربر" نمایش داده می‌شوند.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام پکیج</TableHead>
                <TableHead className="text-center">حجم (GB)</TableHead>
                <TableHead className="text-center">مدت (روز)</TableHead>
                <TableHead className="text-center">قیمت فروش (تومان)</TableHead>
                <TableHead className="text-center">وضعیت</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <PackageIcon className="h-4 w-4 text-primary" />
                    {pkg.name}
                  </TableCell>
                  <TableCell className="text-center">{pkg.traffic}</TableCell>
                  <TableCell className="text-center">{pkg.days}</TableCell>
                  <TableCell className="text-center font-bold text-green-600">
                    {pkg.price.toLocaleString('fa-IR')}
                  </TableCell>
                  <TableCell className="text-center">
                    {pkg.active ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">فعال</Badge>
                    ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">آرشیو</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
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