import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-royal-cream flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4 text-center">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-xl"
                >
                    <Check className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="font-serif text-3xl font-bold text-royal-dark mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-8">We've received your order. You'll receive a WhatsApp update with tracking details shortly.</p>

                <div className="bg-white p-6 rounded-xl border-dashed border-2 border-royal-gold/30 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-royal-gold"></div>
                    <div className="flex items-center justify-center mb-2 text-royal-gold">
                        <Gift className="w-6 h-6 mr-2" />
                        <span className="font-bold uppercase tracking-wider text-sm">Loyalty Reward</span>
                    </div>
                    <h3 className="text-2xl font-bold text-royal-dark mb-1">REFILL20</h3>
                    <p className="text-xs text-gray-500">Save this code for 20% off your next refill!</p>
                </div>

                <div className="space-y-4">
                    <Link to="/shop" className="block w-full bg-royal-dark text-white py-3 rounded-full font-medium hover:bg-royal-green transition-colors">
                        Continue Shopping
                    </Link>
                    <Link to="/" className="block w-full text-royal-dark py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;
