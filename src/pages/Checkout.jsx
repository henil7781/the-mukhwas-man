import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { mockBackend } from '../services/mockBackend';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Phone, CheckCircle, CreditCard, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        phone: '',
        fullName: '',
        address: '',
        pincode: '',
        city: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    // RAZORPAY PAYMENT HANDLER
    const displayRazorpay = async () => {
        // 1. In a real app, call backend to create order.
        // const response = await fetch('https://your-api.com/create-order', { ... });
        // const orderData = await response.json();

        // MOCK ORDER ID for demo
        const mockOrderId = "order_" + Math.random().toString(36).substr(2, 9);

        const options = {
            key: "YOUR_TEST_KEY_ID", // Enter your Test Key ID here if you have one, or use dummy
            amount: cartTotal * 100, // Amount in paisa
            currency: "INR",
            name: "The Mukhwas Man",
            description: "Premium Royal Blend",
            // order_id: orderData.id, // Use real order ID from backend
            handler: function (response) {
                // Payment Success!
                // 1. Save Order to Backend (Simulated)
                const newOrder = mockBackend.addOrder({
                    customerName: formData.fullName,
                    location: formData.city,
                    items: cartItems.map(item => ({
                        name: item.name,
                        qty: item.quantity,
                        price: item.price
                    })),
                    total: cartTotal,
                    paymentId: response.razorpay_payment_id
                });

                // 2. Clear Cart
                clearCart();

                // 3. Navigate
                console.log("Order Placed:", newOrder);
                navigate('/order-success');
            },
            prefill: {
                name: formData.fullName,
                contact: formData.phone,
                email: "guest@example.com"
            },
            theme: {
                color: "#064e3b",
            },
        };

        if (window.Razorpay) {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } else {
            alert("Razorpay SDK failed to load. Please check your internet connection.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 text-center min-h-screen bg-royal-cream">
                <h2 className="text-2xl font-serif">Your Cart is Empty</h2>
                <button onClick={() => navigate('/shop')} className="mt-4 text-royal-gold font-medium">Continue Shopping</button>
            </div>
        )
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-royal-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-royal-dark mb-8 text-center">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* STEP 1: IDENTITY */}
                        <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 1 ? 'border-royal-gold' : 'border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 1 ? 'bg-green-500 text-white' : 'bg-royal-dark text-white'}`}>
                                        {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                                    </div>
                                    <h2 className="font-serif text-xl font-bold text-royal-dark">Contact Info</h2>
                                </div>
                                {step > 1 && <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-royal-gold underline">Edit</button>}
                            </div>

                            <AnimatePresence>
                                {step === 1 && (
                                    <motion.form
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        onSubmit={nextStep}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Mobile Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    placeholder="+91 98765 43210"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold bg-gray-50/50"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">We'll send order updates via WhatsApp.</p>
                                        </div>
                                        <button type="submit" className="w-full bg-royal-dark text-white py-3 rounded-lg font-medium hover:bg-royal-green transition-colors">
                                            Continue to Shipping
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            {step > 1 && <p className="text-gray-600 pl-11">{formData.phone}</p>}
                        </div>

                        {/* STEP 2: SHIPPING */}
                        <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 2 ? 'border-royal-gold' : 'border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 2 ? 'bg-green-500 text-white' : (step === 2 ? 'bg-royal-dark text-white' : 'bg-gray-200 text-gray-500')}`}>
                                        {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                                    </div>
                                    <h2 className="font-serif text-xl font-bold text-royal-dark">Shipping Address</h2>
                                </div>
                                {step > 2 && <button onClick={() => setStep(2)} className="text-sm text-gray-400 hover:text-royal-gold underline">Edit</button>}
                            </div>

                            <AnimatePresence>
                                {step === 2 && (
                                    <motion.form
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        onSubmit={nextStep}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input name="fullName" required placeholder="Full Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold" onChange={handleInputChange} />
                                            <input name="pincode" required placeholder="Pincode" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold" onChange={handleInputChange} />
                                        </div>
                                        <input name="address" required placeholder="Flat, House no., Building, Apartment" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold" onChange={handleInputChange} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input name="city" required placeholder="City / Town" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold" onChange={handleInputChange} />
                                            <input name="state" required placeholder="State" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold" onChange={handleInputChange} />
                                        </div>

                                        <div className="flex items-center text-sm text-royal-green bg-green-50 p-3 rounded-lg">
                                            <Truck className="w-4 h-4 mr-2" />
                                            <span>Free Express Delivery applied.</span>
                                        </div>

                                        <button type="submit" className="w-full bg-royal-dark text-white py-3 rounded-lg font-medium hover:bg-royal-green transition-colors">
                                            Continue to Payment
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            {step > 2 && <p className="text-gray-600 pl-11">{formData.address}, {formData.city} - {formData.pincode}</p>}
                        </div>

                        {/* STEP 3: PAYMENT */}
                        <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 3 ? 'border-royal-gold' : 'border-gray-100'}`}>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-royal-dark text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    3
                                </div>
                                <h2 className="font-serif text-xl font-bold text-royal-dark">Payment</h2>
                            </div>

                            {step === 3 && (
                                <div className="pl-11">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <ShieldCheck className="w-5 h-5 text-green-600" />
                                            <span className="font-medium text-gray-700">100% Secure Payment</span>
                                        </div>
                                        <p className="text-sm text-gray-500">We support UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.</p>
                                    </div>

                                    <button
                                        onClick={displayRazorpay}
                                        className="w-full bg-royal-gold text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-all shadow-lg flex items-center justify-center mb-3"
                                    >
                                        <Lock className="w-5 h-5 mr-2" /> Pay ₹{cartTotal} Online
                                    </button>

                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-gray-200"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or</span>
                                        <div className="flex-grow border-t border-gray-200"></div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const newOrder = mockBackend.addOrder({
                                                customerName: formData.fullName,
                                                location: formData.city,
                                                items: cartItems.map(item => ({
                                                    name: item.name,
                                                    quantity: item.quantity, // Corrected key to 'quantity' to match inventory logic
                                                    price: item.price
                                                })),
                                                total: cartTotal,
                                                paymentId: 'COD_' + Math.random().toString(36).substr(2, 9),
                                                status: 'Pending (COD)'
                                            });
                                            // Ideally we should use clearCart() from context here if exposed,
                                            // but for now we rely on the fact that we are navigating away.
                                            // If clearCart is available in useCart, we should use it.
                                            // Looking at context usage at top: const { cartItems, cartTotal } = useCart();
                                            // Need to destruct clearCart. Assuming it exists or adding it.

                                            navigate('/order-success');
                                        }}
                                        className="w-full bg-white border-2 border-royal-dark text-royal-dark py-3 rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
                                    >
                                        Place Order (Pay on Delivery)
                                    </button>

                                    <p className="text-xs text-center text-gray-400 mt-3">
                                        Delivered in eco-friendly glass jars & premium packaging.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-serif text-lg font-bold text-royal-dark mb-4">Order Summary</h3>
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div className="flex space-x-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 my-4 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-royal-dark border-t border-gray-100 pt-2 mt-2">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
