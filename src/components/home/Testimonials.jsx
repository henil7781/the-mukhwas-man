import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewService } from '../../services/ReviewService';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Reviews from ReviewService
    useEffect(() => {
        const unsubscribe = reviewService.subscribe((data) => {
            if (data.length > 0) {
                setReviews(data);
            } else {
                // Fallback to static if empty
                setReviews([
                    {
                        id: 1,
                        name: "Priya S.",
                        role: "Verified Buyer",
                        image: "https://ui-avatars.com/api/?name=Priya+S&background=0D0D0D&color=fff",
                        text: "I was skeptical about buying mukhwas online, but the freshness blew me away! Better than any local shop.",
                        rating: 5
                    },
                    {
                        id: 2,
                        name: "Rahul M.",
                        role: "Food Blogger",
                        image: "https://ui-avatars.com/api/?name=Rahul+M&background=0D0D0D&color=fff",
                        text: "The 'Paan Rose' blend is addictive. I keep a jar on my desk and it's gone in a week!",
                        rating: 5
                    },
                    {
                        id: 3,
                        name: "Anjali K.",
                        role: "Verified Buyer",
                        image: "https://ui-avatars.com/api/?name=Anjali+K&background=0D0D0D&color=fff",
                        text: "Finally, a mukhwas that isn't full of sugar. The roasted seeds are perfectly crunchy.",
                        rating: 5
                    }
                ]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await reviewService.add(newReview);
            setIsModalOpen(false);
            setNewReview({ name: '', text: '', rating: 5 });
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Failed to submit review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-royal-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-dark mb-4">What Our Snackers Say</h2>
                        <p className="text-gray-600 max-w-lg">Join thousands of happy customers who have made The Mukhwas Man their daily habit.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 bg-royal-gold text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Write a Review</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {reviews.slice(0, 6).map((review, index) => (
                            <motion.div
                                key={review.id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative group"
                            >
                                <Quote className="absolute top-6 right-6 w-8 h-8 text-royal-gold/20 group-hover:text-royal-gold/40 transition-colors" />

                                <div className="flex space-x-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? 'text-royal-gold fill-current' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed line-clamp-4">"{review.text}"</p>

                                <div className="flex items-center space-x-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-royal-cream bg-gray-100">
                                        <img
                                            src={review.image || "https://ui-avatars.com/api/?name=User&background=0D0D0D&color=fff"}
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=User" }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-royal-dark">{review.name}</h4>
                                        <span className="text-xs text-royal-green uppercase tracking-wide font-semibold">{review.role || "Customer"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full relative z-10 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="font-serif text-2xl font-bold text-royal-dark mb-6">Write a Review</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= newReview.rating ? 'text-royal-gold fill-current' : 'text-gray-300'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Review</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                                        value={newReview.text}
                                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                        placeholder="Share your experience..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-royal-dark text-white py-3 rounded-lg font-bold hover:bg-royal-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
export default Testimonials;
