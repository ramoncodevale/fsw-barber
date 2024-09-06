import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SideBarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import {
    ChevronLeftIcon,
    MapPinIcon,
    MenuIcon,
    StarIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarberShopPageProps {
    params: {
        id: string
    }
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
    // chamar o meu banco de dados
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })

    if (!barbershop) {
        return notFound()
    }

    console.log(barbershop.services)

    return (
        <div>
            {/* IMAGEM */}
            <div className="relative h-[250px] w-full">
                <Image alt={barbershop.name}
                    src={barbershop?.imageUrl}
                    fill
                    className="object-cover"
                />

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-4"
                >
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>


                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute top-4 right-4"
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SideBarSheet />
                </Sheet>
            </div>

            {/* TÍTULO */}
            <div className="border-b border-solid p-5">
                <h1 className="mb-3 font-bold text-xl">{barbershop.name}</h1>
                <div className="mb-2 flex items-center gap-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="fill-primary text-primary" size={18} />
                    <p className="text-sm">5,0 (889 avalições)</p>
                </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="spce-y-3 border-b border-solid p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
                <p className="text-justify text-sm">{barbershop?.description}</p>
            </div>

            {/* SERVIÇOS */}
            <div className="space-y-3 p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
                <div className="space-y-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            </div>


            {/* CONTATO */}
            <div className="p-5 space-y-3">
                {barbershop.phones.map(phone => (
                    <PhoneItem key={phone} phone={phone} />
                ))}
            </div>
        </div >
    );
}

export default BarberShopPage;