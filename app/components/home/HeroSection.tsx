import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[45vh] bg-[#1A332E] flex items-center overflow-hidden">
      {/* Background Decorative Gradient/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A332E] via-transparent to-transparent" />

      <div className="max-w-5xl mx-auto px-0 py-10 md:py-10 flex flex-col md:flex-row items-center gap-6 z-10">
        
        {/* Left Content: Typography and CTAs */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <div className="space-y-4">
            <h2 className="text-[#D48D3B] text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight">
              Rediscover the <br /> 
              <span className="text-white">Art of </span>
              <span className="text-[#D48D3B]">Mukhwas</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
              Handcrafted digestive blends made from the finest ingredients. 
              A perfect ending to every meal, fit for royalty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-4">
            <Link 
              href="/shop" 
              className="bg-[#D48D3B] text-[#0B1C18] px-10 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-[#b87a32] transition-all font-bold text-lg shadow-lg"
            >
              Shop Collection <ArrowRight size={20} />
            </Link>
            
            <Link 
              href="/about" 
              className="border border-white/30 text-white px-10 py-4 rounded-full flex items-center justify-center hover:bg-white/10 transition-all font-bold text-lg"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Right Content: Product Banner */}
        <div className="flex-1 w-full max-w-2xl relative group">
          {/* Subtle Glow behind the image */}
          <div className="absolute inset-0 bg-[#D48D3B]/10 blur-[100px] rounded-full group-hover:bg-[#D48D3B]/20 transition-all duration-700" />
          
          <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
            <img 
              src="https://bullionmukhwas.com/cdn/shop/files/xmas_1.png?v=1766566522" 
              alt="The Mukhwas Man Collection" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Overlay Gradient for Text Readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Seasonal / Decorative Accent (Bottom Right Santa/Reindeer as seen in site) */}
      <div className="absolute bottom-10 right-10 opacity-40 md:opacity-100 pointer-events-none hidden lg:block">
        {/* You can place a small decorative SVG or PNG here to match the site's festive look */}
      </div>
    </section>
  );
}