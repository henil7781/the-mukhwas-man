import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SideCart = () => {
    const { isCartOpen, toggleCart, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    // Nudge Logic: Free sample at ₹999
    const FREE_GIFT_THRESHOLD = 999;
    const amountToFreeGift = Math.max(0, FREE_GIFT_THRESHOLD - cartTotal);
    const progressPercent = Math.min(100, (cartTotal / FREE_GIFT_THRESHOLD) * 100);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-royal-cream shadow-2xl z-50 flex flex-col border-l border-royal-gold/20"
                    >
                        {/* Header */}
                        <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <ShoppingBag className="w-5 h-5 text-royal-gold" />
                                <h2 className="font-serif text-xl font-bold text-royal-dark">Your Bag ({cartItems.length})</h2>
                            </div>
                            <button onClick={toggleCart} className="text-gray-400 hover:text-royal-dark transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nudge Bar */}
                        <div className="bg-royal-green/5 p-4 border-b border-royal-green/10">
                            <p className="text-sm text-royal-dark font-medium mb-2 text-center">
                                {amountToFreeGift > 0
                                    ? <span>Add <span className="text-royal-gold font-bold">₹{amountToFreeGift}</span> more for a Free Rose Mukhwas!</span>
                                    : <span className="text-royal-green font-bold">🎉 You've unlocked a Free Gift!</span>}
                            </p>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-royal-gold to-yellow-400 transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-20 opacity-50">
                                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p>Your bag is empty.</p>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-50"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-serif font-semibold text-royal-dark line-clamp-1">{item.name}</h3>
                                                <p className="text-xs text-gray-500">{item.category}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-2 py-1">
                                                        <button onClick={() => updateQuantity(item.id, 'dec')} className="p-1 hover:text-royal-gold"><Minus className="w-3 h-3" /></button>
                                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 'inc')}
                                                            className="p-1 hover:text-royal-gold disabled:opacity-30 disabled:cursor-not-allowed"
                                                            disabled={item.quantity >= (item.stock || 50)}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    {item.quantity >= (item.stock || 50) && (
                                                        <span className="text-[10px] text-orange-600 font-medium mt-1 ml-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100 block">
                                                            Heads up! We only have {item.stock} left.
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="font-bold text-royal-green">₹{item.price * item.quantity}</span>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center">
                                                        <Trash2 className="w-3 h-3 mr-1" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-serif text-2xl font-bold text-royal-dark">₹{cartTotal}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout</p>
                            <button
                                className="w-full bg-royal-green text-white py-4 rounded-full font-bold text-lg hover:bg-royal-dark transition-all transform active:scale-95 shadow-lg shadow-royal-green/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cartItems.length === 0}
                                onClick={() => {
                                    toggleCart();
                                    navigate('/checkout');
                                }}
                            >
                                Checkout Securely
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SideCart;
