"use client";

import { Copy, Check, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCode from "react-qr-code";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  configName: string;
  configLink: string; // لینک بلند Vless/Vmess
  subLink: string;    // لینک کوتاه سابسکریپشن
}

export function SubscriptionModal({ isOpen, onClose, configName, configLink, subLink }: SubscriptionModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]" dir="rtl">
        <DialogHeader className="text-center items-center">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
            <Check className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl text-green-700">ساخت کانفیگ موفق بود!</DialogTitle>
          <DialogDescription>
             کانفیگ <strong>{configName}</strong> آماده استفاده است.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="qrcode" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
            <TabsTrigger value="links">لینک‌ها</TabsTrigger>
          </TabsList>
          
          {/* تب کیو آر کد */}
          <TabsContent value="qrcode" className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="p-4 bg-white rounded-xl border shadow-sm">
                <QRCode 
                    value={subLink || configLink} 
                    size={180} 
                    viewBox={`0 0 256 256`}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
            </div>
            <p className="text-xs text-muted-foreground text-center">
                برای اتصال سریع، این کد را با گوشی اسکن کنید.
            </p>
          </TabsContent>

          {/* تب لینک‌ها */}
          <TabsContent value="links" className="space-y-4 py-2">
            
            {/* لینک سابسکریپشن (کوتاه) */}
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">لینک سابسکریپشن (هوشمند)</Label>
                <div className="flex gap-2">
                    <Input readOnly value={subLink} className="text-xs font-mono dir-ltr bg-muted" />
                    <Button size="icon" variant="outline" onClick={() => handleCopy(subLink)}>
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* لینک کانفیگ (طولانی) */}
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">کد کانفیگ (Vless/Vmess)</Label>
                <div className="flex gap-2">
                    <Input readOnly value={configLink.substring(0, 25) + "..."} className="text-xs font-mono dir-ltr bg-muted" />
                    <Button size="icon" variant="outline" onClick={() => handleCopy(configLink)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-2">
            <Button className="flex-1" variant="outline" onClick={() => {
                 if (navigator.share) {
                    navigator.share({
                        title: 'V2Flow Config',
                        text: `Config for ${configName}`,
                        url: subLink
                    })
                 }
            }}>
                <Share2 className="ml-2 h-4 w-4" />
                اشتراک گذاری
            </Button>
            <Button className="flex-1" onClick={onClose}>بستن</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}