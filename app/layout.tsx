import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MainProvider from "@/context/main-provider";
import Navbar from "@/components/navigation/navbar";

const inter = Inter({
  variable: "--font-inter", // declared as variable to br used in CSS and TAILWIND
  subsets: ["latin"],
});

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk", // declared as variable to br used in CSS and TAILWIND
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${space_grotesk.variable} antialiased`}
      >
        <MainProvider>
          <Navbar />
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
