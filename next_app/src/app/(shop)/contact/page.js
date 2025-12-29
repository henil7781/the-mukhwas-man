"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-royal-cream">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="font-serif text-4xl font-bold text-royal-dark mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-royal-gold mt-1" />
                            <div>
                                <h3 className="font-bold text-royal-dark">Email Us</h3>
                                <p className="text-gray-600">support@themukhwasco.com</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-royal-gold mt-1" />
                            <div>
                                <h3 className="font-bold text-royal-dark">Call Us</h3>
                                <p className="text-gray-600">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-royal-gold mt-1" />
                            <div>
                                <h3 className="font-bold text-royal-dark">Visit Us</h3>
                                <p className="text-gray-600">123 Royal Street, Jaipur, Rajasthan, India</p>
                            </div>
                        </div>
                    </div>

                    <form className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-royal-gold" />
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-royal-gold" />
                        <textarea rows="4" placeholder="Message" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-royal-gold"></textarea>
                        <button className="w-full bg-royal-dark text-white py-3 rounded-lg font-bold hover:bg-royal-green transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
