"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { createReview } from "@/app/_lib/action";
import { toast } from "react-toastify";

const suggestionComments = [
  "Had a nice journey",
  "Car was clean",
  "Very comfortable ride",
  "Smooth driving experience",
  "Driver was friendly",
  "Car as expected",
  "Would rent again",
  "Excellent service",
  "Highly recommended",
  "Perfect for road trips",
];

export default function CarReviewForm({ carId, customerId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview({ carId, customerId, rating, comment });
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setComment(text);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-800 p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4 sm:space-y-6"
    >
      <h3 className="text-xl font-semibold text-accent-400">Leave a Review</h3>

      <input type="hidden" name="customerId" value={customerId} />
      <input type="hidden" name="carId" value={carId} />
      <input type="hidden" name="rating" value={rating} />

      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <Star
              key={i}
              className={`h-8 w-8 cursor-pointer transition ${
                starValue <= (hover || rating)
                  ? "fill-accent-400 text-accent-400"
                  : "text-brand-500"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>

      <div className="overflow-x-auto py-2">
        <div className="flex gap-2 min-w-max">
          {suggestionComments.map((text, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleSuggestionClick(text)}
              className="px-4 py-1 bg-accent-600 text-white rounded-full whitespace-nowrap hover:bg-accent-500 transition"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-brand-300 mb-1">Comment</label>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Write your review..."
          className="w-full p-3 rounded-lg bg-brand-900 text-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg w-full transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
