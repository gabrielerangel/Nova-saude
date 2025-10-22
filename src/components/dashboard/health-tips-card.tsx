
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw } from "lucide-react";

const healthTips = [
  "Beba pelo menos 2 litros de água por dia para se manter hidratado.",
  "Faça 30 minutos de atividade física moderada na maioria dos dias da semana.",
  "Durma de 7 a 9 horas por noite para uma boa recuperação física e mental.",
  "Inclua frutas, verduras e legumes em todas as suas refeições.",
  "Evite o consumo excessivo de açúcar, sal e gorduras processadas.",
  "Faça pausas regulares durante o trabalho para alongar e descansar a vista.",
  "Lave as mãos com frequência para evitar a propagação de germes.",
  "Mantenha sua carteira de vacinação atualizada.",
  "Não se automedique. Procure um médico para o diagnóstico e tratamento corretos.",
  "Cuide da sua saúde mental. Reserve um tempo para relaxar e fazer atividades que você gosta."
];

export function HealthTipsCard() {
  const [tipIndex, setTipIndex] = useState<number>(0);

  // Generate random index on client side to avoid hydration mismatch
  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * healthTips.length));
  }, []);

  const getNewTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * healthTips.length);
    } while (newIndex === tipIndex);
    setTipIndex(newIndex);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
          Dica de Saúde
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{healthTips[tipIndex]}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={getNewTip} className="ml-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Nova Dica
        </Button>
      </CardFooter>
    </Card>
  );
}
