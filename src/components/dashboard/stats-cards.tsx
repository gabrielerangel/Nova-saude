"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Stethoscope, CalendarCheck } from "lucide-react";
import { useAppContext } from "@/contexts/app-context";
import Link from "next/link";

export function StatsCards() {
  const { patients, doctors, appointments } = useAppContext();
  
  const scheduledAppointments = appointments.filter(a => a.status === 'scheduled').length;

  const stats = [
    {
      title: "Total de Pacientes",
      value: patients.length,
      icon: Users,
      href: "/patients",
    },
    {
      title: "Total de Médicos",
      value: doctors.length,
      icon: Stethoscope,
      href: "/doctors",
    },
    {
      title: "Consultas Agendadas",
      value: scheduledAppointments,
      icon: CalendarCheck,
      href: "/history",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Link href={stat.href} key={stat.title}>
        <Card className="hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
        </Link>
      ))}
    </div>
  );
}
