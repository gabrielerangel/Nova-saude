
import { DoctorsTable } from "@/components/tables/doctors-table";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Médicos</h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova médicos do sistema.
        </p>
      </div>
      <DoctorsTable />
    </div>
  );
}
