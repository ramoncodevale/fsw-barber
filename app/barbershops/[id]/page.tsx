import BookingItem from "@/app/_components/booking-item"
import BookingSummary from "@/app/_components/booking-summary"
import Header from "@/app/_components/header"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
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

  return (
    <div>
      <div className="hidden lg:block">
        <Header hasSearch={true} />
      </div>


      {/* IMAGEM */}
      <div className="lg:px-32">
        <div className="relative h-[250px] w-full lg:h-[487px] lg:w-[758px] lg:flex justify-center items-center mt-10">
          <div className="hidden lg:flex items-center relative z-10"> {/* Adicione z-index aqui */}
          {bookings.map((booking) => (
      <BookingItem key={booking.id} booking={booking} />
    ))}
          </div>
          <Image
            alt={barbershop.name}
            src={barbershop?.imageUrl}
            fill
            className="object-cover"
          />
        </div>

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 lg:hidden"
          asChild
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
              className="absolute right-4 top-4 lg:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO */}
      <div className="border-b border-solid lg:px-32">
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex flex-col">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop?.address}</p>
            </div>
          </div>

          <Card className="lg:flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">
                  5,0
                </p>
                <span className="text-xs">(499 avaliações)</span>
              </div>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2 border-b border-solid p-5 lg:hidden">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="lg:flex items-center">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={barbershop}
                service={service}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTATO */}
      <div className="space-y-3 p-5 lg:hidden">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage