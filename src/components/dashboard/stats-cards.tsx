
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarCheck, Check, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/app-context";
import Link from "next/link";

export function StatsCards() {
  const { appointments, patients } = useAppContext();
  const patientId = patients[0]?.id; // Assume the first patient is the logged in user

  const scheduledAppointments = appointments.filter(a => a.patientId === patientId && a.status === 'scheduled').length;
  const completedAppointments = appointments.filter(a => a.patientId === patientId && a.status === 'completed').length;
  const canceledAppointments = appointments.filter(a => a.patientId === patientId && a.status === 'canceled').length;


  const stats = [
    {
      title: "Consultas Agendadas",
      value: scheduledAppointments,
      icon: CalendarCheck,
      href: "/dashboard/history",
    },
    {
      title: "Consultas Concluídas",
      value: completedAppointments,
      icon: Check,
      href: "/dashboard/history",
    },
    {
      title: "Consultas Canceladas",
      value: canceledAppointments,
      icon: Clock,
      href: "/dashboard/history",
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
