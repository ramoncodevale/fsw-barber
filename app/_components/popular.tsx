"use client";

import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PopularProps {
  barbershops: Barbershop[];
}

const Popular = ({ barbershops }: PopularProps) => {
  return (
    <div className="relative flex justify-between items-center w-full">
      <Button
        variant="outline"
        className="absolute left-0 z-10 hidden lg:block rounded-full p-2"
        // Ação removida (scrollLeft)
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
        // Ação removida (scrollRight)
        disabled
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Popular;
