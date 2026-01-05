import { ArrowRight, Mail, Instagram, Twitter } from "lucide-react";
import Link from "next/link"; // Note: Use "next/link" for navigation, not "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1A332E] text-[#E2E6D6] py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold">The Mukhwas Man</h3>
          <p className="text-sm opacity-70 max-w-xs">
            Bringing authentic after-meal traditions to the modern world, one seed at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Explore</h4>
          <Link href="/shop" className="hover:underline text-sm opacity-80">Shop All</Link>
          <Link href="/story" className="hover:underline text-sm opacity-80">Our Story</Link>
          <Link href="/contact" className="hover:underline text-sm opacity-80">Contact Us</Link>
        </div>

        {/* Newsletter / Socials */}
        <div className="space-y-4">
          <h4 className="font-bold uppercase tracking-widest text-xs">Stay Updated</h4>
          <div className="flex items-center border-b border-[#E2E6D6]/30 pb-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent outline-none text-sm w-full placeholder:text-[#E2E6D6]/40"
            />
            <ArrowRight size={16} className="opacity-60" />
          </div>
          <div className="flex space-x-4 pt-2">
            <Instagram size={20} className="cursor-pointer hover:opacity-70" />
            <Twitter size={20} className="cursor-pointer hover:opacity-70" />
            <Mail size={20} className="cursor-pointer hover:opacity-70" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs opacity-50">
        <p>© {new Date().getFullYear()} The Mukhwas Man. Crafted with care.</p>
      </div>
    </footer>
  );
}