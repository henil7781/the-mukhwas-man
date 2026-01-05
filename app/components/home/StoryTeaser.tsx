export default function StoryTeaser() {
  return (
    <section className="bg-[#1A332E] py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Decorative Image Container */}
        <div className="flex-1 relative">
          <div className="absolute -inset-4 border border-[#D48D3B]/30 rounded-2xl transform -rotate-3"></div>
          <div className="relative border-[#D48D3B]/30 rounded-2xl aspect-video md:aspect-square flex items-center justify-center overflow-hidden">
            <img 
              src="https://joyspoon.in/cdn/shop/files/Untitled-3-09.jpg?v=1739182729&width=600" 
              alt="Tradition" 
              className="object-cover w-full h-full opacity-90"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-[#E2E6D6] space-y-6">
          <h3 className="text-[#D48D3B] uppercase tracking-widest text-sm font-bold">Inherited Legacy</h3>
          <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
            Crafting the Art of <span className="italic text-[#D48D3B]">Mukhwas</span>
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            The Mukhwas Man was born from a desire to preserve the vanishing tradition of authentic post-meal digestive blends. Every seed is sun-dried and every blend is curated to transport you back to the royal courtyards of India.
          </p>
          <div className="pt-4">
            <button className="border-b-2 border-[#D48D3B] pb-1 font-bold tracking-wide hover:text-[#D48D3B] transition-all">
              DISCOVER OUR JOURNEY
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}