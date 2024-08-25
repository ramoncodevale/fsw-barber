import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShop-Item";
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item";


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
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua Busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
          <Button className="gap-2" variant="secondary" key={option.title}>
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
            Cabelo
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

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">© 2023 Copyright FSW Barber</p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
