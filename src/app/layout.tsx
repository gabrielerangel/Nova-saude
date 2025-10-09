
import type { Metadata } from "next";
import { AppContextProvider } from "@/contexts/app-context";
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgendaSaúde",
  description: "Sistema de Agendamento Médico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppContextProvider>
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
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  );
}
