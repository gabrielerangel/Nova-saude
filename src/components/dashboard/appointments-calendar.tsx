
"use client";

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
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md p-0"
        classNames={{
          cell: "h-9 w-9 text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        }}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
  );
}
