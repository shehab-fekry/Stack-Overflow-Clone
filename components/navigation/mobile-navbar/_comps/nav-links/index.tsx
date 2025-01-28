"use client";

import { SheetClose } from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/enums/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  // replace later with real user id
  const userId = 1;

  return (
    <>
      {SIDEBAR_LINKS.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        if (link.route === "/profile") {
          if (userId) {
            link.route = `${link.route}/${userId}`;
          } else return null;
        }

        const LinkComponent = (
          <Link
            href={link.route}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light900"
                : "text-dark300_light900",
              "flex flex-row justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              className={cn({ "invert-colors": !isActive })}
              src={link.imgURL}
              width={20}
              height={20}
              alt="Nav Link"
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={"link_" + link.label + link.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={"link_" + link.label + link.route}>
            {LinkComponent}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
