import { db } from '@/firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Check if Firebase is configured
const isFirebaseConfigured = () => {
    // In a real app, you might check specific environment variables
    // Here we check if the db instance is valid and config doesn't have placeholders
    // (This is a simplified check based on the file content we saw)
    return db && db._app && db._app.options && !db._app.options.apiKey.includes("YOUR_API_KEY");
};

const STORAGE_KEY = 'mukhwas_man_reviews';

class ReviewService {

    // Subscribe to reviews (Real-time)
    subscribe(callback) {
        if (isFirebaseConfigured()) {
            const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
            return onSnapshot(q, (snapshot) => {
                const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(reviews);
            }, (error) => {
                console.warn("Firebase error, falling back to local storage:", error);
                this.subscribeLocal(callback);
            });
        } else {
            // Fallback to LocalStorage polling or event listener
            return this.subscribeLocal(callback);
        }
    }

    subscribeLocal(callback) {
        const loadLocal = () => {
            const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
            if (stored) {
                callback(JSON.parse(stored));
            } else {
                callback([]);
            }
        };

        loadLocal();

        // Listen for storage events (changes from other tabs)
        const handleStorage = (e) => {
            if (e.key === STORAGE_KEY) loadLocal();
        };

        // Custom event for same-tab updates
        const handleCustom = () => loadLocal();

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorage);
            window.addEventListener('local-reviews-changed', handleCustom);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('storage', handleStorage);
                window.removeEventListener('local-reviews-changed', handleCustom);
            }
        };
    }

    // Add a review
    async add(review) {
        const newReview = {
            ...review,
            role: "Customer",
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&color=fff`,
            // Store timestamp as simple ISO string for local, or serverTimestamp for FB
            createdAt: isFirebaseConfigured() ? serverTimestamp() : new Date().toISOString()
        };

        if (isFirebaseConfigured()) {
            return await addDoc(collection(db, "reviews"), newReview);
        } else {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            // Simulate ID
            const localReview = { ...newReview, id: 'local_' + Date.now(), createdAt: { seconds: Date.now() / 1000 } };
            const updated = [localReview, ...stored];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('local-reviews-changed'));
            return localReview;
        }
    }

    // Delete a review
    async delete(id) {
        if (isFirebaseConfigured() && !id.toString().startsWith('local_')) {
            return await deleteDoc(doc(db, "reviews", id));
        } else {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const updated = stored.filter(r => r.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('local-reviews-changed'));
        }
    }
}

export const reviewService = new ReviewService();
