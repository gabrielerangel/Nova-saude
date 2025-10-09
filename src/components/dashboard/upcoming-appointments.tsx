"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/app-context";
import { format, isFuture, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock } from "lucide-react";

export function UpcomingAppointments() {
  const { appointments, getPatientById, getDoctorById } = useAppContext();

  const upcoming = appointments
    .filter(a => a.status === 'scheduled' && isFuture(parseISO(`${a.date}T${a.time}:00`)))
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Consultas</CardTitle>
        <CardDescription>As 5 próximas consultas agendadas.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((app) => {
              const patient = getPatientById(app.patientId);
              const doctor = getDoctorById(app.doctorId);
              const patientAvatar = PlaceHolderImages.find(img => img.description.includes(patient?.name.split(' ')[0] || ''));
              
              if (!patient || !doctor) return null;

              return (
                <div key={app.id} className="flex items-center justify-between space-x-4 p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={patientAvatar?.imageUrl} alt={patient.name} data-ai-hint={patientAvatar?.imageHint} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">com {doctor.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4" />
                        {format(parseISO(app.date), "dd/MM/yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {app.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhuma consulta futura agendada.</p>
        )}
      </CardContent>
    </Card>
  );
}
