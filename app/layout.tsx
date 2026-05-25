import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/main-layout";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable,
        geistHeading.variable,
      )}
    >
      <body className="bg-sidebar">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
