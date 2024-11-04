import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LocationProvider } from "@/context/LocationContext";

const quicksand = localFont({
  src: "./fonts/Quicksand.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Simple weather appllication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable}`}>
        <LocationProvider>
          {children}
        </LocationProvider>
      </body>
    </html>
  );
}
