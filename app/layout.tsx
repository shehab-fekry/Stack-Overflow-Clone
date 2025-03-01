import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import RootProvider from "@/context/root-provider";
import { Toaster } from "@/components/ui/toaster";

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
      <head>
        {/* DevIcon CDN provider */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <body
        className={`${inter.className} ${space_grotesk.variable} antialiased`}
      >
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
