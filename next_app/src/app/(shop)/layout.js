"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SideCart from "@/components/layout/SideCart";

export default function ShopLayout({ children }) {
    return (
        <>
            <Navbar />
            <SideCart />
            <main className="min-h-screen pt-20">
                {children}
            </main>
            <Footer />
        </>
    );
}
