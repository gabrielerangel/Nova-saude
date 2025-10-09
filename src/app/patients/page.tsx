import { PatientsTable } from "@/components/tables/patients-table";

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
        <p className="text-muted-foreground">
          Gerencie os pacientes cadastrados no sistema.
        </p>
      </div>
      <PatientsTable />
    </div>
  );
}
