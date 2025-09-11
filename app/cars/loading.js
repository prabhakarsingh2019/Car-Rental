export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-secondary-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="mt-3 text-sm sm:text-base font-medium text-brand-400 animate-pulse text-center">
        Please wait...
      </span>
    </div>
  );
}

export default Loading;
