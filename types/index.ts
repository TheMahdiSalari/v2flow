// types/index.ts

export type Role = 'SUPER_ADMIN' | 'SELLER';

export interface User {
  id: string;
  name: string; // نام نمایشی (مثلاً REdiX)
  email: string;
  role: Role;
  balance: number; // تراز مالی
}

export interface CustomerConfig {
  id: string;
  remark: string; // فرمت: SellerName-CustomerName
  uuid: string;
  port: number;
  totalTraffic: number; // GB
  remainingTraffic: number; // GB
  expiryDate: string;
  status: 'active' | 'expired' | 'disabled';
  sellerName: string;
}

// برای منوی سایدبار
export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}