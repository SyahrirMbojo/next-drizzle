"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import NavbarMenu from "./navbar-menu";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/register";
  return (
    <SessionProvider>
      <ThemeProvider>
        <TooltipProvider>
          {isAuth ? (
            children
          ) : (
            <SidebarProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>
                <NavbarMenu />
                {children}
              </SidebarInset>
            </SidebarProvider>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}