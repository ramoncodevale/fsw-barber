"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@prisma/client";
import { Button } from "./ui/button";

interface RecomendedProps {
  barbershops: Barbershop[];
}

const Recomended = ({ barbershops }: RecomendedProps) => {
  return (
    <div className="relative flex justify-between items-center w-full">
      <Button
        variant="outline"
        className="absolute left-0 z-10 hidden lg:block rounded-full p-2"
        disabled
      >
        <ChevronLeft />
      </Button>

      {/* Verificação de barbearias */}
      {barbershops.length === 0 ? (
        <p className="text-gray-500">Nenhuma barbearia encontrada.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth w-full">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      )}

      <Button
        variant="outline"
        className="absolute right-0 z-10 hidden lg:block rounded-full p-2"
        disabled
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Recomended;
