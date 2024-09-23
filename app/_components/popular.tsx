"use client"

import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "../_hooks/use-carousel";


interface PopularProps {
    barbershops: Barbershop[];

}

const Popular = ({ barbershops }: PopularProps) => {
    const { scrollRight, carouselRef, scrollLeft, isLeftDisabled, isRightDisabled } = useCarousel();

    return (  
        <div className="flex justify-center items-center">
        {!isLeftDisabled && (
            <Button
                variant="outline"
                className="rounded-full px-2 py-1.5"
                onClick={scrollLeft}
            >
                <ChevronLeft />
            </Button>
        )}

        {/* Lista de barbearias */}
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden" ref={carouselRef}>
            {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
        </div>

        {!isRightDisabled && (
            <Button
                variant="outline"
                className="rounded-full px-2 py-1.5"
                onClick={scrollRight}
            >
                <ChevronRight />
            </Button>
        )}
    </div>

    );
}
 
export default Popular;