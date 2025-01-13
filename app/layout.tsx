import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  description: "A Stack Overfolw Clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${space_grotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
