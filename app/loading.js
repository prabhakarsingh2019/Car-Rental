export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-brand-950 text-brand-50 px-4 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute text-accent-400 font-bold text-base sm:text-lg">
          🚗
        </div>
      </div>
      <p className="mt-6 sm:mt-8 text-lg sm:text-xl font-semibold bg-gradient-to-r from-accent-400 via-accent-200 to-accent-400 bg-clip-text text-transparent animate-pulse">
        Loading your experience...
      </p>
    </div>
  );
}
