"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useCartStore } from "../../store/useCartStore"; // Verify path
import CartDrawer from "./CartDrawer"; // Verify path

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // For Mobile Menu
  const pathname = usePathname();

  // Get Cart state from Zustand store
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Story', href: '/about' },
  ];

  return (
    <>
      <nav className="bg-[#FFFBF2] border-b border-black/10 p-6 md:p-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex-1 text-[#1A332E]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Brand/Logo */}
          <div className="flex-1 text-center md:text-left">
            <Link href="/" className="text-[#1A332E] text-xl md:text-2xl font-serif font-bold tracking-tight">
              The Mukhwas Man
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-bold transition-colors ${isActive(link.href) ? "text-[#D48D3B]" : "text-[#1A332E] hover:opacity-60"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex-1 flex items-center justify-end space-x-6 text-[#1A332E]">
            {/* Cart Icon - Clicking this opens the drawer via store */}
            <div className="relative cursor-pointer hover:opacity-70" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={28} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D48D3B] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            
            <div className="text-white bg-[#1A332E] w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold cursor-pointer">
              HE
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#FFFBF2] absolute top-full left-0 w-full border-b border-black/10 flex flex-col p-6 space-y-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-serif font-bold ${isActive(link.href) ? "text-[#D48D3B]" : "text-[#1A332E]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Cart Drawer Component - Controlled by Store */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}