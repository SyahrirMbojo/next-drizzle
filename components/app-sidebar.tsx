"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RowsIcon,
  WaveformIcon,
  CommandIcon,
  TerminalIcon,
  RobotIcon,
  BookOpenIcon,
  GearIcon,
  CropIcon,
  ChartPieIcon,
  MapTrifoldIcon,
  GaugeIcon,
  ChartBarIcon,
  ListStarIcon,
  ArchiveIcon,
  ArticleIcon,
} from "@phosphor-icons/react";
import { url } from "node:inspector";
import NavHome from "./nav-home";
import HeaderSidebar from "./header-sidebar";

// This is sample data.
const data = {
  user: {
    name: "Syahrir Mbojo",
    email: "syahrir@master.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <RowsIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <WaveformIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <CommandIcon />,
      plan: "Free",
    },
  ],
  mainMenu: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <GaugeIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: <ListStarIcon />,
    },
    {
      title: "Articles",
      url: "/article",
      icon: <ArticleIcon />,
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: <ArchiveIcon />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: <RobotIcon />,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <GearIcon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <CropIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <ChartPieIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapTrifoldIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavHome items={data.mainMenu} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
