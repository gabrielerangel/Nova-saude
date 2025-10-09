
import { HistoryTable } from "@/components/tables/history-table";

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Minhas Consultas</h1>
        <p className="text-muted-foreground">
          Veja todas as suas consultas agendadas, concluídas e canceladas.
        </p>
      </div>
      <HistoryTable />
    </div>
  );
}
