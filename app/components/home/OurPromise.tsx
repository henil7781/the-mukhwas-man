import { ShieldCheck, Leaf, Truck, Star } from "lucide-react";

const features = [
  {
    icon: <Leaf className="text-[#D48D3B]" size={32} />,
    title: "100% Organic",
    desc: "Sourced from the finest natural gardens."
  },
  {
    icon: <ShieldCheck className="text-[#D48D3B]" size={32} />,
    title: "Artisanal Quality",
    desc: "Hand-blended using traditional royal recipes."
  },
  {
    icon: <Star className="text-[#D48D3B]" size={32} />,
    title: "Premium Taste",
    desc: "A perfect balance of sweet and savory notes."
  },
  {
    icon: <Truck className="text-[#D48D3B]" size={32} />,
    title: "Global Shipping",
    desc: "Bringing tradition to your doorstep worldwide."
  }
];

export default function Features() {
  return (
    <section className="bg-white py-16 px-6 border-b border-[#1A332E]/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 bg-[#FFFBF2] rounded-full group-hover:bg-[#E2E6D6] transition-colors">
              {item.icon}
            </div>
            <h4 className="font-serif font-bold text-[#1A332E] text-lg">{item.title}</h4>
            <p className="text-sm text-gray-500 max-w-[150px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}