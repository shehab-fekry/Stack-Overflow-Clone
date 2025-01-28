import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/enums/routes";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./_comps/nav-links";

const MobileNavigation = () => {
  return (
    <Sheet>
      {/* hamurger trigger */}
      <SheetTrigger asChild>
        <Image
          className="invert-colors sm:hidden"
          src={"/icons/hamburger.svg"}
          height={36}
          width={36}
          alt="Menu Icon"
        />
      </SheetTrigger>

      {/* content */}
      <SheetContent
        className="background-light900_dark200 border-none"
        side="left"
        aria-describedby={undefined}
      >
        {/* Header */}
        <SheetHeader>
          {/* if you remove this an error occurs */}
          <SheetTitle className="hidden">Navigation</SheetTitle>
          {/* Logo */}
          <Link className="flex items-center gap-1" href={ROUTES.HOME}>
            <Image
              src="/images/site-logo.svg"
              height={30}
              width={30}
              alt="Site sLogo"
            />
            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Flow</span>
            </p>
          </Link>
        </SheetHeader>

        <div className="no-scrollbar flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto">
          {/* Links */}
          <SheetClose asChild>
            <section className="flex flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="w-full !btn-secondary small-medium min-w-[41px] rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="w-full btn-tertiary light-border-2 text-dark400_light900 small-medium min-w-[41px] rounded-lg px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
