
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-context";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { CreditCard, QrCode } from "lucide-react";

export default function BillingPage() {
  const { appointments, patients, getDoctorById } = useAppContext();
  const patientId = patients[0]?.id; // Assume the first patient is the logged in user

  const completedAppointments = React.useMemo(() => 
    appointments.filter(a => a.patientId === patientId && a.status === 'completed'),
    [appointments, patientId]
  );

  const totalDebt = React.useMemo(() => 
    completedAppointments.reduce((total, app) => total + app.price, 0),
    [completedAppointments]
  );

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contas Médicas</h1>
        <p className="text-muted-foreground">
          Veja e gerencie suas despesas médicas.
        p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extrato de Consultas</CardTitle>
          <CardDescription>
            Aqui estão todas as suas consultas concluídas e os valores correspondentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedAppointments.length > 0 ? (
                  completedAppointments.map((app) => {
                    const doctor = getDoctorById(app.doctorId);
                    return (
                      <TableRow key={app.id}>
                        <TableCell>{format(parseISO(app.date), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell>{doctor?.name || "N/A"}</TableCell>
                        <TableCell>{doctor?.specialty || "N/A"}</TableCell>
                        <TableCell className="text-right">{formatCurrency(app.price)}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhuma consulta concluída encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card className="max-w-md ml-auto w-full">
        <CardHeader>
            <CardTitle>Resumo e Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total de Consultas</span>
                <span>{completedAppointments.length}</span>
            </div>
             <div className="flex justify-between items-center font-bold text-lg">
                <span>Total a Pagar</span>
                <span>{formatCurrency(totalDebt)}</span>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">Escolha uma forma de pagamento:</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button>
                    <CreditCard className="mr-2"/>
                    Cartão de Crédito
                </Button>
                <Button variant="secondary">
                    <QrCode className="mr-2"/>
                    Pagar com Pix
                </Button>
             </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">O processamento do pagamento pode levar alguns minutos. Você receberá uma confirmação por e-mail.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
