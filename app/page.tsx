import Header from "./_components/header";
import Image from "next/image";
import { db } from "./_lib/prisma";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getConfirmedBookings } from "./data/get-confirmed-bookings";
import Recomended from "./_components/recomended";
import Popular from "./_components/popular";
import { Button } from "./_components/ui/button";

// Função assíncrona para buscar dados do servidor
const getData = async () => {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const confirmedBookings = await getConfirmedBookings();
  return { session, barbershops, confirmedBookings };
};

const Home = async () => {
  const { session, barbershops, confirmedBookings } = await getData();

  return (
    <div>
      {/* header */}
      <Header hasSearch={false} />
      <div className="p-5 lg:mt-16 lg:px-32">
        {/* TEXTO */}
        <div className="lg:flex">
          <div className="lg:flex flex-col">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? `${session.user.name}` : "Faça seu login!"}
            </h2>
            <p>
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>

            {/* BUSCA */}
            <div className="mt-6">
              <Search />
            </div>

            {/* BUSCA RÁPIDA */}
            <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden lg:overflow-x-auto lg:flex-wrap">
              {quickSearchOptions.map((option) => (
                <Button
                  className="gap-2"
                  variant="secondary"
                  key={option.title}
                  asChild
                >
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

            {/* IMAGEM */}
            <div className="relative mt-6 h-[150px] w-full lg:h-[300px]">
              <Image
                alt="Agende nos melhores com FSW Barber"
                src="/banner.png"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>

                {/* AGENDAMENTO */}
                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden lg:overflow-x-auto">
                  {confirmedBookings.map((booking) => (
                    <div className="w-full md:w-1/2 lg:w-1/3" key={booking.id}>
                      <BookingItem
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:mt-0">
                Recomendados
              </h2>
              <div className="flex flex-wrap gap-4">
                <Recomended barbershops={barbershops} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Populares
            </h2>
            <div className="flex flex-wrap gap-4">
              <Popular barbershops={barbershops} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
