
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/app-context";
import { format, isFuture, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock, Stethoscope } from "lucide-react";

export function UpcomingAppointments() {
  const { appointments, getPatientById, getDoctorById, patients } = useAppContext();
  const patientId = patients[0]?.id; // Assume the first patient is the logged in user

  const upcoming = appointments
    .filter(a => a.patientId === patientId && a.status === 'scheduled' && isFuture(parseISO(`${a.date}T${a.time}:00`)))
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Próximas Consultas</CardTitle>
        <CardDescription>As 5 próximas consultas agendadas.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((app) => {
              const patient = getPatientById(app.patientId);
              const doctor = getDoctorById(app.doctorId);
              const doctorAvatar = PlaceHolderImages.find(img => img.id.startsWith('doctor'));
              
              if (!patient || !doctor) return null;

              return (
                <div key={app.id} className="flex items-center justify-between space-x-4 p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={doctorAvatar?.imageUrl} alt={doctor.name} data-ai-hint={doctorAvatar?.imageHint} />
                        <AvatarFallback>{doctor.name.charAt(4)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="flex items-center gap-2 text-sm font-medium leading-none">
                            <Stethoscope className="h-4 w-4 text-muted-foreground"/> 
                            {doctor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
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
