import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { TRPCReactProvider } from "@/src/trpc/client";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ekkon - AI Voice Generator",
    template: "%s | Ekkon - AI Voice Generator",
  },
  description:
    "Ekkon is an AI voice generation platform that turns text into realistic, natural-sounding speech for stories, podcasts, marketing, and product experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <ClerkProvider>
          <TRPCReactProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
