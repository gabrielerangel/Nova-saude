"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useAppContext } from "@/contexts/app-context";
import * as React from "react";
import { format } from "date-fns";

export function AppointmentsCalendar() {
  const { appointments } = useAppContext();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const appointmentDates = React.useMemo(() => {
    return appointments
      .filter(a => a.status === 'scheduled')
      .map(a => format(new Date(a.date), "yyyy-MM-dd"));
  }, [appointments]);

  const modifiers = {
    highlighted: (day: Date) => appointmentDates.includes(format(day, "yyyy-MM-dd")),
  };

  const modifiersStyles = {
    highlighted: {
      color: 'hsl(var(--primary-foreground))',
      backgroundColor: 'hsl(var(--primary))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário</CardTitle>
        <CardDescription>Dias com consultas estão destacados.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />
      </CardContent>
    </Card>
  );
}
