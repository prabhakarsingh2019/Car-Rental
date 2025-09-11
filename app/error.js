"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error caught by Next.js error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-950 text-brand-50 px-4 text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl sm:text-3xl md:text-4xl shadow-lg">
        ⚠️
      </div>
      <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-accent-400">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm sm:text-base text-brand-200 max-w-md">
        We couldn’t load this page. Please try again or return to the homepage.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => reset()}
          className="px-4 sm:px-5 py-2 bg-accent-500 hover:bg-accent-600 rounded-lg font-semibold text-brand-950 transition text-sm sm:text-base"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-4 sm:px-5 py-2 border border-accent-400 text-accent-400 hover:bg-accent-500 hover:text-brand-950 rounded-lg font-semibold transition text-sm sm:text-base text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
