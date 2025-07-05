import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full ">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {/*<Logo />*/}
        <p className="font-reddit text-2xl font-bold mt-3 ml-2"><Link href="/">📦Inventoria</Link></p>
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
