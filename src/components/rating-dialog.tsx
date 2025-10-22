
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Appointment, Doctor } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  appointment: Appointment | null;
  doctor: Doctor | undefined;
}

export function RatingDialog({ isOpen, onClose, onSubmit, appointment, doctor }: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHoverRating(0);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };
  
  if (!appointment || !doctor) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Avalie sua consulta</AlertDialogTitle>
          <AlertDialogDescription>
            Sua opinião é importante! Por favor, avalie a consulta com {doctor.name} realizada em {format(parseISO(appointment.date), "dd/MM/yyyy", { locale: ptBR })}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
             <Button variant="outline" onClick={onClose}>Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleSubmit} disabled={rating === 0}>Enviar Avaliação</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
