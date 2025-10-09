
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-4">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Agendar Consulta</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para criar um novo agendamento.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
            <CardTitle>Novo Agendamento</CardTitle>
            <CardDescription>Selecione o paciente, médico, data e hora.</CardDescription>
        </CardHeader>
        <CardContent>
            <AppointmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
