import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

const SideBarButton = () => {
    return (
        <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto ">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex items-center border-b border-solid py-5 gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Avatar>

            <div>
              <p className="font-bold">Ramon</p>
              <p className="text-xs">Ramon.FullStakc@</p>
            </div>
          </div>

          <div className="flex flex-col border-b border-solid gap-2 py-5 ">
            <Link href="/">
              <Button className="justify-start gap-2" variant="ghost">
                <HomeIcon size={18} />
                Início
              </Button>
            </Link>
            <Button className="justify-start gap-2" variant="ghost">
              <CalendarIcon size={18} />
              Agendamentos
            </Button>
          </div>

          <div className="flex flex-col border-b border-solid gap-2 py-5">
            {quickSearchOptions.map((option) => (
              <Button
                key={option.title}
                className="justify-start gap-2"
                variant="ghost"
              >
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-2 py-5">
            <Button variant="ghost" className="justify-start gap-3">
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
}

export default SideBarButton;