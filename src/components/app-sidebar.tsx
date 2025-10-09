
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarPlus,
  History,
  LogOut,
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Pacientes", icon: Users },
  { href: "/doctors", label: "Médicos", icon: Stethoscope },
  { href: "/schedule", label: "Agendar", icon: CalendarPlus },
  { href: "/history", label: "Histórico", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-2">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/login">
                <SidebarMenuButton tooltip="Sair">
                    <LogOut />
                    <span>Sair</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
