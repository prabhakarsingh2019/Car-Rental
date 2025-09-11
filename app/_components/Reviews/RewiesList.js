"use client";

import { Star } from "lucide-react";

export default function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="bg-brand-800/40 p-6 rounded-2xl text-center text-brand-300">
        No reviews yet. Be the first to leave one!
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-accent-400 border-b border-brand-700 pb-2">
        Customer Reviews
      </h2>

      <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-brand-800 rounded-xl p-4 sm:p-5 shadow-sm border border-brand-700 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h4 className="text-base sm:text-lg text-secondary-600 font-medium mb-2 sm:mb-0">
                Customer #{review.customerId}
              </h4>
              <span className="text-xs sm:text-sm text-brand-400">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-accent-400 text-accent-400"
                      : "text-brand-500"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
