import React, { useState } from 'react';
import { Star, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  itemId: number;
  reviews: Review[];
  onAddReview: (itemId: number, review: Review) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ itemId, reviews, onAddReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newReview, setNewReview] = useState({ username: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.username || !newReview.comment) return;

    onAddReview(itemId, {
      ...newReview,
      date: new Date().toLocaleDateString(),
    });
    setNewReview({ username: '', rating: 5, comment: '' });
  };

  return (
    <div className="mt-4 border-t border-stone-100 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2"
      >
        {isExpanded ? 'Hide Reviews' : `Show Reviews (${reviews.length})`}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 mt-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {reviews.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center">
                          <User size={12} className="text-stone-500" />
                        </div>
                        <span className="text-xs font-bold text-stone-900">{review.username}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className={i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-stone-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{review.comment}</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">{review.date}</span>
                  </div>
                ))
              )}
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3 bg-stone-50/50 p-4 rounded-xl border border-dashed border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Leave a Review</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.username}
                  onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                  className="text-xs px-3 py-2 rounded-lg border border-stone-200 focus:ring-1 focus:ring-orange-500 outline-none bg-white"
                  required
                />
                <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-stone-200">
                  <span className="text-xs text-stone-500 mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={14}
                        className={star <= newReview.rating ? 'fill-orange-400 text-orange-400' : 'text-stone-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Share your thoughts..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 focus:ring-1 focus:ring-orange-500 outline-none bg-white resize-none"
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  className="absolute bottom-2 right-2 p-1.5 bg-stone-900 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  <Send size={12} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewSection;
