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
  title: "TransformBy10X | Less Digital Fog",
  description: "WIN decides. GOAL governs. FLOW executes. Build the infrastructure before you add more AI. Context Architecture first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916]`}>
        {children}
      </body>
    </html>
  );
}
