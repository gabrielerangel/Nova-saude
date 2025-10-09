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
import { MoreHorizontal, Calendar, User, Stethoscope } from "lucide-react";
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

export function HistoryTable() {
  const { appointments, patients, doctors, updateAppointment } = useAppContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const data = React.useMemo(() => appointments.map(app => {
    const patient = patients.find(p => p.id === app.patientId);
    const doctor = doctors.find(d => d.id === app.doctorId);
    return {
      ...app,
      patientName: patient?.name || 'N/A',
      doctorName: doctor?.name || 'N/A',
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [appointments, patients, doctors]);


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
      accessorKey: "patientName",
      header: "Paciente",
       cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground"/>
            <span>{row.original.patientName}</span>
        </div>
      ),
    },
    {
      accessorKey: "doctorName",
      header: "Médico",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground"/>
            <span>{row.original.doctorName}</span>
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
              <DropdownMenuItem onClick={() => updateAppointment({ ...appointment, status: 'completed' })}>
                Marcar como Concluída
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateAppointment({ ...appointment, status: 'canceled' })}>
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
            <Input
            placeholder="Filtrar por paciente..."
            value={(table.getColumn("patientName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("patientName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
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
    </div>
  );
}
