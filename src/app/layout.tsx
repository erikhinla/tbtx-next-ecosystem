import type { Metadata } from "next";
import { Archivo_Black, DM_Sans, Outfit, JetBrains_Mono, Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollcraftGuard from "@/components/ScrollcraftGuard";

const archivoBlack = Archivo_Black({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-archivo-black" 
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Managing Digital Fog",
  description:
    "AI created a job. Nobody wanted. Start here. The Digital Fog Scan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${dmSans.variable} ${outfit.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${spaceGrotesk.variable} antialiased min-h-[100dvh] bg-[#0d1210] text-[#f2f1ea]`}>
        <ScrollcraftGuard />
        {children}
      </body>
    </html>
  );
}
