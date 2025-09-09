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
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-serif text-accent-400 border-b border-brand-700 pb-2">
        Customer Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-brand-800 rounded-xl p-5 shadow-sm border border-brand-700 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between ">
              <h4 className="mb-4 text-lg text-secondary-600">
                Customer #{review.customerId}
              </h4>

              <span className="text-xs text-brand-400">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2 flex items-center space-x-1">
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

            <p className="text-brand-100 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
