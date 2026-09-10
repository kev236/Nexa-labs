import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nexa Labs — Small software. Big impact.",
  description: "Nexa Labs builds simple software products that solve real-world problems.",
  openGraph: {
    title: "Nexa Labs",
    description: "Small software. Big impact.",
    url: "https://nexalabs.com",
    siteName: "Nexa Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexa Labs",
    description: "Small software. Big impact.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}