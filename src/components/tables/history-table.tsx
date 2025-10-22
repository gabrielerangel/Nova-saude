
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Calendar, Stethoscope, Search, Star } from "lucide-react";
import { useAppContext } from "@/contexts/app-context";
import { Appointment } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "../ui/input";
import { RatingDialog } from "../rating-dialog";

export function HistoryTable() {
  const { appointments, patients, doctors, updateAppointment } = useAppContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [ratingAppointment, setRatingAppointment] = React.useState<Appointment | null>(null);

  const patientId = patients[0]?.id; // Assume the first patient is the logged in user

  const data = React.useMemo(() => appointments.filter(a => a.patientId === patientId).map(app => {
    const patient = patients.find(p => p.id === app.patientId);
    const doctor = doctors.find(d => d.id === app.doctorId);
    return {
      ...app,
      patientName: patient?.name || 'N/A',
      doctorName: doctor?.name || 'N/A',
      specialty: doctor?.specialty || 'N/A',
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [appointments, patients, doctors, patientId]);

  const handleMarkAsCompleted = (appointment: Appointment) => {
    updateAppointment({ ...appointment, status: 'completed' });
    if (!appointment.rating) {
      setRatingAppointment(appointment);
    }
  };

  const handleRatingSubmit = (rating: number) => {
    if (ratingAppointment) {
      updateAppointment({ ...ratingAppointment, rating });
      setRatingAppointment(null);
    }
  };


  const columns: ColumnDef<typeof data[0]>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground"/>
            <span>{format(parseISO(row.original.date), "dd/MM/yyyy", { locale: ptBR })}</span>
        </div>
      ),
    },
    {
        accessorKey: "time",
        header: "Hora"
    },
    {
      accessorKey: "doctorName",
      header: "Médico",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground"/>
            <div>
              <p>{row.original.doctorName}</p>
              <p className="text-xs text-muted-foreground">{row.original.specialty}</p>
            </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variant: "default" | "secondary" | "destructive" | "outline" =
          status === "completed" ? "default" : status === "scheduled" ? "secondary" : "destructive";
        if(variant === "default") {
            return <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>
        }
        return <Badge variant={variant}>{status === 'scheduled' ? 'Agendada' : 'Cancelada'}</Badge>;
      },
    },
    {
      accessorKey: "rating",
      header: "Avaliação",
      cell: ({ row }) => {
        const { rating } = row.original;
        if (typeof rating !== 'number') return <span className="text-muted-foreground">-</span>;
        
        return (
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const appointment = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mudar Status</DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => handleMarkAsCompleted(appointment)}
                disabled={appointment.status === 'completed' || appointment.status === 'canceled'}
              >
                Marcar como Concluída
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => updateAppointment({ ...appointment, status: 'canceled' })}
                disabled={appointment.status === 'completed' || appointment.status === 'canceled'}
              >
                Cancelar Consulta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
        <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Filtrar por médico ou especialidade..."
                value={(table.getColumn("doctorName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("doctorName")?.setFilterValue(event.target.value)
                }
                className="pl-10"
                />
            </div>
        </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum agendamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
       <RatingDialog
        isOpen={!!ratingAppointment}
        onClose={() => setRatingAppointment(null)}
        onSubmit={handleRatingSubmit}
        appointment={ratingAppointment}
        doctor={doctors.find(d => d.id === ratingAppointment?.doctorId)}
      />
    </div>
  );
}
