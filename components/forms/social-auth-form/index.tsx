"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/enums/index";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SocialAuthForm = () => {
  const { toast } = useToast();

  const signinHandler = async (provider: "github" | "google") => {
    try {
      await signIn(provider, { redirectTo: ROUTES.HOME });
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        description:
          error instanceof Error
            ? error.message
            : "Please check your network connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className="background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5"
        onClick={() => signinHandler("github")}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className=" invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>
      <Button
        className="background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5"
        onClick={() => signinHandler("google")}
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
