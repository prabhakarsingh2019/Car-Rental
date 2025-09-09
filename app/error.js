"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error caught by Next.js error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-950 text-brand-50 px-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-600 text-white text-4xl shadow-lg">
        ⚠️
      </div>

      <h1 className="mt-6 text-3xl font-bold text-accent-400">
        Something went wrong
      </h1>

      <p className="mt-2 text-center text-brand-200 max-w-md">
        We couldn’t load this page. Please try again or return to the homepage.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-accent-500 hover:bg-accent-600 rounded-lg font-semibold text-brand-950 transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="px-5 py-2 border border-accent-400 text-accent-400 hover:bg-accent-500 hover:text-brand-950 rounded-lg font-semibold transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
