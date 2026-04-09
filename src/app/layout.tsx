import type { Metadata } from "next";
import { Archivo_Black, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-archivo-black" 
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "TransformBy10X | Ecosystem",
  description: "Identify digital fog and fix your system architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-[100dvh]`}>
        {children}
      </body>
    </html>
  );
}
