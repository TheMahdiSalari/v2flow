"use client";

import { useState } from "react";
import { Plus, RefreshCw, Wallet, Package as PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SubscriptionModal } from "./subscription-modal"; // ایمپورت مودال جدید

// --- داده‌های شبیه‌سازی شده (در آینده از API می‌آید) ---
const CURRENT_USER = {
    name: "REdiX",
    walletBalance: 200000, // موجودی تومان
    billingType: "PACKAGE_BASED" as "PACKAGE_BASED" | "TRAFFIC_BASED", // نوع پرداخت
    costPerConfig: 50000, // هزینه پایه (اگر پکیج قیمت نداشته باشد)
};

const MY_PACKAGES = [
    { id: "1", name: "برنزی (20GB - 30R)", traffic: 20, days: 30, price: 45000 },
    { id: "2", name: "نقره‌ای (50GB - 30R)", traffic: 50, days: 30, price: 85000 },
    { id: "3", name: "طلایی (100GB - 60R)", traffic: 100, days: 60, price: 150000 },
];
// ------------------------------------------------------

export function AddConfigDialog() {
  // استیت‌های فرم
  const [isOpen, setIsOpen] = useState(false); // برای باز/بسته کردن مودال اصلی
  const [customerName, setCustomerName] = useState("");
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  
  // استیت‌های حالت Custom
  const [customTraffic, setCustomTraffic] = useState("");
  const [customDays, setCustomDays] = useState("");

  // استیت‌های مودال موفقیت
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdConfig, setCreatedConfig] = useState({ name: "", link: "", sub: "" });

  // محاسبات
  const selectedPackage = MY_PACKAGES.find(p => p.id === selectedPackageId);
  const generatedRemark = customerName ? `${CURRENT_USER.name}-${customerName}` : CURRENT_USER.name;

  // محاسبه هزینه نهایی
  let finalCost = 0;
  if (CURRENT_USER.billingType === "PACKAGE_BASED") {
      if (selectedPackage) {
          finalCost = selectedPackage.price;
      } else if (selectedPackageId === "custom") {
          // فرمول فرضی برای کاستوم: هر گیگ 2000 تومن
          finalCost = (Number(customTraffic) * 2000) + 10000; 
      }
  }

  const hasEnoughBalance = CURRENT_USER.walletBalance >= finalCost;

  const handleGenerateNewUUID = () => setUuid(crypto.randomUUID());

  // تابع نهایی ساخت کانفیگ
  const handleCreate = () => {
    if (!hasEnoughBalance && CURRENT_USER.billingType === "PACKAGE_BASED") return;

    // 1. شبیه‌سازی لینک‌های تولید شده (اینجا باید API صدا زده شود)
    const domain = "sub.v2flow-panel.ir";
    const vlessLink = `vless://${uuid}@cdn.cloudflare.com:443?path=%2F&security=tls&encryption=none&host=${domain}&type=ws&sni=${domain}#${generatedRemark}`;
    const subLink = `https://${domain}/sub/${generatedRemark}?token=${uuid}`;

    // 2. ذخیره اطلاعات برای مودال بعدی
    setCreatedConfig({
        name: generatedRemark,
        link: vlessLink,
        sub: subLink
    });

    // 3. بستن این مودال و باز کردن مودال موفقیت
    setIsOpen(false);
    setShowSuccessModal(true);

    // 4. ریست کردن فرم (اختیاری)
    setCustomerName("");
    setUuid(crypto.randomUUID());
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            کانفیگ جدید
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>افزودن کاربر جدید</DialogTitle>
            
            {/* هدر اطلاعات مالی */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <Badge variant="secondary" className="gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                  <Wallet className="h-3 w-3" />
                  {CURRENT_USER.walletBalance.toLocaleString()} ت
              </Badge>
              <Badge variant="outline" className="text-muted-foreground border-dashed">
                  {CURRENT_USER.billingType === "PACKAGE_BASED" ? "کسر آنی" : "پس‌پرداخت"}
              </Badge>
            </div>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            
            {/* نام مشتری */}
            <div className="grid gap-2">
              <Label htmlFor="name">نام مشتری (انگلیسی)</Label>
              <div className="flex gap-2 items-center">
                  <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-2 rounded-md border text-nowrap">
                      {CURRENT_USER.name}-
                  </span>
                  <Input
                  id="name"
                  placeholder="donya"
                  className="text-left ltr"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  />
              </div>
              <p className="text-[11px] text-muted-foreground text-left dir-ltr">
                  Name: <span className="font-bold text-primary">{generatedRemark}</span>
              </p>
            </div>

            {/* انتخاب پکیج */}
            <div className="grid gap-2">
              <Label>انتخاب پکیج</Label>
              <Select onValueChange={setSelectedPackageId}>
                <SelectTrigger>
                  <SelectValue placeholder="یک پکیج انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {MY_PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                          <div className="flex justify-between w-full gap-4">
                             <span>{pkg.name}</span>
                             <span className="text-muted-foreground text-xs">({pkg.price.toLocaleString()} ت)</span>
                          </div>
                      </SelectItem>
                  ))}
                  <SelectItem value="custom">-- تنظیم دستی (Custom) --</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* فیلدهای دستی (Custom) */}
            {selectedPackageId === "custom" && (
               <div className="grid grid-cols-2 gap-4 bg-muted/30 p-3 rounded-md border border-dashed animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid gap-2">
                      <Label htmlFor="traffic" className="text-xs">حجم (GB)</Label>
                      <Input 
                        id="traffic" 
                        type="number" 
                        className="h-8 bg-background" 
                        value={customTraffic}
                        onChange={(e) => setCustomTraffic(e.target.value)}
                      />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="days" className="text-xs">مدت (روز)</Label>
                      <Input 
                        id="days" 
                        type="number" 
                        className="h-8 bg-background" 
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                      />
                  </div>
               </div>
            )}

            {/* نمایش خلاصه پکیج انتخاب شده */}
            {selectedPackage && (
               <div className="flex justify-between items-center bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm border border-green-100">
                  <div className="flex items-center gap-2">
                    <PackageIcon className="h-4 w-4" />
                    <span>{selectedPackage.traffic} GB</span>
                    <span className="text-green-300">|</span>
                    <span>{selectedPackage.days} روز</span>
                  </div>
                  <span className="font-bold">{selectedPackage.price.toLocaleString()} ت</span>
               </div>
            )}

            {/* UUID */}
            <div className="grid gap-2">
              <Label htmlFor="uuid">UUID</Label>
              <div className="flex gap-2">
                  <Input id="uuid" value={uuid} readOnly className="text-xs font-mono bg-muted/50 text-muted-foreground" />
                  <Button size="icon" variant="outline" onClick={handleGenerateNewUUID}>
                      <RefreshCw className="h-4 w-4" />
                  </Button>
              </div>
            </div>

          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3">
             {/* بخش محاسبه هزینه */}
             {CURRENT_USER.billingType === "PACKAGE_BASED" && (
                  <div className="flex justify-between items-center text-sm w-full bg-muted/50 p-2 rounded-lg">
                      <span className="text-muted-foreground">هزینه نهایی کسر از کیف پول:</span>
                      <span className={hasEnoughBalance ? "text-primary font-bold text-lg" : "text-red-600 font-bold text-lg"}>
                          {finalCost.toLocaleString()} <span className="text-xs font-normal">تومان</span>
                      </span>
                  </div>
             )}

            <Button 
              onClick={handleCreate} 
              className="w-full font-bold" 
              size="lg"
              disabled={(!hasEnoughBalance && CURRENT_USER.billingType === "PACKAGE_BASED") || !customerName || !selectedPackageId}
              variant={(!hasEnoughBalance && CURRENT_USER.billingType === "PACKAGE_BASED") ? "destructive" : "default"}
            >
              {(!hasEnoughBalance && CURRENT_USER.billingType === "PACKAGE_BASED") 
                  ? "موجودی ناکافی است" 
                  : "ساخت و دریافت لینک کانفیگ"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* مودال موفقیت و نمایش QR Code */}
      <SubscriptionModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        configName={createdConfig.name}
        configLink={createdConfig.link}
        subLink={createdConfig.sub}
      />
    </>
  );
}