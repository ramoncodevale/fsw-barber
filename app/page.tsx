import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShop-Item";

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
          <Button className="gap-2" variant="secondary">
            <Image src="/cabelo.svg" width={16} height={16} alt="cabelo" />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" width={16} height={16} alt="barba" />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <FootprintsIcon size={16} />
            Pezinho
          </Button>

          <Button className="gap-2" variant="secondary">
           <EyeIcon size={16}/>
           Sobrancelha
          </Button>
        
        
          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>


          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>


          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>


          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image 
            src="/acabamento.svg" 
            width={16} height={16} 
            alt="acabamento" 
            />
            Acabamento
          </Button>



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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          AGENDAMENTOS
        </h2>


        <Card>
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3>Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">22</p>
              <p className="text-sm">17:14</p>
            </div>
          </CardContent>
        </Card>

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
