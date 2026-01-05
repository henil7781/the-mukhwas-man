// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "The Mukhwas Man | Artisanal Digestive Blends",
  description: "Experience the royal tradition of handcrafted Mukhwas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#FFFBF2]">
        <Navbar />
        {/* main fills the space between navbar and footer */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}