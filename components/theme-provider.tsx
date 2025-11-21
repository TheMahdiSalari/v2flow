"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// به جای ایمپورت کردن تایپ از مسیر خراب، از قابلیت خود React استفاده می‌کنیم
// تا تایپ‌ها را مستقیماً از کامپوننت اصلی استخراج کند.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}