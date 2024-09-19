"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useSession } from "next-auth/react"

const Header = () => {
  const { data } = useSession()

  return (
    <Card className="lg:px-32">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>


        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>
        <ul className="hidden lg:flex items-center gap-10">
          <li className="flex items-center gap-2">
            <CalendarIcon size={18} />
            <Link href="/bookings">
              Agendamentos</Link>
          </li>
          <li className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <p className="font-bold">{data?.user?.name ?? ""}</p>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default Header