"use client";
import { useSession, signOut } from "next-auth/react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import ToggleThemeSwitch from "./toggle-theme";
import {
  BellIcon,
  GearIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

export default function NavbarMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  const user = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "guest@example.com",
    image: session?.user?.image || "/avatars/shadcn.jpg",
  };

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md rounded-t-xl flex h-13 shrink-0 items-center border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mb-6">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 pr-4">
        <ToggleThemeSwitch />

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping
          +rounded-full bg-red-400 opacity-75"
            ></span>
            <span
              className="relative inline-flex h-2 w-2 rounded-full bg-red
          +-500"
            ></span>
          </span>
        </Button>

        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.image} alt={user.name || "User"} />
                <AvatarFallback>
                  {(user.name || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-row justify-center items-center gap-2">
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarImage src={user.image} alt={user.name || "User"} />
                  <AvatarFallback>
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email || "No email"}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-0 text-destructive hover:text-destructive"
                onClick={logout}
              >
                <SignOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={logout}>
              <SignOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
