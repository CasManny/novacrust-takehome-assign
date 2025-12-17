import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import GlobalContextProviders from "@/context/providers";
import { clashDisplay } from "./font";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Novacrust",
  description: "Get Paid Globally. Spend Locally & Worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${clashDisplay.variable} bg-black px-5 md:px-0 antialiased font-sans`}
      >
        <GlobalContextProviders>{children}</GlobalContextProviders>
      </body>
    </html>
  );
}
