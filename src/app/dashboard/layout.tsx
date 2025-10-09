
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 md:p-6 flex-1">{children}</main>
        <footer className="p-4 md:p-6 border-t">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} AgendaSaúde.</span>
            <Link href="/accessibility" className="ml-4 underline">
              Acessibilidade
            </Link>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
