import React from 'react';

export default function FAQ() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-royal-cream">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="font-serif text-4xl font-bold text-royal-dark mb-12 text-center">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    {[
                        { q: "Is shipping free?", a: "Yes, we offer free express shipping on all orders above ₹499." },
                        { q: "Are the products 100% natural?", a: "Absolutely. We use zero artificial preservatives or colors." },
                        { q: "What is the shelf life?", a: "Our mukhwas stays fresh for 6-9 months if stored in a cool, dry place." },
                        { q: "Do you ship internationally?", a: "Currently we ship across India. International shipping coming soon!" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-royal-dark mb-2">{item.q}</h3>
                            <p className="text-gray-600">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
