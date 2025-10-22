
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

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
        <main className="p-4 md:p-8 flex-1 relative">{children}
        <Button
            asChild
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg lg:hidden z-20"
          >
            <Link href="/dashboard/schedule">
              <CalendarPlus className="h-6 w-6" />
              <span className="sr-only">Agendar Consulta</span>
            </Link>
          </Button>
        </main>
        <footer className="p-4 md:p-6 border-t bg-card text-card-foreground">
          <div className="container flex items-center justify-between text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} AgendaSaúde.</span>
            <Link href="/accessibility" className="underline hover:text-primary">
              Acessibilidade
            </Link>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
