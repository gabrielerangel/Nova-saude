
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAppContext } from "@/contexts/app-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade." }),
  doctorId: z.string({ required_error: "Selecione um médico." }),
  date: z.date({ required_error: "Selecione uma data." }),
  time: z.string({ required_error: "Selecione um horário." }),
  type: z.enum(["presencial", "online"], { required_error: "Selecione o tipo de consulta."}),
});

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00",
  "14:30", "15:00", "15:30", "16:00", "16:30",
];

export function AppointmentForm() {
  const { patients, doctors, addAppointment, appointments } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "presencial",
    },
  });

  const watchDate = form.watch("date");
  const watchDoctorId = form.watch("doctorId");
  const watchSpecialty = form.watch("specialty");

  const availableTimeSlots = timeSlots.filter(slot => {
    if (!watchDate || !watchDoctorId) return true;
    const dateStr = format(watchDate, "yyyy-MM-dd");
    return !appointments.some(app => 
        app.doctorId === watchDoctorId && app.date === dateStr && app.time === slot
    );
  });
  
  const specialties = React.useMemo(() => [...new Set(doctors.map(d => d.specialty))], [doctors]);
  const filteredDoctors = React.useMemo(() => doctors.filter(d => d.specialty === watchSpecialty), [doctors, watchSpecialty]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const patientId = patients[0]?.id;
    if (!patientId) {
        toast({ title: "Erro", description: "Nenhum paciente encontrado.", variant: "destructive" });
        return;
    }
    
    const {specialty, ...rest} = values;

    const formattedValues = {
      ...rest,
      patientId,
      date: format(values.date, "yyyy-MM-dd"),
    };

    addAppointment(formattedValues);
    toast({
      title: "Sucesso!",
      description: "Consulta agendada com sucesso.",
    });
    router.push("/dashboard/history");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médico</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchSpecialty}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o médico" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredDoctors.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Consulta</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="presencial" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Presencial
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="online" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Online
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data da Consulta</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date.getDay() === 0 || // Domingos
                        date.getDay() === 6    // Sábados
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchDate || !watchDoctorId}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-slots" disabled>Nenhum horário disponível</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Agendar Consulta</Button>
      </form>
    </Form>
  );
}
