import { ReactNode } from "react";
import NextThemeProvider from "../next-themes";

const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </>
  );
};

export default MainProvider;
