
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { AppointmentsCalendar } from "@/components/dashboard/appointments-calendar";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Dashboard</h1>
          <p className="text-muted-foreground">
            Sua visão geral de saúde.
          </p>
        </div>
        <Button asChild>
            <Link href="/dashboard/schedule">
                <CalendarPlus className="mr-2"/>
                Agendar Consulta
            </Link>
        </Button>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div className="lg:col-span-1">
          <AppointmentsCalendar />
        </div>
      </div>
    </div>
  );
}
