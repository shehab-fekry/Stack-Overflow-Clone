import React from "react";
import NavLinks from "../mobile-navbar/_comps/nav-links";
import { ROUTES } from "@/enums/routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col gap-6 flex-1 flex-shrink-0">
          <NavLinks />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            className="w-full !btn-secondary small-medium min-w-[41px] rounded-lg px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_IN}>
              <Image
                src="/icons/account.svg"
                height={20}
                width={20}
                alt="SignIn Icon"
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign In
              </span>
            </Link>
          </Button>

          <Button
            className="w-full btn-tertiary light-border-2 text-dark400_light900 small-medium min-w-[41px] rounded-lg px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_UP}>
              <Image
                src="/icons/sign-up.svg"
                height={20}
                width={20}
                alt="SignUp Icon"
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign Up
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
