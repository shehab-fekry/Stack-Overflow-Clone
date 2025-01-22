import { ReactNode } from "react";
import NextThemeProvider from "../next-themes";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const RootProvider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  console.log("🚀 ~ RootProvider ~ session:", session);

  return (
    <>
      <NextThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </NextThemeProvider>
    </>
  );
};

export default RootProvider;
