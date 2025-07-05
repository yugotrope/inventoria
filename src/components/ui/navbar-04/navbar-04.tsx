import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";
import ThemeSwitch from "@/components/switch-07";

const NavBar = async () => {
  const user = await stackServerApp.getUser();
  const app = await stackServerApp.urls;

  return (
      <nav className="z-30 fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          {/*<Logo />*/}
          <p className="font-reddit sm:text-2xl font-bold"><Link href="/">📦Inventoria</Link></p>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <ThemeSwitch/>
            { !user ? (
              <>
              <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full font-reddit"
            >
              <Link href={app.signIn}>
                Sign In
              </Link>
            </Button>
            <Button className="rounded-full font-reddit">
              <Link href={app.signUp}>
              Get Started
              </Link>
              </Button>
            </>) : (
              <UserButton
                showUserInfo={false}
              />
            )
            
            }
            

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
  );
};

export default NavBar;
