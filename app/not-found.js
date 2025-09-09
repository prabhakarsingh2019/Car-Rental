import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-brand-950 text-brand-50">
      <h1 className="text-9xl font-extrabold text-accent-500">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-brand-100">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-brand-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-lg bg-accent-500 text-brand-950 font-semibold shadow hover:bg-accent-600 transition"
      >
        ⬅ Go Home
      </Link>
    </div>
  );
}
