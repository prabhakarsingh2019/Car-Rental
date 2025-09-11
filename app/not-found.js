import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-brand-950 text-brand-50 px-4 text-center">
      <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-accent-500">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 text-brand-100">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-sm sm:text-base text-brand-400 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-accent-500 text-brand-950 font-semibold shadow hover:bg-accent-600 transition text-sm sm:text-base"
      >
        ⬅ Go Home
      </Link>
    </div>
  );
}
