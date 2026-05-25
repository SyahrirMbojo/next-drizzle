import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { FlowerIcon } from "@phosphor-icons/react";

export default function HeaderSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <FlowerIcon fontVariant="fill" className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-bold text-base">Mbojo UI</span>
              <span className="text-xs text-green-600">v1.0.0</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
