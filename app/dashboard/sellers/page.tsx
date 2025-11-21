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
import { Badge } from "@/components/ui/badge";
import { UserPlus, MoreHorizontal } from "lucide-react";

// شبیه‌سازی داده فروشندگان
async function getSellers() {
  return [
    { id: 1, name: "REdiX", configs: 150, balance: 2500000, debt: 0, status: "active" },
    { id: 2, name: "AliAgent", configs: 45, balance: 100000, debt: 500000, status: "active" },
    { id: 3, name: "V2Ray_Seller", configs: 0, balance: 0, debt: 0, status: "blocked" },
  ];
}

export default async function SellersPage() {
  const sellers = await getSellers();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">مدیریت فروشندگان</h1>
          <p className="text-muted-foreground">لیست نمایندگان فروش و مدیریت اعتبار آنها</p>
        </div>
        <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            افزودن فروشنده جدید
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست نمایندگان</CardTitle>
          <CardDescription>
            شما {sellers.length} نماینده ثبت شده دارید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام نماینده</TableHead>
                <TableHead className="text-center">تعداد کانفیگ</TableHead>
                <TableHead className="text-center">موجودی کیف پول</TableHead>
                <TableHead className="text-center">بدهی</TableHead>
                <TableHead className="text-center">وضعیت</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell className="text-center">{seller.configs}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">
                    {seller.balance.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-red-600">
                    {seller.debt > 0 ? seller.debt.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {seller.status === 'active' ? (
                        <Badge className="bg-green-500 hover:bg-green-600">فعال</Badge>
                    ) : (
                        <Badge variant="destructive">مسدود</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
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