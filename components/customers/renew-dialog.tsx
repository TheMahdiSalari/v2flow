"use client";

import { useState } from "react";
import { RotateCw, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function RenewDialog() {
  const [days, setDays] = useState(30);
  const [traffic, setTraffic] = useState(0);
  const [price, setPrice] = useState(0);

  const calculatePrice = () => {
    // فرمول ساده محاسبه قیمت (قابل تغییر)
    const newPrice = (traffic * 3000) + (days * 1000);
    setPrice(newPrice);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* ⚠️ نکته مهم: این خط جلوی بسته شدن منو را می‌گیرد تا مودال باز شود */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer">
          <RotateCw className="h-4 w-4 text-muted-foreground" />
          تمدید سرویس
        </DropdownMenuItem>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>تمدید سرویس مشتری</DialogTitle>
          <DialogDescription>
            مشخصات تمدید را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="add-traffic">افزودن حجم (GB)</Label>
                <Input 
                    id="add-traffic" 
                    type="number" 
                    value={traffic} 
                    onChange={(e) => setTraffic(Number(e.target.value))}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="add-days">افزودن روز</Label>
                <Input 
                    id="add-days" 
                    type="number" 
                    value={days} 
                    onChange={(e) => setDays(Number(e.target.value))}
                />
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg flex items-center justify-between border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calculator className="h-4 w-4" />
                هزینه تمدید:
            </div>
            <div className="font-bold text-primary">
                {price > 0 ? price.toLocaleString() : '---'} تومان
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={calculatePrice} className="w-full text-xs">
            محاسبه مجدد قیمت
          </Button>
        </div>
        
        <DialogFooter>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            پرداخت و اعمال تمدید
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}