
import { PatientsTable } from "@/components/tables/patients-table";

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pacientes</h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova pacientes do sistema.
        </p>
      </div>
      <PatientsTable />
    </div>
  );
}
