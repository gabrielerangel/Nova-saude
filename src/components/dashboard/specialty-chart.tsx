
"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAppContext } from "@/contexts/app-context";
import { Skeleton } from "../ui/skeleton";

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function SpecialtyChart() {
  const { appointments, getDoctorById, isDataLoaded } = useAppContext();

  const chartData = React.useMemo(() => {
    const specialtyCount: { [key: string]: number } = {};
    appointments.forEach((app) => {
      const doctor = getDoctorById(app.doctorId);
      if (doctor) {
        specialtyCount[doctor.specialty] = (specialtyCount[doctor.specialty] || 0) + 1;
      }
    });

    return Object.entries(specialtyCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [appointments, getDoctorById]);
  
  if (!isDataLoaded) {
      return (
          <Card>
            <CardHeader>
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <Skeleton className="h-40 w-40 rounded-full" />
            </CardContent>
          </Card>
      )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultas por Especialidade</CardTitle>
        <CardDescription>
          Distribuição das suas consultas por área médica.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Legend iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex justify-center items-center h-52">
            <p className="text-sm text-muted-foreground">
              Nenhuma consulta para exibir no gráfico.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
