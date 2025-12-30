import React, { useState, useEffect } from 'react';
import { Trash2, Star, Search } from 'lucide-react';
import { reviewService } from '../services/ReviewService';
import AdminLayout from '../components/admin/AdminLayout';

const ReviewsManager = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsubscribe = reviewService.subscribe((data) => {
            setReviews(data);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await reviewService.delete(id);
            } catch (error) {
                console.error("Error deleting review:", error);
                alert("Failed to delete review");
            }
        }
    };

    const filteredReviews = reviews.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout
            title="Customer Reviews"
            subtitle="Manage what people are saying about your brand."
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    {/* Header handled by AdminLayout */}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20 text-gray-500">Loading reviews...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Customer</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Rating</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Review</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Date</th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredReviews.length > 0 ? (
                                filteredReviews.map((review) => (
                                    <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative">
                                                    <img
                                                        src={review.image}
                                                        alt={review.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=User"}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-royal-dark">{review.name}</p>
                                                    <p className="text-xs text-royal-green">{review.role || "Customer"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex text-royal-gold">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-600 line-clamp-2 max-w-md" title={review.text}>
                                                {review.text}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {review.createdAt?.seconds ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Review"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No reviews found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default ReviewsManager;
