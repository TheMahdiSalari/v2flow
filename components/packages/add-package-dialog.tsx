"use client";

import { Plus } from "lucide-react";
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

export function AddPackageDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          پکیج جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>تعریف پکیج جدید</DialogTitle>
          <DialogDescription>
            مشخصات بسته را وارد کنید تا در لیست فروش قرار گیرد.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">نام پکیج</Label>
            <Input id="name" placeholder="مثلاً: ماهانه ویژه" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="traffic">حجم (GB)</Label>
                <Input id="traffic" type="number" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="days">مدت (روز)</Label>
                <Input id="days" type="number" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">قیمت فروش (تومان)</Label>
            <Input id="price" type="number" placeholder="0 برای رایگان" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">ذخیره پکیج</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}