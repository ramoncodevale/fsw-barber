import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import ServiceItem from "./_components/service-item";


const Home = async () => {
  // Chamar meu banco de dados 
  const barbershops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })


  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">Olá, Ramon!</h2>
        <p>Quinta-feira 22 de agosto</p>

        {/* Busca */}
       <div className="mt-6">
            <Search />
       </div>

        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
          <Button className="gap-2" variant="secondary" key={option.title} asChild>
            <Link href={`/barbershops?service=${option.title}`}>
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
           {option.title}
            </Link>
          </Button>
        ))}
        </div>


        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full rounded-xl">
          <Image
            alt="Agende com os melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        

        {/* Agendamento */}
       <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
