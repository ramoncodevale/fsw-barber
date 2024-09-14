import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { isFuture, format } from "date-fns"; // Importando a função format
import { ptBR } from "date-fns/locale"; // Importando o locale correto
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const { service: { barbershop } } = booking
  const isConfirmed = isFuture(booking.date);
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 h-[180px] w-full flex items-end rounded-xl">
            <Image alt={`Mapa da Barbearia ${booking.service.barbershop.name}`}
              src="/map.png"
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 w-full mx-5 mb-3 ">
              <CardContent className="px-5 py-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>

            <Card className="mb-6 mt-3">
              <CardContent className="space-y-3 p-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <p className="text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Data</h2>
                  <p className="text-sm">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Horário</h2>
                  <p className="text-sm">
                    {format(booking.date, "HH:mm",{
                      locale: ptBR,
                  })}</p>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Barbearia</h2>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </CardContent>
            </Card>

            
          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
          </div>
        </SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};

export default BookingItem;
