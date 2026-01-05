"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, removeItem, updateQuantity } = useCartStore();

  // Calculate Subtotal
const subtotal = items.reduce((acc, item) => {
  // Check if item.price exists, otherwise default to "0"
  const priceString = item.price || "0"; 
  const priceValue = parseInt(priceString.replace(/[^0-9]/g, ""));
  
  // If parseInt fails (NaN), use 0
  return acc + (isNaN(priceValue) ? 0 : priceValue) * item.quantity;
}, 0);  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FFFBF2] z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1A332E]/10 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-serif font-bold text-[#1A332E]">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#1A332E]">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 italic font-serif">Your cart is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.category}`} className="flex gap-4 border-b border-[#1A332E]/5 pb-6 items-center">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-black/5">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow space-y-1">
                      <h4 className="font-serif font-bold text-[#1A332E] text-lg leading-tight">{item.title}</h4>
                      <p className="text-[#D48D3B] font-bold text-sm">{item.price}</p>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex items-center border border-[#1A332E]/20 rounded-full px-2 py-1 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-[#D48D3B] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold text-[#1A332E] text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-[#D48D3B] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#1A332E]/10 bg-white space-y-4">
                <div className="flex justify-between items-center text-[#1A332E]">
                  <span className="font-serif text-lg">Subtotal</span>
                  <span className="text-xl font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-500 text-center uppercase tracking-widest">Shipping & taxes calculated at checkout</p>
                <button className="w-full bg-[#1A332E] text-white py-4 rounded-full font-bold text-lg hover:bg-[#2a4d45] transition-all shadow-lg active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}